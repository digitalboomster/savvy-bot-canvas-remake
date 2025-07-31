
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  preview TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(255) PRIMARY KEY,
  conversation_id VARCHAR(255) REFERENCES conversations(id),
  text TEXT NOT NULL,
  is_user BOOLEAN NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- User profiles for mood tracking
CREATE TABLE IF NOT EXISTS user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  mood VARCHAR(50),
  note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
