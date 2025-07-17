// pages/api/getData.js
import { MongoClient } from 'mongodb';
import { url } from '../../../../nodejs-bce/config/config';
const uri = url; // Your MongoDB Atlas connection string

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('jan2025'); // Replace with your database name
    
    const data = await db
      .collection('applications') // Replace with your collection name
      .find({})
      .toArray();
    
    await client.close();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch data from database' });
  }
}