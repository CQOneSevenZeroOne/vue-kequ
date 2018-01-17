<template>
 <div>
      <div class="loginmsg">
         <div class="cell">
            <label>手机号</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入手机号">
            </div>
         </div>
         <div class="cell">
            <label>验证码</label>
            <div class="input">
               <input type="text" placeholder="请输入验证码">
            </div>
            <div class="getcode">
               <a href="#">获取验证码</a>
            </div>
         </div>
         <div class="cell">
            <label>密码</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入密码">
            </div>
         </div>
         <span class="sucess" >
          注册成功
         </span>
       </div>
       <div class="agree">
          注册表明同意
           <a href="#">
            《可去用户守则》
           </a>
       </div>
       
   </div>
</template>
<style>
 .loginmsg {border-radius:0.1rem;background-color:#ececec;position:relative}
 .loginmsg .cell{height:1.03rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #dadada;margin:0 0.1rem}
 .loginmsg .cell label{width:25%;text-align:center;color:#484848;}
 .loginmsg .cell .input{width:44%;}
 .loginmsg .getcode a{font-size:0.3rem;color:#0094a3;width:1.8rem;height:0.8rem;line-height:0.83rem;text-align:center;background-color:#fff;border-radius:0.1rem;display:block;margin-right:0.1rem}
 .loginmsg .cell input{width:100%;border:none;outline:none;height:0.8rem;line-height:0.9rem;font-size:0.3rem;background-color:#ececec}
 .inpucode{flex:1;margin-right:1rem;}
 .agree{font-size:0.28rem;color:#0094a3;margin-top:0.3rem;text-align:center}
.agree a{font-size:0.28rem;color:#e0e0e0;}
.sucess{width:2.2rem;height:0.8rem;border-radius:0.1rem;background-color:rgba(152,152,152,0.6);color:#fff;line-height:0.8rem;text-align:center;font-size:0.3rem;display:block;position:absolute;left:50%;top:53%;margin-left:-1.1rem;}
</style>