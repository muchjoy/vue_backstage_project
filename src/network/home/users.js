import { request } from '@/network/request'

export const getData = (data) => {
  return request({
    url: 'users',
    method: 'get',
    params: data
  })
}
