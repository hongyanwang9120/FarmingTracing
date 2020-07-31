<template>
  <div class="new-equipment">
   <equipment  ></equipment>
  </div>
</template>
<script>
import equipment from './equipment'

export default {
  components:{equipment},
  data() {
    return {
     
    };
  },

  mounted() {},
  methods: {
   
  }
};
</script>

<style lang="scss" scoped>
.new-equipment{
  height: 100%;
  padding: 0 0px 50px;
  background: white;
  font-size:14px;
}
</style>
