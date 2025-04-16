export interface SourceHandler {
  fetchAndTransform?(): Promise<any>;
  streamAndTransform?(onBatch: (items: any[]) => Promise<void>): Promise<void>;
}
