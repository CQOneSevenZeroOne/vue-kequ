# vue-kequ
This is a tourism project written in Vue

# 后台服务器
url:http://10.40.153.145:8888/


# ticket篇

### 获取所有ticket
url:http://10.40.153.145:8888/ticket/getAllTickets

data:{}

return Value:[{}]   || 'err'

### 获取自由行或者跟团游所有ticket
url:http://10.40.153.145:8888/ticket/getAllFreedomTickets

data:{type:'自由行'||'跟团游'}

return Value:[{}]   || 'err'


### 通过id查找ticket
url:http://10.40.153.145:8888/ticket/getTicketById

data:{id:number}

return Value:{}   || 'err'

# user篇

### 个人用户登录
url:http://10.40.153.145:8888/login/userp

data:{phone:string,password:string}

return Value:'success'   || 'err'

### 企业以及公司用户登录
url:http://10.40.153.145:8888/login/usercs

data:{phone:string,password:string}

return Value:'success'   || 'err'

### 个人用户注册
url:http://10.40.153.145:8888/register/userp

data:{phone:string,password:string}

return Value:'success'   || 'err'

### 企业用户注册
url:http://10.40.153.145:8888/register/usercs

data:{phone:string,password:string,name:string}

return Value:'success'   || 'err'

### 修改个人资料（个人用户）
url:http://10.40.153.145:8888/user/update

data:{id:number,phone:string,password:string,name:string,birth:string,sex:string}

return Value:'success'   || 'err'

### 修改个人资料（公司||景区用户）
url:http://10.40.153.145:8888/usercs/update

data:{id:number,phone:string,password:string,name:string,address:string,contact:string}

return Value:'success'   || 'err'


# app篇

### 查询个人的所有app
url:http://10.40.153.145:8888/app/getAllAppById

data:{userid:number}

return Value:[{}]   || 'err'

### 通过id更新app状态(取消预约)
url:http://10.40.153.145:8888/deleteAppById

data:{appid:number}

return Value:'success'   || 'err'

# gift篇

### 查询所有gift
url:http://10.40.153.145:8888/gift/getAllGift

data:{}

return Value:[{}]   || 'err'

### 通过礼品编号（num）查询gift
url:http://10.40.153.145:8888/gift/getGiftByNum

data:{num:number}

return Value:{}   || 'err'