const db    = require('../../../util/db_con');
const query = require('../../../util/query');
var fs = require('fs');
const {DELETE} = require("../../../query/Question");

module.exports={
    deleteAction : (req, res) => {
        const {id} =  req.params
       
        db( async (connection)=>{
            try{
                // Example 삭제 
                const row =  await query(connection
                                                , DELETE
                                                ,[id]
                                                ).catch(err=>{throw err});        
                    if(row === undefined){
                        return res.json({
                            result : false ,
                            message : "삭제중 오류가 발생했습니다."
                        })
                    }




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