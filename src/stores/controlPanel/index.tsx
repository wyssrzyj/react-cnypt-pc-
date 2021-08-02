import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'
export default class ControlPanelStore {
  constructor() {
    makeAutoObservable(this)
  }
  @action verificationCode = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/sms/verification-code`,
        params
      )
      if (res.code === 200) {
        message.success(res.msg)
        return res.data || []
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }
  @action getAccountInfo = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/user/get-account-info`,
        params
      )
      if (res.code === 200) {
        return res.data || {}
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }
  @action getLoginLogs = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/user-login-log/list`,
        params
      )
      if (res.code === 200) {
        return res.data || {}
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }
  @action changeMobile = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/update-user-mobile-phone`,
        params
      )
      if (res.code === 200) {
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  @action checkPhonePwd = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/verify-mobile-password`,
        params
      )
      if (res.code === 200) {
        message.success(res.msg)
        console.log(
          '🚀 ~ file: index.tsx ~ line 79 ~ ControlPanelStore ~ res',
          res
        )
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  @action updatePwd = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/update-password`,
        params
      )
      if (res.code === 200) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
  @action codeUpdatePwd = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/code-update-password`,
        params
      )
      if (res.code === 200) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
  @action changeUserInfo = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/saveBasicUserInfo`,
        params
      )
      if (res.code === 200) {
        message.success(res.msg)
        return true
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
export const controlPanelStore = new ControlPanelStore()
