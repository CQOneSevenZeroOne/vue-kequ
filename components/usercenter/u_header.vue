<template>
  <div id="box">
      <a href="#/index/home"><img src="../../image/c_home.png" id="home"></a>
      <span>用户中心</span>
      <img src="../../image/c_jia.png" id="jia" @click="show">
       <div class="shopcar" v-show="isshow">
           <div class="collect">
              <a href="#/collection">
                <img src="../../image/shop.png">
                <p href ="#/usermain">收藏</p>
              </a>
           </div>
            <div class="collect">
              <a href="#">
                <img src="../../image/custom.png">
                <p>客服</p>
              </a>
           </div>
        </div>
  </div>
</template>
<style scoped>
#box{
    height: 0.9rem;
    background: #0094a3;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#home{
    width: 0.46rem;
    height: 0.46rem;
    margin-left: 0.3rem;
}
#jia{
    width: 0.46rem;
    height: 0.46rem;
    margin-right: 0.3rem;
}
span{
    font-size: 0.33rem;
    color:#fff;
}
.shopcar{position:absolute;right:0;top:1rem;width:1.2rem;height:1.8rem;background-color:#fff;text-align:center;z-index:5}
.shopcar a{font-size:0.22rem;color:#484848;line-height:0.4rem}
.shopcar a img{display:block;margin-left:0.4rem;width:0.3rem;}
.collect{margin-top:0.16rem}
</style>
<script>
  import $ from 'jquery'
  export default {
    data(){
      return {
        data:'',
         isshow:false
      }
    },
    methods:{
        show(){
          this.isshow = !this.isshow;
          }
          },
    mounted:function(){
      var self = this
      $.ajax({
        url:"http://10.40.153.145:8888/app/getAllAppById",
        type:"post",
        data:{
          userid:"1"
        },
        success:function(data){
          console.log(data)
          self.data=data
        }
      })
    }

}
</script>


