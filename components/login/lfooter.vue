<template>
 <div>
      
    <div class="hint">
       <div class="success" v-show="alert">
          登陆成功
       </div>
       <div class="success" v-show="aalert">
          手机号或密码错误！
       </div>
       <div class="forgetpwd">
           <a href="#/resetpwd">
              忘记密码？
           </a>
       </div>
     </div>
  <div class="button">
            <div class="btnlogin" @click="login">
               <input type="submit" value="登录">
            </div>
            <div class="btnlogin regest" @click="regest">
               <input type="submit" value="注册">
            </div>
      </div>
  </div>
</template>
<style scoped>
.hint{margin-top:0.3rem;height:0.8rem;display:flex;justify-content:flex-end;align-items:center}
.forgetpwd a{font-size:0.34rem;color:#0094a3}
.success{width:2.8rem;height:0.8rem;background-color:#727171;color:#fff;text-align:center;line-height:0.8rem;border-radius:0.1rem;font-size:0.3rem}
.button{margin:1.2rem 0 2rem;}
.button .btnlogin{height:1rem;font-size:0.32rem;color:#fff;background-color:#0094a3;text-align:center;margin-bottom:0.5rem;border-radius:0.1rem}
.btnlogin input{height:100%;font-size:0.32rem;color:#fff;background-color:#0094a3;line-height:1rem;text-align:center;border:none;outline:none;font-family:"微软雅黑"}
.button .regest{height:1rem;font-size:0.32rem;background-color:#fff;text-align:center;margin-bottom:0.5rem;border-radius:0.1rem}
.button .regest input{font-size:0.32rem;line-height:1rem;text-align:center;border:none;outline:none;background-color:#fff;color:#0094a3;width:100%;border-radius:0.1rem}
</style>
<script>
var url = location.href;
var arr = url.split("#");
import $ from "jquery";
export default{
	data(){
	 return{
     alert:false,
     aalert:false
	 }
	},
	methods:{
      login:function(){
      console.log(this.$store.state.typeid)
         var self = this;
         if(this.$store.state.typeid==0){
            $.ajax({
              url:"http://10.40.153.145:8888/login/code",
              type:"post",
              data:{
                phone:this.$store.state.loginphone,
                code:this.$store.state.loginpwd
              },
              success:function(data){
               if(data=="fail"){
                self.aalert=true;
               setTimeout(function(){self.aalert=false;},2000)
             }
          else{
              self.$store.state.loginid = data.id;
              self.alert=true;
              setTimeout(function(){window.location.href = arr[0]+"#/index/home";},1000)
                }
              }
            })
          }
         if(this.$store.state.typeid==1){
             $.ajax({
          type:"post",
          data:{
            phone:this.$store.state.loginphone,
            password:this.$store.state.loginpwd
          },
          url:"http://10.40.153.145:8888/login/userp",
          success:function(data){
          if(data=="fail"){
              self.aalert=true;
              setTimeout(function(){self.aalert=false;},2000)
          }
          else{
            self.$store.state.loginid = data.id;
            self.alert=true;
            setTimeout(function(){window.location.href = arr[0]+"#/index/home";},1000)
            
              }
            }
          })
         }   
      },
      regest:function(){
         window.location.href=arr[0]+"#/regest/personal"
      }
},
    computed:{
      loginid:function(){
       return this.$store.state.loginid;
      }
   }
}
 
</script>