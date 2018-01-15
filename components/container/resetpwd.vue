<template>
<div class="resetpwd">
   <span>
        <i><</i>
      <h4>重置密码</h4>
   </span>
   <form>
      <div class="pwdmsg">
         <div class="cell">
            <label>手机号</label>
            <div class="input">
               <input type="text" placeholder="请输入手机号">
            </div>
         </div>
         <div class="cell">
            <label>验证码</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入验证码">
            </div>
            <div class="getcode">
               <a href="#">获取验证码</a>
            </div>
         </div>
          <div class="cell">
            <label>密码</label>
            <div class="input">
               <input type="text" placeholder="请设置新密码">
            </div>
         </div>
       </div>
         <div class="button">
            <div class="btnlogin">
               <input type="submit" value="保存并返回">
            </div>
      </div>
   </form>
</div>
</template>
<style>
html {height:100%}
body{background-image:url("../../image/back.jpg");background-repeat:no-repeat;background-size:cover}
 .resetpwd{width:100%;height:100%; }
 .resetpwd>span{height:2.4rem;text-align:center;line-height:2.4rem;color:#fff;position:relative;margin:0 0.7rem;display:block}
  .resetpwd>span i{position:absolute;left:0;font-size:0.5rem}
 .resetpwd>span h4{font-size:0.45rem;color:#fff;font-weight:normal}
 .resetpwd form{font-size:0.28rem;margin:0 0.7rem }
 .pwdmsg {border-radius:0.1rem;background-color:#ececec}
 .pwdmsg .cell{height:1.03rem;display:flex;justify-content:space-between;align-items:center;}
 .pwdmsg .cell label{width:25%;text-align:center;color:#484848;}
 .pwdmsg .cell .input{width:44%;}
 .pwdmsg .getcode a{font-size:0.26rem;color:#0094a3;width:1.8rem;height:0.8rem;line-height:0.83rem;text-align:center;background-color:#fff;border-radius:0.1rem;display:block;margin-right:0.1rem}
 .pwdmsg .cell input{width:100%;border:none;outline:none;height:0.8rem;line-height:0.9rem;font-size:0.26rem;background-color:#ececec}
 .inpucode{flex:1;margin-right:1rem;}
 .button{margin:1.3rem 0 5rem;}
.button .btnlogin{height:1rem;font-size:0.32rem;color:#fff;background-color:#0094a3;text-align:center;margin-bottom:0.5rem;border-radius:0.1rem}
.btnlogin input{height:100%;font-size:0.32rem;color:#fff;background-color:#0094a3;line-height:1rem;text-align:center;border:none;outline:none;font-family:"微软雅黑"}
</style>
<script>

<script>