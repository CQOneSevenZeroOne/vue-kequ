<template>
<div class="resetpwd">
  
   <span>
        <i @click="backpre"><</i>
      <h4>重置密码</h4>
   </span>
   <form>
      <div class="pwdmsg">
         <div class="cell">
            <label>手机号</label>
            <div class="input">
               <input type="text" placeholder="请输入手机号" v-model="phone">
            </div>
         </div>
         <div class="cell">
            <label>验证码</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入验证码"  v-model="code">
            </div>
            <div class="getcode" @click="getcode" >
               <a href="#" v-text="getnum"></a>
            </div>
         </div>
          <div class="cell">
            <label>密码</label>
            <div class="input">
               <input type="text" placeholder="请设置新密码"  v-model="password">
            </div>
         </div>
       </div>
        <div class="success" v-show="alert">
          手机号未注册或验证码错误
      </div>
       <div class="success" v-show="aalert">
         修改成功
      </div>
         <div class="button">
            <div class="btnlogin" @click="save">
               <input type="submit" value="保存并返回">
            </div>
      </div>
   </form>
</div>
</template>
<style>
html {height:100%}
body{background-image:url("../../image/back.jpg");background-repeat:no-repeat;background-size:cover}
 .resetpwd{width:100%;height:100%; }
 .resetpwd>span{height:2.4rem;text-align:center;line-height:2.4rem;color:#fff;position:relative;margin:0 0.7rem;display:block}
  .resetpwd>span i{position:absolute;left:0;font-size:0.5rem}
 .resetpwd>span h4{font-size:0.45rem;color:#fff;font-weight:normal}
 .resetpwd form{font-size:0.28rem;margin:0 0.7rem }
 .pwdmsg {border-radius:0.1rem;background-color:#ececec}
 .pwdmsg .cell{height:1.03rem;display:flex;justify-content:space-between;align-items:center;}
 .pwdmsg .cell label{width:25%;text-align:center;color:#484848;}
 .pwdmsg .cell .input{flex:1}
 .pwdmsg .getcode a{font-size:0.26rem;color:#0094a3;width:1.8rem;height:0.8rem;line-height:0.83rem;text-align:center;background-color:#fff;border-radius:0.1rem;display:block;margin-right:0.1rem}
 .pwdmsg .cell input{width:100%;border:none;outline:none;height:0.8rem;line-height:0.9rem;font-size:0.26rem;background-color:#ececec}
 .inpucode{flex:1;}
 .button{margin:1.3rem 0 5rem;}
.button .btnlogin{height:1rem;font-size:0.32rem;color:#fff;background-color:#0094a3;text-align:center;margin-bottom:0.5rem;border-radius:0.1rem}
.btnlogin input{height:100%;font-size:0.32rem;color:#fff;background-color:#0094a3;line-height:1rem;text-align:center;border:none;outline:none;font-family:"微软雅黑"}
.success{width:4rem;height:1rem;background-color:#727171;color:#fff;text-align:center;line-height:0.8rem;border-radius:0.1rem;font-size:0.3rem;position:absolute;top:30%;left:23%}
</style>
<script>
var url = location.href;
var arr = url.split("#");
import $ from "jquery"
export default{
  data(){
  return{
    phone:"",
    password:"",
    code:"",
    getnum:"获取验证码",
    alert:false,
    aalert:false
  }
  },
  methods:{
   backpre:function(){
     window.history.go(-1); 
   },
   save:function(){
    var self=this;
    $.ajax({
      url:"http://10.40.153.145:8888/user/changePwdById",
      type:"post",
      data:{
        phone:this.phone,
        password:this.password,
        code:this.code
      },
      success:function(data){
        if(data=="success"){
         self.aalert=true;
         setTimeout(function(){
             window.location.href=arr[0]+"#/login/quicklogin"
           }
           ,2000)
         
        }
        else{
           self.alert=true;
           var _this=self;
           setTimeout(function(){
             _this.alert=false;
           }
           ,2000)
        }
      }
    })
   },
   getcode:function(){
       var self=this;
        var number = 60;
       this.timer=setInterval(function(){
         number--;
         self.getnum = number+"秒后获取";
         if(number<0){
           self.getnum ="获取验证码"
         }

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