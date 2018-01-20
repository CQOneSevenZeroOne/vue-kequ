<template>
  <div>
   <div class="back" :style="{display:isshow?'block':'none'}">
           <div class="sucessa">
              <span>提交成功</span>
              <div class="msg">
                 <div class="pic"><img src="../../image/prompt.jpg"></div>
                 <p>
                   我们的工作人员将会在三个工作日内为您审核，请耐心等待！
                 </p>
              </div>
              <div class="btn">
                 <button type="button" @click="returnindex">返回主页</button>
              </div>
        </div>
    </div>
     <div class="sucess" :style="{display:pisshow?'block':'none'}">
          注册成功
       </div>
   <div class="button">
        <div class="btnlogin" @click="btnregest">
           <input type="submit" value="立即注册">
        </div>
        <div class="hascount">
          <a href="#/login/quicklogin">我有账号立即登录</a>
        </div>
   </div>
</div>
</template>
<style scoped>
.button{margin:1.2rem 0 2rem;}
.button .btnlogin{height:1rem;font-size:0.32rem;color:#fff;background-color:#0094a3;text-align:center;margin-bottom:0.5rem;border-radius:0.1rem}
.btnlogin input{height:100%;font-size:0.32rem;color:#fff;background-color:#0094a3;line-height:1rem;text-align:center;border:none;outline:none;font-family:"微软雅黑"}
.hascount{margin-top:0.5rem;text-align:center}
.hascount a{font-size:0.32rem;color:#0094a3}
.sucess{width:2.2rem;height:0.8rem;border-radius:0.1rem;background-color:rgba(152,152,152,0.6);color:#fff;line-height:0.8rem;text-align:center;font-size:0.3rem;display:block;position:absolute;left:50%;top:53%;margin-left:-1.1rem;}
.back{width:100%;height:100%;background-color:rgba(0,0,0,0.3);position:absolute;left:0;top:22%;z-index:5;}
.back .sucessa{background-color:#fff;border-radius:0.1rem;color:#484848;font-size:0.3rem;display:block;margin-top:0.3rem;padding-top:0.01rem;position:relative;z-index:6;margin:0 0.7rem}
.back .sucessa span{display:block;color:#fff;background-color:#0094a3;font-size:0.36rem;height:0.7rem;line-height:0.7rem;text-align:center;margin-top:0.25rem}
.back .sucessa p{margin:0 0.7rem;color:#484848;line-height:0.5rem}
.back .sucessa .msg .pic{width:0.7rem;height:0.7rem;overflow:hidden;margin:1rem  auto 0.5rem}
</style>
<script>
import $ from "jquery"
var url = location.href;
var arr =url.split("#");
 export default{
   data(){
      return{
        isshow:false,
        pisshow:false
      }
   },
   methods:{
    btnregest:function(){
    var self = this;
     if(this.$store.state.userid==0){
        $.ajax({
          url:"http://10.40.153.145:8888/register/userp",
          type:"post",
          data:{
            phone:this.$store.state.personalphone,
            password:this.$store.state.personalpwd,
            code:this.$store.state.personalcode
            },
          success:function(data){
            console.log(data);
             if(data=="success"){
               self.pisshow=true;
               var _this = self;
               setTimeout(function(){
               _this.pisshow=false;
               _this.$store.state.personalphone="";
               _this.$store.state.personalpwd="";
               console.log(_this.$store.state);
             },1000)
            }
          }

     })
     }
     if(this.$store.state.userid==1){
        $.ajax({
          url:"http://10.40.153.145:8888/register/usercs",
          type:"post",
          data:{
             phone:this.$store.state.personalphone,
             password:this.$store.state.personalpwd,
             name:this.$store.state.compny
           },
          success:function(data){
            console.log(data);
            if(data=="success"){
             self.isshow=true;

            }
            
          }
     })
     }
     if(this.$store.state.userid==2){
        $.ajax({
          url:"",
          type:"post",
          data:"",
          success:function(data){
            console.log(data);
          }
     })
     }
    },
    returnindex(){
      window.location.href=arr[0]+"#/index/home"
    }
   }
 }
</script>