const Pool = require('pg').Pool;

require('dotenv').config();

const localPoolConfig = {
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'todolist',
};


const poolConfig = process.env.DATABASE_URL ? {connectionString: process.env.DATABASE_URL, ssl: {rejectUnauthorizated: false}} : localPoolConfig

const pool = new Pool(poolConfig);

module.exports = pool;