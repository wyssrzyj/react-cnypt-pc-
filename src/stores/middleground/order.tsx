import { makeAutoObservable, action, runInAction, observable } from 'mobx'
import axios from '@/utils/axios'
// import axios from '@/utils/axios'
// import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'
import moment from 'moment'
import { dealTypeData } from '@/utils/tool'

interface ProductInfo {
  [key: string]: any
  uid?: string | number
}

interface OrderInfo {
  [key: string]: any
}

export default class OrderStore {
  constructor() {
    makeAutoObservable(this)
  }

  // 状态跟踪数据
  @observable stateTrackData = {
    confirmLogsPage: {},
    finishLogsPage: {},
    orderMsg: {},
    totalOrderSchedule: {
      postList: [],
      clothesDetail: [],
      cutDetail: [],
      productionDetail: [],
      qualifiedDetail: [],
      ticketDetail: []
    },
    underwayLogsPage: {}
  }
  @observable enterpriseDepartment = [] // 企业部门
  @observable productInfo: ProductInfo = {} // 订单商品信息
  @observable orderInfo: OrderInfo = {} // 订单信息
  @observable orderGetInfo = true // 订单页面是否需要走接口刷新数据
  @observable fromProduct = false // 订单页是否由商品页跳转回来的
  @observable fromOrder = false //商品页是否由订单页跳转回来的

  @action initOrderAndProduct = () => {
    // 初始化数据
    runInAction(() => {
      this.productInfo = {}
      this.orderInfo = {}
      this.orderGetInfo = true
      this.fromProduct = false
      this.fromOrder = false
    })
  }

  @action setOrderGetInfo = () => {
    // 去商品页之后 再返回订单页面不需要接口更新订单信息
    runInAction(() => {
      this.orderGetInfo = false
    })
  }

  @action setFromProduct = flag => {
    runInAction(() => {
      this.fromProduct = flag
    })
  }

  @action setFromOrder = flag => {
    runInAction(() => {
      this.fromOrder = flag
    })
  }

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

  // /api/oms/order/get
  // 查询单个订单
  @action getOrder = async orderId => {
    try {
      const res = await axios.get('/api/oms/order/get', {
        orderId
      })
      if (res && res.code === 200) {
        ;['materialArrivalTime', 'expectDeliveryTime'].forEach(item => {
          res.data.orderVO[item] = res.data.orderVO[item]
            ? moment(res.data.orderVO[item])
            : null
        })

        if (this.orderGetInfo) {
          this.setOrderInfo(res.data.orderVO)
        }
        if (!this.fromProduct) {
          const target = res.data.goodsInfoVOList
          if (Array.isArray(target)) {
            target[0].stylePicture = target[0].stylePicture.map(url => ({
              thumbUrl: url,
              name: url.split('__')[1]
            }))
            target[0].annex = target[0].annex.map(url => ({
              thumbUrl: url,
              url: url,
              name: url.split('__')[1]
            }))
            this.setProductInfo(target[0])
          }
        }

        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // 加工厂确认订单
  // /api/oms/order/confirm
  @action factoryConfirmOrder = async params => {
    try {
      const res = await axios.post('/api/oms/order/confirm', params)
      if (res && res.code === 200) {
        message.success('提交成功')
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // 退回草稿
  // /api/oms/order/back-draft
  @action backToDraft = async id => {
    try {
      const res = await axios.post('/api/oms/order/back-draft', { id })
      if (res && res.code === 200) {
        message.success('退回草稿')
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // 发单商取消订单
  // /api/oms/order/cancel-order
  @action cancelOrder = async id => {
    try {
      const res = await axios.post('/api/oms/order/cancel-order', {
        id,
        status: -2
      })
      if (res && res.code === 200) {
        message.success('取消成功')
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // 发单商取消订单
  // /api/oms/order/cancel-order
  @action delOrders = async idList => {
    try {
      const res = await axios.post('/api/oms/order/delete', {
        idList
      })
      if (res && res.code === 200) {
        message.success('删除成功')
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/oms/order/get-pass-fail-reason
  // 不通过原因查看
  @action getFailReason = async id => {
    try {
      const res = await axios.post('/api/oms/order/get-pass-fail-reason', {
        id
      })
      if (res && res.code === 200) {
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/oms/order/finish-product
  // 加工厂完成生产
  @action factoryFinishProduct = async id => {
    try {
      const res = await axios.post('/api/oms/order/finish-product', {
        id,
        status: 4
      })
      if (res && res.code === 200) {
        message.success('完成生产')
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/oms/order/acceptance
  // 确认验收
  @action acceptanceOrder = async id => {
    try {
      const res = await axios.post('/api/oms/order/acceptance', {
        id,
        status: 5
      })
      if (res && res.code === 200) {
        message.success('验收成功')
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/oms/order/reproduce
  // 加工厂订单返回生产
  @action reproduce = async id => {
    // TODO 返回生产是 2 还是 3
    try {
      const res = await axios.post('/api/oms/order/reproduce', {
        id,
        status: 2
      })
      if (res && res.code === 200) {
        message.success('返回生产')
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/oms/order/stick
  // 订单置顶
  @action changeOrderStick = async params => {
    try {
      const res = await axios.post('/api/oms/order/stick', params)
      if (res && res.code === 200) {
        message.success('操作成功')
        return res.code
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/oms/order/state-track
  // 查询订单日志
  @action getStateTrack = async params => {
    try {
      const res = await axios.post('/api/oms/order/stick', params)
      if (res && res.code === 200) {
        message.success('操作成功')
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/oms/order/get-purchaser-list
  // 查询合作过的发单商
  @action getPurchasers = async (name = '') => {
    try {
      const res = await axios.get('/api/oms/order/get-purchaser-list', { name })
      if (res && res.code === 200) {
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // 查询合作过的加工厂
  // /api/oms/order/get-supplier-list
  @action getSuppliers = async (name = '') => {
    try {
      const res = await axios.get('/api/oms/order/get-supplier-list', { name })
      if (res && res.code === 200) {
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/basic/department/department-tree
  // 企业部门
  @action getEnterpriseDepartment = async () => {
    try {
      const res = await axios.get('/api/basic/department/department-tree')
      if (res && res.code === 200) {
        runInAction(() => {
          const targetData = dealTypeData(res.data, ['deptName', 'id'])
          this.enterpriseDepartment = targetData
        })
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/oms/order/order-bind-production
  // 加工厂关联平台部门
  @action bindProcduce = async params => {
    try {
      const res = await axios.post(
        '/api/oms/order/order-bind-production',
        params
      )
      if (res && res.code === 200) {
        message.success('绑定生产成功')
        return true
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/oms/order-log/state-track
  // 状态跟踪接口
  @action getTrackState = async params => {
    try {
      const res = await axios.post('/api/oms/order-log/state-track', params)
      if (res && res.code === 200) {
        runInAction(() => {
          this.stateTrackData = res.data
        })
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/user/bind-uchat-account
  // 绑定优产账号
  @action bindYOUCHAN = async params => {
    try {
      const res = await axios.post('/api/user/bind-uchat-account', params)
      if (res && res.code === 200) {
      } else {
        message.error(res.msg)
      }
      return res
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/oms/order/order-bind-department-id
  // 生产绑定回显
  @action getBindInfo = async id => {
    try {
      const res = await axios.get('/api/oms/order/order-bind-department-id', {
        id
      })
      if (res && res.code === 200) {
        return res.data
      } else {
        message.error(res.msg)
        return {}
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/user/user-uchat/check-bind-uchat-account
  // 检测是否绑定了优产账号
  @action checkYOUCHAN = async () => {
    try {
      const res = await axios.get(
        '/api/user/user-uchat/check-bind-uchat-account'
      )
      console.log('🚀 ~ file: order.tsx ~ line 493 ~ OrderStore ~ res', res)
      if (res && res.code === 200) {
        return res.data
      } else {
        message.error(res.msg)
        return {}
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }

  // /api/factory/uchat-order-info-list
  // 获取优产订单列表
  // asc desc
  @action getYOUCHANList = async params => {
    try {
      const res = await axios.post('/api/factory/uchat-order-info-list', params)
      if (res && res.code === 200) {
        return res.data
      } else {
        message.error(res.msg)
        return {}
      }
    } catch (err) {
      message.error('服务器错误~')
    }
  }
}

export const orderStore = new OrderStore()
