const db    = require('../../../util/db_con');
const query = require('../../../util/query');
const urlPrefix = "/static/map/";

module.exports={
    uploadAction : (req, res, qr) => {
    
        // File Info 
        const {originalname, mimetype, destination, filename, path, size} = req.file;
        // File URL 
        const url = urlPrefix+filename;
    
        console.log(qr);
        console.log(originalname)
        
        db( async (connection)=>{
            try{
                const row =  await query(connection
                , qr
                ,[originalname, mimetype, destination, filename, path, size, url]
                ).catch(err=>{throw err});
        
                
                return res.json({
                    url 
                })
        
                }catch(err){
                    console.log(err);
                    return res.status(500).json(err)
                }   
            });
        }
};