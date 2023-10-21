import request from '@/utils/request'

// 查询xun
export function getlist() {
  return request({
    url: '/api/Customer/list',
    method: 'get'
  })
}
// 新增
export function add(data) {
  return request({
    url: '/api/Customer/add',
    method: 'post',
    data
  })
}
// 删除
export function del(data) {
  return request({
    url: '/api/Customer/del',
    method: 'post',
    data
  })
}
// 修改
export function edit(data) {
  return request({
    url: '/api/Customer/edit',
    method: 'post',
    data
  })
}
// 查询
export function search(data) {
  return request({
    url: '/api/Customer/search', // 假地址 自行替换
    method: 'post',
    data
  })
}
