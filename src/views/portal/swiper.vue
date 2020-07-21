<template>
  <div>
    <div class="block">
      <el-carousel
        trigger="click"
        :width=this.imgWidth
        :height=this.imgHeight
        :interval=this.interval
        arrow="always"
      >
        <el-carousel-item v-for="(item,index) in imgList" :key="index">
          <img :src="item.imgUrl" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "carrousel",
  props: {
    // interval: 每次定时器的间隔时间
    interval: {
      type: Number,
      // default: 默认的内容
      default: 3000
    },

    imgWidth: {
      type: String,
      default: "1920px"
    },
    imgHeight: {
      type: String,
      default: "560px"
    }
  },
  data() {
    return {
      imgList: [
        { imgUrl: "http://placehold.it/1920x560&text=Img1920x560-1" },
        {
          imgUrl: "http://placehold.it/1920x560&text=Img1920x560-2"
          // imgUrl:require("../../assets/portal_images/background_sy.png")
        }
      ]
    };
  },
  computed: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>