const { getToken } = require('../utils/get-token');
const config = require('../config');
const jwt = require('jsonwebtoken');
const userModel = require('./model');

function decodeToken(){
   return async function(req, res, next){
     try{

       let token = getToken(req);     

       if(!token) return next(); 
 
       req.user = jwt.verify(token, config.tokenSecret); 
       
       const user = await userModel.checkToken(token);
       
       if(user.rowCount < 1){
          return res.json({
            error: 1,
            message: `Token expired`
          });
       }
     } catch (err) {
       
       if(err && err.name === 'JsonWebTokenError'){
         return res.json({
            error: 1,
            message: err.message
         });
       }

       next(err);
     } 

     return next();
   }
}

module.exports = {
  decodeToken
}