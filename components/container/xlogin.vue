<template>
<div class="login">
  <lheader/>
   <form>
        <router-view></router-view>
        <lfooter/>
   </form>
</div>
</template>
<style>
html {height:100%}
body{background-image:url("../../image/back.jpg");background-repeat:no-repeat;background-size:cover}
 .login form{font-size:0.28rem;margin:0 0.7rem }
 
</style>
<script>
import lheader from "../login/lheader.vue";
import lfooter from "../login/lfooter.vue";
export default{
    components:{
        lfooter,
        lheader
    }
}
</script>