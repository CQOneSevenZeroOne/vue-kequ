<template>
  <div id="bigbox">
      <ul>
          <li>
              <span class="name">用户名</span>
              <div class="box">
                  <span class="info">服务生答的温泉</span>
                  <img src="../../image/c_right.jpg">
              </div>
          </li>
          <li>
              <span class="name">手机号码</span>
              <div class="box">
                  <span class="info">12345678910</span>
                  <img src="../../image/c_right.jpg">
              </div>
          </li>
          <li>
              <span class="name">性别</span>
              <div class="box">
                  <span class="info">男</span>
              </div>
          </li>
          <li>
              <span class="name">生日</span>
              <div class="box">
                  <span class="info">2017-6-12</span>
              </div>
          </li>
          <li>
              <span class="name">密码设置</span>
              <div class="box">
                  <img src="../../image/c_right.jpg">
              </div>
          </li>
      </ul>
      <div id="btn">退出登录</div>
  </div>
</template>
<script>
    var $ = require('jquery')
    export default{
        data:function(){
            return {
                id:1,
                username:'',
                phone:'',
                sex:'',
                birth:''
            }
        },
        methods:{
            getInfo:function(){
                $.ajax({
                    type:'post',
                    url:''
                })
            }
        }
    }
</script>
<style scoped>
#btn{
    font-size: 0.24rem;
    color: #8a8a8a;
    background: #ffffff;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    margin-top: 0.2rem;
}
#bigbox{
    margin-top: 0.2rem;
    background: #ffffff;
}
li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    margin-left: 0.25rem;
    height: 0.9rem;
    padding-right: 0.25rem;
}
.name{
    color:#191919;
    font-size: 0.27rem;
    margin-left: 0.05rem;
}
.box{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.info{
    color:#8a8a8a;
    font-size: 0.24rem;
}
img{
    width: 0.18rem;
    height: 0.28rem;
    margin-left: 0.2rem;
}
</style>
