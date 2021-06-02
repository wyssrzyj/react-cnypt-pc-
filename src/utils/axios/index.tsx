import axios from 'axios'
import NProgress from 'nprogress'
import { message } from 'antd'
import { getRefresh, getToken } from '../tool'
import { dFn, Params, ResponseProps } from './types'

// TODO token是放在headers 还是在请求体中添加
// TODO 通过setupProxy 设置代理
const AUTH_TOKEN = getToken()
const REFRESH_TOKEN = getRefresh()

const CancelToken = axios.CancelToken
let cancels = []

let lastRequest = {}

// const instance = axios.create({})

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
// instance.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded'
// instance.defaults.timeout = 10000
// instance.defaults.withCredentials = true

const toType = obj => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

// 参数过滤函数
type O = {
  [key: string]: any
}
const filterNull = (o: O) => {
  for (let k in o) {
    if (o[k] === null || o[k] === undefined) {
      delete o[k]
    }
    o[k] = toType(o[k]) === 'string' ? o[k].trim() : o[k]
    o[k] = ['object', 'array'].includes(toType(o[k])) ? filterNull(o[k]) : o[k]
  }
  return o
}

axios.interceptors.request.use(
  function (request) {
    // const userToken = localStorage.getItem('_usertoken') || undefined
    // if (userToken && request.method === 'post') {
    //   if (!request.data) request.data = {}
    //   request.data.token = userToken
    // }
    // if (userToken && request.method === 'get') {
    //   if (!request.params) request.params = {}
    //   request.params.token = userToken
    // }

    console.log(request)

    lastRequest = request

    NProgress.start()
    return request
  },
  function (error) {
    NProgress.done()
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  async error => {
    NProgress.done()
    console.log(error.response)
    const { response } = error
    if (response.status === 401) {
      console.log('xxxxx')

      // const data = await axios(response.config)
    }
    return Promise.reject(error)
  }
)

const apiAxios = async (
  method,
  url,
  params: Params = {},
  success?: dFn,
  failure?: dFn
) => {
  // const token = getToken()
  params = filterNull(params)
  const noTokenList = [
    '/api/sms/send-code',
    '/api/user/register',
    '/api/user/getUserByMobilePhone',
    '/api/user/login'
  ]

  const instanceParams = {
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    // baseURL: root,
    withCredentials: true,
    headers: {
      common: {
        authorization: AUTH_TOKEN,
        refresh_token: REFRESH_TOKEN
      }
    },
    cancelToken: new CancelToken(function executor(c) {
      // executor 函数接收一个 cancel 函数作为参数
      cancels.push(c)
    })
  }

  const flag = noTokenList.some(i => url.includes(i))
  if (flag) {
    // 不需要携带token的接口  去除 token
    delete instanceParams.headers.common.authorization
    delete instanceParams.headers.common.refresh_token
  }
  try {
    const responseData: ResponseProps = await axios(instanceParams)
    if (responseData.code === 200) {
      // responseData.message && message.success({
      //     content: responseData.message,
      //     duration: 0.5
      // })
      success && success()
      return responseData
    } else {
      failure && failure()
      responseData.msg && message.error(responseData.msg)
      return Promise.reject(responseData)
    }
  } catch (error) {
    failure && failure()
    console.log(error)
    message.error(error)
  }
}

export default {
  get: function (
    url: string,
    params?: any,
    success?: () => {},
    failure?: () => {}
  ) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params?, success?, failure?) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params?, success?, failure?) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params?, success?, failure?) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  cancels // 切换路由之前 遍历cancels 执行方法 取消之前的请求
}
