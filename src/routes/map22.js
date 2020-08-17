
const express = require("express");
const router = express.Router();
const path = require('path');
var fs = require('fs');
const query = require('../util/query');
const db = require('../util/db_con');
const {LIST, NEW, SUB, DELETE, DELETE_SUB, SELECT} = require("../query/map");
const config = require("../config");
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    cb(null,config.uploadFolder.map) // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  }
})
  var upload = multer({ storage: storage });

  



// 맵 목록 조회 
router.get('/', (req, res) => {
    db( async (connection)=>{
        try{
            const list =  await query(connection
              , LIST
            ).catch(err=>{throw err});     
            list.map(it =>  {
                console.log(it.url);
                it.src =  config.baseName+it.url;
                it.title = it.file_name;
                it.name = it.file_name;
                
            });
                return res.json({files : list});
            }catch(err){
                return res.status(500).json(err)
            }   
        });
});


// 파일 업로드 
router.post('/upload', upload.single('file'), function(req, res, next){
  
  // Team ID  
  const {team_id}= req.body;
  // File Info 
  const {originalname, mimetype, destination, filename, path, size} = req.file;
  // File URL 
  const url = config.urlPrefix+filename;
  // 파일 타입 
  const types = config.types.map;
  
  let returns = {};


db( async (connection)=>{
    try{


        const row =  await query(connection
          , NEW
          ,[originalname, mimetype, destination, filename, path, size, team_id, url, types],

        ).catch(err=>{throw err});
          returns.row = row;

          // 서브 쿼리  
          db( async (connection)=>{
            try{
                const sub =  await query(connection
                  , SUB
                  ,[row.insertId, config.urlPrefix+filename]
                ).catch(err=>{throw err});

                  returns.sub = sub;
                  returns.url = config.baseName+url;
                  return res.json(returns);

                }catch(err){
                    return res.status(500).json(err)
                }   
            });
                
          
              

        }catch(err){
            return res.status(500).json(err)
        }   
    });
  


   // console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
  });


router.delete("/:id", function(req, res){
  const {id} = req.params;
  db( async (connection)=>{
    try{   
      const rows = await query(connection, SELECT,[id]).catch(err=>{throw err});
      if(rows[0] === undefined){
        return res.json({
            result : "fail",
            message : "해당 파일이 없습니다."
        })
      }
      const {file_id, file_name} = rows[0]
      
      db( async (connection)=>{
        try{
            await query(connection
              , DELETE_SUB
              ,[file_id]
            ).catch(err=>{throw err});

            // 파일 테이블 삭제 
            db( async (connection)=>{
              try{
                  await query(connection
                    , DELETE
                    ,[file_id]
                  ).catch(err=>{throw err});
      
                    fs.unlink(`${config.uploadFolder.map}/${file_name}`,(err)=>{
                      console.log(err)
                    })


                    return res.json(
                      {
                        result : "ok",
                        message : "파일삭제완료 "
                  
                      }
                  )
                            
                  }catch(err){
                      return res.status(500).json(err)
                  }   
              });
                  




            }catch(err){
                return res.status(500).json(err)
            }   
        });
            

    }catch(err){
      return res.status(500).json(err)
  }   
});





  // db( async (connection)=>{
  //   try{


  //       const row =  await query(connection
  //         , DELETE_FROM
  //         ,[file_id],

  //       ).catch(err=>{throw err});
  //         returns.row = row;

  //         // 서브 쿼리  
  //         db( async (connection)=>{
  //           try{
  //               const sub =  await query(connection
  //                 , DELETE
  //                 ,[file_id]
  //               ).catch(err=>{throw err});

                

  //                 fs.unlink(`${config.uploadFolder.map}/1595298693540.jpg`,(err)=>{
  //                   console.log(err)
  //                 })





  //                 return res.json(returns);

  //               }catch(err){
  //                   return res.status(500).json(err)
  //               }   
  //           });
                
          
              

  //       }catch(err){
  //           return res.status(500).json(err)
  //       }   
  //   });
  







  // fs.unlink(`${config.uploadFolder.map}/1595298693540.jpg`,(err)=>{
  //   console.log(err)
  // })



})




router.get("/download/:file_name", function(req, res, next){

  var upload_folder = 'uploads/';
  var file = upload_folder + req.params.file_name; // ex) /upload/files/sample.txt
  try {
    if (fs.existsSync(file)) { // 파일이 존재하는지 체크
      // var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
      // var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
    
      // res.setHeader('Content-disposition', 'attachment; filename=' + filename); // 다운받아질 파일명 설정
      // res.setHeader('Content-type', mimetype); // 파일 형식 지정
    
      // var filestream = fs.createReadStream(file);
      // filestream.pipe(res);

      res.download(file);


    } else {
      res.send('해당 파일이 없습니다.');  
      return;
    }
  } catch (e) { // 에러 발생시
    console.log(e);
    res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
    return;
  }
})


module.exports = router;