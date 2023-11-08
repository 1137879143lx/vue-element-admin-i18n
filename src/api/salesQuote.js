import request from '@/utils/request'

// 获取销售报价列表
export function getSalesQuotes(params) {
  return request({
    url: '/api/salesQuote',
    method: 'get',
    params
  })
}

// 新增销售报价
export function addSalesQuote(data) {
  return request({
    url: '/api/salesQuote',
    method: 'post',
    data
  })
}

// 更新销售报价
export function updateSalesQuote(id, data) {
  return request({
    url: `/api/salesQuote/${id}`,
    method: 'put',
    data
  })
}

// 删除销售报价
export function deleteSalesQuote(id) {
  return request({
    url: `/api/salesQuote/${id}`,
    method: 'delete'
  })
}
