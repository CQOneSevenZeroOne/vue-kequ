module.exports.listen = function(app,conn,multer){

    // var src = ''
    // var storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, './upload')
    //     },
    //     filename: function (req, file, cb) {
    //         var fileFormat = file.originalname.split(".");
    //         src =  Date.now()+'.'+fileFormat[fileFormat.length-1]
    //         cb(null, './upload' +src);
    //     }
    // })
    // var upload = multer({ storage: storage })
    

    app.post('/ticket/getAllTickets',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        conn.query('select * from ticket',function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result)
            }
        })
    })

    app.post('/ticket/getAllTicketsAndApp',(req,res)=>{
        var json = {};
        var bool = true ;
        res.append("Access-Control-Allow-Origin","*");
        conn.query('select * from ticket',function(err,result){
            if(err){
                res.send('err')
                bool = false;
            }else{
                json.tickets = result;
                conn.query('select * from app',function(err,result){
                    if(err){
                        res.send('err')
                        bool = false;
                    }else{
                        json.apps = result;
                        if(bool){
                            console.log(json)
                            res.send(json)
                        }
                    }
                })
            }
        })
        
       
        
    })

    app.post('/ticket/getTicketById',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from ticket where id = ${req.body.id}`,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result[0])
            }
        })
    })

    app.post('/ticket/getAllFreedomTickets',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from ticket where type = '${req.body.type}'`,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result)
            }
        })
    })

    //img = '10.40.153.145:8888/${src}' 
    // app.post('/ticket/updateTicket',upload.any(),(req,res)=>{
    //     res.append("Access-Control-Allow-Origin","*");
    //     var para = req.body;
    //     var sql = `update ticket set title = '${para.title}' , address = '${para.address}' , set time = '${req.body.time}', price = ${para.price} where id = ${req.body.id}`;
    //     console.log(sql)
    //     conn.query(sql,function(err,result){
    //         if(err){
    //             res.send('err')
    //         }else{
    //             res.send('success')
    //         }
    //     })
    // })
}