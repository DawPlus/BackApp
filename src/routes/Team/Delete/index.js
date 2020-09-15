const db    = require('../../../util/db_con');
const query = require('../../../util/query');
const {LIST}  = require("../../../query/Screenshot");
const {DELETE} = require("../../../query/Team");
var fs = require('fs');

module.exports={
    deleteAction : (req, res, id) => {
        // 1. 파일 목록을 조회한다. 
        db( async (connection)=>{
            try{
                const rows = await query(connection, LIST, [id]).catch(err=>{throw err});

                // 조회결과가 있을경우 
                if(rows.length !== 0 || rows[0] !== undefined){                 
                 // 스크린샷 목록 으로  파일을 삭제한다. 
                     rows.map(it=> {
                        fs.unlink(it.path,(err)=>{
                            console.log(err);
                        });
                    })
               
                 }
                // 마스터 테이블을 삭제한다. 
                // 문제 수정 
                db( async (connection)=>{
                    try{
                        const sub = await query(connection, DELETE, [id]).catch(err=>{throw err});                           
                            return res.json({
                                message : "정상 삭제 되었습니다 ",
                                result : true
                            })
                            
                        }catch(err){
                            console.log(err);
                        return res.status(500).json(err)
                        }   
                    });    
                    
                }catch(err){
                    // 오류 발생 
                    return res.status(500).json(err)
                }   
            });
        // 3. 파일목록을 삭제한다. 


        // 3. Master 테이블 을 삭제한다. 





        // fileList.map(it =>{
        //     screenDelete += mysql.format(DELETE, [it.file_id]);
        // })

      //  console.log(screenDelete)
    //    sub = await query(connection, querys).catch(err=>{throw err});      
        // db( async (connection)=>{
        //     try{
        //         const row =  await query(connection
        //         , qr
        //         ,[file_id]
        //         ).catch(err=>{throw err});
        
        //         if(row === undefined){
        //             return res.json({
        //                 result : false ,
        //                 message : "오류가 발생했습니다."
        //             })
        //         }

        //         fs.unlink(path,(err)=>{
        //             console.log(err);
        //         });

        //         return res.json({
        //             message : "삭제 되었습니다.",
        //             result : true,
        //         });
        
        //         }catch(err){
        //             console.log(err);
        //             return res.status(500).json(err)
        //         }   
        //     });
        // }

    }
};