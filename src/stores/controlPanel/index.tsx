import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class ControlPanelStore {
  constructor() {
    makeAutoObservable(this)
  }

  // 校验验证码
  @action verificationCode = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/sms/verification-code`,
        params
      )

      if (res.success) {
        message.success(res.msg)
        return res.data || []
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 获取账号安全信息
  @action getAccountInfo = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/user/get-account-info`,
        params
      )

      if (res.success) {
        return res.data || {}
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 登录日志
  @action getLoginLogs = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/user-login-log/list`,
        params
      )

      if (res.success) {
        return res.data || {}
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 修改手机号
  @action changeMobile = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/update-user-mobile-phone`,
        params
      )

      if (res.success) {
        return res.success || {}
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 手机号 密码校验
  @action checkPhonePwd = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/verify-mobile-password`,
        params
      )

      if (res.success) {
        message.success(res.msg)
        return res.success || {}
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 原密码修改密码
  @action updatePwd = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/update-password`,
        params
      )

      if (res.success) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res.success
    } catch (e) {
      console.log(e)
    }
  }

  // 验证码修改密码
  @action codeUpdatePwd = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/code-update-password`,
        params
      )
      console.log(
        '🚀 ~ file: index.tsx ~ line 129 ~ ControlPanelStore ~ res',
        res
      )

      if (res.success) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res.success
    } catch (e) {
      console.log(e)
    }
  }

  // 修改用户信息
  @action changeUserInfo = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/saveBasicUserInfo`,
        params
      )

      if (res.success) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
      return res.success
    } catch (e) {
      console.log(e)
    }
  }
}

export const controlPanelStore = new ControlPanelStore()
