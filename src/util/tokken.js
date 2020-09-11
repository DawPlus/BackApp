const jwt = require('jsonwebtoken');
const secret  ="expressadmin12341234";
var getTokken = (userInfo)  =>  jwt.sign({userInfo}  ,secret, {expiresIn: '7d'});
var isTokken  = (tokken)    =>  jwt.verify(tokken, secret, (err,decoded)=>{
    if(err){ 
        console.log(err);
        return null;
    }    
    return decoded;
});

module.exports.getTokken = getTokken;
module.exports.isTokken  = isTokken;