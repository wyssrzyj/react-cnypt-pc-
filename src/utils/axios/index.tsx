import axios from 'axios'
import NProgress from 'nprogress'
import { message } from 'antd'
import { getRefresh, getToken, getCurrentUser } from '../tool'
import { dFn, Params, ResponseProps } from './types'

const customAxios = axios.create({})

let rToken = ''
// TODO token是放在headers 还是在请求体中添加
// TODO 通过setupProxy 设置代理
const CancelToken = axios.CancelToken
let cancels = []

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

customAxios.interceptors.request.use(
  async function (request) {
    const { expire } = getCurrentUser()

    const refreshAxios = axios.create({
      headers: {
        authorization: getToken(),
        refresh_token: getRefresh()
      }
    })

    const whiteList = [
      '/api/user/account/login',
      '/api/user/account/refresh-token'
    ]

    const flag = whiteList.some(item => request.url.includes(item))

    if (expire - Date.now() < 10 && !flag) {
      const url = `/api/user/account/refresh-token?accessToken=${getToken()}`

      const refresData = await refreshAxios.post(url)
      rToken = refresData.data.data.access_token
      const expiresTime = refresData.data.data.expires_in
      request.headers.authorization = rToken
      const updateUser = JSON.parse(localStorage.getItem('currentUser'))
      updateUser.expire = expiresTime
      updateUser.access_token = rToken
      localStorage.setItem('token', rToken)
      localStorage.setItem('currentUser', JSON.stringify(updateUser))
    }
    NProgress.start()
    return request
  },
  function (error) {
    NProgress.done()
    return Promise.reject(error)
  }
)

customAxios.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    NProgress.done()
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
        authorization: getToken(),
        refresh_token: getRefresh()
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
    const responseData: ResponseProps = await customAxios(instanceParams)
    if (responseData.code === 200) {
      success && success()
      return responseData
    } else {
      failure && failure()
      responseData.code !== 40101 &&
        responseData.msg &&
        message.error(responseData.msg)
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
