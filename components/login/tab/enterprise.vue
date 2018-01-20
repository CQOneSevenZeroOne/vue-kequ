<template>
 <div class="enterprise">
      <div class="loginmsg">
         <div class="cell">
            <label>企业名称</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入企业名称" v-model="compny">
            </div>
         </div>
        <div class="cell">
            <label>手机号</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入手机号" v-model="personalphone">
            </div>
         </div>
         <div class="cell">
            <label>座机号</label>
            <div class="inpucode">
                <input type="text" placeholder="请输入密码" v-model="personalpwd">
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
<style scoped>
.enterprise{position:relative;width:100%;}
 .loginmsg {border-radius:0.1rem;background-color:#ececec;}
 .loginmsg .cell{height:1.03rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #dadada;margin:0 0.1rem}
 .loginmsg .cell label{width:25%;text-align:center;color:#484848;}
 .loginmsg .cell .input{width:44%;}
 .loginmsg .getcode a{font-size:0.3rem;color:#0094a3;width:1.8rem;height:0.8rem;line-height:0.83rem;text-align:center;background-color:#fff;border-radius:0.1rem;display:block;margin-right:0.1rem}
 .loginmsg .cell input{width:100%;border:none;outline:none;height:0.8rem;line-height:0.9rem;font-size:0.3rem;background-color:#ececec}
 .inpucode{flex:1;margin-right:1rem;}
 .agree{font-size:0.28rem;color:#0094a3;margin-top:0.3rem;text-align:center}
.agree a{font-size:0.28rem;color:#e0e0e0;}
.btn{margin:0.5rem 0.7rem 0;padding-bottom:0.65rem}
.btn button{width:100%;height:0.7rem;line-height:0.7rem;text-align:center;background-color:#0094a3;color:#fff;border:none;outline:none;border-radius:0.1rem;font-size:0.36rem}
</style>
<script>
 export default{
   data(){
    return{
      personalphone:"",
      personalpwd:"",
      compny:""
    }
   },
   methods:{
    blurinput:function(){
       this.$store.state.personalphone=this.personalphone;
      this.$store.state.personalpwd=this.personalpwd;
      this.$store.state.compny=this.compny;
    }
   }
 }
</script>