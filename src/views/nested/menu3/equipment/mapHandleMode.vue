<template>


<div class="map-handle">
  <div class="info">
                  <input id="input_id" type="text" placeholder="请输入关键字进行搜索" />
                </div>
              <div id="map"></div>
              <i class="el-icon-full-screen full-screen" @click="fullScreen" ></i>

</div>  
            
</template>
<script>
import AMap from "AMap";
export default {
  data() {
    return {
      myMap: null,
      markers:[],
    };
  },

  mounted() {
    this.MapInit();
    this.MapClickOn()
  },

  methods: {

  launchFullscreen(element) {
	//此方法不可以在異步任務中執行，否則火狐無法全屏
	if(element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if(element.oRequestFullscreen) {
		element.oRequestFullscreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullScreen();
	} else {
		var docHtml = document.documentElement;
		var docBody = document.body;
		var mapBox = document.getElementById('map');
		var width = window.screen.width;
		var height = window.screen.height;
		var cssText = "width:" + width + ";height:" + height + ";overflow:hidden;";
		docHtml.style.cssText = cssText;
    docBody.style.cssText = cssText;
		document.IsFullScreen = true;
	}
},
fullScreen() {
  var mapBox = document.getElementById('map');
	this.launchFullscreen(mapBox);//开启全屏
},
 showInfoClick(e){
   this.myMap.remove(this.markers);
        var text = '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置单击了地图！'
        var marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        // icon: require("@/assets/map_images/fault.png"),
        position: [e.lnglat.getLng(), e.lnglat.getLat()],
      });
      this.markers.push(marker);
      this.myMap.add(marker);
      console.log(text)


    },
MapClickOn(){
console.log('123456')
        this.myMap.on('click', this.showInfoClick);
 
    },
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
          showControlButton: true,
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
          map: this.myMap,
        });
        AMap.event.addListener(autocomplete, "select", (e) => {
          placeSearch.setCity(e.poi.adcode);
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
          buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(25, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        _this.myMap.addControl(geoLocation);
        geoLocation.getCurrentPosition();
        AMap.event.addListener(geoLocation, "complete", _this.onMapComplete); //返回定位信息
        AMap.event.addListener(geoLocation, "error", _this.onMapError); //返回定位出错信息
      });
    },
      //解析定位信息
    onMapComplete(data) {
      var str = [];
      str.push("定位结果：" + data.position);
      str.push("定位类别：" + data.location_type);
      if (data.accuracy) {
        str.push("精度：" + data.accuracy + " 米");
      } //如为IP精确定位结果则没有精度信息
      str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
      console.log(str.join("<br>"));
    },
    onMapError(data) {
      console.log("失败原因排查信息:" + data.message);
    },
  },
};
</script>

<style lang="scss" scoped>
 #map {
          width: 100%;
          height: 100%;
          position: relative;
          
        }
.map-handle{
 width: 800px;
 height:500px;
 position:relative;
       
        .info {
              width: 190px;
    padding: 1px 16px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 3px;
 box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
         position:absolute;
         right:20px;top:5px;
        z-index:1;
           
        }
        .full-screen{
          width:20px;
          height:20px;
          background: white;
          border-radius: 3px;
          position:absolute;
          bottom:0;right:0;
          display:flex;
          justify-content: center;
          align-items: center;
        }
   
   }       
 
</style>
