import axios from 'axios'

export const request = (config) => {
  const instance = axios.create({
    baseURL: 'http://www.gx-blog.com:8888/api/private/v1/',
    timeout: 4000
  })
  // 请求拦截
  instance.interceptors.request.use(res => {
    if (res.url !== 'login') {
      res.headers.Authorization = window.sessionStorage.getItem('token')
    }
    return res
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, error => {
    console.log(error)
  })

  return instance(config)
}
