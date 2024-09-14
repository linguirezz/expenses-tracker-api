
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const {Pool} = require('pg')
console.log(process.env.HOST)
const pool = new Pool({
        connectionString: process.env.POSTGRES_URL
      
})


module.exports=pool
