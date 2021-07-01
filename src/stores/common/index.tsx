import { observable, action, makeAutoObservable } from 'mobx'
import { message } from 'antd'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'

export default class CommonStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable factoryName = undefined

  @observable dictionary = {}

  @observable allArea = []
  // 获取全部字典
  @action allDictionary = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/admin/manage/dict-item/list/dict-code`,
        params
      )
      if (res) {
        this.dictionary = res.data
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }
  @action updateName = name => {
    this.factoryName = name
  }
  // 获取全部省市区
  @action getAllArea = async () => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/district/list-tree`
      )
      if (res) {
        // const newArea = res.data.map(item => {
        //   const { value, label, children } = item
        //   return {
        //     id,
        //     name,
        //     children
        //   }
        // })
        this.allArea = res.data
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const commonStore = new CommonStore()