import { request } from '@/network/request'

// 商品分类数据列表
export const getCategories = (params) => {
  return request({
    url: 'categories',
    method: 'get',
    params
  })
}

// 获取父级分类数据列表
export const getParent = () => {
  return request({
    url: 'categories',
    method: 'get',
    params: {
      type: 2
    }
  })
}

// 删除分类
export const deleteSort = (id) => {
  return request({
    url: `categories/${id}`,
    method: 'delete'
  })
}

// 编辑提交分类
export const modifySort = (id, val) => {
  return request({
    url: `categories/${id}`,
    method: 'put',
    data: {
      cat_name: val
    }
  })
}

// 添加分类
export const addSort = (data) => {
  return request({
    url: 'categories',
    method: 'post',
    data
  })
}
