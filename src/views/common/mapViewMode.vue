<template>
  <div class="container">
    <div class="markerMsg" v-if="selectObj">
      <h4>3号溶解氧传感器</h4>
      <div class="details">
        <div>
          <p>
         
              <span class="objAttr">地块信息</span> : 
              <span class="objVal">{{selectObj.name}}</span>
           
            </p>
            <p>
            
              <span class="objAttr">物联网卡号</span> : 
              <span class="objVal">{{selectObj.switchId}}</span>
           
          </p>
        </div>
        <hr />
        <div>
          <p>
          <span class="objAttr">备注</span> : 
          <span class="objVal">我的文字内容我的文的的文。</span>
          </p>
        </div>
      </div>
    </div>
    <div id="map" class="map" />
  </div>
</template>

<script>
import AMap from "AMap";

export default {
  data() {
    return {
      myMap: null,
      markers: [],
      selectObj:null,
      lnglats: [
        {
          name: "开关站一",
          position: [121.36045, 28.58084],
          switchId: "1130106795548045314",
          iconType: "0",
        },
        {
          name: "开关站二",
          position: [121.32045, 28.58084],
          switchId: "1132939997339811841",
          iconType: "1",
        },
        {
          name: "开关站三",
          position: [121.35045, 28.55084],
          switchId: "1130106795548045314",
          iconType: "2",
        },
        {
          name: "开关站四",
          position: [121.33045, 28.55084],
          switchId: "1130106795548045314",
          iconType: "3",
        },
      ],
    };
  },
  mounted() {

    const self = this;
    self.MapInit();
    self.mapInitMarker();
    // AMap.plugin("AMap.Geolocation", function() {
    //   var geolocation = new AMap.Geolocation({
    //     // 是否使用高精度定位，默认：true
    //     enableHighAccuracy: true, // 设置定位超时时间，默认：无穷大
    //     timeout: 10000, // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
    //     buttonOffset: new AMap.Pixel(10, 20), // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //     // zoomToAccuracy: true, // 定位按钮的排放位置, RB表示右下
    //     // buttonPosition: "RB"
    //   });

    //   geolocation.getCurrentPosition();

    //   AMap.event.addListener(geolocation, "complete", e => {
    //     console.log(e); // 定位成功之后做的事 // 初始化地图
    //     self.MapInit();
    //     self.mapInitMarker();
    //     // 构造点标记
    //     // self.mapAddMarker()
    //   });

    //   AMap.event.addListener(geolocation, "error", e => {
    //     console.log(e); // 定位失败做的事
    //   });
    // });
  },
  methods: {
    MapInit() {
      // let _this = this;
      this.myMap = new AMap.Map("map", {
        animateEnable:true,
        center: [121.35045, 28.55084],
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
    },
    mapInitMarker() {
      const self = this;
      for (let i = 0; i < this.lnglats.length; i++) {
        const marker = new AMap.Marker({
          map: this.myMap,
          icon: this.iconUrlChange(this.lnglats[i].iconType),
          anchor: "bottom-center",
          position: this.lnglats[i].position,
        });
        this.markers.push(marker);
        // marker.setMap(this.myMap);
        // 将switchId添加进marker
        // marker.switchId = this.lnglats[i].switchId;
        // 设置label标签
        // label默认蓝框白底左上角显示，样式className为：amap-marker-label
        // marker.setLabel({
        //   offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
        //   content: this.lnglats[i].name, //设置文本标注内容
        //   direction: "top" //设置文本标注方位
        // });
        // 给标记加一个点击事件，传入对应的参数
        marker.on("click", function (e) {
          self.myMap.remove(self.markers);
          self.lnglats[i].iconType = self.lnglats[i].iconType.includes("B")
            ? self.lnglats[i].iconType.split("B")[0]
            : self.lnglats[i].iconType + "B" ;
          self.mapInitMarker();
          self.selectObj=self.lnglats[i];
          // sessionStorage.setItem('switchId',e.target.switchId)
          // that.$router.push('/sec/innerBox')
        });
      }
    },
    iconUrlChange(type) {
      let iconUrl = ""; // 结果
      switch (type) {
        case "0":
          iconUrl = require("@/assets/map_images/fault.png");
          break;
        case "1":
          iconUrl = require("@/assets/map_images/off-line.png");
          break;
        case "2":
          iconUrl = require("@/assets/map_images/on-line.png");
          break;
        case "3":
          iconUrl = require("@/assets/map_images/warning.png");
          break;
        case "0B":
          iconUrl = require("@/assets/map_images/fault_02.png");
          break;
        case "1B":
          iconUrl = require("@/assets/map_images/off-line_02.png");
          break;
        case "2B":
          iconUrl = require("@/assets/map_images/on-line_02.png");
          break;
        case "3B":
          iconUrl = require("@/assets/map_images/warning_02.png");
          break;

        default:
          iconUrl = "";
          break;
      }
      return iconUrl;
    },
    // mapAddMarker() {
    //   var marker = new AMap.Marker({
    //     // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    //     icon: require("@/assets/map_images/fault.png"),
    //     position: [116.405467, 39.907761],
    //   });

    //   this.myMap.add(marker);
    //   // 鼠标点击marker弹出自定义的信息窗体
    //   AMap.event.addListener(marker, "click", () => {
    //     // 想在此处调用后台接口，获取新的数据 并且拼接在content原有数据后面，并在弹窗中展现出来，无奈 没办法实现，求大佬支招。无论怎么操作弹窗都只有原有数据。
    //     console.log(marker.getPosition(), "333");
    //     // infoWindow.open(map, marker.getPosition());
    //   });
    // },
  },
};
</script>

<style  lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100% - 60px);
  //   position: absolute;
  //   left: 50%;
  //   top: 50%;
  //   transform: translate3d(-50%, -50%, 0);
  position: relative;
  border: 1px solid #999;
  .markerMsg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 403px;
    max-height: 234px;
    overflow: auto;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(206, 240, 251, 1);
    h4 {
      height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 0;
    font-size: 20px;
    font-weight: 400;
    color: rgba(34,34,34,1);
    background: #cef0fb;
    }
    .details {
      padding: 21px 30px;
      div p .objAttr {
        display: inline-block;
        width:82px;
        font-size:15px;
        font-weight:400;
        color:rgba(34,34,34,1);
        text-align:justify;
        text-align-last:justify;
        
        // text-justify:distribute-all-lines; 
      }
    }
  }
  #map {
    height: 100%;
  }
}
</style>
