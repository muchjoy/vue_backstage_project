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
    method: 'post'
  })
}
