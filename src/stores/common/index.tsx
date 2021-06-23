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
      const res: ResponseProps = await axios.post(`/api/admin/manage/dict-item/list/dict-code`, params)

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
      const res: ResponseProps = await axios.get(`/api/factory/district/list-tree`)
      if (res) {
        const newArea = res.data.map(item => {
          const { id, name, childCityList = [] } = item
          return {
            value: id,
            label: name,
            children:
              childCityList &&
              childCityList.map(city => {
                const { id, name, childCityList = [] } = city
                return {
                  value: id,
                  label: name,
                  children:
                    childCityList &&
                    childCityList.map(district => {
                      const { id, name } = district
                      return {
                        value: id,
                        label: name
                      }
                    })
                }
              })
          }
        })
        this.allArea = newArea
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
