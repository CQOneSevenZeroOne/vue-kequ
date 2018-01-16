<template>
  <div id="bigbox">
      <ul>
          <li>
              <div class="box">
                  <span>原密码</span>
                  <input type="text" placeholder="输入您现在的密码">
              </div>
              <span></span>
          </li>
          <li>
              <div class="box">
                  <span>验证码</span>
                  <input type="text" placeholder="输入验证码">
              </div>
              <a>获取验证码</a>
          </li>
          <li>
              <div class="box">
                  <span>新密码</span>
                  <input type="text" placeholder="输入新的的密码">
              </div>
          </li>
      </ul>
      <div id="btn">保存</div>
  </div>
</template>
<style scoped>
    #bigbox{
        margin-top: 0.2rem;
    }
    #btn{
        font-size: 0.28rem;
        height: 0.9rem;
        background: #0094a3;
        color: #fff;
        margin: 0.6rem 0.48rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 0.06rem;
    }
    .box{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
    }
    li{
        
        height: 0.9rem;
        border-bottom: 1px solid #f2f2f2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 0.3rem;
        padding-right: 0.25rem;
    }
    li:last-of-type{
        border:0;
    }
    span{
        font-size: 0.27rem;
        color: #191919;
        word-break: keep-all;
    }
    input{
        margin-left: 0.4rem;
        color: #8a8a8a;
        border: 0;
        height: 0.8rem;
        margin-right: 0.1rem;
        width: 100%;
        text-indent: 0.2rem;
        font-size: 0.22rem;
        outline: none
    }
    a{
        padding: 0.25rem;
        color: #0094a3;
        background: #f4f4f4;
        margin-right: 0.25rem;
        font-size: 0.22rem;
        border-radius: 0.05rem;
        word-break: keep-all;
    }
</style>
