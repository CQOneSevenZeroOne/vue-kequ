<template>
<div class="top">
  <span>
        <i><</i>
      <h4>注册账号</h4>
   </span>
   <div class="choose">
     <span class="active">
       个人
     </span>
     <span>
       企业
     </span>
     <span>
       景区
     </span>
   </div>
 </div>
</template>
<style>
 .top>span{height:2.45rem;text-align:center;line-height:2.4rem;color:#fff;position:relative;margin:0 0.7rem;display:block}
  .top>span i{position:absolute;left:0;font-size:0.5rem}
 .top>span h4{font-size:0.45rem;color:#fff;font-weight:normal}
 .choose{margin:0 0.7rem 0.45rem;height:1rem;font-size:0.36rem;color:#848484;display:flex;justify-content: space-around;align-items:center;border-radius:0.1rem;line-height:1rem;background-color:#fff;}
 .choose span{width:100%;height:1rem;display:block;text-align:center;}
 .choose .active{background-color:#0094a3;color:#fff;border-radius:0.1rem;margin:0 -0.05rem;z-index:3;position:relative}
</style>