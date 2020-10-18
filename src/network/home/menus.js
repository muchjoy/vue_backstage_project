import { request } from '@/network/request'

export const getMenus = () => {
  return request({
    url: 'menus',
    method: 'get'
  })
}
