const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const jwt = require('jsonwebtoken')
// JWT GENERATOR
// ? how it can be secure ? 

function jwtGenerator(user_id) {
    const payload = {
        id :user_id
    }
    const token = jwt.sign(payload,process.env.SECRET,{expiresIn:'1h'})
    return token
}
module.exports= jwtGenerator


