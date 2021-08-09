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
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      console.log(e)
    }
  }

  @action logout = async () => {
    try {
      const res: ResponseProps = await axios.post('/api/user/account/logout')
      if (res.code === 200) {
        localStorage.setItem('token', '')
        localStorage.setItem('refresh', '')
        localStorage.setItem('currentUser', JSON.stringify({}))
      }
      if (res && res.code !== 200) {
        message.error(res.msg)
      } else {
        message.success('退出成功')
      }

      return res.success
    } catch (e) {
      console.log(e) // message.error('')
      if (e.code === 40101 || e.code === 401) {
        message.success('退出成功')
        localStorage.setItem('token', '')
        localStorage.setItem('refresh', '')
        localStorage.setItem('currentUser', JSON.stringify({}))
        return true
      }
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
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      console.log(e)
    }
  }

  @action verifyCode = async mobile => {
    try {
      const res: ResponseProps = await axios.get(`/api/sms/send-code/${mobile}`)

      if (res.code === 200) {
        message.success(res.msg)
      }
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      // const { response } = e
      console.log(e)
    }
  }
  // 忘记密码
  @action resetPwd = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/forget-password`,
        params
      )
      console.log('🚀 ~ file: loginStore.tsx ~ line 97 ~ LoginStore ~ res', res)

      if (res.code === 200) {
        message.success(res.msg)
      }
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}

export const loginStore = new LoginStore()
