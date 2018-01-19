module.exports.listen = function(app,conn){
    var smsClient = require('./message.js')
    var num = ['17623085842','15023142476','17689939887']
    console.log('start')
    app.post('/sendMessage',(req,response)=>{
        response.append("Access-Control-Allow-Origin","*");

        var randomNum = GetRandomNum(5);

        if(num.indexOf(req.body.phone)>=0){
            conn.query(`select * from validate where phone = '${req.body.phone}'`,function(err,result){
                if(err){
                    response.send('err')
                }else{
                    if(result.length==0){
                        console.log('send')
                        //发送短信
                        smsClient.sendSMS({
                            PhoneNumbers: req.body.phone,
                            SignName: '陈海超',
                            TemplateCode: 'SMS_122281214',
                            TemplateParam: `{"code":"${randomNum}"}`
                        }).then(function (res) {
                            let {Code}=res
                            if (Code === 'OK') {
                                //处理返回参数
                                console.log(res)
                                conn.query(`insert into validate values('${req.body.phone}','${randomNum}')`,function(err,result){
                                    if(err){
                                        response.send('err')
                                    }else{
                                        response.send('success send message');
                                        setTimeout(function(){
                                            conn.query(`delete  from validate where phone = '${req.body.phone}'`,function(err,result){
                                                if(err){
                                                    return
                                                }else{
                                                    console.log('delnum '+req.body.phone)
                                                }
                                            })
                                        },1200)
                                    }
                                })
                            }
                        }, function (err) {
                            //console.log(err)
                            response.send('err')
                        })
                    }else{
                        response.send('please five mintues send again')
                    }
                }
            })
                        
        }else{
            response.send('此号码暂不开放测试')
        }
    })

    app.post('/validate',function(req,res){
        res.append("Access-Control-Allow-Origin","*");
        var sql = `select * from validate where phone = '${req.body.phone}'`
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                    if(req.body.code==result[0].code){
                        res.send('success')
                    }else{
                        res.send('err')
                    }
                }else{
                    res.send('err')
                }
            }
        })
    })
}

function GetRandomNum(n){
    var num = '';
    for(var i = 0 ; i<n ; i++){
        num += parseInt(Math.random()*10) ;
    }
    return num ;
}