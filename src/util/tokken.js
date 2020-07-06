const jwt = require('jsonwebtoken');
const secret  ="expressadmin12341234";
const getTokken = (userInfo)  =>  jwt.sign({userInfo}  ,secret, {expiresIn: '7d'});
const isTokken  = (tokken)    =>  jwt.verify(tokken, secret);

module.exports.getTokken = getTokken;
module.exports.isTokken     = isTokken;