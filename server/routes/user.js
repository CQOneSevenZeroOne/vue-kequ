module.exports.listen = function(app,conn){
    app.post('/login/userp',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        var sql = `select * from user_p where phone = '${req.body.phone}'`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('fail')
            }else{
                if(result.length != 0 ){
                    if(req.body.password==result[0].pwd){
                        var obj = {};
                        obj.id = result[0].id;
                        res.send(obj)
                    }else{
                        res.send('fail');
                    }
                }else{
                    res.send('fail');
                }
            }
        })
    })

    app.post('/login/code',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        var sql = `select * from validate where phone = '${req.body.phone}'`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('fail')
            }else{
                if(result.length != 0 ){
                    if(req.body.code==result[0].code){
                        conn.query(`select * from user_p where phone = '${req.body.phone}'`,function(err,result){
                            if(err){
                                res.send('err')
                            }else{
                                if(result.length!=0){
                                    var obj = {};
                                    obj.id = result[0].id;
                                    res.send(obj)
                                }
                            }
                        })
                    }else{
                        res.send('fail');
                    }
                }else{
                    res.send('fail');
                }
            }
        })
    })

    app.post('/login/usercs',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        var sql = `select * from user_c_s where phone = '${req.body.phone}'`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('fail')
            }else{
                if(result.length != 0 ){
                    if(req.body.password==result[0].pwd){
                        res.send('success')
                        return;
                    }
                }
                res.send('fail');
                
            }
        })
    })

    app.post('/register/userp',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        var info = req.body ;
        conn.query(`select * from validate where phone = '${info.phone}'`,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                    if(info.code==result[0].code){
                        var sql = `insert into user_p(phone,pwd,name,birth,sex) values('${info.phone}','${info.password}','手机用户${info.phone}',now(),'男')`;
                        console.log(sql);
                        conn.query(sql,function(err,result){
                            if(err){
                                res.send('err')
                            }else{
                                res.send('success');
                            }
                        })
                    }else{
                        res.send('err')
                    }
                }else{
                    res.send('err')
                }
            }
        })
        
    })

    app.post('/register/usercs',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        var info = req.body ;
        var sql = `insert into user_c_s(phone,pwd,name,contact,address) values('${info.phone}','${info.password}','${info.name}','手机用户${info.phone}','未编辑')`;
        console.log(sql);
        conn.query(sql,function(err,result){
            if(err){
                res.send('fail')
            }else{
                res.send('success');
            }
        })
    })

    app.post('/user/update',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        var sql = `update user_p set phone = '${req.body.phone}' , pwd = '${req.body.password}' , name = '${req.body.name}' , birth = '${req.body.birth}' , sex = '${req.body.sex}' where id = ${req.body.id}`;
        console.log(sql)
        conn.query(sql,function(err){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })

    app.post('/usercs/update',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        var sql = `update user_c_s set phone = '${req.body.phone}' , pwd = '${req.body.password}' , name = '${req.body.name}' , address = '${req.body.address}' , contact = '${req.body.contact}' where id = ${req.body.id}`;
        console.log(sql)
        conn.query(sql,function(err){
            if(err){
                res.send('err')
            }else{
                res.send('success')
            }
        })
    })

    app.post('/user/updatepwd',(req,res)=>{
        res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from user_p where id = ${req.body.id}`,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                    if(result[0].pwd==req.body.password){
                        var sql = `update user_p set pwd = '${req.body.newpwd}' where id = ${req.body.id}`;
                        console.log(sql)
                        conn.query(sql,function(err){
                            if(err){
                                res.send('err')
                            }else{
                                res.send('success')
                            }
                        })
                    }else{
                        res.send('err')
                    }
                }else{
                    res.send('err')
                }
            }
        })

       
    })

    app.post('/user/getPhoneById',function(req,res){
        res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from user_p where id = ${req.body.id}`,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                    res.send(result[0].phone)
                }else{
                    res.send('err')
                }
            }
        })
    })

    app.post('/user/changePwdById',function(req,res){
        res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from validate where phone = '${req.body.phone}'`,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                   if(result[0].code==req.body.code){
                       conn.query(`update user_p set pwd = '${req.body.password}' where phone = '${req.body.phone}'`,function(err,result){
                            if(err){
                                res.send('err')
                            }else{
                                res.send('success')
                            }
                       })
                   }
                }else{
                    res.send('err')
                }
            }
        })
    })

    app.post('/usercs/changePwdById',function(req,res){
        res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from validate where phone = '${req.body.phone}'`,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                   if(result[0].code==req.body.code){
                       conn.query(`update user_c_s set pwd = '${req.body.password}' where phone = '${req.body.phone}'`,function(err,result){
                            if(err){
                                res.send('err')
                            }else{
                                res.send('success')
                            }
                       })
                   }
                }else{
                    res.send('err')
                }
            }
        })
    })

    app.post('/user/changePhone',function(req,res){
        res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from validate where phone = '${req.body.phone}'`,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                   if(result[0].code==req.body.code){
                       conn.query(`select * from user_p where phone = '${req.body.phone}'`,function(err,result){
                            if(err){
                                res.send('err')
                            }else{
                                if(result.length!=0){
                                    conn.query(`update user_p set phone = '${req.body.newphone}' where phone = '${req.body.phone}'`,function(err,result){
                                        if(err){
                                            res.send('err')
                                        }else{
                                            res.send('success')
                                        }
                                    })
                                }else{
                                    conn.query(`update user_c_s set phone = '${req.body.newphone}' where phone = '${req.body.phone}'`,function(err,result){
                                        if(err){
                                            res.send('err')
                                        }else{
                                            res.send('success')
                                        }
                                    })
                                }
                            }
                       })
                   }
                }else{
                    res.send('err')
                }
            }
        })
    })

    app.post('/user/getInfoById',function(req,res){
        res.append("Access-Control-Allow-Origin","*");
        conn.query(`select * from user_p where id = ${req.body.id}`,function(err,result){
            if(err){
                res.send('err')
            }else{
                res.send(result)
            }
        })
    })
}