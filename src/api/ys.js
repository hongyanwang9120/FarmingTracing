import request from '@/utils/request'
import qs from 'qs'
export function getAccessToken(params) {
  return request({
    url: 'https://open.ys7.com/api/lapp/token/get',
    method: 'post',
    requestHeader:{
    	"Content-type":"application/x-www-form-urlencoded"
    },
    data:qs.stringify(params),
    flag:true
  })
}
