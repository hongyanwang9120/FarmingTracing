<template>
  <div id="puzzle" ref="puzzle" style="display:inline-block;">

    <div
      class="puzzle-container"
    >
      <div :style="'position:relative;overflow:hidden;width:'+ dataWidth +'px;'">
        <div :style="'position:relative;width:' + dataWidth + 'px;height:' + dataHeight + 'px;'">
          <img
            id="scream"
            ref="scream"
            :src="imgRandom"
            :style="'width:' + dataWidth + 'px;height:' + dataHeight + 'px;'"
          >
          <canvas id="puzzle-box" ref="puzzleBox" :width="dataWidth" :height="dataHeight" />
        </div>
        <div
          class="puzzle-lost-box"
          :style="'left:' + left_Num + 'px;width:' + dataWidth + 'px;height:' + dataHeight + 'px;'"
        >
          <canvas id="puzzle-shadow" ref="puzzleShadow" :width="dataWidth" :height="dataHeight" />
          <canvas id="puzzle-lost" ref="puzzleLost" :width="dataWidth" :height="dataHeight" />
        </div>
        <p
          ref="verTips"
          class="ver-tips"
          :style="'height: '+22*scale+'px;line-height:'+22*scale+'px;bottom: ' + (displayTips==true ? 0 : -22*scale ) +'px;font-size: '+12*scale+'px;'"
        >
          <template v-if="verification">
            <span :style="'color:#42ca6b;line-height:'+ 22*scale+'px;'">验证通过</span>
            <span :style="'margin-left:'+4*scale+'px;line-height:'+ 22*scale+'px;'">哇喔,怪物吃了拼图,快去登录吧~</span>
          </template>
          <template v-if="!verification">
            <span :style="'color:red;line-height:'+22*scale+'px;'">验证失败:</span>
            <span :style="'margin-left:'+4*scale+'px;line-height:'+ 22*scale+'px;'">拖动滑块将悬浮图像正确拼合</span>
          </template>
        </p>
      </div>
      <div
        class="re-btn"
        :style="'height: '+28*scale+'px;padding: '+1*scale+'px '+16*scale+'px;font-size: '+18*scale+'px;'"
        @click="refreshImg"
      >
        <!-- <a-icon type="redo" /> -->
      </div>
    </div>
    <br>
    <div class="slider-container" :style="'width:' + dataWidth + 'px;'">
      <div class="slider-bar" :style="'border-radius:'+ 24*scale+'px;'">
        <p
          class="slider-bar-text select-none"
          onselectstart="return false"
          :style="'line-height:' + 28*scale + 'px;font-size:'+12*scale+'px;'"
        >向右拖动滑块填充拼图</p>
      </div>
      <div
        ref="sliderBtn"
        :class="[{'slider-btn':true}, {'slider-complete': isComplete}]"
        @mousedown="startMove"
        @touchstart="startMove"
      />
    </div>
  </div>
</template>

<script lang="js">

export default {
  name: 'Puzzle',
  props: {
    width: {
      type: [String, Number],
      default: 370
    },
    height: {
      type: [String, Number],
      default: 174
    },
    cropImage: {
      type: [Boolean],
      default: false
    },
    puzzleImgList: {
      type: Array,
      default: () => [
        // require('../../../public/31384703333230301f002a00_1594953794-20200717104317943.jpg'),
        'http://placehold.it/370x174&text=370x174'
      ]
    },
    PlSize: {
      type: [String, Number],
      default: 48
    },
    Deviation: {
      type: [String, Number],
      default: 4
    },
    padding: {
      type: [Number],
      default: 20
    },
    onSuccess: {
      type: Function,
      default: () => {
        console.log('验证成功')
      }
    },
    onError: {
      type: Function,
      default: () => {
        console.log('验证失败')
      }
    }
  },
  data() {
    return {
      moveStart: '',
      displayTips: false,
      verification: false,
      randomX: null,
      randomY: null,
      imgRandom: '',
      left_Num: 0,
      dataWidth: 370,
      dataHeight: 174,
      puzzleSize: 100,
      deviation: 11,
      scale: 1,
      reTimer: null,
      isleavePage: false,
      isComplete: false
    }
  },
  watch: {
  },
  mounted() {
    const self = this
    this.dataWidth = this.$refs.puzzle.clientWidth
    this.dataHeight = this.dataWidth * (this.height / this.width)
    this.scale = this.$refs.puzzle.clientWidth / 260
    this.puzzleSize = this.dataWidth * (this.PlSize / this.width)
    setTimeout(self.refreshImg, 0)
  },
  created() {
    const imgRandomNum = this.RandomNum(0, this.puzzleImgList.length - 1)
    this.imgRandom = this.puzzleImgList[imgRandomNum]
    this.puzzleSize = Number(this.PlSize)
    this.deviation = Number(this.Deviation)
  },
  beforeDestroy() {
    // 页面转移后取消鼠标事件
        document.removeEventListener('mousemove', this.moving)
      document.removeEventListener('touchmove', this.moving)
      document.removeEventListener('mouseup', this.moveEnd)
      document.removeEventListener('touchend', this.moveEnd)
    this.isleavePage = true
  },
  methods: {
    /* 刷新 */
    RandomNum(Min, Max) {
      const Range = Max - Min + 1
      const Rand = Math.random()
      return Min + Math.floor(Rand * Range)
    },
    refreshImg() {
      const imgRandomNum = this.RandomNum(0, this.puzzleImgList.length - 1)
      this.imgRandom = this.puzzleImgList[imgRandomNum]
      this.initCanvas()
    },
    /* 画布初始化 */
    initCanvas() {
      this.clearCanvas()

      // let self = this
      const w = this.dataWidth
      const h = this.dataHeight
      // let PL_Size = 48
      const PL_Size = this.puzzleSize
      const padding = 20
      const MinN_X = padding + PL_Size
      const MaxN_X = w - padding - PL_Size - PL_Size / 6
      const MaxN_Y = padding
      const MinN_Y = h - padding - PL_Size - PL_Size / 6
      this.randomX = this.RandomNum(MinN_X, MaxN_X)
      this.randomY = this.RandomNum(MinN_Y, MaxN_Y)
      console.log('随机x值：' + this.randomX, '----偏移量：' + this.deviation, '查看组,应该传递的值为：' + (this.randomX - 10) + ',误差为：' + this.deviation)
      const X = this.randomX
      const Y = this.randomY
      this.left_Num = -X + 10
      const d = PL_Size / 3

      const c = this.$refs.puzzleBox
      const c_l = this.$refs.puzzleLost
      const c_s = this.$refs.puzzleShadow
      const ctx = c.getContext('2d')
      const ctx_l = c_l.getContext('2d')
      const ctx_s = c_s.getContext('2d')
      ctx.globalCompositeOperation = 'xor'
      ctx.shadowBlur = 10
      ctx.shadowColor = '#fff'
      ctx.shadowOffsetX = 3
      ctx.shadowOffsetY = 3
      ctx.fillStyle = 'rgba(0,0,0,0.7)'
      ctx.beginPath()
      ctx.lineWidth = '1'
      ctx.strokeStyle = 'rgba(0,0,0,0)'
      ctx.moveTo(X, Y)
      ctx.lineTo(X + d, Y)
      ctx.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
      ctx.lineTo(X + 3 * d, Y)
      ctx.lineTo(X + 3 * d, Y + d)
      ctx.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d)
      ctx.lineTo(X + 3 * d, Y + 3 * d)
      ctx.lineTo(X, Y + 3 * d)
      ctx.closePath()
      ctx.stroke()
      ctx.fill()

      const img = new Image()
      img.src = this.imgRandom
      img.onload = function() {
        ctx_l.beginPath()
        ctx_l.strokeStyle = 'rgba(0,0,0,0)'
        ctx_l.moveTo(X, Y)
        ctx_l.lineTo(X + d, Y)
        ctx_l.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
        ctx_l.lineTo(X + 3 * d, Y)
        ctx_l.lineTo(X + 3 * d, Y + d)
        ctx_l.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d)
        ctx_l.lineTo(X + 3 * d, Y + 3 * d)
        ctx_l.lineTo(X, Y + 3 * d)
        ctx_l.closePath()
        ctx_l.stroke()
        ctx_l.shadowBlur = 10
        ctx_l.shadowColor = 'black'
        ctx_l.clip()
        ctx_l.drawImage(img, 0, 0, w, h)
      }
      ctx_s.beginPath()
      ctx_s.lineWidth = '1'
      ctx_s.strokeStyle = 'rgba(0,0,0,0)'
      ctx_s.moveTo(X, Y)
      ctx_s.lineTo(X + d, Y)
      ctx_s.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
      ctx_s.lineTo(X + 3 * d, Y)
      ctx_s.lineTo(X + 3 * d, Y + d)
      ctx_s.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d)
      ctx_s.lineTo(X + 3 * d, Y + 3 * d)
      ctx_s.lineTo(X, Y + 3 * d)
      ctx_s.closePath()
      ctx_s.stroke()
      ctx_s.shadowBlur = 20
      ctx_s.shadowColor = 'black'
      ctx_s.fill()
    },
    /* 通过重置画布尺寸清空画布，这种方式更彻底 */
    clearCanvas() {
      const c = this.$refs.puzzleBox
      const c_l = this.$refs.puzzleLost
      const c_s = this.$refs.puzzleShadow
      c.setAttribute('height', c.getAttribute('height'))
      c_l.setAttribute('height', c.getAttribute('height'))
      c_s.setAttribute('height', c.getAttribute('height'))
    },
    /* 按住滑块后初始化移动监听，记录初始位置 */
    startMove(e) {
      console.log(e)
      e = e || window.event
      this.$refs.sliderBtn.style.backgroundPosition = '0 -84px'
      this.moveStart = e.pageX || e.targetTouches[0].pageX
      this.addMouseMoveListener()
    },
    /* 滑块移动 */
    moving(e) {
      const self = this
      e = e || window.event
      const moveX = e.pageX || e.targetTouches[0].pageX
      const d = moveX - self.moveStart
      const w = self.dataWidth
      const PL_Size = this.puzzleSize
      const padding = 20
      if (self.moveStart === '') {
        return ''
      }
      if (d < 0 || d > (w - padding - PL_Size)) {
        return ''
      }
      self.$refs.sliderBtn.style.left = d + 'px'
      self.$refs.sliderBtn.style.transition = 'inherit'
      self.$refs.puzzleLost.style.left = d + 'px'
      self.$refs.puzzleLost.style.transition = 'inherit'
      self.$refs.puzzleShadow.style.left = d + 'px'
      self.$refs.puzzleShadow.style.transition = 'inherit'
    },
    /* 移动结束，验证并回调 */
    moveEnd(e) {
      const self = this
      e = e || window.event
      const moveEnd_X = (e.pageX || e.changedTouches[0].pageX) - self.moveStart
      
      const ver_Num = self.randomX - 10

      const deviation = this.deviation

      const Min_left = ver_Num - deviation
      const Max_left = ver_Num + deviation
console.log(ver_Num, Min_left, Max_left, '查看范围,鼠标位置为：' + moveEnd_X)
      if (self.moveStart !== '') {
        if (Max_left > moveEnd_X && moveEnd_X > Min_left) {
          self.displayTips = true
          self.verification = true
          self.isComplete = true
          
          setTimeout(function() {
            if (self.isleavePage) {
              return
            }
            self.displayTips = false
            self.isComplete = false
          self.$parent.$parent.showCaptchaModal(true)
            self.initCanvas()
          }, 2000)
          /* 成功的回调函数 */

          self.onSuccess();
        } else {
          self.displayTips = true
          self.verification = false
          setTimeout(function() {
            if (self.isleavePage) {
              return
            }
            self.displayTips = false
          }, 2000)
          /* 失败的回调函数 */
          self.onError()
        }
      }
      if (typeof (self.$refs.sliderBtn) !== 'undefined' && typeof (self.$refs.puzzleLost) !== 'undefined' && typeof (self.$refs.puzzleShadow) !== 'undefined') {
        self.reTimer = setTimeout(function() {
          if (self.isleavePage) {
            return
          }
          self.$refs.sliderBtn.style.left = 0
          self.$refs.sliderBtn.style.transition = 'left 0.5s'
          self.$refs.puzzleLost.style.left = 0
          self.$refs.puzzleLost.style.transition = 'left 0.5s'
          self.$refs.puzzleShadow.style.left = 0
          self.$refs.puzzleShadow.style.transition = 'left 0.5s'
        }, 1000)
        self.$refs.sliderBtn.style.backgroundPosition = '0 -84px'
      }
      self.moveStart = ''
    },
    /* 绑定滑块移动与滑动结束，移动过程中鼠标可在绑定的区域 */
    addMouseMoveListener() {
      const self = this
      document.addEventListener('mousemove', self.moving)
      document.addEventListener('touchmove', self.moving)
      document.addEventListener('mouseup', self.moveEnd)
      document.addEventListener('touchend', self.moveEnd)
    }

  }
}
</script>

<style scoped>
.slider-btn {
  position: absolute;
  width: 86px;
  height: 86px;
  left: -5px;
  top: -22px;
  z-index: 12;
  cursor: pointer;
  background-image:url('../../assets/captcha_images/slide.png');
  border-radius: 45%;
  display: flex;
}
.slider-complete{
background-image:url('../../assets/captcha_images/complete.png');
}
.slider-center-zzz {
  text-align: center;
  line-height: 67px;
  position: absolute;
  color: #53C300;
  height: 40px;
  width: 100%;
}
.ver-tips {
  position: absolute;
  left: 0;
  bottom: -22px;
  background: rgba(255, 255, 255, 0.9);
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  width: 100%;
  margin: 0;
  text-align: left;
  padding: 0 8px;
  transition: all 0.4s;
}
.slider-tips {
  bottom: 0;
}
.ver-tips i {
  display: inline-block;
  width: 22px;
  height: 22px;
  vertical-align: top;
  background-position: -4px -1229px;
}
.ver-tips span {
  display: inline-block;
  vertical-align: top;
  line-height: 22px;
  color: #455;
}
.active-tips {
  display: block;
}
.hidden {
  display: none;
}
.re-btn {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 28px;
  padding: 0 16px;
}
.re-btn a {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0px 0;
  background-position: 0 -1179px;
  cursor: pointer;
}
.re-btn a:hover {
  background-position: 0 -1193px;
}

.puzzle-container {
  position: relative;
  /* padding: 16px 16px 28px; */
  /* border: 1px solid #ddd; */
  background: #e0e1e3;
  /* border-radius: 16px; */

  /* height: 83px;  */
  /* width: 340px; */
}
.slider-container {
  position: relative;
  margin: auto;
}
.slider-bar {
  border: 1px solid #c3c3c3;
  border-radius: 24px;
  background: #e0e1e3;
  box-shadow: 0 1px 1px rgba(12, 10, 10, 0.2) inset;
  margin-top:12px;
      margin-left: 3px;
}
.slider-bar-text {
  line-height: 28px;
  margin: 0;
  text-align: center;
font-size:18px;
font-weight:400;
color:rgba(34,34,34,1);
}

#puzzle-box {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 22;
}
#puzzle-shadow {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 22;
}
#puzzle-lost {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 33;
}
.puzzle-lost-box {
  position: absolute;
  width: 260px;
  height: 116px;
  left: 0;
  top: 0;
  z-index: 111;
}
</style>

