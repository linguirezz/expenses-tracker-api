const router = require('express').Router()
const authentication = require('../utils/authentication')
const pool = require('../database/pool')
router.get('/',authentication, async(req,res)=>{
    try {
        id = req.user
       
        const user = await pool.query('SELECT * FROM users WHERE id = $1',[id])
        const userData = user.rows
        const expenses =await pool.query('select * from expenses where user_id = $1',[id])
        const expensesDataAvg = await pool.query('SELECT ROUND(AVG(amount))  FROM expenses WHERE user_id = $1',[id])
        const expensesData = expenses.rows 
        res.json({userData,expensesData,expensesDataAvg})
        // const username = user.rows[0].name
        // console.log(username)
        // res.json(username)
    
    } catch (error) {
        console.error(error.message)
    }
    
})
router.post('/add',authentication, async(req,res)=>{
    try {
        const {title,amount,date,time} = req.body
        const id = req.user
      
        
        const newExpense = await pool.query('INSERT INTO expenses (user_id, amount, description,date,time) VALUES($1,$2,$3,$4,$5) RETURNING *',[id,amount,title,date,time])
        res.json(newExpense)
    } catch (error) {
        console.error(error.message)
    }
})
module.exports= router