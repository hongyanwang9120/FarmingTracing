<template>

  <div class="login-header">

    <div>
      <img src="@/assets/login_images/logo_slices/logo.png" alt>
      <span>农产品区块链溯源平台</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginHeader',
  data() {
    return {}
  },
  watch: {

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-header{
  height: 60px;
      background-color: rgba(32,32,32,1);;
      display: flex;
      background-attachment: fixed;
      justify-content: space-between;
      align-items: center;
      font-size:16px;
font-weight:bold;
color:rgba(255,255,255,1);
      div:nth-child(1) {
        width: 1200px;
      margin: 0 auto;
        display: flex;
        align-items: center;
        img {
          width: 41px;
          height: 40px;
          margin-right: 10px;
        }
      }
}
</style>
