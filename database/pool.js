const { max } = require('lodash');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const {Pool} = require('pg')
console.log(process.env.HOST)
const pool = new Pool({
 host : process.env.HOST,
 user: process.env.USER, 
 database:process.env.DATABASE,
 password: process.env.PASSWORD,
 max:1000,
 idleTimeoutMillis:30000,
 connectionTimeoutMillis:3000,
})
module.exports=pool
