const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {getTokken,isTokken} = require("../../../util/tokken");
module.exports={
    checkTokkenAction : (res, qr, tokken)=>{
        const decoded = isTokken(tokken);

        if(!decoded) {
            return res.status(500).json({
                    result : false,
                    message : "유효하지 않은 토큰 입니다.",
                    data  : {
                            authrization : false
                    }
            });
          }    
        db( async (connection)=>{
            try{
                // 토근에 있는 UserInfo 
                const {admin_id, password} = decoded.userInfo;           
                const rows = await query(connection, qr, [admin_id, password]).catch(err=>{throw err});
                
                        if(rows[0] === undefined){
                            return res.status(500).json({
                                result : false,
                                message : "사용자가 없습니다. ",
                                data : {
                                    authrization : false
                                }
                            });
                        }
                        const userInfo  = rows[0]; 
                        const tokken    =  getTokken(userInfo);
                     
                        return res.json({
                            result : true, 
                            message : "새로고침 되었습니다.",
                            data : {
                                authrization : true,
                                tokken : tokken,
                                userInfo
                            }
                        }); 
                    }catch(err){                    
                        console.log(err) 
                        return res.status(500).json({authrization : false})
                    }   
            });


    }
}