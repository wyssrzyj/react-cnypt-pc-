import { makeAutoObservable, action, observable } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class EnterpriseStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable productCategoryList = []

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
  // 上传图片
  @action uploadFiles = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oss/file/upload`,
        params
      )
      if (res) {
        return `http://${res.data}`
      } else {
        res.code !== 40101 && message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const enterpriseStore = new EnterpriseStore()
