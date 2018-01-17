<template>
	<div id="change">
		<div class="header">
			<img src="../../image/yjt.png"/>
			<h4>手机号码</h4>
		</div>
		<ul class="content">
			<li><span>原手机号</span><input type="text" id="" value="" placeholder="输入您现在的手机号"/></li>
			<li class="yzm"><span>验证码</span><input type="text" name="" id="" value="" placeholder="输入验证码"/><a href="##">获取验证码</a></li>
			<li><span>号码设置</span><input type="text" id="" value="" placeholder="输入新的手机号"/></li>
		</ul>
		<a href="##" id="save">保存</a>
	</div>
</template>

<script>
</script>

<style>
	#change{width: 100%;height: 100%;background: #F4F4F4;position: absolute;top: 0;left: 0;}
	#change>.header{height: 1rem;position: relative;background: #0094A3;}
	#change>.header>img{width: 0.16rem;height: 0.28rem;position: absolute;top: 0.3rem;left: 0.2rem;}
	#change>.header>h4{font-size: 0.3rem;color: #fff;line-height: 1rem;text-align: center;}
	#change>.content{margin-top:0.2rem;box-sizing: border-box;padding: 0 0.26rem;line-height: 0.9rem;font-size: 0.3rem;background: #fff;}
	#change>.content>li{height: 0.9rem;}
	#change>.content>li>span{display: inline-block;width: 1.55rem;}
	#change>.content>li>input{height: 0.5rem;outline: none;border: none;margin-bottom: 0.01rem;}
	.yzm{border-top:0.01rem solid #F4F4F4 ;border-bottom:0.01rem solid #F4F4F4 ;box-sizing: border-box;}
	.yzm>a{display: inline-block;width: 1.8rem;height: 0.7rem;margin:0.1rem auto;color:#0094A3;text-align: center;line-height: 0.7rem;background: #F4F4F4;border-radius: 0.1rem;margin-left: 0.2rem;}
	#change>a{display:block;width: 6.5rem;height: 0.9rem;background: #DADADA;text-align: center;line-height: 0.9rem;color:#fff;font-size: 0.3rem;margin:0.6rem auto;border-radius: 0.1rem;}
</style>