import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
// import { message } from 'antd'

export default class SearchOrderStore {
  constructor() {
    makeAutoObservable(this)
  }

  // @action getAccountInfo = async params => {
  //   try {
  //     const res: ResponseProps = await axios.get(
  //       `/api/user/get-account-info`,
  //       params
  //     )
  //     if (res.code === 200) {
  //       return res.data || {}
  //     } else {
  //       message.error(res.msg)
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
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
}
export const searchOrderStore = new SearchOrderStore()
