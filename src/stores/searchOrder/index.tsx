import { makeAutoObservable, action, observable, runInAction } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'
export default class SearchOrderStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable orderName = undefined

  @observable orderDetail = {}

  @action updateOrderName = name => {
    this.orderName = name
  }

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

  // 加工厂 企业照片接口
  // /api/factory/info/save-factory-images-info
  @action saveFactoryPhotos = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/info/save-factory-images-info`,
        params
      )
      if (res.code === 200) {
        message.success('保存成功')
      } else {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      message.error('服务器错误')
      console.log(e)
    }
  }

  // 加工厂图片
  // /api/factory/info/get-factory-images
  @action getFactoryPhotos = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/info/get-factory-images-info`,
        params
      )
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  // 发单商 企业照片接口
  // /api/factory/purchaser-info/save-purchaser-images
  @action savePurchaserPhotos = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/purchaser-info/save-purchaser-images`,
        params
      )
      if (res.code === 200) {
        message.success('保存成功')
      } else {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      console.log(e)
      message.error('服务器错误')
    }
  }

  // /api/factory/purchaser-info/get-purchaser-images
  // 发单商 获取企业照片接口
  @action getPurchaserPhotos = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/purchaser-info/get-purchaser-images`,
        params
      )
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  // 加工厂 订单管理 删除记录
  // /api/oms/inquiry-supplier/delete-inquiry-record
  @action factoryDelOrder = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/oms/inquiry-supplier/delete-inquiry-record`,
        params
      )
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}

export const searchOrderStore = new SearchOrderStore()
