<template>
  <div class="subject">
    <div class="tabs-header">
      <el-button
        type="primary "
        :class="{'primary-btn-def':index!==btnSel,'primary-btn-sel': index===btnSel}"
        round
        v-for="(item,index) in btnList"
        :key="index"
        @click="changeTab(index)"
      >{{item}}</el-button>
    </div>
    <div class="tabs-content">
      <div class="basic-info">
        <div class="info-left">                
          <div class="info-item">
            <div class="info-key">账户ID</div>
            <div class="info-colon">:</div>
            <div class="info-val">10001</div>
          </div>
           <div class="info-item">
            <div class="info-key">密码</div>
            <div class="info-colon">:</div>
            <div class="info-val">已设置/未设置</div>
          </div>
           <div class="info-item">
            <div class="info-key">姓名</div>
            <div class="info-colon">:</div>
            <div class="info-val">张三</div>
          </div>
          <div class="info-item">
            <div class="info-key">性别</div>
            <div class="info-colon">:</div>
            <div class="info-val">男</div>
          </div>
          <div class="info-item">
            <div class="info-key">出生日期</div>
            <div class="info-colon">:</div>
            <div class="info-val">1990/01/01</div>
          </div>
          <div class="info-item">
            <div class="info-key">现住址</div>
            <div class="info-colon">:</div>
            <div class="info-val">江苏省无锡市XXX县XXX镇XXX村</div>
            <div class="edit">
              <img src="@/assets/user_images/modify.png" alt="">
              <span>设定/修改</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-key">认证信息</div>
            <div class="info-colon">:</div>
            <div class="info-val">
               <el-button size="mini" type="info">未实名认证</el-button>
                <el-button size="mini" type="success">已企业认证</el-button>
                <el-button size="mini" type="success">未政府认证</el-button>
                <p class="caution">未实名用户，请先进行实名认证，否则只能浏览系统页面，无法操作业务！</p>

            </div>
          </div>
          <div class="info-item">
            <div class="info-key">加入企业</div>
            <div class="info-colon">:</div>
            <div class="info-val">已加入企业/未加入企业</div>
          </div>
        </div>
        <div class="info-right">                
          <div class="info-item">
            
                                

                            
            <div class="info-key">账户类别</div>
            <div class="info-colon">:</div>
            <div class="info-val">个人、企业员工、企业、政府、专家</div>
          </div>
           <div class="info-item">
            <div class="info-key">绑定手机</div>
            <div class="info-colon">:</div>
            <div class="info-val">18696176866</div>
             <div class="edit">
              <img src="@/assets/user_images/modify.png" alt="">
              <span>修改</span>
            </div>
          </div>
           <div class="info-item">
            <div class="info-key">头像</div>
            <div class="info-colon">:</div>
            <div class="info-val">
              <img src="@/assets/user_images/head sculpture.png" alt="用户头像">
            </div>
             <div class="edit">
              <img src="@/assets/user_images/modify.png" alt="">
              <span>设定/修改</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnList: ["基本信息", "密码设置/修改", "实名认证"],
      btnSel: 0,
    };
  },

  mounted() {},
  methods: {
    changeTab(index) {
      this.btnSel = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.subject {
  height: 100%;

  background: white;
  font-size: 14px;
  .tabs-header {
    height: 60px;
    background: #f2f2f4;
    padding: 0 20px;
    display: flex;
    align-items: top;
    .primary-btn-def {
      height: 40px;
      padding: 0 47px;
      background-color: #f2f2f4;
      border-color: #f2f2f4;
      color: black;
    }
    .primary-btn-sel {
      height: 40px;
      padding: 0 47px;
    }
  }
  .tabs-content {
    padding: 40px;
    .basic-info {
      font-size:16px;
font-weight:400;
color:rgba(51,51,51,1);
display:flex;
.info-left{
flex-grow: 2
}
.info-right{
flex-grow: 3
}
      .info-item{
        min-height:50px;
        display: flex;
        align-items: top;
      }
      .info-key {
        width: 70px;
        display: inline-block;
        text-align: justify;
        text-align-last: justify;
      }
      .info-colon {
        display: inline-block;
        padding: 0 13px;
      }
      .info-val {
        display: inline-block;
      }
      .caution{
        font-size:14px;
color:rgba(229,43,0,1);
      }
      .edit{
        margin-left:50px;
        color:#299CF6;
        text-decoration:underline;
        display: flex;
        align-items: top;
        img{width:23px;
        height:23px;
        }
        span{
          margin-left:11px;
        }
       
      }
    }
  }
}
</style>
