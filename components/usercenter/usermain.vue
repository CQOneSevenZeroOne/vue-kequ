<template>
  <div>
	     <u_header/>
       <u_main/>
       <u_select/>
       <u_list/>
  </div>
</template>
<script>
 import u_header from "./u_header.vue";
 import u_main from "./u_main.vue";
 import u_select from "./u_select.vue";
 import u_list from "./u_list.vue";
 import $ from "jquery";
export default{
    components:{
        u_header,
        u_main,
        u_select,
        u_list
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