<template>
    <div id="success" v-show="this.$store.state.ashow">
        <div id="success-layer">
            <h3 class="tip">预定成功</h3>
            <p><span>{{data.title}}</span>X<span>1</span></p>
            <p>您将在<span>2017-06-08</span>使用</p>
            <div>
                <a href="javascript:" @click="isnshow" class="stop">暂不使用</a>
                <a href="javascript:" @click="newyuyue" class="ojbk">确认</a>
            </div>
        </div>
    </div>
</template>
<style type="text/css">
	#success{width: 100%;height: 100%;background: rgba(0,0,0,0.5);position: absolute;top: 0;left: 0;}
	#success-layer{height: 3.8rem;width: 6rem;background: #fff;position: absolute;top: 50%;left: 50%;margin-top: -1.9rem;margin-left: -3rem;border-radius: 0.1rem;font-size: 0.3rem;
	text-align: center;}
	#success-layer .tip{width: 100%;height: 0.7rem;margin-top:0.27rem;text-align: center;background: #0094A3;font-size: 0.36rem;line-height: 0.7rem;color: #fff;}
	#success-layer p{margin: 0.2rem 0;}
	#success-layer a{display: inline-block;width: 2.2rem;height: 0.8rem;margin: 0 0.35rem;line-height: 0.8rem;border-radius: 0.08rem;margin-top:0.35rem}
	#success-layer span{color:#0094A3;}
	.stop{background: #EBEBEB;color:#0094A3}
	.ojbk{background: #0094A3;color:#fff;}
</style>
<script>
    import $ from 'jquery'
    export default {
        data(){
            return{
                data:''
            }
        },
        // mounted:function () {
        //     // var self = this
        //     // console.log(this.$store.state.ashow,self.cshow)
        //     // self.cshow = 
        // },
        mounted:function(){
            var self = this
            $.ajax({
                type:"post",
                url:"http://10.40.153.145:8888/ticket/getTicketById",
                data:{
                    id:this.$store.state.goodsid
                },
                success:function(data){
                    self.data=data
                }
            })
        },
        methods:{
            isnshow(){
                this.$store.state.ashow=false
            },
            newyuyue(){
                this.$store.state.ashow=false
                this.$store.state.bshow=true
                $.ajax({
                    url:"http://10.40.153.145:8888/app/addApp",
                    type:"post",
                    data:{
                        userid:this.$store.state.loginid,
                        ticketid:this.$store.state.goodsid
                    },
                    success(data){
                        console.log(data)
                    }
                })
            }
        }
    }
</script>
