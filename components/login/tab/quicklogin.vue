 <template>
 <div>
  <div class="loginmsg">
     <div class="cell">
        <label>手机号</label>
        <div class="input">
           <input type="text" placeholder="请输入手机号" v-model="phone" @blur="blur">
        </div>
        <div class="getcode" @click="getcode">
           <a href="#" v-text="getnum"></a>
        </div>
     </div>
     <div class="cell">
        <label>验证码</label>
        <div class="inpucode">
            <input type="text" placeholder="请输入验证码"  v-model="pwd" @blur="blur">
        </div>
     </div>
   </div>
  </div>
 </template>
 <style>
 .loginmsg {border-radius:0.1rem;background-color:#ececec}
 .loginmsg .cell{height:1.03rem;display:flex;justify-content:space-between;align-items:center;}
 .loginmsg .cell label{width:25%;text-align:center;color:#484848;}
 .loginmsg .cell .input{width:44%;}
 .loginmsg .getcode a{font-size:0.26rem;color:#0094a3;width:1.8rem;height:0.8rem;line-height:0.83rem;text-align:center;background-color:#fff;border-radius:0.1rem;display:block;margin-right:0.1rem}
 .loginmsg .cell input{width:100%;border:none;outline:none;height:0.8rem;line-height:0.9rem;font-size:0.26rem;background-color:#ececec}
 .inpucode{flex:1;margin-right:1rem;}
 </style>
 <script>
 import $ from "jquery";
 export default{
   data(){
   return{
        phone:"",
        pwd:"",
        getnum:"获取验证码",
        timer:null
     }
   },
   methods:{
     blur:function(){
       this.$store.state.loginphone = this.phone
       this.$store.state.loginpwd = this.pwd
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
   },
   computed:{
      loginphone:function(){
      return this.$store.state.loginphone;
      return this.$store.state.loginpwd ;
      }
   }
 }
 </script>