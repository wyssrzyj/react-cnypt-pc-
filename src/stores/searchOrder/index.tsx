import { makeAutoObservable, action, observable, runInAction } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'
export default class SearchOrderStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable orderDetail = {}

  // 需求单列表查询
  @action getOrderList = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/list-inquiry-search`,
        params
      )

      if (res.code === 200) {
        runInAction(() => {
          this.orderDetail = res.data
        })
      }

      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  // 单个需求单查询
  // /api/oms/inquiry-purchase/get
  @action getOrderDetail = async id => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/oms/inquiry-purchase/get`,
        { id }
      )

      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  // 发单商主动发送需求单
  // /api/oms/inquiry-quote/point-to-send
  @action sendToFactory = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-quote/point-to-send`,
        params
      )
      if (res.code === 200) {
        message.success('发送成功')
      } else {
        message.error(res.msg)
      }

      return res.data
    } catch (e) {
      console.log(e)
      message.error('服务器错误~')
    }
  }

  // 供应商需求单查询
  // /api/oms/inquiry-supplier/list
  @action supplierGetOrders = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-supplier/list`,
        params
      )

      return res.data
    } catch (e) {
      console.log(e)
      message.error('服务器错误~')
    }
  }

  // 需求单置顶
  // /api/oms/inquiry-supplier/stick
  @action changeOrderStick = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-supplier/stick`,
        params
      )

      return res.code
    } catch (e) {
      console.log(e)
      message.error('服务器错误~')
    }
  }

  @action inquiryList = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/list-inquiry-search`,
        params
      )
      return res
    } catch (e) {
      console.log(e)
    }
  }

  //
  @action inquiryPurchase = async id => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/oms/inquiry-purchase/get`,
        { id }
      )
      return res
    } catch (e) {
      console.log(e)
    }
  }
}

export const searchOrderStore = new SearchOrderStore()
