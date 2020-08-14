const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {getTokken} = require("../../../util/tokken");
var base64 = require('base-64');


module.exports={
    loginAction : (res, qr, {id, password})=>{

        console.log(id, password)
        db( async (connection)=>{
            try{
                    const rows = await query(connection, qr, [id, base64.encode(password)]).catch(err=>{ throw err});
                    
                    if(rows[0] === undefined){
                            return res.status(500).json({
                                result : false,
                                message : "로그인중 오류가 발생했습니다."
                            });
                            
                    }
                    
                    const userInfo  = rows[0]; 
                    const tokken    =  getTokken(userInfo);
                    
                    return res.json({
                        result : true,
                        message : "정상적으로 로그인 됐습니다. ",
                        data : {
                            authrization : true,
                            tokken : tokken,
                            userInfo
                        }
                    });
                    
            }catch(err){
              console.log(err);
              return res.status(500).json(err)
            }   
          });


    }
}