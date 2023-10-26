import request from '@/utils/request'

export function getlist(params) {
  return request({
    url: '/api/materialCategory', //
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/api/materialCategory',
    method: 'post',
    params
  })
}

export function put(params) {
  return request({
    url: '/api/materialCategory',
    method: 'put',
    params
  })
}

export function deletes(params) {
  return request({
    url: '/api/materialCategory',
    method: 'delete',
    params
  })
}
