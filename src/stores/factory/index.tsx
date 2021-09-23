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
  @observable mapSearchCityLntlats = [] // 地图搜索栏中 切换城市后的经纬度
  @observable mapSearchCityValue = '' // 地图移动后的城市value
  @observable mapMove = false // 地图是否需要移动
  @observable mapSearchFactorys = [] // 地图 工厂列表数据
  @observable mapSearchDistrict = [] // 地图 城市区级信息

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

  // 获取产品类别
  @action getProductCategoryName = async ids => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/api/product/catalog/list/by/ids`,
        ids
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

  @action setMapSearchCityLntlats = lntlats => {
    runInAction(() => {
      this.mapSearchCityLntlats = lntlats
    })
  }

  // 获取城市区级信息
  @action getMapCityInfo = async pId => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/factory/district/list-children-and-parent`,
        {
          pId
        }
      )

      if (res.code === 200) {
        const citys = Reflect.ownKeys(res.data)
        const target = citys.find(item => res.data[item].id === pId)
        const targetCity = res.data[target]
        if (
          targetCity.longitude === this.mapSearchCityLntlats[0] &&
          targetCity.latitude === this.mapSearchCityLntlats[1]
        ) {
          // return false
        }

        if (
          targetCity.longitude !== this.mapSearchCityLntlats[0] &&
          targetCity.latitude !== this.mapSearchCityLntlats[1]
        ) {
          //
        }

        runInAction(() => {
          this.mapSearchDistrict = res.data
          this.mapSearchCityLntlats = [
            targetCity.longitude,
            targetCity.latitude
          ]
        })

        return true
      } else {
        message.error('获取城市数据失败~')
      }
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  // 地图找厂 获取加工厂信息
  @action getMapFactorys = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/info/list-factory-atlas-info`,
        params
      )

      if (res.code === 200) {
        runInAction(() => {
          res.data.forEach((item, idx) => {
            item.city = item.cityName
            item.district = item.districtName
            item.lnglat = item.districtLnglat
            item.idx = idx + 1
          })

          this.mapSearchFactorys = res.data
        })
        return res.data || []
      } else {
        message.error('获取城市数据失败~')
      }
      return res.data
    } catch (e) {
      e
      console.log(e)
    }
  }

  @action setMoveCityValue = value => {
    runInAction(() => {
      this.mapSearchCityValue = value
    })
  }

  @action setMapMove = value => {
    runInAction(() => {
      this.mapMove = value
    })
  }

  // /api/factory/info/get-details-enterprise-desc
  // 工厂详情
  @action getFactoryDetail = async factoryId => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/factory/info/get-details-enterprise-desc`,
        {
          factoryId
        }
      )

      if (res.code === 200) {
        return res.data || []
      } else {
        message.error('获取工厂数据失败~')
      }
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}

export const factoryStore = new FactoryStore()
