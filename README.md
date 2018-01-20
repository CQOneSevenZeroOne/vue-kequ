# vue-kequ
This is a tourism project written in Vue

# 后台服务器
url:http://10.40.153.145:8888/

# 验证码篇

### 发送验证码
url:http://10.40.153.145:8888/sendMessage

data:{phone:string}

return Value:'success'   || 'err'

注:开放测试号码为['17623085842','15023142476','17689939887']

发送成功后返回的值可能有出入,麻烦console一下

### 短信验证
url:http://10.40.153.145:8888/validate

data:{phone:string,code:string}

return Value:'success'   || 'err'


注:短信验证有效时间为5分钟

# ticket篇

### 获取所有ticket
url:http://10.40.153.145:8888/ticket/getAllTickets

data:{}

return Value:[{}]   || 'err'

### 获取所有ticket以及预约状态
url:http://10.40.153.145:8888/ticket/getAllTicketsAndApp

data:{}

return Value:{tickets:[{}],apps:[{}]}   || 'err'

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

return Value:{id}   || 'err'

### 个人用户登录（验证码登录）
url:http://10.40.153.145:8888/login/code

data:{phone:string,code:string}

return Value:{id}   || 'err'

### 通过id查询个人用户号码
url:http://10.40.153.145:8888/user/getPhoneById

data:{id:number}

return Value:  string(phoneNumber)   || 'err'

### 通过id查询个人用户信息
url:http://10.40.153.145:8888/user/getInfoById

data:{id:number}

return Value:  string(phoneNumber)   || 'err'

### 修改个人用户密码（传入手机号和密码和手机验证码）
url:http://10.40.153.145:8888/user/changePwdById

data:{phone:string,password:string,code:string}

### 修改公司企业用户密码（传入手机号和密码和手机验证码）
url:http://10.40.153.145:8888/usercs/changePwdById

data:{phone:string,password:string,code:string}

return Value:  'success'   || 'err'


### 修改个人用户手号码,默认先更新个人用户，个人用户不存在这个号码时才更新公司企业用户（传入旧手机号和新手机和手机验证码）
url:http://10.40.153.145:8888/user/changePhone

data:{phone:string,newphone:string,code:string}

return Value:  'success'   || 'err'

### 企业以及公司用户登录
url:http://10.40.153.145:8888/login/usercs

data:{phone:string,password:string}

return Value:'success'   || 'err'

### 个人用户注册
url:http://10.40.153.145:8888/register/userp

data:{phone:string,password:string,code:string}

return Value:'success'   || 'err'

### 企业用户注册
url:http://10.40.153.145:8888/register/usercs

data:{phone:string,password:string,name:string}

return Value:'success'   || 'err'

### 修改个人资料（个人用户）
url:http://10.40.153.145:8888/user/update

data:{id:number,phone:string,password:string,name:string,birth:string,sex:string}

return Value:'success'   || 'err'

### 修改个人密码（个人用户）
url:http://10.40.153.145:8888/user/updatepwd

data:{id:number,password:string,newpwd:string}

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