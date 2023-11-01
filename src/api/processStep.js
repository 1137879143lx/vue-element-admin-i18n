import request from '@/utils/request'

// 获取加工工序列表
export function get(params) {
  return request({
    url: '/api/processSetting',
    method: 'get',
    params
  })
}

// 新增加工工序
export function add(data) {
  return request({
    url: '/api/processSetting',
    method: 'post',
    data
  })
}

// 编辑加工工序
export function update(id, data) {
  return request({
    url: `/api/processSetting/${id}`,
    method: 'put',
    data
  })
}

// 删除加工工序
export function deletes(id) {
  return request({
    url: `/api/processSetting/${id}`,
    method: 'delete'
  })
}
