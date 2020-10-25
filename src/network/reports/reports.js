import { request } from '@/network/request'

export const getData = () => {
  return request({
    url: 'reports/type/1',
    method: 'get'
  })
}
