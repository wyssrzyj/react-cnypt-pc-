import { observable, action, makeObservable } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import cusAxios from 'axios'

export default class HomeStore {
  constructor() {
    makeObservable(this, {
      // name: observable,
      count: observable,
      setCount: action
    }) // 指定要暴露出去的属性
  }

  @observable name = 'amin'
  count = 1

  @action setCount = () => {
    this.count++
    this.name = 'zf'
  }

  @action getUser = async () => {
    try {
      const start = Date.now()
      const params = { id: Math.floor(Math.random() * 1717) + 1 }
      const res: ResponseProps = await axios.get(`/api/v1/user/`, params)
      const end = window.performance.timing.connectEnd
      console.log(end - start)
      // localStorage.setItem("token", res.token)
      if (res) {
        // console.log(res)
        // localStorage.setItem("currentUser", JSON.stringify(res))
      }
      return res
    } catch (e) {
      console.log(e)
    }
  }

  @action addUser = async () => {
    const params = {
      username: 'amin',
      password: '123456',
      birthday: 1620884931785,
      gender: 1
    }

    try {
      const res: ResponseProps = await axios.post(`/api/v1/user`, params)

      // localStorage.setItem("token", res.token)
      if (res) {
        console.log(res)
        // localStorage.setItem("currentUser", JSON.stringify(res))
      }
      return res
    } catch (e) {
      console.log(e)
    }
  }

  @action login = async params => {
    try {
      const res: ResponseProps = await axios.get('/api/say/Hello', params)
      // localStorage.setItem("token", res.token)
      if (res) {
        console.log(res)
        // localStorage.setItem("currentUser", JSON.stringify(res))
      }
      return res
    } catch (e) {
      console.log(e)
    }
  }

  @action getAccess = async () => {
    try {
      const type = 'client_credentials'
      const clientId = 'NlioHvenI3ZErGC3lhh4EH06'
      const clientSecret = '481RhUGAaOCEyGu6cvvsUjFoMlGiQ6SG'
      const res: ResponseProps = await cusAxios.get(
        `/baiduApi/oauth/2.0/token?grant_type=${type}&client_id=${clientId}&client_secret=${clientSecret}`
      )
      // localStorage.setItem("token", res.token)
      if (res) {
        console.log(res)
        // localStorage.setItem("currentUser", JSON.stringify(res))
      }
      return res
    } catch (e) {
      console.log(e)
    }
  }

  @action getAreaFactorys = async params => {
    try {
      const res = await axios.post(
        '/api/factory/unauth/statistic/map/factory',
        params
      )
      if (res.code === 200) {
        return res.data
      }
      return {}
    } catch (err) {
      console.log(err)
    }
  }

  // /api/factory/unauth/statistic/map/province
  @action getProvinceCounts = async () => {
    try {
      const res = await axios.get('/api/factory/unauth/statistic/map/province')
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  // /api/factory/unauth/statistic/allCountry
  @action getStatisticalData = async () => {
    try {
      const res = await axios.get('/api/factory/unauth/statistic/allCountry')
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  // /api/factory/unauth/statistic/get_total_capacity
  @action getTotalCapacity = async () => {
    try {
      const res = await axios.get(
        '/api/factory/unauth/statistic/get_total_capacity'
      )
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
}

// export default class HomeStore {
//     constructor(){
//         makeAutoObservable(this)
//     }
//     count = 1;
//
//     setCount = () => {
//         this.count++;
//         console.log(this.count)
//     }
// }

export const homeStore = new HomeStore()
