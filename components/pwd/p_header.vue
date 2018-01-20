<template>
  <div>
      <span @click="backpre"><img src="../../image/c_left.png"></span>
      <span>密码设置</span>
      <img class="hide">
  </div>
</template>
<style scoped>
    .hide{
        margin-right: 0.2rem;
        visibility: hidden;
    }
    img{
        margin-left: 0.22rem;
        width: 0.16rem;
        height: 0.28rem;
    }
    div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #0094a3;
        height: 0.9rem;
    }
    span{
        color:#fff;
        font-size: 0.28rem;
    }
</style>
<script>
export default{
    data(){
     return{

     }
    },
    methods:{
    backpre:function(){
     window.history.go(-1);
    }
   },
}
  
</script>

