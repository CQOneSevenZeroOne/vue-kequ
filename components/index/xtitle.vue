<template>
   <div id="title">
      <ul>
        <li v-for="i in title" :class="{active:i.index==id}" >
        <a :href="['#/index/'+i.path]" @click="addclass(i.index)">{{i.name}}</a></li>
      </ul>
   </div>
</template>
<style>
#title{height:0.9rem;border-top:0.3rem solid #ebebeb;}
#title ul{display:flex;justify-content:space-around;align-items:center;height:0.85rem;background-color:#f8f8f8;border-bottom:1px solid #dadada;line-height:0.85rem}
#title ul li{width:33.33%;text-align:center;color:#484848;font-size:0.32rem;font-weight:600;font-family:"宋体";letter-spacing: 0.1rem;}
#title>ul>li>a{width:100%;height:100%;display:block;color:#484848}
#title ul .active a{background-color:#0094a3;color:#fff;}
</style>
<script>
export default {
   data(){
      return {
          isaddclass:false,
          title:[
           {
                 index:0,
	             name:"购票",
	             path:"home"
             },
             {
                 index:1,
	             name:"跟团游",
	             path:"tour"
             },
             {
                 index:2,
	             name:"自由行",
	             path:"free"
             }
             ],
           id:0
      }
  },
 methods:{
      addclass(id){
          this.isaddclass = true;
          this.id = id
      }
 }
 }
</script>