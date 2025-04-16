import 'dotenv/config';
import { MongoClient } from 'mongodb';

async function main() {
  const mongoUrl = process.env.DATABASE_URL;

  if (!mongoUrl) {
    throw new Error('DATABASE_URL is not defined in .env');
  }

  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    const db = client.db();
    const property = db.collection('Property');

    console.log('Creating indexes...');

    await Promise.all([
      property.createIndex({ city: 1, isAvailable: 1 }),
      property.createIndex({ city: 1, priceForNight: 1 }),
      property.createIndex({ priceSegment: 1, city: 1 }),
    ]);

    console.log('Indexes created successfully.');
  } catch (err) {
    console.error('Failed to create indexes:', err);
  } finally {
    await client.close();
  }
}

main();
