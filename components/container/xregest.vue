<template>
<div>
  <div id="regest">
	  <rheader/>
	<form>
	  <router-view></router-view>
	  <rfooter/>
	</form>
 </div>
 </div>
</template>
<style scoped>
#regest{width:100%;height:100%;background-image:url("../../image/back.jpg");background-repeat:no-repeat;background-size:cover}
 #regest form{font-size:0.28rem;margin:0 0.7rem }
</style>
<script>
 import rheader from "../login/rheader.vue";
 import  rfooter from "../login/rfooter.vue";
export default{
    components:{
        rfooter,
        rheader
    }
}
</script>