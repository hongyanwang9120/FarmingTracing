import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import './assets/css/icon/iconfont.css'
// import VueAMap from 'vue-amap'
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//   key: 'f0270d0e5ef5ec0659bbde180d7005f5',
//   plugin: [
//     'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder','AMap.ElasticMarker',
//     'AMap.AdvancedInfoWindowr','AMap.Autocomplete','AMap.DistrictSearch','AMap.DragRoute','AMap.Geocoder','AMap.CitySearch','AMap.MouseTool','AMap.CircleEditor',
//     'AMap.PolyEditor','AMap.MarkerClusterer','AMap.RangingTool','AMap.CloudDataLayer','AMap.CloudDataSearch','AMap.Weather'
//   ],
//   v: '1.4.4',
//   uiVersion: '1.0'})


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
