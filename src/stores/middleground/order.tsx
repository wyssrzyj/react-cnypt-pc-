import { makeAutoObservable, action, runInAction, observable } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class OrderStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable productInfo = {} // 订单商品信息

  @action verificationCode = async params => {}
}

export const orderStore = new OrderStore()
