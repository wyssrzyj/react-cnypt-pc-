import { observable, action, makeAutoObservable, runInAction } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class DemandList {
  constructor() {
    makeAutoObservable(this)
  }

  @observable testData = []
  @observable echo = ''
  @observable zhiding = [{ name: '置顶' }]
  @observable regionalData = [] //地区弹窗返回的数据
  @observable popData = [] //弹窗回显
  @observable enteid = ''

  @action changeTestData = () => {
    runInAction(() => {
      this.testData = [...this.testData, { id: this.testData.length + 1 }]
    })
  }
  @action popUpData = params => {
    runInAction(() => {
      this.regionalData = params
    })
  }
  @action enterprisrIdData = params => {
    console.log('是否成功', params)
    runInAction(() => {
      this.enteid = params
    })
  }
  @action popUpEcho = params => {
    runInAction(() => {
      this.popData = params
    })
    console.log('弹窗回显', params)
  }

  // 更新或新增订单
  @action ewDemandDoc = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/save`,
        params
      )
      if (
        res.code !== 200 &&
        res.msg !== '订单有限期不能为空' &&
        res.msg !== '交货期不能为空'
      ) {
        message.error(res.msg)
      }
      if (
        (res.code === 400 && res.msg === '订单有限期不能为空') ||
        res.msg === '交货期不能为空'
      ) {
        message.error('请重新输入订单有限期、交货期')
      }

      return res
    } catch (e) {
      return e
    }
  }

  // 产品档次
  @action gradingOfProducts = async () => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/product-grade/list-tree`
      )
      if (res.code === 200) {
        return res
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 发单商我的订单数量
  @action issuerMyOrderQuantity = async () => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/oms/inquiry-purchase/my-order-purchase-total`
      )
      if (res.code === 200) {
        return res
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 加工厂接单管理订单数量
  @action processingPlantOrderReceivingManagementOrderQuantity = async () => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/oms/inquiry-supplier/order-management-supplier-total`
      )
      if (res.code === 200) {
        return res.data
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 再来一单
  @action anotherSingleInterface = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/oms/inquiry-purchase/get`,
        params
      )
      if (res.code === 200) {
        return res
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 获取发单商公司信息
  @action obtainIssuerCompanyInformation = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/purchaser-info/get-purchaser-company-info`,
        params
      )
      if (res.code === 200) {
        return res
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 发单商前台首页订单数量统计
  @action orderQuantityStatisticsOfTheFrontPageOfTheIssuer = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/oms/inquiry-purchase/purchase-front-page-total`,
        params
      )
      if (res.code === 200) {
        return res
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 获取发单商首页信息
  @action getTheIssuerHomePageInformation = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/purchaser-info/get-purchaser-front-pageinfo`,
        params
      )
      if (res.code === 200) {
        return res
      } else {
        message.error(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 再来一单 id
  @action oneMoreOrder = async params => {
    runInAction(() => {
      this.echo = params
    })
  }

  // 订单列表数据展示
  @action listData = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/inquiry-list`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // 查询工厂名称
  @action queryFactoryName = async () => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/info/search-factory-name`
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      return e
    }
  }
  // 发单商指定供应商发送需求单.
  @action sendRequisition = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-quote/point-to-send`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // 备忘录更新或新增
  @action memorandumAdded = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/user-memorandum/save`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      return e
    }
  }
  // 查看事件内容
  @action memorandumContent = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/user-memorandum/get-info`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      return e
    }
  }
  // 查看事件内容
  @action allMemos = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/user/user-memorandum/list`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // 发单商需求单日志查询
  @action issuerDemandDocLoGQuery = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchaser-log/inquiry-log-page`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // 发单商前台首页需求单展示
  @action issuerHomePageData = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/front-page-purchase-inquiry-list`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // 加工厂首页需求单展示
  @action processingFactoryData = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-supplier/front-page-supplier-inquiry-list`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // 忽略提示信息
  @action ignorePrompt = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/enterprise-message-state/update-message-state`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      return e
    }
  }

  // 企业提示信息
  @action enterpriseTips = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/enterprise/enterprise-prompt-message`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // 置顶
  @action toppingFunction = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/stick`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      if (res.code === 200) {
        // message.success(res.msg)
      }
      // runInAction(() => {
      //   this.zhiding = res.data
      // })

      return res.data
    } catch (e) {
      return e
    }
  }
  // 需求单置顶1
  @action topOfapplicationList = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/purchaser-inquiry-stick`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      // runInAction(() => {
      //   this.zhiding = res.data
      // })

      return res
    } catch (e) {
      return e
    }
  }

  // 删除需求单
  @action deleteDemandDoc = async params => {
    try {
      const res: ResponseProps = await axios.delete(
        `/api/oms/inquiry-purchase/delete`,
        params
      )
      if (res.code === 200) {
        message.success('删除成功')
      }
      return res
    } catch (e) {
      return e
    }
  }
  // 删除发单商需求单记录
  @action deleteIssuer = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/oms/inquiry-purchase/delete-purchaser-record`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      return e
    }
  }

  // 基础资料报告
  @action masterDataReport = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/factory-inspection-report/get-basic-info-by-factory-id`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      return e
    }
  }
  // 谢绝需求单申请
  @action declineRequisition = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/decline-inquiry-application`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      return e
    }
  }
  // 确认合作
  @action confirmCooperation = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/confirm-cooperation`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      return e
    }
  }
  // 取消合作
  @action cancelCooperation = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/cancel-cooperation`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      return e
    }
  }

  // 提前结束
  @action endInterfaceInAdvance = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/advance-end`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      return e
    }
  }
  // 需求单申请列表查询
  // 提前结束
  @action requisitionApplication = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/inquiry-application-list`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      return e
    }
  }
  // 需求单申请列表查询
  @action applicationList = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-purchase/inquiry-application-list`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      return e
    }
  }

  // 判断是否超过发单商最大订单
  @action orderQuantity = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-quote/judge-goods-num`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      return e
    }
  }
  // 供应商主动申请需求单  formti提交
  @action submitRequisition = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-quote/active-application-inquiry`,
        params
      )
      if (res.code === 200) {
        message.success('操作成功')
      } else {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      message.error('服务器错误')
      return e
    }
  }

  // 供应商主动申请需求单  form提交
  @action rejectSubmission = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/oms/inquiry-quote/refuse-take-inquiry`,
        params
      )
      if (res.code === 200) {
        message.success('操作成功')
      } else {
        message.error(res.msg)
      }
      return res
    } catch (e) {
      return e
    }
  }

  // /api/oms/inquiry-quote/get
  // 接单详情
  @action getInquiryQuote = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/oms/inquiry-quote/get`,
        params
      )
      if (res.code !== 200) {
        message.error(res.msg)
      }
      return res.data
    } catch (e) {
      message.error('服务器错误')
      console.log(e)
    }
  }
}
export const demandListStore = new DemandList()
