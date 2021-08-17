import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'

export default class ErpModuleStore {
  constructor() {
    makeAutoObservable(this)
  }

  // 获取商品分类的分组列表
  @action goodGroupLists = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/basic/product-group/list`,
        params
      )
      return res
    } catch (e) {
      console.log(e)
    }
  }

  // 新建/更新商品分类的分组
  @action editGoodGroup = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/basic/product-group/save`,
        params
      )
      return res
    } catch (e) {
      console.log(e)
    }
  }

  // 查询所有的商品分类
  @action goodClassifyLists = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/basic/product-category/list`,
        params
      )
      return res
    } catch (e) {
      console.log(e)
    }
  }

  // 新建/更新商品分类
  @action editGoodClassify = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/basic/product-category/save`,
        params
      )
      return res
    } catch (e) {
      console.log(e)
    }
  }

  // 分页条件查询计量单位、品牌、生产工艺币种
  @action getOtherConfiguration = async (filed, params) => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/basic/${filed}/list`,
        params
      )
      return res
    } catch (e) {
      console.log(e)
    }
  }

  // 新增或更新计量单位、品牌、生产工艺币种
  @action editOtherConfiguration = async (filed, params) => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/basic/${filed}/save`,
        params
      )
      return res
    } catch (e) {
      console.log(e)
    }
  }

  // 删除计量单位、、品牌、生产工艺币种
  @action deleteOtherConfiguration = async (filed, id) => {
    try {
      const res: ResponseProps = await axios.delete(
        `/api/basic/${filed}/delete`,
        id
      )
      return res
    } catch (e) {
      console.log(e)
    }
  }
}
export const erpModuleStore = new ErpModuleStore()
