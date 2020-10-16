import { request } from '@/network/request'
import qs from 'qs'

export const Login = (username, password) => {
  const data = qs.stringify({
    username,
    password
  })
  return request({
    url: 'login',
    method: 'POST',
    data
  })
}
