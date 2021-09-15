import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class MonitorPage {
  constructor() {
    makeAutoObservable(this)
  }

  // 查询
  @action searchAPI = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/factory-camera/list-camera-org-info`,
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
  // 连接设备
  @action connectingAPI = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/factory-camera/connect`,
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
  // 删除事件
  @action moveAPI = async id => {
    try {
      const res: ResponseProps = await axios.delete(
        `/api/factory/factory-camera/delete`,
        { id }
      )
      return res
    } catch (e) {
      console.log(e)
    }
  }
  // 获取设备部门
  @action equipmentDepartmentAPI = async () => {
    try {
      const res: ResponseProps = await axios.get(
        '/api/basic/department/department-tree'
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
  // 检测是否绑定优产账号
  @action youChanAPI = async () => {
    try {
      const res: ResponseProps = await axios.get(
        '/api/user/user-uchat/check-bind-uchat-account'
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
  // 绑定优产账号
  @action bindZhAPI = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/bind-uchat-account`,
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
  // 获取数据列表
  @action listDataAPI = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/factory-camera/list-camera-org-info`,
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

  // 获取设备品牌
  @action insertModelAPI = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/admin/manage/dict-item/list/dict-code`,
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

  // 新增数据
  @action newlyAddedAPI = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/factory-camera/save`,
        params
      )
      console.log('🚀 ~ file: loginStore.tsx ~ line 97 ~ LoginStore ~ res', res)

      if (res.code === 200) {
        message.success(res.msg)
      }
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      console.log(e)
    }
  }
}

export const monitorPage = new MonitorPage()
