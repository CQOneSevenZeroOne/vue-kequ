<template>
  <div id="bigbox">
      <ul>
          <li>
              <span class="name">景区名称</span>
              <span class="info">服务生答的温泉</span>
          </li>
          <li>
              <span class="name">手机号码</span>
              <span class="info">12345678910</span>
          </li>
          <li>
              <span class="name">座机号码</span>
              <span class="info">023-32454654</span>
          </li>
          <li>
              <span class="name">景区联系人</span>
              <span class="info">范德萨</span>
          </li>
          <li>
              <span class="name">景区地址</span>
              <span class="info">重庆南岸区五公里</span>
          </li>
      </ul>
      <div class="notic">信息不可修改，需要修改请联系客服人员</div>
      <div class="update">
          <span class="name">密码设置</span>
          <img src="../../image/c_right.jpg">
      </div>
      <div id="btn">退出登录</div>
  </div>
</template>
<style>
#btn{
    font-size: 0.24rem;
    color: #8a8a8a;
    background: #ffffff;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    margin-top: 0.2rem;
}
img{
    width: 0.18rem;
    height: 0.28rem;
}
.update{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.25rem 0 0.3rem;
    height: 0.9rem;
}
.notic{
    height: 0.45rem;
    background: #f4f4f4;
    color: #c4c4c4;
    font-size: 0.2rem;
    text-indent: 0.3rem;
    line-height: 0.45rem;
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
.info{
    color:#8a8a8a;
    font-size: 0.24rem;
}
</style>
