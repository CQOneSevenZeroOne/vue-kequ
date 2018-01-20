<template>
<div class="top">
  <span>
        <i @click="backpre"><</i>
      <h4>注册账号</h4>
   </span>
   <div class="choose">
     <span  v-for="list in tablist" :class="{active:list.index==aindex}" v-text="list.name" @click="changetab(list.index)">
     </span>
   </div>
 </div>
</template>
<style scoped>
 .top>span{height:2.45rem;text-align:center;line-height:2.4rem;color:#fff;position:relative;margin:0 0.7rem;display:block}
  .top>span i{position:absolute;left:0;font-size:0.5rem}
 .top>span h4{font-size:0.45rem;color:#fff;font-weight:normal}
 .choose{margin:0 0.7rem 0.45rem;height:1rem;font-size:0.36rem;color:#848484;display:flex;justify-content: space-around;align-items:center;border-radius:0.1rem;line-height:1rem;background-color:#fff;}
 .choose span{width:100%;height:1rem;display:block;text-align:center;}
 .choose .active{background-color:#0094a3;color:#fff;border-radius:0.1rem;margin:0 -0.05rem;z-index:3;position:relative}
</style>
<script>
var url = location.href;
var arr = url.split("#");
 export default{
   data(){
   return{
      tablist:[
      {
        index:0,
        name:"个人",
        url:"#/regest/personal"
      },
       {
       index:1,
       name:"企业",
        url:"#/regest/enterprise"
       },
       {
       index:2,
       name:"景区",
        url:"#/regest/scenic"
       }],
       aindex:0
   }
   },
   methods:{
    changetab:function(index){
      this.aindex=index;
      window.location.href=arr[0]+this.tablist[index].url;
      this.$store.state.userid=this.aindex;
    },
    backpre:function(){
     window.history.go(-1);
    }
   },
   mounted:function(){
      this.$store.state.userid=this.aindex;
   }
 }
</script>