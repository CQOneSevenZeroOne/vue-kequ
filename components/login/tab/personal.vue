<template>
 <div>
      <div class="loginmsg">
         <div class="cell">
            <label>手机号</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入手机号" v-model="personalphone"  @blur="blurinput">
            </div>
         </div>
         <div class="cell">
            <label>验证码</label>
            <div class="input">
               <input type="text" placeholder="请输入验证码" v-model="personalcode"  @blur="blurinput">
            </div>
            <div class="getcode" @click="getcode">
               <a href="#"  v-text="getnum">获取验证码</a>
            </div>
         </div>
         <div class="cell">
            <label>密码</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入密码" v-model="personalpwd" @blur="blurinput">
            </div>
         </div>
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

</style>
<script>
import $ from "jquery"
 export default{
   data(){
    return{
      personalphone:this.$store.state.personalphone,
      personalpwd:this.$store.state.personalpwd,
       personalcode:this.$store.state.personalcode,
       getnum:"获取验证码"
    }
   },
   methods:{
    blurinput:function(){
      this.$store.state.personalphone=this.personalphone;
      this.$store.state.personalpwd=this.personalpwd;
      this.$store.state.personalcode=this.personalcode;
      this.$store.state.pisshow=this.pisshow;
    },
    getcode:function(){
       var self=this;
        var number = 60;
       this.timer=setInterval(function(){
         number--;
         self.getnum = number+"秒后获取"
       },1000)
        $.ajax({
         url:"http://10.40.153.145:8888/sendMessage",
         type:"post",
         data:{
            phone:this.phone
          },
         success:function(data){
           console.log(data);
         }
       })
      
     }
   }
  
 }
</script>