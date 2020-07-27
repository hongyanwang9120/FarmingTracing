<template>
  <div class="message">
    <div class="header">
      <i><img src="@/assets/portal_images/message.png" alt=""></i>
      <span>在线留言</span>
    </div>
    <div class="content">
      <p class="title">我们时刻准备，为您提供最满意的服务</p>
      <p class="describe">请认真填写以下内容，我们在收到信息后将会与您取得联系！（ <span class="red"> * </span> 为必填项）
      </p>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="您的姓名：" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="联系电话：" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="邮箱地址：" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="留言内容：" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submitBtn" @click="submitForm('ruleForm')"> 确认提交 <i class="el-icon-arrow-right el-icon--right" /></el-button>
          <el-button class="resetBtn" @click="resetForm('ruleForm')">重置内容<i class="el-icon-arrow-right el-icon--right" /></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'Carrousel',

  data() {
    return {
       ruleForm: {
          name: '',
          phone: '',
          email: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入您的联系电话', trigger: 'blur' },
            { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' }
          ],
          email: [
            { required: false, message: '请填写留言内容', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写留言内容', trigger: 'blur' }
          ]
        }
    };
  },
  computed: {},
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>
<style lang="scss" scoped>
.red{
  color:red;
}
.message{
  width:890px;
height:598px;
background:rgba(255,255,255,1);
border:1px solid rgba(220,220,220,1);
border-radius:8px;

.header{
  height:57px;
  background:linear-gradient(0deg,rgba(231,231,231,0.3
  ),rgba(255,255,255,0.3));
  border-radius:8px;
  display: flex;;
align-items:center;
  i{
    margin:0 14px 0 18px;
  }
  span{
    font-size:20px;
    font-weight:bold;
    color:rgba(51,51,51,1);
  }
}
.content{
  padding:26px 51px 40px  56px;
  .title{
    font-size:20px;

font-weight:bold;
color:rgba(19,110,195,1);
  }
  .describer{
    font-size:16px;
font-weight:400;
color:rgba(51,51,51,1);

  }
  ::v-deep .el-input__inner{
    width: 390px;
    height: 40px;
    background: rgba(255,255,255,1);
    border: 1px solid rgba(221, 221, 221, 1);
  }
 
  ::v-deep .el-textarea__inner{
    width:680px;
height:150px;
background:rgba(255,255,255,1);
border:1px solid rgba(221, 221, 221, 1)
  }
  ::v-deep .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    content: '*';
    color: #F56C6C;
    margin-right: -72px;
  }
 ::v-deep .el-textarea{
    textarea {
      
 resize:none;
    }
  }

  .submitBtn,.resetBtn{
    width:112px;
height:28px;
border-radius:4px;
     background-color: rgba(19,110,195,1);
    border-color: rgba(19,110,195,1);
    color: #FFF;
    padding:0;
  }
}

}
</style>
