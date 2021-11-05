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
  // 再来一单
  @action anotherSingleInterface = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/oms/inquiry-purchase/get`,
        params
      )
      if (res.code === 200) {
        // runInAction(() => {
        //   this.echo = res.data
        // })
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
