<template>
  <div>
	     <p_header/>
       <p_info/>
      
  </div>
</template>
<script>
 import p_header from "./p_header.vue";
 import p_info from "./p_info.vue";
 import $ from "jquery";
export default{
    components:{
       p_header,
       p_info
    },
    data(){
      return{

      }
    },
    methods:{
      collect(){
        console.log($(this))
      }
    }
}
</script>