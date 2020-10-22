import { request } from '@/network/request'

// 获取商品列表
export const getGoods = (params) => {
  return request({
    url: 'goods',
    method: 'get',
    params
  })
}

// 根据商品id 删除 商品
export const deleteGoods = (id) => {
  return request({
    url: `goods/${id}`,
    method: 'delete'
  })
}
