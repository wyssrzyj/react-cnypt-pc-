import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from '_antd@4.15.4@antd'

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
}

export const factoryPageStore = new FactoryPageStore()
