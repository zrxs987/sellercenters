/**  =========================> *|`| % 发货管理 % |`|*<======================== **/

import request from '@/utils/request'


// 查省
export function getAddressInfo(data,type) {
  return request({
    url: 'area/selectAllProvinceArea',
    method: 'post',
    data:(type,data)
  })
}

//查市
export function getCity(data,type) {
  return request({
    url: 'area/selectAllListByParentId',
    method: 'post',
    data:(type,data)
  })
}

// 查物流公司
export function getLogisticsCompany(data) {
  return request({
    url: 'express/select',
    method: 'post',
    data:data
  })
}

// 商家订单状态
// export function getOrderstate(data) {
//   return request({
//     url: 'orders/ordersState',
//     method: 'post',
//     data:data
//   })
// }
