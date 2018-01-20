<template>
  <div id="box">
      <div v-for="list in isadd" v-text="list.name" :class="{div:true ,active:list.id==index}" @click="addclass(list.id)"></div>
  </div>
</template>
<style scoped>
#box{
    margin-top: 0.2rem;
    overflow: hidden;
}
.div{
    width: 50%;
    height: 0.8rem;
    border-bottom: 1px solid #dadada;
    float: left;
    line-height: 0.8rem;
    text-align: center;
    background: #f8f8f8;
    color: #484848;
    font-size: 0.28rem;
}
.active{
    color: #ffffff;
    background: #4cb4be;
}
</style>
<script>
 export default{
   data(){
    return{
      isadd:[{
        id:0,
        name:"我的礼品库"
      },
      {
        id:1,
        name:"我的收藏"
      }
      ],
      index:0
    }
   },
   methods:{
     addclass:function(id){
       this.index=id;
     }
   }
 }
</script>

