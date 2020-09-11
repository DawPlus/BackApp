const {UPDATE_PASSWORD} = require('../../../query/Admin');
const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {getTokken, isTokken} = require("../../../util/tokken");
var base64 = require('base-64');
module.exports={

    updateAction : (req, res) => {
    const {tokken, admin_id, newPassword, oldPassword} = req.body;

    const decoded = isTokken(tokken);
    if(!decoded) {
        return res.status(500).json({
                result : false,
                message : "다시 로그인해주십시오",
        });
    }    

     // 토근에 있는 UserInfo 
     const {password} = decoded.userInfo;        

     // 패스워드가 일치하지 않을경우
     if(base64.encode(oldPassword) !== password){
            return res.status(500).json({
                result : false,
                message : "현재 비밀번호가 일치하지 않습니다. ",
        });
     }



      db( async (connection)=>{
        try{
            const rows = await query(connection, UPDATE_PASSWORD, [base64.encode(newPassword), admin_id]).catch(err=>{throw err});
            if(rows === undefined){
                return res.status(500).json({
                    result : false ,
                    message : "수정중 오류가 발생 했습니다."
                });
              }
                
                return res.json({
                    result : true, 
                    message : "정상 수정 되었습니다.",
                    data : rows 
                }); 

            }catch(err){
                return res.status(500).json(err)
            }   
        });
    }
  
  
}