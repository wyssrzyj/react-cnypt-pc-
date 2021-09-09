import { makeAutoObservable, action, runInAction, observable } from 'mobx'
import axios from '@/utils/axios'
// import axios from '@/utils/axios'
// import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class OrderStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable productInfo = {} // 订单商品信息
  @observable orderInfo = {} // 订单信息

  @action setProductInfo = async productInfo => {
    runInAction(() => {
      this.productInfo = productInfo
    })
  }

  @action resetProductInfo = async () => {
    runInAction(() => {
      this.productInfo = {}
    })
  }

  @action setOrderInfo = async orderInfo => {
    runInAction(() => {
      this.orderInfo = orderInfo
    })
  }

  // /api/factory/enterprise/list-order-enterprise-info
  // enterpriseName
  // 查询合作企业
  @action getSearchEnterprises = async enterpriseName => {
    try {
      // 订单搜索的是加工厂  企业类型默认为 0  加工厂
      const res = await axios.post(
        '/api/factory/enterprise/list-order-enterprise-info',
        { enterpriseName, enterpriseType: 0 }
      )
      if (res && res.code === 200) {
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  //
  // /api/oms/goods-info/save
  // 更新或新增订单
  @action saveOrder = async (params, status) => {
    try {
      const res = await axios.post('/api/oms/order/save', params)
      if (res && res.code === 200) {
        if (status === -1) {
          message.success('保存成功')
        }
        if (status === 1) {
          message.success('提交成功')
        }
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/oms/order/list
  // 查询订单列表
  @action getOrders = async params => {
    try {
      const res = await axios.post('/api/oms/order/list', params)
      if (res && res.code === 200) {
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }
}

export const orderStore = new OrderStore()
