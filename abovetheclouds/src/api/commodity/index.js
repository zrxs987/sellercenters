/**  =========================> *|`| % 商家管理 % |`|*<======================== **/

import request from '@/utils/request';


//获取商家列表
export function gitCommodityList(data) {
  return request({
    url: 'goods/select',
    method: 'post',
    params: data
  })
}

