<template>
  <div style="padding:30px;">
    1-456789
    <iframe
      :src=linkUrl
      width="600"
      height="400"
      id="ysOpenDevice"
      allowfullscreen
    ></iframe>
  </div>
</template>
<script>
import { getAccessToken } from '@/api/ys'
import qs from 'qs'
import axios from 'axios'
export default {
  data() {
    return {
      iframeObj:{
        "AppKey":"ccba7185a57c4d54802a59c1dcc53532",
        "AccessToken":"at.7c2qvg3o4liriux52px9xc7f1hjul4a7-2306dorv75-1rqb151-8xc6hshmk",
        "Url":"ezopen://open.ys7.com/D44297872/1.hd.live"},
      linkUrl:null,
    }
  },
   created() {
     this.linkUrl=process.env.VUE_APP_YS_URL + this.iframeObj.Url+"&autoplay=1&accessToken="+this.iframeObj.AccessToken
   
    //请求萤石access
    getAccessToken({
    	appKey:'ccba7185a57c4d54802a59c1dcc53532',
      appSecret:'83536573dd4ea7ae22951abd2fd8ac5d'
    }).then(response => {
      console.log(response)
    }).catch(req=>{
      console.log(req)
    })

    },
  mounted() {
   this.playerInit()

    
   
  },
  methods: {
    playerInit(){
    // * 获取播放器元素 
let player = document.getElementById('ysOpenDevice').contentWindow;
/* iframe 支持方法 */

// player.postMessage("play", "https://open.ys7.com/ezopen/h5/iframe") /* 播放 */
// player.postMessage("stop", "https://open.ys7.com/ezopen/h5/iframe") /* 结束 */
// player.postMessage("capturePicture", "https://open.ys7.com/ezopen/h5/iframe") /* 截图 */
// player.postMessage("openSound", "https://open.ys7.com/ezopen/h5/iframe") /* 开启声音 */
// player.postMessage("closeSound", "https://open.ys7.com/ezopen/h5/iframe") /* 关闭声音 */
// player.postMessage("startSave", "https://open.ys7.com/ezopen/h5/iframe") /* 开始录制 */
// player.postMessage("stopSave", "https://open.ys7.com/ezopen/h5/iframe") /* 结束录制 */
    }
  },
 
}
</script>
