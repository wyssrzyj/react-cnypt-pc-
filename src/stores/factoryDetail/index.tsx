import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class FactoryDetailStore {
  constructor() {
    makeAutoObservable(this)
  }

  // 工厂详情 联系方式
  @action contactPort = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/info/get-details-contact-person-info`,
        params
      )
      if (res) {
        return res
      } else {
        res.code !== 40101 && message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const factoryDetailStore = new FactoryDetailStore()
