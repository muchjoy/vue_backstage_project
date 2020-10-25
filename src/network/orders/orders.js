import { request } from '@/network/request'

export const getDataList = (params) => {
  return request({
    url: 'orders',
    method: 'get',
    params
  })
}
