<template>
<div class="login">
   <span>
      <h4>会员登录</h4>
   </span>
   <div class="choose">
     <span class="active">
       快捷登录
     </span>
     <span>
       普通登录
     </span>
   </div>
   <form>
      <div class="loginmsg">
         <div class="cell">
            <label>手机号</label>
            <div class="input">
               <input type="text" placeholder="请输入手机号">
            </div>
            <div class="getcode">
               <a href="#">获取验证码</a>
            </div>
         </div>
         <div class="cell">
            <label>验证码</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入验证码">
            </div>
         </div>
       </div>
        <div class="hint">
           <div class="success">
              登陆成功
           </div>
           <div class="forgetpwd">
               <a href="#">
                  忘记密码？
               </a>
           </div>
         </div>
         <div class="button">
            <div class="btnlogin">
               <input type="submit" value="登录">
            </div>
            <div class="btnlogin regest">
               <input type="submit" value="注册">
            </div>
      </div>
   </form>
</div>
</template>
<style>
html {height:100%}
body{background-image:url("../../image/back.jpg");background-repeat:no-repeat;background-size:cover}
 .login{width:100%;height:100%; }
 .login>span{height:2.5rem;text-align:center;line-height:2.5rem;color:#fff;display:block}
 .login>span h4{font-size:0.45rem;color:#fff;font-weight:normal}
 .choose{margin:0 0.7rem 0.45rem;font-size:0.36rem;color:#848484;display:flex;justify-content: space-around;align-items:center;background-color:#fff;}
 .choose span{width:100%;height:1rem;display:block;line-height:1rem;text-align:center;}
 .login .choose .active{background-color:#0094a3;color:#fff;border-radius:0.1rem;position:relative;z-index:2;margin:0 -0.05rem}
 .login form{font-size:0.28rem;margin:0 0.7rem }
 .loginmsg {border-radius:0.1rem;background-color:#ececec}
 .loginmsg .cell{height:1.03rem;display:flex;justify-content:space-between;align-items:center;}
 .loginmsg .cell label{width:25%;text-align:center;color:#484848;}
 .loginmsg .cell .input{width:44%;}
 .loginmsg .getcode a{font-size:0.26rem;color:#0094a3;width:1.8rem;height:0.8rem;line-height:0.83rem;text-align:center;background-color:#fff;border-radius:0.1rem;display:block;margin-right:0.1rem}
 .loginmsg .cell input{width:100%;border:none;outline:none;height:0.8rem;line-height:0.9rem;font-size:0.26rem;background-color:#ececec}
 .inpucode{flex:1;margin-right:1rem;}
 .hint{margin-top:0.3rem;display:flex;justify-content:flex-end;align-items:center}
.forgetpwd a{font-size:0.34rem;color:#0094a3}
.button{margin:1.2rem 0 2rem;}
.button .btnlogin{height:1rem;font-size:0.32rem;color:#fff;background-color:#0094a3;text-align:center;margin-bottom:0.5rem;border-radius:0.1rem}
.btnlogin input{height:100%;font-size:0.32rem;color:#fff;background-color:#0094a3;line-height:1rem;text-align:center;border:none;outline:none;font-family:"微软雅黑"}
.button .regest{height:1rem;font-size:0.32rem;background-color:#fff;text-align:center;margin-bottom:0.5rem;border-radius:0.1rem}
.button .regest input{font-size:0.32rem;line-height:1rem;text-align:center;border:none;outline:none;background-color:#fff;color:#0094a3}
.success{width:2.7rem;height:0.8rem;background-color:#727171;color:#fff;text-align:center;line-height:0.8rem;border-radius:0.1rem;font-size:0.3rem}
</style>
<script>

</script>