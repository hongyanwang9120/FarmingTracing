<template>
  <div class="portal_footer">
    <span>© 2018 版权所有 软通动力信息技术（集团）有限公司 京ICP备11019727号</span>
  </div>
</template>
 
<script>
export default {
  name: 'PortalFooter',

  data() {
    return {};
  },
  computed: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.portal_footer {
  width:100%;
  height: 60px;
  background: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 14px;
    font-weight: 400;
    color:rgba(153,153,153,1);
  }
}
</style>
