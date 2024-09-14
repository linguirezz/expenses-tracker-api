
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const {Pool} = require('pg')
console.log(process.env.HOST)
const pool = new Pool({
        connectionString: process.env.POSTGRES_URL
      
})
async function createTable() {
  const client = await pool.connect();
  try {
    const createTableQuery = `
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
      INSERT INTO users (username, email, password) VALUES ('admin', 'admin000@gmail.com', 'admin123'); 
    `;
    await client.query(createTableQuery);
    
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table', err);
  } finally {
    client.release();
  }
}

createTable();

module.exports=pool
