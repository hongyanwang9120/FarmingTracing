<template>
  <div class="content">
    <el-form
      v-if="!this.loginForm.CaptchaModal"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">欢迎登陆</h3>
        <span class="note">* 如果是初次登陆，此手机号将自动注册为平台用户</span>
      </div>

      <el-form-item prop="username" class="user-name">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item v-if="loginForm.loginType=='password'" prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item v-if="loginForm.loginType =='captcha'" class="user-captcha">
        <el-input
          ref="captcha"
          v-model="loginForm.captcha"
          placeholder="Captcha"
          name="captcha"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <button
          :class="[{'show-captcha-modal':true}, {'show-captcha-disabled': loginForm.isCaptchaDisabled}]"
          :disabled="loginForm.isCaptchaDisabled "
          @click="showCaptchaModal"
        >{{ this.loginForm.CaptchaTitle }}</button>
      </el-form-item>

      <div class="tips">
        <span @click="changeLoginType">{{ this.loginForm.LoginMessage }}</span>
        <span v-if="this.loginForm.LoginMessage==='手机号/验证码登陆'" class="lost-password" @click="showRetrieve=true">忘记密码？</span>
      </div>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >注册/登陆</el-button>
    </el-form>
    <el-form
      v-else
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">欢迎登陆</h3>
        <span class="note">
          <span>请完成安全验证</span>
          <span>
            <i>
              <img src="@/assets/captcha_images/Refresh.png" alt>
            </i>
            <i>
              <img src="@/assets/captcha_images/question.png" alt>
            </i>
            <i>
              <img src="@/assets/captcha_images/close.png" alt>
            </i>
          </span>
        </span>
        <puzzle :puzzle-img-list="ImgList" />
      </div>
    </el-form>
    <retrieve-password v-if="showRetrieve" />
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate';
import puzzle from './puzzle';
import retrievePassword from './retrievePassword'
export default {
  name: 'LoginUser',
  components: { puzzle, retrievePassword },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: '',
        loginType: 'password',
        CaptchaModal: false,
        CaptchaTitle: '获取验证码',
        LoginMessage: '手机号/验证码登陆',
        isCaptchaDisabled: false
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      showRetrieve: false,
      passwordType: 'password',
      redirect: undefined,
      timer: null,
      ImgList: ['http://placehold.it/400x200&text=400x200', 'http://placehold.it/600x504&text=600x504']
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    changeLoginType() {
      this.loginForm.loginType =
        this.loginForm.loginType === 'password' ? 'captcha' : 'password';
      this.loginForm.LoginMessage =
        this.loginForm.loginType === 'password'
          ? '手机号/验证码登陆'
          : '手机号/密码登陆';
      console.log(this.loginForm.loginType);
    },
    showCaptchaModal(showTime = false) {
      this.loginForm.CaptchaModal = !this.loginForm.CaptchaModal;
      if (showTime) {
        this.loginForm.isCaptchaDisabled = true;
        const TIME_COUNT = 5 + 3;
        var count;
        if (!this.timer) {
          count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (count > 0 && count <= TIME_COUNT) {
              this.loginForm.CaptchaTitle = '重新发送（' + --count + 's）';
            } else {
              this.loginForm.isCaptchaDisabled = false;
              this.loginForm.CaptchaTitle = '重新获取';
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push('/dashboard');
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
  margin-bottom: 20px;
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.content {
  width: 460px;
  height: 460px;
  background: rgba(255, 255, 255, 1);
  border-radius: 7px;
  .user-name {
    .el-input {
      width: 100%;
    }
  }
  .user-captcha {
   
    .el-input {
      width: 62%;
    }
    .show-captcha-modal {
      border:none;
      background:none;
      cursor: pointer;
      font-size: 16px;
      color: rgba(19, 110, 195, 1);
      width:139px;
      text-align: center;
    }
    .show-captcha-modal:focus{
      outline: none;
    }
    .show-captcha-disabled {
      color: rgba(153, 153, 153, 1);
    }
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 57px 45px 0;
    margin: 0 auto;
    overflow: hidden;
    ::v-deep .el-form-item__content {
      background: white;
      .el-input__inner {
        background-color: #fff;
        border: none;
        color: #606266;
        display: inline-block;
        height: 40px;
        outline: 0;
        -webkit-transition: border-color 0.2s
          cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
        outline: none;
      }
    }
  }

  .tips {
    font-size: 16px;

    font-weight: 400;
    color: rgba(19, 110, 195, 1);

    margin-bottom: 33px;

    span {
      cursor: pointer;
      &:first-of-type {
        margin-right: 16px;
      }
    }
    .lost-password {
      float: right;
      font-size: 16px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-bottom: 36px;
    .title {
      font-size: 26px;
      margin: 0 0 25px 0;
      color: rgba(0, 0, 0, 1);
      font-weight: bold;
    }
    .note {
      display: flex;
      justify-content: space-between;
      span {
        img {
          margin-left: 20px;
          width: 26px;
          height: 26px;
        }
      }
    }
  }
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
