import { makeAutoObservable, action, observable } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class FactoryStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable productCategoryList = []

  // 获取工厂列表
  @action getFactoryList = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/info/list-factories`,
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

  // 获取产品类别
  @action productCategory = async () => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/api/product/catalog/list-category-tree`
      )

      if (res) {
        this.productCategoryList = res.data
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const factoryStore = new FactoryStore()
