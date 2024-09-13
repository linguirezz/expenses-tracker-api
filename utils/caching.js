// const redisClient = require('./redisClient');
const express = require('express');
const Redis = require('redis');
const redisClient = Redis.createClient({
  host: 'localhost',
  port: 6379
});
redisClient.connect()
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

const EXPIRED = process.env.EXPIRED || 300;

const caching = (key, cb) => {
  return new Promise(async(resolve, reject) => {
   try {
    
    const data = await redisClient.get(key);
  
    if(data != null) {
     return resolve(JSON.parse(data));
    } else {
      const result = await cb();
      redisClient.setex(key, EXPIRED, JSON.stringify(result));
      return resolve(result);
   }
   } catch (error) {
    console.log(error.message)
    return reject(error)
   }
   
});
};

module.exports = { caching };
