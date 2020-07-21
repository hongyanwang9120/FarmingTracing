<template>
  <div class="body">
    <div class="retrieve-password">
      <h4>找回密码</h4>
      <div class="step">
        <el-steps :active="orderStatus" finish-status="wait" process-status="finish" align-center>
          <el-step
            :title="item.title"
            :description="item.description"
            v-for="(item,index) in items"
            :key="index"
          ></el-step>
        </el-steps>
      </div>
      <div class="Authentication">
         <div class="get_code" v-if="this.orderStatus==0">
          <div>
            <p>
              <input type="text" class="form_tel" v-model="formLabelAlign.tel" placeholder="请输入手机号" />
            </p>
            <p>
              <input
                type="text"
                class="form_code"
                v-model="formLabelAlign.code"
                placeholder="请输入短信验证码"
              />
              <el-button class="get_code_btn">获取验证码</el-button>
            </p>
            <p>
              <el-button class="get_code_next" @click="changeOrderStatus(1)">下一步</el-button>
            </p>
          </div>
        </div> 
        <div class="reset_passwords" v-else-if="this.orderStatus==1">
          <div>
                      当前注册手机号为：
                      <span>18696172528</span>
          </div>
          <div>
            <p>
              <input type="text" class="form_tel" v-model="formLabelAlign.tel" placeholder="请输入手机号" />
            </p>
            <p>
              <input
                type="text"
                class="form_code"
                v-model="formLabelAlign.code"
                placeholder="请输入短信验证码"
              />
            </p>
            <p class="password_hint">密码可以为大写字母、小写字母、数字和特殊符号</p>
            <p>
              <el-button class="get_code_next"  @click="changeOrderStatus(2)">确认</el-button>
            </p>
          </div>
        </div>
        <div class="finish" v-else-if ="this.orderStatus==2">
          <div>
                      成功找回密码，
                      <span>{{timerTitle}}</span>秒后将跳转到登陆页面！
          </div>
         
            <p>
              <el-button class="get_code_next"  @click="changeOrderStatus(3)">登录</el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  
</template>

<script>
export default {
  name: "retrievePassword",
  data() {
    return {
      formLabelAlign: {
        tel: "",
        code: ""
      },
      timer:null,
      timerTitle:5,
      orderStatus: 0,
      items: [
        { title: "验证身份", description: "" },
        { title: "重置密码", description: "" },
        { title: "完成", description: "" }
      ]
    };
  },
  watch: {},
  methods: {
    changeOrderStatus(num){
        if(num==3){
          this.$parent.showRetrieve=false
        }
        this.orderStatus=num
        if(this.orderStatus==2){
          const TIME_COUNT = 5;
        var count;
        if (!this.timer) {
          count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (count > 0 && count <= TIME_COUNT) {
              this.timerTitle =  --count ;
            } else {
               this.$parent.showRetrieve=false
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        }
        console.log(this.orderStatus)
    
    }
  }
};
</script>


<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.body {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.retrieve-password {
  width: 1100px;
  height: 700px;
  background: rgba(255, 255, 255, 1);
  border-radius: 7px;
  margin: 0 auto;
  padding: 83px 300px 0;
  h4 {
    font-size: 28px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    display: flex;
    justify-content: center;
  }
  ::v-deep .el-step__icon {
    width: 48px;
    height: 48px;
  }
  ::v-deep .el-step__line {
    top: 23px;
  }
  ::v-deep .el-step__title {
    color: rgba(102, 102, 102, 1);
  }
  ::v-deep .is-finish {
    .is-text {
      background: rgba(19, 110, 195, 1);
      color: white;
    }
  }
  ::v-deep .is-wait {
    .is-text {
      background: rgba(241, 241, 245, 1);
    }
  }
  .Authentication {
    padding: 30px;
    .get_code {
      input {
        height: 50px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(187, 187, 187, 1);
        padding: 10px;
      }
      .form_tel {
        width: 440px;
      }
      .form_code {
        width: 300px;
        // margin-top:26px;
      }
      .get_code_btn {
        width: 120px;
        height: 50px;
        background: rgba(19, 110, 195, 1);
        font-size: 16px;

        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .get_code_next {
        width: 100%;
        height: 50px;
        background: rgba(19, 110, 195, 1);
        font-size: 18px;

        font-weight: 400;
        color: rgba(255, 254, 254, 1);
        border-radius: 7px;
        margin-top: 24px;
      }
      div > p {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .reset_passwords{
        input {
        height: 50px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(187, 187, 187, 1);
        padding: 10px;
      }
      .form_tel {
        width: 440px;
      }
      .form_code {
        width: 440px;
      }
     .password_hint{
       font-size:16px;
font-weight:400;
color:rgba(19,110,195,1);
     }
      .get_code_next {
        width: 100%;
        height: 50px;
        background: rgba(19, 110, 195, 1);
        font-size: 18px;

        font-weight: 400;
        color: rgba(255, 254, 254, 1);
        border-radius: 7px;
        margin-top: 24px;
      }
      div > p {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .finish {
      
        
    
      .get_code_next {
        width: 100%;
        height: 50px;
        background: rgba(19, 110, 195, 1);
        font-size: 18px;

        font-weight: 400;
        color: rgba(255, 254, 254, 1);
        border-radius: 7px;
        margin-top: 24px;
      }
      div{
        margin:55px 0 26px 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    
    }
  }
}
</style>
