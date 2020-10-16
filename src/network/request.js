import axios from 'axios'

export const request = (config) => {
  const instance = axios.create({
    baseURL: 'http://www.gx-blog.com:8888/api/private/v1/',
    timeout: 4000
  })
  instance.interceptors.response.use(res => {
    return res.data
  }, error => {
    console.log(error)
  })

  return instance(config)
}
