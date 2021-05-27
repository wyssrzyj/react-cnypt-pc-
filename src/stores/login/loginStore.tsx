import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from '_antd@4.16.0@antd'

export default class LoginStore {
  constructor() {
    makeAutoObservable(this)
  }

  @action login = async params => {
    try {
      const res: ResponseProps = await axios.post('/api/user/login', params)
      const { data = {} } = res
      console.log(data, '=====')
      if (data) {
        localStorage.setItem('token', data.access_token)
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
}

export const loginStore = new LoginStore()
