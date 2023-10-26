import request from '@/utils/request'

// 获取物料类型列表
export function getMaterialTypes(params) {
  return request({
    url: '/api/material-types',
    method: 'get',
    params
  })
}

// 新增物料类型
export function addMaterialType(data) {
  return request({
    url: '/api/material-types',
    method: 'post',
    data
  })
}

// 编辑物料类型
export function editMaterialType(id, data) {
  return request({
    url: `/api/material-types/${id}`,
    method: 'put',
    data
  })
}

// 删除物料类型
export function deleteMaterialType(id) {
  return request({
    url: `/api/material-types/${id}`,
    method: 'delete'
  })
}
