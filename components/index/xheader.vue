<template>
  <div id="go">
     <header>
      <div class="logo">
        <a href="#"><img src="../../image/logo.png"></a>
      </div>
      <div class="home">
         <a href="#"><img src="../../image/home.png"></a>
      </div>
      <div class="search">
         <span><img src=""></span>
         <input type="text" placeholder="请输入你想搜索的内容">
      </div>
      <div class="person" @click="personal">
         <a href="#"><img src="../../image/person.png"></a>
      </div>
      <div class="more" @click="show">
        <a href="#"><img src="../../image/more.png"></a>
      </div>
        <div class="shopcar" v-show="isshow">
           <div class="collect">
              <a href="#">
                <img src="../../image/shop.png">
                <p>收藏</p>
              </a>
           </div>
            <div class="collect">
              <a href="#">
                <img src="../../image/custom.png">
                <p>客服</p>
              </a>
           </div>
        </div>
   </header>
  </div>
</template>
<style>
#go header{height:1rem;background-color:#0094a3;display:flex;justify-content:space-between;align-items: center;padding:0 0.12rem;}
#go .shopcar{position:absolute;right:0;top:1rem;width:1.2rem;height:1.8rem;background-color:#fff;text-align:center;z-index:5}
#go .shopcar a{font-size:0.22rem;color:#484848;line-height:0.4rem}
.shopcar a img{display:block;margin-left:0.4rem;width:0.3rem;}
.collect{margin-top:0.16rem}
#go .logo{height:0.5rem;width:1.4rem;}
#go .logo img{height:0.5rem;width:1.4rem;}
#go .home{height:0.5rem;width:0.5rem;}
#go .person{height:0.5rem;width:0.5rem;}
#go .more{height:0.5rem;width:0.5rem;}
#go .search{width:3.32rem;height:0.58rem;line-height:0.58rem;position:relative;background-color:#fff;border-radius:0.1rem;}
#go .search input{border:0;outline: none;text-indent:0.25rem;width:3rem;position:absolute;top:0.16rem;left:0.15rem;}
</style>
<script>
var url = location.href;
var arr = url.split("#");
export default {
   data(){
      return {
        isshow:false
      }
  },
 methods:{
      show(){
          this.isshow = !this.isshow;
      },
      personal(){
       if(this.$store.state!="")
       {
        console.log(this.$store.state)
       }
      else{
        window.location.href=arr[0]+"#/login/quicklogin"
      }
   }
  }
 }
</script>

