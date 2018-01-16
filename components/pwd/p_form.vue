<template>
  <div>
      <ul>
          <li>
              <span>原密码</span>
              <input type="text" placeholder="输入您现在的密码">
              <span></span>
          </li>
          <li>
              <span>验证码</span>
              <input type="text" placeholder="输入验证码">
              <a>获取验证码</a>
          </li>
          <li>
              <span>新密码</span>
              <input type="text" placeholder="输入新的的密码">
          </li>
      </ul>
  </div>
</template>
<style scoped>
    li{
        width: 100%;
        /* margin-left: 0.25rem; */
         height: 0.9rem;
        border-bottom: 1px solid #f2f2f2;
        display: flex;
        align-items: center;
        padding-left: 0.3rem;
    }
    li:last-of-type{
        border:0;
    }
    span{
        font-size: 0.27rem;
        color: #191919;
       
    }
    input{
         margin-left: 0.6rem;
         box-sizing: border-box;
        flex: 1;
        color: #8a8a8a;
        border: 0;
        height: 0.8rem;
        margin-right: 0.1rem;
    }
    a{
        padding: 0.25rem;
        color: #0094a3;
        background: #f4f4f4;
        margin-right: 0.25rem;
        font-size: 0.22rem;

    }
</style>
