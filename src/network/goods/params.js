import { request } from '@/network/request'

// 商品分类数据列表
export const getCategories = () => {
  return request({
    url: 'categories',
    method: 'get'
  })
}

// 参数列表
export const getAttributes = (id, sel) => {
  return request({
    url: `categories/${id}/attributes`,
    method: 'get',
    params: {
      sel
    }
  })
}

// 根据id请求参数
export const getDataById = (id, attrId, info) => {
  return request({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'get',
    params: {
      attr_sel: info
    }
  })
}

// 编辑提交参数
export const submitConfirm = (info) => {
  return request({
    url: `categories/${info.id}/attributes/${info.attrId}`,
    method: 'put',
    data: {
      attr_name: info.attr_name,
      attr_sel: info.attr_sel
    }
  })
}

// 删除参数
export const deleteConfirm = (id, attrid) => {
  return request({
    url: `categories/${id}/attributes/${attrid}`,
    method: 'delete'
  })
}

// 添加属性
export const ParameterData = (info) => {
  return request({
    url: `categories/${info.id}/attributes`,
    method: 'post',
    data: {
      attr_name: info.attr_name,
      attr_sel: info.attr_sel
    }
  })
}

// 添加动态参数
export const manyParameterData = (info) => {
  return request({
    url: `categories/${info.id}/attributes/${info.attrId}`,
    method: 'put',
    data: {
      attr_name: info.attr_name,
      attr_sel: info.attr_sel,
      attr_vals: info.attr_vals
    }
  })
}
