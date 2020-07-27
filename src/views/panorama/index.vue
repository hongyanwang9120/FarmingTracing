<template>
  <div class="panorama-container">
    <div class="panorama-text">这是全景name: {{ name }}</div>
    <div id="pano" class="main" style="background-color: rgb(0, 0, 0);">
      <!-- <canvas
        width="700"
        height="974"
        class="panolens-canvas"
        style="width: 700px; height: 974px;"
      ></canvas> -->
      <div
        style="
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          background: transparent;
          display: none;
        "
      />
      <div
        style="
          width: 100%;
          height: 44px;
          float: left;
          transform: translateY(-100%);
          background: -webkit-linear-gradient(
            bottom,
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0)
          );
          transition: all 0.27s ease 0s;
          pointer-events: none;
        "
      >
        <span
          style="
            padding: 5px 0px;
            position: fixed;
            bottom: 100%;
            right: 14px;
            background-color: rgb(250, 250, 250);
            font-size: 14px;
            visibility: hidden;
            opacity: 0;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 12pt;
            border-radius: 2px;
            overflow: hidden;
            will-change: width, height, opacity;
            pointer-events: auto;
            transition: all 0.27s ease 0s;
            width: 200px;
          "
        ><a
          type="item"
          style="
              display: block;
              padding: 10px 10px 10px 20px;
              text-decoration: none;
              cursor: pointer;
              pointer-events: auto;
              transition: all 0.27s ease 0s;
            "
        >Control<span
          style="
                float: right;
                width: 17px;
                height: 17px;
                margin-left: 12px;
                background-size: cover;
                background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTguNTksMTYuNThMMTMuMTcsMTJMOC41OSw3LjQxTDEwLDZMMTYsMTJMMTAsMThMOC41OSwxNi41OFoiIC8+PC9zdmc+');
              "
        /><span
          style="font-size: 13px; font-weight: 300; float: right;"
        >Mouse</span></a><a
          type="item"
          style="
              display: block;
              padding: 10px 10px 10px 20px;
              text-decoration: none;
              cursor: pointer;
              pointer-events: auto;
              transition: all 0.27s ease 0s;
            "
        >Mode<span
          style="
                float: right;
                width: 17px;
                height: 17px;
                margin-left: 12px;
                background-size: cover;
                background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTguNTksMTYuNThMMTMuMTcsMTJMOC41OSw3LjQxTDEwLDZMMTYsMTJMMTAsMThMOC41OSwxNi41OFoiIC8+PC9zdmc+');
              "
        /><span
          style="font-size: 13px; font-weight: 300; float: right;"
        >Normal</span></a></span><span
          style="
            cursor: pointer;
            float: right;
            width: 44px;
            height: 100%;
            background-size: 60%;
            background-repeat: no-repeat;
            background-position: center center;
            user-select: none;
            position: relative;
            pointer-events: auto;
            background-image: url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik03IDE0SDV2NWg1di0ySDd2LTN6bS0yLTRoMlY3aDNWNUg1djV6bTEyIDdoLTN2Mmg1di01aC0ydjN6TTE0IDV2MmgzdjNoMlY1aC01eiIvPgo8L3N2Zz4=');
          "
        />
      </div>
    </div>
    <div class="time">
      <p id="timeDisplay">2020-07-17 10:41:55</p>
    </div>
    <ul id="list" class="list">
      <li class="li">
    
        <img
          src="../../assets/panorama_images/wKgBKF3LlMmAQ3cVAAAM7VcYeJY958.png"
        >
        <p style="margin-top: 10px;">27.74℃</p>
      </li>
      <li class="li">
        <img
          src="../../assets/panorama_images/wKgBKF3LlMmAWavfAAAOPshRT0s390.png"
        >
        <p style="margin-top: 10px;">100.0RH%</p>
      </li>
      <li class="li">
        <img
          src="../../assets/panorama_images/wKgBn13LlNmAMfVFAAAM7VcYeJY489.png"
        >
        <p style="margin-top: 10px;">997.1hPa</p>
      </li>
      <li class="li">
        <img
          src="../../assets/panorama_images/wKgBKF3LlMmABazJAAALyFZFBhs061.png"
        >
        <p style="margin-top: 10px;">27953.2lux</p>
      </li>
    </ul>
    <input
      id="pic"
      type="hidden"
      value="/31384703333230301f002a00_1594953794-20200717104317943.jpg"
    >
    <input id="time" type="hidden" value="2020-07-17 10:41:55">
    <ul style="display: none;">
      <li class="li1">
        http://220.170.144.56:22999/group1/M00/00/64/wKgBKF3LlMmAQ3cVAAAM7VcYeJY958.png
      </li>
      <li class="li1">
        http://220.170.144.56:22999/group1/M00/00/64/wKgBKF3LlMmAWavfAAAOPshRT0s390.png
      </li>
      <li class="li1">
        http://220.170.144.56:22999/group1/M00/00/08/wKgBn13LlNmAMfVFAAAM7VcYeJY489.png
      </li>
      <li class="li1">
        http://220.170.144.56:22999/group1/M00/00/64/wKgBKF3LlMmABazJAAALyFZFBhs061.png
      </li>
    </ul>
    <ul style="display: none;">
      <li class="li2">27.74℃</li>
      <li class="li2">100.0RH%</li>
      <li class="li2">997.1hPa</li>
      <li class="li2">27953.2lux</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ImagePanorama, Panorama, Viewer } from '@/lib/panolens.module.js'
export default {
  name: 'Panorama',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
 var panorama;
        var viewer;
        var images;
        var index = 0;
        var renewDuration = 10000;
      
      var container = document.getElementById('pano');
      // viewer = new PANOLENS.Viewer({
  
      viewer = new Viewer({
        container: container,
        controlButtons: ['fullscreen'],
        autoRotate: true,
        autoRotateActivationDuration: 2000,
        autoRotateSpeed: 0.3
      });
      function renew() {
        var val = document.getElementById('pic').value;
        panorama && panorama.dispose() && viewer.remove(panorama);
        // panorama = new PANOLENS.ImagePanorama(val);
        panorama = new ImagePanorama(val);
 
        viewer.add(panorama);
      }
      renew();
    })
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
* {
        margin: 0;
        padding: 0;
      }
      .main {
        width: 100vw;
        height: 100vh;
        margin: 0 auto;
        overflow: hidden;
      }
      .time {
        text-align: center;
        color: white;
        font-size: 20px;
        font-weight: 500;
        position: absolute;
        z-index: 20;
        top: 15px;
        left: 20px;
      }
      .list {
        position: absolute;
        z-index: 20;
        width: 800px;
        top: 120px;
        left: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        transform: translateX(-50%);
      }
      .li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        flex-grow: 2;
        flex-shrink: 1;
      }
.panorama {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
<style id="panolens-style-addon" scoped>
      :-webkit-full-screen {
        width: 100% !important;
        height: 100% !important;
      }
    </style>
