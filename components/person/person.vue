<template>
	<div id="person">
		<div id="header">
			<a href="##"><img src="../../image/home.png"/></a>
			<h1>用户中心</h1>
			<a href="##"><img src="../../image/more.png"/></a>
		</div>
		<div id="login">
			<div id="head">
				<img src="../../image/head.png"/>
			</div>
			<a href="##" class="login">登录</a>
			<a href="##" class="regester">注册</a>
		</div>
		<div class="fen"></div>
		<div id="gift">
			<h6>我的礼物</h6>
			<div id="ma">
				<input type="text" placeholder="请输入您的礼品兑换码" /><a href="##">立即查看</a>
			</div>
		</div>
		<div class="fen"></div>
		<div id="centent">
			<h6>我的预约</h6>
			<ul id="mine">
				<li v-for="i in data">
					<img :src="i.img"/>
					<div class="xq">
						<h5>{{i.title}}</h5>
						<span>门票</span>
						<p>有效期：{{i.time | moment}}</p>
					</div>
					<a href="#/ticket" class="ticket" @click="sendid">门票二维码</a>
				</li>
			</ul>
		</div>
	</div>
		
</template>

<script>
	// import ticket from "./ticket.vue";
	// import change from "./change.vue";
	import $ from 'jquery'
	import moment from 'moment'
	
	export default {
		data(){
			return {
				data:''
			}
		},
		filters: {
			moment:function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD';
    return moment(value).format(formatString);
}
		},
		methods:{
			sendid:function(){
				this.$store.state.ticket
			}
		},
		mounted:function(){
			var self = this
			$.ajax({
				url:"http://10.40.153.145:8888/app/getAllAppById",
				type:"post",
				data:{
					userid:"1"
				},
				success:function(data){
					console.log(data)
					self.data=data
				}
			})
		}
	}
</script>

<style>
	#person{display: flex;flex-direction:column ;height: 100%;}
	#person>#header{height: 0.9rem;display:flex;justify-content:space-between;box-sizing: border-box;padding: 0 0.3rem;background: #0094A3;}
	#header>a{display: inline-block;width: 0.46rem;height: 0.46rem;vertical-align: top;margin-top: 0.22rem; }
	#person h1{font-size: 0.36rem;display: inline-block;vertical-align: top;margin-top:0.24rem;color: #fff;font-weight: normal;}
	#login{height: 1.8rem;display: flex;flex-direction: row;box-sizing: border-box;padding: 0 0.3rem;}
	#head{width: 1.2rem;height: 1.2rem;border-radius: 50%;background: #E5E5E5;margin-top:0.3rem;margin-right:0.3rem;}
	#head>img{width: 0.82rem;height: 0.98rem;display: block;margin: 0.1rem auto;}
	#login>a{display: inline-block;width: 2rem;height: 0.9rem;margin:0.45rem 0.3rem;font-size:0.3rem;line-height: 0.9rem;text-align: center;border-radius: 0.1rem;}
	.login{background: #0094A3;color: #fff;}
	.regester{color:#0094A3;background: #F4F4F4;}
	.fen{background: #EBEBEB;height: 0.2rem;}
	#gift{height: 2rem;box-sizing: border-box;padding:0 0.3rem;}
	#person h6{font-size: 0.3rem;font-weight: normal;margin:0.23rem 0;color: #0094A3;}
	#ma>a{font-size: 0.3rem;display: inline-block;height: 0.76rem;width: 1.8rem;position: absolute;right: 0;text-align: center;color: #fff;background: #0094A3;}
	#ma>input{outline: none;border: 0;position: absolute;height: 0.76rem;width: 5.1rem;border-radius: 0.1rem;font-size: 0.3rem;color: #FFFFFF;text-indent:0.3rem}
	#ma{height: 0.8rem;position: relative;box-sizing: border-box;border: 0.02rem solid #0094A3;border-radius: 0.1rem;line-height: 0.76rem;}
	#centent{display: flex;flex-direction: column;}
	#centent>h6{height: 0.8rem;box-sizing: border-box;padding: 0 0.3rem;border-bottom: 0.01rem solid #EEEEEE;}
	#centent>#mine{flex:1}
	#mine>li{height: 1.9rem;display: flex;flex-direction: row;box-sizing: border-box;
	padding: 0 0.3rem;}
	#mine>li>img{height: 1.5rem;width: 2.1rem;margin-top:0.2rem;margin-right: 0.35rem;}
	.xq>h5{font-size: 0.3rem;font-weight: normal;margin-top:0.2rem;color: #6C6C6C;}
	.xq>span{display:block;font-size: 0.16rem;color: #FF631F;border:0.01rem solid #FF631F;border-radius: 0.04rem;margin-top:0.1rem;width: 0.6rem;text-align: center;}
	.xq>p{font-size:0.26rem;margin-top:0.3rem;color: #6C6C6C;}
	.ticket{font-size: 0.24rem;display: inline-block;width: 1.4rem;height: 0.5rem;background:#0094A3 ;color: #fff;line-height: 0.5rem;text-align: center;border-radius: 0.1rem;
	margin-left: 0.5rem;margin-top: 0.5rem;}
</style>
