<template>
  <div class="device-management">
    <div class="management">
      <div class="change">
        <el-button type="primary" class="change-mode" @click="changeDeviceMode">
          <!-- <i :class="iconfont icon-chazhaobiaodanliebiao"></i> -->
          <i :class="{ 'iconfont': true, 'icon-chazhaobiaodanliebiao':deviceMode==='列表模式', 'icon-ditu':deviceMode!=='列表模式'}" />

          {{ deviceMode }}
        </el-button>
      </div>
      <div v-if="deviceMode==='列表模式'" class="icon-list">
        <ul>
          <li v-for="(item,index) in iconList" :key="index">
            <img :src="item.imgUrl" alt="">
            <p>{{ item.title }}</p>
          </li>
          
        </ul>
      </div>
      <div v-else class="device-list">
        <ul>
          <li>
            <el-button @click="toPage('/nested/menu2/menu2-2')">新增设备</el-button>
          </li>
          <li>
            <el-button @click="toPage('add')">报警记录</el-button>
          </li>
        </ul>
      </div>
    </div>
    <map-mode v-if="deviceMode==='列表模式'" />
    <list-mode v-else />
  </div>
</template>
<script>
import mapMode from '@/views/common/mapViewMode';
import listMode from './listMode';

export default {
  components: { mapMode, listMode },
  data() {
    return {
      deviceMode: '地图模式',
      iconList: [
        { imgUrl: require('@/assets/map_images/on-line.png'), title: '正常' },
        { imgUrl: require('@/assets/map_images/off-line.png'), title: '离线' },
        { imgUrl: require('@/assets/map_images/fault.png'), title: '故障' },
        { imgUrl: require('@/assets/map_images/warning.png'), title: '报警' }

      ]
    };
  },

  mounted() {},
  methods: {
    changeDeviceMode() {
      this.deviceMode = 
      this.deviceMode == '列表模式' ? '地图模式' : '列表模式'
    },
    toPage(param){
      this.$router.push({path:param})
    }
  }
};
</script>

<style lang="scss" scoped>
.device-management {
  height: 100%;
  padding: 0 20px 20px;
  background: white;
  font-size:14px;
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
          font-size:14px;
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
