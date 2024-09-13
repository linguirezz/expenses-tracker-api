const { message } = require('statuses')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// const express = require('express')
module.exports =async (req,res,next)=>{
    try {
        console.log('authentication sedang berlangsung')
    // destructure the token and secret
    const {token}=  req.headers
    console.log(token)
    console.log(token===undefined)
    console.log('token didapatkan')
    const secret = process.env.SECRET
    console.log('secret didapatkan')
    // cek if client dont have the token
    if(token==false){
        return res.status(403).json({message:'you dont have authorize to acces this site'})
    }
    console.log('decode token')
    const payload = await jwt.verify(token,secret)
    if(payload===false){
        return res.status(401).json({error:"jwt tidak terverifikasi"})
    }
    console.log('token verified')
    
    req.user = payload.id
    next()
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
  
} 