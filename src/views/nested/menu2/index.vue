<template>
  <div class="device-management">
    <div class="management">
      <div class="change">
        <el-button type="primary" class="change-mode" @click="changeDeviceMode">
          <!-- <i :class="iconfont icon-chazhaobiaodanliebiao"></i> -->
          <i :class="{ 'iconfont': true, 'icon-chazhaobiaodanliebiao':deviceMode==='列表模式', 'icon-ditu':deviceMode!=='列表模式'}"></i>

          {{deviceMode}}
        </el-button>
      </div>
      <div class="icon-list" v-if="deviceMode==='列表模式'">
        <ul>
          <li v-for="(item,index) in iconList" :key="index">
            <img :src=item.imgUrl alt="" />
            <p>{{item.title}}</p>
          </li>
          
        </ul>
      </div>
      <div class="device-list" v-else>
        <ul>
          <li >
            <el-button>新增设备</el-button>
          </li>
          <li >
            <el-button>报警记录</el-button>
          </li>
        </ul>
      </div>
    </div>
    <map-mode v-if="deviceMode==='列表模式'"></map-mode>
    <list-mode v-else></list-mode>
  </div>
</template>
<script>
import mapMode from "./mapMode";
import listMode from "./listMode";

export default {
  components: { mapMode,listMode},

  mounted() {},
  data() {
    return {
      deviceMode:"列表模式",
      iconList:[
        {imgUrl:require("@/assets/map_images/on-line.png"),title:"正常"},
        {imgUrl:require("@/assets/map_images/off-line.png"),title:"离线"},
        {imgUrl:require("@/assets/map_images/fault.png"),title:"故障"},
        {imgUrl:require("@/assets/map_images/warning.png"),title:"报警"}

      ]
    };
  },
  methods: {
    changeDeviceMode(){
      this.deviceMode= 
      this.deviceMode=="列表模式"?"地图模式":"列表模式"
    }
  }
};
</script>

<style lang="scss" scoped>
.device-management {
  height: 100%;
  padding: 0 20px 20px;
  background: white;
  .management {
    height: 96px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .change {
      .change-mode {
        width: 170px;
        height: 60px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    .icon-list{
        ul{
           display: flex;
          justify-content: space-around;
          align-items: center;
          width:340px;

          li{
            list-style:none;
            p{
              margin:0px
            }
          }
         
        }
    }
    .device-list{
      ::v-deep .el-button--default{
        width:120px;
        height:42px;
      }
      ul{
           display: flex;
          justify-content: space-between;
          align-items: center;
          width:300px;
       li{
            list-style:none;
           
          }
      }
    }
  }
}
</style>
