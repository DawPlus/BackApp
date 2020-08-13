const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {getTokken} = require("../../../util/tokken");
var base64 = require('base-64');


module.exports={
    loginAction : (res, qr, {id, password})=>{
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
                    // TODO 리턴 데이터 오류 ?? 
                     console.log("정상 조회 ", tokken);
                     console.log({
                        result : true,
                        message : "정상적으로 로그인 됐습니다. ",
                        data : {
                            authrization : true,
                            tokken : tokken,
                            userinfo
                        }
                    })
                    return res.json();
                    
            }catch(err){
              return res.status(500).json(err)
            }   
          });


    }
}