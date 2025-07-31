
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { rows } = await sql`
        SELECT id, title, preview, timestamp 
        FROM conversations 
        ORDER BY timestamp DESC
      `;
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { title, preview } = req.body;
      const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { rows } = await sql`
        INSERT INTO conversations (id, title, preview, timestamp) 
        VALUES (${id}, ${title}, ${preview}, NOW()) 
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
