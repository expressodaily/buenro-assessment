// src/common/utils/json-downloader.service.ts
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as StreamArray from 'stream-json/streamers/StreamArray';
import { Readable } from 'stream';

@Injectable()
export class JsonDownloaderService {
  private readonly logger = new Logger(JsonDownloaderService.name);

  /**
   * Downloads and returns a JSON array from a URL.
   * Use this for small-sized JSON payloads.
   */
  async fetchJsonArray<T = any>(url: string): Promise<T[]> {
    this.logger.log(`Fetching full JSON array from: ${url}`);

    try {
      const response = await axios.get<T[]>(url);

      if (!Array.isArray(response.data)) {
        throw new Error('Expected JSON array, received something else');
      }

      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch JSON array from ${url}`, error.stack);
      throw error;
    }
  }

  /**
   * Streams a large JSON array from a URL in batches.
   * Use this for large files to avoid memory overload.
   */
  async streamJsonArrayBatch<T = any>(
    url: string,
    onBatch: (items: T[]) => Promise<void>,
    batchSize = 500,
  ): Promise<void> {
    this.logger.log(`Starting streaming JSON from: ${url}`);

    try {
      const response = await axios.get<Readable>(url, {
        responseType: 'stream',
      });

      const jsonStream = response.data.pipe(StreamArray.withParser());
      const buffer: T[] = [];

      try {
        for await (const { value } of jsonStream) {
          buffer.push(value);

          if (buffer.length >= batchSize) {
            await onBatch([...buffer]);
            buffer.length = 0;
          }
        }

        if (buffer.length > 0) {
          await onBatch([...buffer]);
        }

        this.logger.log(`Finished streaming and batching from: ${url}`);
      } catch (error) {
        this.logger.error(
          `Error while streaming JSON from ${url}`,
          error.stack,
        );
        throw error;
      }
    } catch (error) {
      this.logger.error(`Failed to initiate stream from ${url}`, error.stack);
      throw error;
    }
  }
}
