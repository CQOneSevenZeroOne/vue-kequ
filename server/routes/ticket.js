module.exports.listenTicket = function(app,conn){
    app.post('/ticket',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        conn.query('select * from app',function(err,result){
            if(err){
                console.log('err')
            }else{
                console.log(result)
            }
        })
    })
}