<template>
<div id="list">
      <ul>
         <li> 
             <div class="list-left">
                 <a href="#">
                 	<div class="listpic">
                     <img src="../../image/list1.jpg">
                     </div>
                    <div class="intruct">
                       <h4>成都游乐园</h4>
                       <p>已售<i>42424</i>份</p>
                       <span>重庆</span>
                    </div>
                 </a>
             </div>
             <div class="list-right">
                <span><i>¥</i>50</span>
                <a href="#">收藏</a>
             </div>
         </li>
         <li> 
             <div class="list-left">
                 <a href="#">
                 	<div class="listpic">
                     <img src="../../image/list1.jpg">
                     </div>
                    <div class="intruct">
                       <h4>成都游乐园</h4>
                       <p>已售<i>42424</i>份</p>
                       <span>重庆</span>
                    </div>
                 </a>
             </div>
             <div class="list-right">
                <span><i>¥</i>50</span>
                <a href="#">收藏</a>
             </div>
         </li>
         <li> 
             <div class="list-left">
                 <a href="#">
                 	<div class="listpic">
                     <img src="../../image/list1.jpg">
                     </div>
                    <div class="intruct">
                       <h4>成都游乐园</h4>
                       <p>已售<i>42424</i>份</p>
                       <span>成都</span>
                    </div>
                 </a>
             </div>
             <div class="list-right">
                <span><i>¥</i>50</span>
                <a href="#" class="collected">已收藏</a>
             </div>
         </li>
      </ul>
      <div class="returntop">
         <img src="../../image/return.png">
      </div>
   </div>
</template>
<style scoped>
#list{margin:0 0.3rem;position:relative}
#list ul li{min-height:1.9rem;border-bottom:1px solid #dadada;display:flex;justify-content: space-between;align-items:center;}
#list .list-left a{display:flex;justify-content: space-between;align-items: center;color:#484848}
#list .list-left .listpic{width:2rem;height:1.5rem}
#list .list-left .intruct{margin-left:0.36rem;width:2.24rem;overflow:hidden}
#list .list-left .intruct h4{font-weight:normal;font-size:0.28rem;line-height:0.28rem;}
.list-left .intruct p{color:#8a8a8a;font-size:0.12rem;line-height:0.4rem}
.intruct p i{color:#FF4E00}
.list-left .intruct span{display:block;font-size:0.16rem;margin-top:0.2rem}
.list-right span{display:block;color:#FF4E00;font-size:0.36rem;text-align:center;line-height:0.58rem}
.list-right span i{font-size:0.22rem}
.list-right a{display:block;text-align:center;color:#fff;background-color:#0094a3;border-radius:0.05rem;font-size:0.22rem;padding:0.15rem 0.4rem}
.list-right .collected{background-color:#b6b6b6}
.returntop{position:absolute;top:4.3rem;right:0;width:0.76rem;height:0.76rem;overflow:hidden}
</style>