<template>
<div id="banner">
      <transition-group tag="ul" class='slide-ul' >
         <li v-for="list in slidelist" :key="list.index" v-show="list.index===currentIndex" >
            <a :href="list.url"><img :src="list.image" @touchstart="stop"></a>
         </li>
      </transition-group>
      <div class="carousel-items">
         <span v-for="item in slidelist" :class="{'active':item.index===currentIndex}">
         </span>
    </div>
</div>
</template>
<style scoped>
#banner{height:2.6rem;width:100%;overflow:hidden;position:relative}
.slide-ul{width:100%;height:100%;height:2.6rem;}
.slide-ul li{
  position: absolute;
  width: 100%;
  height:2.6rem;
 }
 .slide-ul li a{width:100%;height:100%;display:block}
 .slide-ul li img {
  position:absolute;
   width:100%;
   height: 2.6rem;
   z-index:-1
  }
 #banner .carousel-items{position:absolute;right:0.3rem;display:flex;width:3rem;height:0.5rem;bottom:0;z-index:3;align-items:center;justify-content:center}
 .carousel-items span{display:block;width:0.2rem;height:0.2rem;border-radius:50%;overflow:hidden;background-color:#fff;margin:0 0.2rem;border:1px solid 7e7e7d}
#banner .carousel-items .active{background-color:#0094a3}
</style>
<script>
//引入轮播图片
import img1 from "../../image/banner.jpg";
import img2 from "../../image/banner1.jpg";
import img3 from "../../image/banner2.jpg";
import img4 from "../../image/banner3.jpg";
export default{
	data(){
	 return{
	   slidelist:[
	     {
	       index:0,
	       url:"#",
	       image:img1
	     },{
	       index:1,
	       url:"#",
	       image:img2
	     },{
	       index:2,
	       url:"#",
	       image:img3
	     },{
	       index:3,
	       url:"#",
	       image:img4
	     }
	   ],
	   currentIndex:0,
	   timer:""
	 }
	},
	mounted(){
	  this.$nextTick(() => {
     this.timer = setInterval(() => {
      this.autoPlay()
   },4000)
  })
	},
	methods:{
	 go(){
     this.timer = setInterval(() => {
    this.autoPlay()
   },4000)
	 },
	 stop(){
	 console.log(1);
        clearInterval(this.timer)
       this.timer = null
	 },
	 change(index){
	  this.currentIndex = index
	 },
	autoPlay() {
   this.currentIndex++
   if (this.currentIndex > this.slidelist.length - 1) {
    this.currentIndex = 0
   }
  }
}
} 
</script>