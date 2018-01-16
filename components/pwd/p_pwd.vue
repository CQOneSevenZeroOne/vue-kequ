<template>
  <div>
      <input type="text">
      <span>昵称要求4-16个字符，支持中文、英文、数字</span>
      <div class="btn active">保存</div>
  </div>
</template>
<style scoped>
span{
    font-size: 0.22rem;
    color: #9c9c9c;
    padding: 0.2rem 0 0.7rem 0.3rem;
    display: block;
}
input{
    background: #ffffff;
    width: 100%;
    text-indent: 0.25rem;
    height: 0.95rem;
    border:0;
    display: block;
}
.btn{
    margin:0 0.48rem;
    height: 0.85rem;
    background: #dadada;
    color: #ffffff;
    font-size: 0.26rem;
    text-align: center;
    line-height: 0.85rem;
}
.active{
    background: #0094a3;
}
</style>

