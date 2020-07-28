<template>
  <div class="login-container">
    <div class="protal">
      <div class="header">
        <div>
          <img src="@/assets/portal_images/lgoo-small@2x.png" alt>
          <span>农产品区块链溯源平台</span>
        </div>
        <div>
          <el-button class="loginBtn" @click.native.prevent="logout">
            <span>登陆</span>
          </el-button>
        </div>
      </div>
      <div class="swiper">
        <swiper />
      </div>
      <div class="product">
        <img src="http://placehold.it/460x320&text=460x320">
        <div>
          <span>溯源产品功能介绍</span>
          <p>文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文案预留文</p>
        </div>
      </div>
      <div class="online">
        <message />
        <contac />
      </div>
      <portal-footer />
    </div>
  </div>
</template>

<script>
import swiper from './swiper';
import message from './message';
import contac from './contac';
import portalFooter from '../common/portalFooter'
export default {
  name: 'Portal',
  components: {
    swiper,
    message,
    contac,
    portalFooter
  },
  data() {
    return {};
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
     async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped="scoped">
@import "/static/util/swiper/swiper.css";

$bg: white;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .protal {
    background-color: white;
    font-size:20px;
    .header {
      width: 1200px;
      height: 60px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      ::v-deep .el-button {
        padding: 0;
      }
      div:nth-child(1) {
        display: flex;
        align-items: center;
        img {
          width: 41px;
          height: 40px;
          margin-right: 10px;
        }
      }
      .loginBtn {
        width: 52px;
        height: 28px;
        background: rgba(19, 109, 195, 1);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          opacity: 0.8;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .swiper {
      ::v-deep .el-carousel__arrow--left {
        left: 226px;
      }
      ::v-deep .el-carousel__arrow--right {
        right: 226px;
      }
      ::v-deep .el-carousel__arrow {
        width: 0;
        height: 0;
        background-color: transparent;
        font-size: 50px;
      }
      ::v-deep .el-carousel__arrow:hover {
        background-color: transparent;
      }
      ::v-deep .el-carousel__button {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
    }
    .product {
      width: 1200px;
      height: 320px;
      // background:yellowgreen;
      margin: 20px auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      img {
        width: 460px;
        height: 320px;
      }
      div {
        width: 706px;

        font-size: 15px;
        span {
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        p {
          font-weight: 400;
          color: rgba(104, 104, 104, 1);
        }
      }
    }
    .online {
      width: 1200px;
      margin: 0 auto 42px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
