import request from '@/utils/request'

export function getlist(params) {
  return request({
    url: '/api/materialCategory', //
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/api/materialCategory',
    method: 'post',
    data
  })
}

export function put(id, data) {
  return request({
    url: `/api/materialCategory/${id}`,
    method: 'put',
    data
  })
}

export function deletes(id) {
  return request({
    url: `/api/materialCategory/${id}`,
    method: 'delete'
  })
}
