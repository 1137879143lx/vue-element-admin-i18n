import request from '@/utils/request'

export function getlist(params) {
  return request({
    url: '/api/units',
    method: 'get',
    params
  })
}

export function addUnit(data) {
  return request({
    url: '/api/units',
    method: 'post',
    data
  })
}

export function updateUnit(id, data) {
  return request({
    url: `/api/units/${id}`,
    method: 'put',
    data
  })
}

export function deleteUnit(id) {
  return request({
    url: `/api/units/${id}`,
    method: 'delete'
  })
}
