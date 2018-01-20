<template>
  <div>
      <ul>
          <li v-for="list in giftlist">
                <img :src="list.img" class="listimg">
                <div class="box">
                    <div class="title">
                        <p v-text="list.title"></p>
                        <span>门票</span>
                    </div>
                    <div class="buttom">
                        <div class="left">
                            <img src="../../image/c_local.png" class="local">
                            <i v-text="list.address"></i>
                        </div>
                        <b >有效期：<i v-text="list.time"></i></b>
                    </div>
                </div>
          </li>
      </ul>
  </div>
</template>
<style scoped>
.left{
    display: flex;
    align-items: center;
}
.title{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 0.35rem;
}
.buttom{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}
p {
  font-size: 0.27rem;
  margin-bottom: 0.1rem;
}
span {
  padding: 0.03rem 0.08rem;
  color: #ff4e00;
  font-size: 0.18rem;
  border: 1px solid #ff4e00;
  border-radius: 0.05rem;
}
i {
  font-style: normal;
  font-size: 0.18rem;
  color: #636363;
}
b {
  font-size: 0.24rem;
  color: #484848;
  font-weight: normal;
  margin-right: 0.1rem;
}
.local {
  width: 0.15rem;
  height: 0.18rem;
}
.listimg {
  width: 2.1rem;
  height: 1.5rem;
  margin-left: 0.1rem;
  margin-right: 0.35rem;
}
li {
  margin: 0 0.2rem;
  border-bottom: 1px solid #dadada;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 1.9rem;
}
li:last-of-type {
  border-bottom: 0;
}
</style>
<script>
import $ from "jquery";
    export default{
      data(){
       return{
        giftlist:{},
        index:[]
      }
      },
      mounted(){
      var self =this;
        $.ajax({
      url:"http://10.40.153.145:8888/app/getAllAppById",
      type:'post',
      data:{
        userid:this.$store.state.loginid
      },
       success:function(data){
        self.giftlist=data;
       }
    })
    },
    methods:{
      
    }
    }
</script>
