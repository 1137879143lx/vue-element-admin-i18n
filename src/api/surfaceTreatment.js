import request from '@/utils/request'

// 获取
export function getlist(params) {
  return request({
    url: '/api/surfaceTreatment',
    method: 'get',
    params
  })
}

// 新增
export function add(data) {
  return request({
    url: '/api/surfaceTreatment',
    method: 'post',
    data
  })
}

// 编辑
export function update(id, data) {
  return request({
    url: `/api/surfaceTreatment/${id}`,
    method: 'put',
    data
  })
}

// 删除
export function deletes(id) {
  return request({
    url: `/api/surfaceTreatment/${id}`,
    method: 'delete'
  })
}
