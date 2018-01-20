<template>
 <div class="login">
   <span>
      <h4>会员登录</h4>
   </span>
   <div class="choose">
     <span v-for="list in title"  :class="{active:index==list.id}" @click="clicktitle(list.id)">
       <a :href="list.href" v-text="list.name">快捷登录</a>
     </span>
   </div>
</div>
</template>
<style scoped>
 .login{width:100%;height:100%;}
 .login>span{height:2.5rem;text-align:center;line-height:2.5rem;color:#fff;display:block}
 .login>span h4{font-size:0.45rem;color:#fff;font-weight:normal}
 .choose{margin:0 0.7rem 0.45rem;font-size:0.36rem;color:#848484;display:flex;justify-content: space-around;align-items:center;background-color:#fff;border-radius:0.1rem}
 .choose span{width:100%;height:1rem;display:block;line-height:1rem;text-align:center;}
 .login .choose .active a{background-color:#0094a3;color:#fff;border-radius:0.1rem;position:relative;z-index:2;display:block;}
 .choose span a{width:100%;height:100%;display:block;color:#484848}
</style>
<script>
 export default{
    data(){
      return{
        title:[{
         name:"快捷登录",
         href:"#/login/quicklogin",
         id:0
       },
       {
          name:"普通登录",
          href:"#/login/ordinary",
          id:1
       }
       ],
       addclass:false,
       index:0
      }
          },
      
    methods:{
      clicktitle:function(id){
         this.addclass=true;
         this.index=id;
         this.$store.state.typeid=id
      }
    },
     mounted:function(){
      this.$store.state.typeid=this.index;
   }
    

 }
</script>