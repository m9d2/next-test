import axios, {InternalAxiosRequestConfig} from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
// 创建一个 axios 实例
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log('baseURL', baseURL)
const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000, // 设置请求超时为10秒
  headers: {
    'Content-Type': 'application/json'
  }
})

// instance.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const token = localStorage.getItem('authToken')
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// 请求拦截器，处理请求参数，如果参数中包含current，pageSize，将其替换为page和size
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.data && config.data.current && config.data.pageSize) {
      config.data.page = config.data.current - 1
      config.data.size = config.data.pageSize
      delete config.data.current
      delete config.data.pageSize
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：处理响应错误，统一处理不同状态码的情况
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 根据需求处理响应数据（你可以在这里做额外的数据转换等）
    return response.data
  },
  (error) => {
    // 这里可以统一处理错误（如全局提示）
    if (error.response) {
      const status = error.response.status
      if (status === 401) {
        // 处理未授权，跳转登录页面等
        console.error('Unauthorized, please log in again.')
      } else if (status === 500) {
        console.error('Server error, please try again later.')
      } else {
        console.error(error.response.data.message || 'An error occurred')
      }
    } else {
      console.error('Network error or timeout occurred')
    }
    return Promise.reject(error)
  }
)

// 封装请求方法
const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return instance(config)
}

// 提供具体的 GET/POST 请求方法
const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({ ...config, method: 'GET', url })
}

const post = <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({ ...config, method: 'POST', url, data })
}

const put = <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({ ...config, method: 'PUT', url, data })
}

const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({ ...config, method: 'DELETE', url })
}

export default {
  get,
  post,
  put,
  delete: del
}
