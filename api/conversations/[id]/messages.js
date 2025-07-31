
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id: conversationId } = req.query;

  try {
    if (req.method === 'GET') {
      const { rows } = await sql`
        SELECT id, text, is_user, timestamp 
        FROM messages 
        WHERE conversation_id = ${conversationId} 
        ORDER BY timestamp ASC
      `;
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { text, isUser } = req.body;
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { rows } = await sql`
        INSERT INTO messages (id, conversation_id, text, is_user, timestamp) 
        VALUES (${messageId}, ${conversationId}, ${text}, ${isUser}, NOW()) 
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
