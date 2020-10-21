import { request } from '@/network/request'

// 所有权限 列表
export const rightsList = () => {
  return request({
    url: 'rights/list',
    method: 'get'
  })
}

// 角色列表
export const userLsit = () => {
  return request({
    url: 'roles',
    method: 'get'
  })
}

// 根据id 获取角色
export const userPower = (id) => {
  return request({
    url: `roles/${id}`,
    method: 'get'
  })
}

// 提交编辑角色
export const editPowerUser = (id, info) => {
  return request({
    url: `roles/${id}`,
    method: 'put',
    data: info
  })
}

// 根据id删除角色
export const deletePowerUser = (id) => {
  return request({
    url: `roles/${id}`,
    method: 'delete'
  })
}

// 删除角色指定权限
export const deleteUserPower = (roleId, rightId) => {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

// 所有权限 树形
export const getAllTree = () => {
  return request({
    url: 'rights/tree',
    method: 'get'
  })
}

// 添加角色
export const addUserInfo = (data) => {
  return request({
    url: 'roles',
    method: 'post',
    data
  })
}

// 角色授权
export const addUserPower = (roleId, rids) => {
  return request({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids
    }
  })
}
