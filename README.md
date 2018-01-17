# vue-kequ
This is a tourism project written in Vue

# 后台服务器
url:http://10.40.153.145:8888/


# ticket篇

## 获取所有ticket
url:/ticket/getAllTickets

data:{}

return Value:[{}]   || 'err'


## 通过id查找ticket
url:/ticket/getTicketById

data:{id}

return Value:{}   || 'err'


## 通过id修改ticket (只能更新title，price,time)
url:/ticket/updateTicket

data:{id,title,price,time}

return Value:'success'   || 'err'

## 新增ticket (包含图片像上传)
url:/ticket/addTicket

data:{title,price,time}

return Value:'success'   || 'err'