<template>
  <div class="equipment">
    <div class="equipment-note">
      <img src="@/assets/equipment_images/equipment.png" alt />
      <span>新增设备</span>
    </div>
    <div class="equipment-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="information">
          <div class="title">
            <img src="@/assets/equipment_images/Basic information.png" alt />
            <span>基本信息</span>
          </div>
          <div class="form-msg">
            <el-form-item label="活动名称 : " prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="设备识别码 : " prop="code">
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
            <el-form-item label="设备类型 : " prop="type">
              <el-input v-model="ruleForm.type"></el-input>
            </el-form-item>
            <el-form-item label="设备供应商 : " prop="suppliers">
              <el-input v-model="ruleForm.suppliers"></el-input>
            </el-form-item>
            <el-form-item label="物联网卡号 : " prop="card">
              <el-input v-model="ruleForm.card"></el-input>
            </el-form-item>

            <el-form-item label="备注 : " prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="设备地址 : " prop="address">
              <div id="map" class="map">
                <div class="info">
                  <input id="input_id" type="text" placeholder="请输入关键字进行搜索" />
                </div>
              </div>
            </el-form-item>
          </div>
          <hr />
        </div>
        <!-- <el-form-item label="活动性质" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import AMap from "AMap";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        code: "",
        type: "",
        suppliers: "",
        card: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入设备识别码", trigger: "blur" },
        ],
      },
      myMap: null,
    };
  },

  mounted() {
    this.MapInit();
  },

  methods: {
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
    //地图相关
    MapInit() {
      let _this = this;
      this.myMap = new AMap.Map("map", {
        animateEnable: true,
        rotateEnable: true,
        //  center:[]
        viewMode: "3D",
        mapStyle: "amap://styles/grey", // 设置地图的显示样式
        layers: [
          // 卫星
          new AMap.TileLayer.Satellite(),
          // 路网
          new AMap.TileLayer.RoadNet(),
        ],
        resizeEnable: true,
        zoom: 12,
      });

      //控制条
      this.myMap.plugin(["AMap.ControlBar"], function () {
        var controlBar = new AMap.ControlBar({
          showZoomBar: true,
          showZoomBar: true,
          position: { top: "10px", left: "-95px" },
        });
        _this.myMap.addControl(controlBar);
      });
      // 搜索功能
      AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], () => {
        let autoOptions = {
          input: "input_id",
        };

        let autocomplete = new AMap.Autocomplete(autoOptions);

        let placeSearch = new AMap.PlaceSearch({
          // city:'北京',
          map: this.myMap,
        });
        AMap.event.addListener(autocomplete, "select", (e) => {
          // TODO 针对选中的POI实现自己的功能
          // placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name);
        });

        AMap.event.addListener(placeSearch, "markerClick", (e) => {
          let location = e.data.location;
          console.log(
            `名称：${e.data.name}\n经纬度：${location.lng},${location.lat}`
          );
        });
      });

      //定位
      this.myMap.plugin("AMap.Geolocation", function () {
        let geoLocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        _this.myMap.addControl(geoLocation);
        geoLocation.getCurrentPosition();
        // AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        // AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.equipment {
  height: 100%;
  padding: 0 0px 20px;
  background: white;
  font-size: 14px;
  .equipment-note {
    height: 50px;
    padding: 0 20px;
    line-height: 50px;
    background: rgba(230, 232, 240, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 400;
    color: rgba(34, 34, 34, 1);
    img {
      width: 25px;
      height: 25px;
      margin-right: 18px;
    }
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
      }
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
}
</style>
