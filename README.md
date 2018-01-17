# vue-kequ
This is a tourism project written in Vue

# 后台服务器
url:http://10.40.153.145:8888/


# ticket篇

## 获取所有ticket
url:http://10.40.153.145:8888/ticket/getAllTickets

data:{}

return Value:[{}]   || 'err'


## 通过id查找ticket
url:http://10.40.153.145:8888/ticket/getTicketById

data:{id:int}

return Value:{}   || 'err'

# user篇

## 个人用户登录
url:http://10.40.153.145:8888/login/userp

data:{phone:string,password:string}

return Value:'success'   || 'err'

## 企业以及公司用户登录
url:http://10.40.153.145:8888/login/usercs

data:{phone:string,password:string}

return Value:'success'   || 'err'

## 个人用户注册
url:http://10.40.153.145:8888/register/userp

data:{phone:string,password:string}

return Value:'success'   || 'err'

## 企业用户注册
url:http://10.40.153.145:8888/register/usercs

data:{phone:string,password:string,name:string}

return Value:'success'   || 'err'