<template>
    <div id="roadtime" v-show="this.$store.state.bshow" @click="isnshow">
        <div id="roadtime-layer">
            <h3 class="tip">提交成功</h3>
            <img src="../../image/warming.png" alt="">
            <p>我们的工作人员将会在24小时内确认您的预约信息，请留意您预留的手机号码，感谢！</p>
            <a href="#/person">返回个人中心</a>
        </div>
    </div>
</template>
<style type="text/css">
	#roadtime{width: 100%;height: 100%;background: rgba(0,0,0,0.5);position: absolute;top: 0;left: 0;}
	#roadtime-layer{width: 6rem;height: 7.95rem;background: #fff;position: absolute;top: 50%;left: 50%;margin-top: -3.8rem;margin-left: -3rem;border-radius: 0.1rem;font-size: 0.3rem;
	text-align: center;}
	#roadtime-layer .tip{width: 100%;height: 0.7rem;margin-top:0.27rem;text-align: center;background: #0094A3;font-size: 0.36rem;line-height: 0.7rem;color: #fff;}
	#roadtime-layer>img{width: 0.7rem;height: 0.7rem;display: block;margin:1rem auto 0.4rem;}
	#roadtime-layer>p{font-size:0.36rem;line-height: 0.65rem;width: 5rem;text-align:left;margin:0.2rem auto}
	#roadtime-layer>a{display: inline-block;line-height: 0.7rem;width: 5rem;border-radius: 0.1rem;color: #fff;background: #0094A3;margin-top:1.5rem}
</style>
<script>
    export default {
        methods:{
            isnshow:function(){
                this.$store.state.bshow=false
            }
        },
    }
</script>