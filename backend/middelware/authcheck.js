const jwt = require("jsonwebtoken");
const configData = require('../config/config');

const config = configData.config();

module.exports = (req, res, next) => {
    try{
        jwt.verify(req.headers.authorization, config.jwt);
        next();
    }catch(error){
        res.status(401).json({
            statua: true,
            message:"Unauthorized token"
        });
    }
}
