import request from '@/utils/request'

export function getListDevicesWeb(params) {
  return request({
    url: '/ia-planting/v1/device/listDevicesWeb',
    method: 'post',
    params:params||{}
  })
}
