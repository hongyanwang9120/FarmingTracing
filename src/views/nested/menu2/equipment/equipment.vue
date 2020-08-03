<template>
  <div class="equipment">
    <div class="equipment-note">
      <div class='note-left'>
          <img src="@/assets/equipment_images/equipment.png" alt />
           <span>新增设备</span>
      </div>
     <div>
          <img src="@/assets/equipment_images/return.png" alt />
           <span>返回</span>

       
     </div>
    </div>
    <div class="equipment-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="81px"
        class="demo-ruleForm"
      >
        <div class="information">
          <div class="title">
            <img src="@/assets/equipment_images/Basic information.png" alt />
            <span>基本信息</span>
          </div>
          <div class="form-msg">
            <el-form-item label="设备名称" prop="name">
              <span class="colon">:</span>
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="设备识别码" prop="code" >
              <span class="colon">:</span>
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
            <el-form-item label="设备类型" prop="type">
              <span class="colon">:</span>
              <el-input v-model="ruleForm.type" disabled></el-input>
            </el-form-item>
            <el-form-item label="设备供应商" prop="suppliers">
              <span class="colon">:</span>
              <el-input v-model="ruleForm.suppliers" disabled></el-input>
            </el-form-item>
            <el-form-item label="物联网卡号" prop="card">
              <span class="colon">:</span>
              <el-input v-model="ruleForm.card"></el-input>
            </el-form-item>

            <el-form-item label="备注" prop="desc">
              <span class="colon">:</span>
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="设备地址" prop="address">
              <span class="colon">:</span>
              <map-handle-mode></map-handle-mode>
            </el-form-item>
          </div>
          <hr />
          <div class="title alarm-title">
            <img src="@/assets/equipment_images/Basic information.png" alt />
            <span>报警设置</span>
          </div>
          <div class="form-alarm">
            <div v-for="(item,index) in alarmMsg" :key="index" class="alarm-item">
              <el-form-item class="item-name">
                <p class="item-list">
                  <el-form-item :label="item.name">
                    <span class="colon">:</span>
                    <span class="item-status">{{item.status}}</span>
                  </el-form-item>
                  <!-- <span class="item-name">
                  <span>{{item.name}}</span>-->
                </p>

                <el-form-item label="设备临界值">
                  <span class="colon">:</span>

                  <template>
                    <span v-if="item.Num > 0">
                      <el-input-number
                        v-model="item.Num"
                        controls-position="right"
                        @change="handleMaxChange"
                        :precision="2"
                        :min="1"
                        :max="99999.99"
                      ></el-input-number>
                    </span>
                    <span v-else>
                      <el-input-number
                        controls-position="right"
                        @change="handleMaxChange"
                        placeholder="最大临界值"
                      ></el-input-number>
                    </span>
                  </template>
                  <template>
                    <span v-if="item.Num > 0">
                      <el-input-number
                        v-model="item.Num"
                        controls-position="right"
                        @change="handleMinChange"
                        :precision="2"
                        min="1"
                        max="99999.99"
                      ></el-input-number>
                    </span>
                    <span v-else>
                      <el-input-number
                        controls-position="right"
                        @change="handleMinChange"
                        placeholder="最小临界值"
                      ></el-input-number>
                    </span>
                  </template>
                </el-form-item>
              </el-form-item>
            </div>

            <hr style="border: 1px dashed rgba(221,221,221,1);" />

            <div class="alarm-item">
              <el-form-item label="报警提醒间隔时间" prop="alarmTime" class="alarm-time">
                <span class="colon">:</span>
                <el-select v-model="alarmValue" placeholder="请选择">
                  <el-option
                    v-for="item in alarmOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <p>小时</p>
              </el-form-item>
            </div>

            <div class="alarm-item">
              <el-form-item label="报警提醒推送方式" prop="alarmRemind" class="alarm-remind">
                <span class="colon">:</span>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="短信推送"></el-checkbox>
                  <el-checkbox label="平台推送"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </div>
        </div>
      
        <hr />
        <div class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')" round>提交</el-button>
          <el-button @click="resetForm('ruleForm')" round>返回</el-button>
        </div>
      </el-form>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import AMap from "AMap";
import MapHandleMode from "./mapHandleMode";
export default {
  components: { MapHandleMode },
  data() {
    return {
      checkList: ["短信推送"],
      alarmOptions: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "5",
          label: "5",
        },
      ],
      alarmValue: "1",

      ruleForm: {
        name: "",
        code: "",
        type: "",
        suppliers: "",
        card: "",
        desc: "",
      },

      alarmMsg: [
        {
          name: "水电导率",
          status: "0.2mS/cm",
          Num: 0,
          minNum:0,
          maxNum:0
        },
        {
          name: "水温",
          status: "26.96℃",
          Num: 0,
           minNum:0,
          maxNum:0
        },
      ],
      rules: {
        name: [
          { message: "请输入活动名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        code: [{ message: "请输入设备识别码", trigger: "blur" }],
      },
      myMap: null,
    };
  },

  mounted() {
    
  },

  methods: {
    handleMaxChange(newVal, oldVal) {
      
      console.log(newVal, oldVal, "最大");
    },
    handleMinChange(value) {
      // this.minNum=value;
      console.log(value, "最小");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.equipment {
  padding: 0 0px;
  background: white;
  font-size: 14px;
  position: relative;
  .equipment-note {
    height: 50px;
    padding: 0 20px;
    line-height: 50px;
    background: rgba(230, 232, 240, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 400;
    color: rgba(34, 34, 34, 1);
    position: -webkit-sticky;
    position: -moz-sticky;
    position: -ms-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    div{
      display: flex;
    align-items: center;
img {
      width: 25px;
      height: 25px;
      margin-right: 18px;
    }
    }
    
    position: sticky;
  }
  .equipment-content {
    padding: 30px 40px 0;
    .information {
      .title {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        img {
          width: 44px;
          height: 44px;
          margin-right: 16px;
        }
      }
     
      .form-msg {
        padding-left: 300px;
        position: relative;
        top: -38px;
        ::v-deep .el-form-item .el-form-item__label {
          text-align: justify;
          text-align-last: justify;
          padding: 0px;
          font-size: 16px;
        }
        ::v-deep .el-form-item .el-form-item__content {
          margin-left: 0px !important;
          display: flex;
        }
        .colon {
          padding: 0 18px 0px 12px;
        }
        #map {
          width: 800px;
          height: 500px;
          position: relative;
        }
        .info {
          position: absolute;
          // background:white;
          width: 190px;
          top: 0px;
          right: 0px;
          z-index: 2;
        }
        ::v-deep .el-input__inner {
          width: 340px;
          height: 40px;
        }
        ::v-deep .el-textarea__inner {
          width: 800px;
          height: 110px;
        }
      }
      .alarm-title{
        float:left;
        margin-top:29px;
      }
      .form-alarm {
        margin-top:33px;
        margin-left: 300px;
        width: 770px;
        ::v-deep .el-form-item .el-form-item__content {
          margin-left: 0px !important;
          display: flex;
        }
        .alarm-item {
          display: flex;
          justify-content: left;
          align-items: center;
          .item-list {
            width: 200px;
            margin: 0;
          }
          ::v-deep .el-form-item .el-form-item__label {
            text-align: justify;
            text-align-last: justify;
            padding: 0px;
            font-size: 16px;
          }
          .item-critical-value {
            margin: 0 18px;
          }
          .colon {
            padding: 0 18px 0px 12px;
          }
          .item-name {
            margin-left: 0px;
          }
          ::v-deep .el-input-number {
            width: 160px;
            height: 40px;
          }
          .el-input {
            display: inline;
          }
        }
        .alarm-time {
          margin-top:18px;
          margin-bottom:0;
          ::v-deep .el-form-item__label {
            width: 142px !important;
          }
          .colon {
            padding: 0 18px 0px 12px;
          }
          p{
            margin:0px;
          }
        }
        .alarm-remind {
              margin-top: 10px;
          ::v-deep .el-form-item__label {
            width: 142px !important;
          }
          .colon {
            padding: 0 18px 0px 12px;
          }
        }
      }
    }
  }
  .btn button{
    width:140px;
    height:42px
  }
}
</style>
