import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class LoginStore {
  constructor() {
    makeAutoObservable(this)
  }

  @action login = async params => {
    try {
      const res: ResponseProps = await axios.post(
        '/api/user/account/login',
        params
      )
      const { data = {} } = res
      if (data) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('refresh', data.refresh_token)
        localStorage.setItem('currentUser', JSON.stringify(data))
      }
      if (!res.success) {
        message.error(res.msg)
      }
      // message.success('登录成功')
      return res
    } catch (e) {
      console.log(e)
      // message.error('')
    }
  }
  @action logout = async () => {
    try {
      const res: ResponseProps = await axios.post('/api/user/account/logout')
      if (res.success) {
        localStorage.setItem('token', '')
        localStorage.setItem('refresh', '')
        localStorage.setItem('currentUser', JSON.stringify({}))
      }
      if (!res.success) {
        message.error(res.msg)
      } else {
        message.success('退出成功')
      }

      return res
    } catch (e) {
      console.log(e) // message.error('')
    }
  }

  @action userInfo = async () => {
    try {
      const res: ResponseProps = await axios.get(
        '/api/factory/enterprise/get-login-info'
      )
      const { data = {} } = res
      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
      }
      if (!res.success) {
        message.error(res.msg)
      }
      // message.success('登录成功')
      return res
    } catch (e) {
      console.log(e)
      // message.error('')
    }
  }

  @action verifyCode = async mobile => {
    try {
      const res: ResponseProps = await axios.get(`/api/sms/send-code/${mobile}`)

      if (res.success) {
        message.success(res.msg)
      }
      if (!res.success) {
        message.error(res.msg)
      }
      // message.success('登录成功')
      return res
    } catch (e) {
      console.log(e)
      // message.error('')
    }
  }
  // 忘记密码
  @action resetPwd = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/forget-password`,
        params
      )

      if (res.success) {
        message.success(res.msg)
      }
      if (!res.success) {
        message.error(res.msg)
      }
      // message.success('登录成功')
      return res
    } catch (e) {
      console.log(e)
      // message.error('')
    }
  }
}

export const loginStore = new LoginStore()
