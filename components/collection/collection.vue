<template>
  <div id="collection">
        <div id="banner">
            <a href="##" class="jt"><img src="../../image/yjt.png" alt=""></a>
            <a href="##" class="share"><img src="../../image/share.png" alt=""></a>
            <div id="dian">
                <img src="../../image/picture.png" alt=""><span>1/3</span>
            </div>
            <ul id="swiper">
                <li><img src="../../image/list1.jpg" alt=""></li>
            </ul>
        </div>
        <div id="title">
            <h1>重庆游乐园</h1>
            <span>哀伤的萨达所</span>
            <span>奥术大师大</span>
        </div>
        <div id="fen"></div>
        <div id="content">
            <h6>免票政策</h6>
            <h6>身高1.2米以下儿童免费（仅免大门票）；</h6>
            <h6>70岁以上老人持身份证免费（仅免大门票）；</h6>
            <h6>现役军人持军官证免费（仅免大门票）。</h6>
            <h6>优惠政策：</h6>
            <h6>身高1.2--1.5米之间的儿童购景区优惠票；</h6>
            <h6>60--69岁之间老人持身份证购景区优惠票；</h6>
            <h6>全日制在校本科以及本科以下的学生持学生证购景区优惠票。上</h6>
            <h6>述优惠政策，需到景区自行购买。</h6>
     </div>
        <div id="footer">
            <a href="javascript:" id="server"><img src="../../image/server.png"/>客服</a>
            <a href="javascript:" @click="aisshow" id="yuding">立即预定</a>
        </div>
        <success></success>
        <roadtime></roadtime>
  </div>
</template>
<style scoped>
	#collection{display: flex;flex-direction: column;height: 100%;}
    #banner{height: 3.6rem;position: relative;display: flex;}
    .jt{position: absolute;left: 0.3rem;top:0.3rem;width: 0.2rem;height: 0.28rem;}
    #swiper{position: absolute;padding: 0;margin:0;width: 100%;height: 3.6rem;top: 0;left: 0;z-index: -1;}
    #swiper>li>img{width: 100%;height: 3.6rem;}
    #swiper>li{list-style: none;}
    #dian{position: absolute;bottom:0.6rem;right: 0.3rem;font-size: 0.28rem;color:#FFFFFF;background: rgba(0,0,0,0.5);border-radius:0.04rem ;z-index: 10;padding: 0.12rem 0.2rem;}
    #dian>img{width: 0.26rem;height: 0.26rem;display: inline-block;margin-right:0.1rem}
    .share{position: absolute;right: 0.3rem;top:0.3rem;width: 0.3rem;height: 0.3rem;}
    h1{font-size: 0.36rem;display: inline-block;vertical-align: top;line-height: 0.7rem;}
    #title{height: 0.7rem;box-sizing: border-box;padding: 0.05rem 0.3rem;padding: 0 0.3rem;}
    #title span{display: inline-block;font-size: 0.2rem;border:0.02rem solid #0094A3;border-radius:0.06rem;vertical-align: top;padding: 0 0.06rem;margin-top: 0.22rem;color:#0094A3;}
    #fen{height: 0.2rem;background: #EBEBEB;}
    #footer{height: 1rem;display: flex;font-size: 0.36rem;line-height: 1rem;border-top:0.01rem solid #BABABA;}
    #server{display: inline-block;width: 2.5rem;text-align: center;color: #484848;}
    #server>img{width: 0.34rem;height: 0.34rem;display: inline-block;margin:0 0.1rem}
    #yuding{flex:1;text-align: center;color:#fff;background: #0094A3;}
    #content{flex: 1;padding: 0.2rem 0.3rem;box-sizing: border-box;font-size: 0.24rem;color: #8E8E8E;line-height: 0.42rem;}
</style>
<script type="text/javascript">
	import roadtime from "./roadtime.vue";
    import success from "./success.vue";
	export default {
        // data(){
        //     return{
        //         // ashow:false
        //     }
        // },
        methods:{
            aisshow:function(){
                this.$store.state.ashow=true
            }
        },
	    components:{
            roadtime,
            success
	    }
	}
</script>

