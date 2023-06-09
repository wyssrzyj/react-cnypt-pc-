import { observable, action, makeAutoObservable, runInAction } from 'mobx'
import { message } from 'antd'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'

export default class CommonStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable factoryName = undefined

  @observable dictionary: any = {}

  @observable allArea = []
  // 获取全部字典
  @action allDictionary = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/admin/manage/dict-item/list/dict-code`,
        params
      )
      if (res) {
        runInAction(() => {
          this.dictionary = res.data
        })
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
        runInAction(() => {
          this.allArea = res.data
          localStorage.setItem('allArea', JSON.stringify(res.data))
        })

        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // /api/factory/district/get-district-by-id
  // 通过地址id获取地名
  @action getAreaName = async id => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/district/get-district-by-id`,
        { id }
      )
      if (res) {
        return res.data || ''
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const commonStore = new CommonStore()
