<template>
  <div id="go">
     <header>
      <div class="logo">
        <a href="#"><img src=""></a>
      </div>
      <div class="home">
         <a href="#"><img src="../../image/home.png"></a>
      </div>
      <div class="search">
         <span><img src=""></span>
         <input type="text" placeholder="请输入你想搜索的内容">
      </div>
      <div class="person">
         <a href=""><img src="../../image/person.png"></a>
      </div>
      <div class="more">
        <a href="#"><img src="../../image/more.png"></a>
        <div class="shopcar">
           <div class="">
              <a href="#">
                <img src="">
                <p>收藏</p>
              </a>
           </div>
            <div class="custor">
              <a href="#">
                <img src="">
                <p>客服</p>
              </a>
           </div>
        </div>
      </div>
   </header>
  </div>
</template>
<style>
#go header{height:1rem;background-color:#0094a3;display:flex;justify-content:space-between;align-items: center;padding:0 0.12rem;}
#go .shopcar{position:absolute;display:none;}
#go .logo{height:0.6rem;width:0.6rem;}
#go .home{height:0.6rem;width:0.6rem;}
#go .person{height:0.6rem;width:0.6rem;}
#go .more{height:0.6rem;width:0.6rem;}
#go .search{width:3.32rem;height:0.58rem;line-height:0.58rem;position:relative;background-color:#fff;border-radius:0.1rem;}
#go .search input{border:0;outline: none;text-indent:0.25rem;width:3rem;position:absolute;top:0.16rem;left:0.15rem;}
</style>