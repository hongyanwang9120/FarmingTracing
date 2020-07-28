<template>
  <div class="header">
    <div class="company_title">
      <span>江苏省无锡市农产品区块链溯源平台</span>
    </div>
    <div class="company_details">
      <div class="user">
        <div>
          <img src="http://placehold.it/36x36&text=36x36" alt="">
        </div>
       
        <span>Admin（刘欣瑶）</span>
      </div>
      <div class="organizations">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="message">
        <span>消息</span>
        <el-button type="primary" class="message_num">12</el-button>
      </div>
    </div>
 
  </div>
</template>

<script>

export default {
  name: 'MyHeader',
  components: {
  
  },
   data() {
      return {
        options: [{
          value: '选项1',
          label: '切换组织'
        }, {
          value: '选项2',
          label: '组织2'
        }, {
          value: '选项3',
          label: '组织3'
        }, {
          value: '选项4',
          label: '组织4'
        }, {
          value: '选项5',
          label: '组织5'
        }],
        value: '选项1'
      }
    },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.header{
   padding:0 50px;
 width:100%;
height:60px;
font-size:14px;
background:rgba(36,61,117,1);
display: flex;
 justify-content: space-between ;
 align-items:  center;
 color:rgba(254,254,254,1);
.company_title{
  span {
    font-size:16px;
font-weight:400;

  }
}
.company_details{
  width:500px;
  display: flex;
  justify-content: space-between ;
 align-items:  center;
  .user{
     display: flex;
     align-items:  center;
     >div{
       width:36px;
       height:36px;
       border-radius: 50%;
       overflow: hidden;
       margin: 0 17px
     }
  }
  .organizations{
    ::v-deep .el-input__inner {
    padding:0;
    background:rgba(36,61,117,1);
     color:rgba(254,254,254,1);
    height: 40px;
    line-height: 40px;
    width: 90px;
    border:none
  }
}
.message{
  .message_num{
    width:26px;
height:20px;
background:rgba(41,156,246,1);
border-radius:4px;
padding:0;
  margin:0 12px;
  }
}
}
}
</style>
