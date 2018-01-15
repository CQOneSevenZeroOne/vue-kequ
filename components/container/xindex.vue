<template>
  <div>
	  <xheader/>
	   <xbanner/>
       <xadver/>
       <xtitle/>
	  <router-view></router-view>
  </div>
</template>
<script>
 import xheader from "../index/xheader.vue";
 import xbanner from "../index/xbanner.vue";
 import xadver from "../index/xadver.vue";
 import xtitle from "../index/xtitle.vue";
export default{
    components:{
        xheader,
        xbanner,
        xadver,
        xtitle
    }
}
</script>