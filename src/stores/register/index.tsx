import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

type VerifyCodeParams = {
  code: string
  mobile: string
}
type RegisterParams = {
  code: string | number
  mobilePhone: string | number
  password: string | number
}

export default class RegisterStore {
  constructor() {
    makeAutoObservable(this)
  }

  // 发送验证码
  @action sendVerifyCode = async (mobile: string | number) => {
    try {
      const res: ResponseProps = await axios.get(`/api/sms/send-code/${mobile}`)
      return res
    } catch (err) {
      const { response } = err
      const { code } = response
      console.log('🚀444444444444444444444', code)
    }
  }

  // 校验验证码
  @action vrifyCode = async (params: VerifyCodeParams) => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/sms/verification-code`,
        params
      )
      if (res) {
        console.log(res)
      }
      return res
    } catch (e) {
      console.log(e)
    }
  }

  // 用户注册 /user/register
  @action register = async (params: RegisterParams) => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/account/register`,
        params
      )
      if (res.code === 200) {
        message.success('注册成功~')
      }
      return res
    } catch (e) {
      console.log(e, '------')
      // message.error()
    }
  }

  // 用户注册 /user/register
  @action checkUser = async (queryParam, queryType) => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/user/getUserByMobilePhone/${queryParam}/${queryType}`
      )

      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}

export const registerStore = new RegisterStore()
