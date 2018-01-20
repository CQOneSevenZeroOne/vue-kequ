<template>
<div class="gift">
	 <span>
	 	<h4>兑换礼品</h4>
	 </span>
	 <form>
         <div class="cell">
            <label>礼品兑换码</label>
            <div class="input">
               <input type="text" placeholder="请输入手机号">
            </div>
         </div>
         <div class="cell">
            <label>手机号</label>
            <div class="input">
               <input type="text" placeholder="请输入手机号">
            </div>
         </div>
	 	<div class="cell">
            <label>验证码</label>
            <div>
                <input type="text" placeholder="请输入验证码">
            </div>
            <div class="getcode">
               <a href="#">获取验证码</a>
            </div>
         </div>
	 	<div class="code pull">
	 	   <button type="submit">立即领取</button>
	 	</div>
	 </form>
</div>
</template>
<style scoped>
 .gift>span{display:block;height:2.3rem;line-height:2.3rem;text-align:center}
.gift>span h4{font-size:0.44rem;font-weight:normal}
form{margin:0 0.7rem;font-size:0.26rem}
.gift .cell{height:1.03rem;display:flex;justify-content:space-between;align-items:center;background-color:#ececec;margin-bottom:0.4rem}
 .gift .cell label{width:35%;text-align:center;color:#484848;}
 .gift .cell .input{width:100%}
 .gift .getcode a{font-size:0.26rem;color:#0094a3;width:1.8rem;height:0.8rem;line-height:0.83rem;text-align:center;background-color:#fff;border-radius:0.1rem;display:block;margin-right:0.1rem}
 .gift .cell input{width:100%;border:none;outline:none;height:0.8rem;line-height:0.9rem;font-size:0.26rem;background-color:#ececec}
.pull{margin-top:0.9rem;height:1rem;}
.pull button{width:100%;height:100%;background-color:#0094a3;color:#fff;line-height:1rem;text-align:center;font-size:0.32rem;border-radius:0.1rem;border:0;outline: none;}
</style>