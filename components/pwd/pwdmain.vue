<template>
  <div>
	     <p_header/>
       <p_form/>
      
  </div>
</template>
<script>
 import p_header from "./p_header.vue";
 import p_form from "./p_form.vue";
 import $ from "jquery";
export default{
    components:{
       p_header,
        p_form,
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