import request from '@/utils/request';

export function login(data) {
  return request({
    url: 'seller/enter',
    method: 'post',
    params: data
  })
}


export function register(data) {
  return request({
    url: 'seller/registered',
    method: 'post',
    params: data
  })
}


