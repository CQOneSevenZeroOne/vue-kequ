<template>
 <div id="adv">
      <div class="road">
         促销线路
      </div>
       <transition-group tag="ul" class='road-detail'>
          <li v-for = "adv in advlist" :key="adv.index" v-show="adv.index===currentIndex" >
              <span>
              	<i v-text="adv.title"></i>
              	 <p v-text="adv.content"></p>
              </span>
              <b v-text="adv.price"></b>
          </li>
       </transition-group>
   </div>
</template>
<style scoped>
 #adv {height:0.95rem;font-size:0.28rem;color:#484848;border-left:0.16rem solid #ff4e00;text-align:center;overflow:hidden}
#adv .road{float:left;width:20%;line-height:0.95rem;border-right:1px solid #dadada;}
#adv ul {float:left;width:72%;padding:0 0.1rem}
#adv ul li{display:flex;justify-content:space-between;align-items: center;height:0.95rem;}
#adv ul .abc-enter-active{ transition: all 0.1s ease-out;}
#adv ul .abc-leave-active{ transition: all 0.1s ease-out;}
#adv ul li span i{display:block;padding:0 0.1rem;border:1px solid #FF4E00;border-radius:0.06rem;color:#FF4E00;font-size:0.12rem}
#adv ul li span {display:flex;}
#adv ul li p{margin-left:0.2rem}
#adv ul li b{color:#FF4E00;}
</style>
<script>
export default{
  data(){
   return{
     advlist:[
       {
          index:0,
          title:"路线",
           content:"海南三亚五日自助游",
          price:"¥5000"
       },
       {
          index:1,
          title:"门票",
          content:"<三亚一线天>",
          price:"¥5000"
       }
       ,
       {
          index:2,
          title:"门票",
           content:"海南三亚五日自助游",
          price:"¥5000"
       }
       ,
       {
          index:3,
          title:"路线",
          content:"<三亚一线天>",
          price:"¥5000"
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
   },3000)
  })
  },
  methods:{
  autoPlay() {
   this.currentIndex++
   if (this.currentIndex > this.advlist.length - 1) {
    this.currentIndex = 0
   }
  }
}
}
</script>