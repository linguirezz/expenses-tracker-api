const path = require('path');
require('dotenv').config();

console.log('SECRET:', process.env.SECRET); // This should print your secret key

const jwt = require('jsonwebtoken');

function jwtGenerator(user_id) {
    const payload = {
        id: user_id
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = jwtGenerator;
