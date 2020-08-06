import request from '@/utils/request'
import qs from 'qs'
export function getListDevicesWeb(params) {
  return request({
    url: `${process.env.VUE_APP_BACKGROUND_URL}/ia-planting/v1/device/listDevicesWeb`,
    method: 'post',
    data:params,
  })
}


