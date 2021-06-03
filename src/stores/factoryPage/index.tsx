import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class FactoryPageStore {
  constructor() {
    makeAutoObservable(this)
  }

  // 用户注册 /user/register
  @action getFactorys = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/unauth/statistic`,
        params
      )

      if (res) {
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 区域统计 /api/factory/unauth/region/statistic
  @action getAreaConut = async () => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/unauth/region/statistic`
      )
      if (res) {
        return res.data || {}
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 全国工厂统计 /api/factory/unauth/allCity/statistic
  @action getFactorysCount = async () => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/unauth/allCity/statistic`
      )
      if (res) {
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 获取最新工厂 /api/factory/info/list-newest-factories
  @action getNewFactorys = async (pageSize = 7) => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/info/list-newest-factories`,
        { pageSize }
      )
      if (res) {
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }

  @action uploadFiles = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oss/file/upload`,
        params
      )
      if (res) {
        return `http://${res.data}`
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 按品类找工厂 /api/factory/unauth/statistic/category
  @action getTypeFactorys = async () => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/unauth/statistic/category`
      )
      if (res) {
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const factoryPageStore = new FactoryPageStore()
