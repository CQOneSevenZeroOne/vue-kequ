module.exports.listen = function(app,conn){

    app.post('/gift/getAllGift',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        var sql = `select * from gift,ticket where gift.ticketid = ticket.id`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result)
            }
        })  
    })

    app.post('/gift/getGiftByNum',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        var sql = `select * from gift,ticket where num = ${req.body.num} and gift.ticketid = ticket.id `;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                    res.send(result[0])
                }else{
                    res.send({});
                }
            }
        })  
    })
}