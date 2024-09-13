// set up package
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const functions = require('firebase-functions')

// database 
const pool= require('./database/pool')
const { error } = require('console')
//use middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())
// middlware
app.get('/',(req,res)=>{
    res.send('anda berhasil masuk')
})
app.use('/auth',require('./routes/auth.js'))
app.use('/dashboard',require('./routes/dashboard.js'))
// listen port
const PORT = process.env.API_PORT||3000
// server's error handler
app.use((err, req, res, next) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
exports.api = functions.https.onRequest(app)
