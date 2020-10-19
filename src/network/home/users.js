import { request } from '@/network/request'

// 获取用户信息
export const getData = (data) => {
  return request({
    url: 'users',
    method: 'get',
    params: data
  })
}

// 修改用户状态
export const modifyUser = (id, type) => {
  return request({
    url: `users/${id}/state/${type}`,
    method: 'put'
  })
}

// 添加用户
export const addUserInfo = (form) => {
  return request({
    url: 'users',
    method: 'post',
    data: form
  })
}

// 编辑用户 获取用户信息
export const editUser = (id) => {
  return request({
    url: `users/${id}`,
    method: 'get'
  })
}

// 编辑用户,确认信息
export const editSubmit = (id, email, mobile) => {
  return request({
    url: `users/${id}`,
    method: 'put',
    data: {
      email,
      mobile
    }
  })
}

// 删除用户
export const deleteUser = (id) => {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 修改权限
export const powerEdit = (id) => {
  return request({
    url: `users/${id}/role`,
    method: 'put'
  })
}

// 获取角色列表
export const getPower = () => {
  return request({
    url: 'roles',
    method: 'get'
  })
}
