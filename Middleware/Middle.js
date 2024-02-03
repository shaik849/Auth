const userSchema = require('../Model/User');
const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {
    try{
 const token =  req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];
 console.log(token)
 if(!token) return res.status(400).json({status: "error", message: 'Token not found'});
 const decoded = jwt.verify(token, process.env.SECRATE_KEY)
  const user = decoded;
  const getUser = await userSchema.findOne({_id : user._id})
  req.user = decoded;
 return next();
    }
    catch(err){
        return res.status(400).json({status: "error", message: err.message});
    }
}

module.exports = verifyToken;