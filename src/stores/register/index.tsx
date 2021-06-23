import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'

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
    } catch (e) {
      console.log(e)
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
