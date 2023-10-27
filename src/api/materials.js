import request from '@/utils/request'

export function getMaterials(params) {
  return request({
    url: '/api/materials',
    method: 'get',
    params
  })
}

export function addMaterial(data) {
  return request({
    url: '/api/materials',
    method: 'post',
    data
  })
}

export function editMaterial(id, data) {
  return request({
    url: `/api/materials/${id}`,
    method: 'put',
    data
  })
}

export function deleteMaterial(id) {
  return request({
    url: `/api/materials/${id}`,
    method: 'delete'
  })
}