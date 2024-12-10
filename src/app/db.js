const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env

// Configure PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Export pool for reuse
module.exports = pool;
