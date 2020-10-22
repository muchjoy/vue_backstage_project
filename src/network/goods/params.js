import { request } from '@/network/request'

// 商品分类数据列表
export const getCategories = () => {
  return request({
    url: 'categories',
    method: 'get'
  })
}
