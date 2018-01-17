<template>
 <div class="enterprise">
      <div class="loginmsg">
         <div class="cell">
            <label>企业名称</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入企业名称">
            </div>
         </div>
        <div class="cell">
            <label>手机号</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入手机号">
            </div>
         </div>
         <div class="cell">
            <label>座机号</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入座机号 (选填)">
            </div>
         </div>
       </div>
       <div class="agree">
          注册表明同意
           <a href="#">
            《可去用户守则》
           </a>
       </div>
       <div class="back">
	         <div class="sucess">
	            <span>提交成功</span>
	            <div class="msg">
	               <div class="pic"><img src="../../../image/prompt.jpg"></div>
	               <p>
	                 我们的工作人员将会在三个工作日内为您审核，请耐心等待！
	               </p>
	            </div>
	            <div class="btn">
	               <button type="button">返回主页</button>
	            </div>
	         </div>
        </div>
   </div>
</template>
<style>
.enterprise{position:relative;width:100%;}
 .loginmsg {border-radius:0.1rem;background-color:#ececec;}
 .loginmsg .cell{height:1.03rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #dadada;margin:0 0.1rem}
 .loginmsg .cell label{width:25%;text-align:center;color:#484848;}
 .loginmsg .cell .input{width:44%;}
 .loginmsg .getcode a{font-size:0.3rem;color:#0094a3;width:1.8rem;height:0.8rem;line-height:0.83rem;text-align:center;background-color:#fff;border-radius:0.1rem;display:block;margin-right:0.1rem}
 .loginmsg .cell input{width:100%;border:none;outline:none;height:0.8rem;line-height:0.9rem;font-size:0.3rem;background-color:#ececec}
 .inpucode{flex:1;margin-right:1rem;}
 .agree{font-size:0.28rem;color:#0094a3;margin-top:0.3rem;text-align:center}
.agree a{font-size:0.28rem;color:#e0e0e0;}
.back{width:100%;height:3rem;background-color:rgba(0,0,0,0.3);position:absolute;left:0;top:-1.45rem;z-index:5}
.sucess{background-color:#fff;border-radius:0.1rem;color:#484848;font-size:0.3rem;display:block;margin-top:0.3rem;padding-top:0.01rem;position:relative;z-index:6}
.sucess span{display:block;color:#fff;background-color:#0094a3;font-size:0.36rem;height:0.7rem;line-height:0.7rem;text-align:center;margin-top:0.25rem}
.sucess p{margin:0 0.7rem;color:#484848;line-height:0.5rem}
.sucess .msg .pic{width:0.7rem;height:0.7rem;overflow:hidden;margin:1rem  auto 0.5rem}
.btn{margin:0.5rem 0.7rem 0;padding-bottom:0.65rem}
.btn button{width:100%;height:0.7rem;line-height:0.7rem;text-align:center;background-color:#0094a3;color:#fff;border:none;outline:none;border-radius:0.1rem;font-size:0.36rem}
</style>