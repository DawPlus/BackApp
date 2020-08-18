const db    = require('../../../util/db_con');
const query = require('../../../util/query');

const urlPrefix = "/static/map/";
var fs = require('fs');


module.exports={
    deleteAction : (req, res, qr) => {
    
        // File Info 
        const {file_id, path} = req.body;
        
        console.log(qr);
        db( async (connection)=>{
            try{
                const row =  await query(connection
                , qr
                ,[file_id]
                ).catch(err=>{throw err});
        
                if(row === undefined){
                    return res.json({
                        result : false ,
                        message : "오류가 발생했습니다."
                    })
                }

                fs.unlink(path,(err)=>{
                    console.log(err);
                });

                return res.json({
                    message : "삭제 되었습니다.",
                    result : true,
                });
        
                }catch(err){
                    console.log(err);
                    return res.status(500).json(err)
                }   
            });
        }
};