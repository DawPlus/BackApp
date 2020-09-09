const db    = require('../../../util/db_con');
const query = require('../../../util/query');
const urlPrefix = "/static/guide/";

module.exports={
    uploadAction : (req, res, qr) => {
    
        // File Info 
        const {originalname, mimetype, destination, filename, path, size} = req.file;
        // File URL 
        const url = urlPrefix+filename;
            
        db( async (connection)=>{
            try{
                const row =  await query(connection
                , qr
                ,[originalname, mimetype, destination, filename, path, size, url]
                ).catch(err=>{throw err});
        

                if(row === undefined){
                    return res.json({
                        result : false ,
                        message : "오류가 발생했습니다."
                    })
                }

                
                return res.json({
                    message : "정상등록 되었습니다.",
                    result : true,
                    data : url 
                })
        
                }catch(err){
                
                    return res.status(500).json(err)
                }   
            });
        }
};