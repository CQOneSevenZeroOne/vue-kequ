module.exports.listen = function(app,conn){
    app.post('/app/getAllAppById',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        var sql = `SELECT * from app,ticket where userid = ${req.body.userid} and app.ticketid = ticket.id`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result)
            }
        })
    })

    app.post('/app/deleteAppById',function(req,res){
        res.append("Access-Control-Allow-Origin","*");
        var sql = `delete from app where appid = ${req.body.appid}`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })

    app.post('/app/addApp',function(req,res){
        res.append("Access-Control-Allow-Origin","*");
        var sql = `insert into app (userid,ticketid,time) values(${req.body.userid},${req.body.ticketid},now())`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })
}