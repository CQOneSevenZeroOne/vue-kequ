<template>
  <div id="bigbox">
      <div id="box">
          <img src="../../image/c_logo.jpg" id="logo">
          <div id="user">
              <b>中华田园犬</b>
              <span class="iden">企业用户</span>
          </div>
          <a href="#/userinfo"><img src="../../image/c_edit.png" id="edit"></a>
      </div>
      <img src="../../image/c_right.jpg" id="right">
  </div>
</template>
<style scoped>
b{
    font-size: 0.34rem;
    color: #000000;
    margin-right: 0.12rem;
    margin-bottom: 0.18rem;
}
.iden{
    padding: 0.06rem 0.08rem;
    background-color: #ffffff;
    border: 1px solid #0094a3;
    text-align: center;
    line-height: 0.32rem;
    border-radius: 0.05rem;
    font-size: 0.18rem;
    color: #0094a3;
}
#logo{
    width:1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    margin: 0 0.3rem;
}
#edit{
    width:0.2rem;
    height: 0.22rem;
    margin-top: 0.32rem;
}
#right{
    width:0.29rem;
    height: 0.62rem;
    margin-right: 0.3rem;
}
#bigbox{
    height: 1.8rem;
    background: #ffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#user{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
#box{
    display: flex;
    justify-content: flex-start;
}
</style>

