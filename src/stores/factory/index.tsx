import { makeAutoObservable, action, observable, runInAction } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class FactoryStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable productCategoryList = []
  @observable factoryData = {
    onlineNum: 0,
    offlineNum: 0,
    monthTicketNum: 0,
    monthClothesNum: 0,
    monthProductionNum: 0,
    order: [],
    production: {}
  }

  @observable factoryMachineData = {
    statisticHour: [],
    statisticWeek: []
  }

  @observable factoryProductList = []

  @action init = () => {
    this.productCategoryList = []
  }

  // 获取首页工厂列表 搜索工厂
  @action getFactoryList = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/info/page-high-quality-factory`,
        params
      )

      if (res) {
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 获取工厂列表 搜索工厂
  @action getFactoryPageList = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/info/list-factories`,
        params
      )

      if (res) {
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 获取产品类别
  @action productCategory = async () => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/api/product/catalog/list-category-tree`
      )

      if (res) {
        runInAction(() => {
          this.productCategoryList = res.data
        })
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // /api/factory/unauth/statistic/sync_factory_data
  @action getFactoryData = async factoryId => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/unauth/statistic/sync_factory_data`,
        {
          factoryId
        }
      )
      if (res.code === 200) {
        runInAction(() => {
          this.factoryData = res.data || {}
        })
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
      return res.data
    } catch (e) {
      runInAction(() => {
        this.factoryData = null
      })
      console.log(e)
    }
  }

  // /api/factory/unauth/statistic/sync_factory_machine
  @action getFactoryMachineData = async factoryId => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/unauth/statistic/sync_factory_machine`,
        {
          factoryId
        }
      )

      if (res.code === 200) {
        runInAction(() => {
          this.factoryMachineData = res.data
        })
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }

      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  // /api/factory/unauth/statistic/sync_factory_board
  @action getFactoryBoard = async factoryId => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/unauth/statistic/sync_factory_board`,
        {
          factoryId
        }
      )

      if (res.code === 200) {
        runInAction(() => {
          this.factoryProductList = res.data
        })
        return res.data || []
      } else {
        message.error('获取数据失败~')
      }
      return res.data
    } catch (e) {
      runInAction(() => {
        this.factoryProductList = null
      })
      console.log(e)
    }
  }
}

export const factoryStore = new FactoryStore()
