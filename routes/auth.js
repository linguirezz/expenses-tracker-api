const router = require('express').Router()
const pool = require('../database/pool')
const jwtGenerator = require('../utils/jwt_token')
const bcrypt = require('bcrypt')
const authentification = require('../utils/authentication')
// halaman register
router.post('/register',async(req,res)=>{

const {username,email,password}=req.body


// // todo : check if user doesnt exists
const user = await pool.query('SELECT * FROM users WHERE email = $1',[email])
if(user.rows.length !== 0){
    console.log('user telah tersedia')
    return res.status(403).json({error:'user sudah ada!'})
}

// // todo : hash password
const salt=await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)

// // todo : save user
const newUser = await pool.query(
    'INSERT INTO users (name, email, password) VALUES($1,$2,$3) RETURNING *',[username,email,hashedPassword]
) 

// // todo : respon with jwt user
// const fetch_id = await pool.query('SELECT id FROM users WHERE email = $1',[email])
// const {id}=fetch_id.rows[0]
// const token=jwtGenerator(id)
res.json({isRegis:true})
})
// login
router.post('/login',async(req,res)=>{
//! todo : destructured
const {email,password}=req.body

// // todo : check if user doesnt exists
const user = await pool.query('SELECT * FROM users WHERE email = $1',[email])
if(user.rows.length === 0){
    console.log('error:user tidak ditemukan')
    return res.status(403).json({error:'user belum terdaftar!'})
}

// // todo : compare pas
const dbPassword = await pool.query('SELECT password FROM users WHERE email = $1',[email])
const validPassword =await bcrypt.compare(password,user.rows[0].password)
if(!validPassword){
    console.log('password salah!!!')
    return res.status(401).json({error:'wrong password'})
}
//create token
const token = jwtGenerator(user.rows[0].id)
res.json(token)

})
router.post('/verify',authentification,(req,res)=>{
    try {
        res.json({verify:true})
    } catch (error) {
        console.log('terjadi error dalam autentifikasi')
        return res.status(403)
    }
})
module.exports= router