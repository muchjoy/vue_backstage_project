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

// 商品分类数据列表
export const getGoodsList = () => {
  return request({
    url: 'categories',
    method: 'get'
  })
}

// 获取动态参数列表
export const getManyDataList = (id, type) => {
  return request({
    url: `categories/${id}/attributes`,
    method: 'get',
    params: {
      sel: type
    }
  })
}

// 添加商品
export const addGoodsData = (data) => {
  return request({
    url: 'goods',
    method: 'post',
    data
  })
}
