import { observable, action, makeObservable } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'

export default class HomeStore {
  constructor() {
    makeObservable(this, {
      // name: observable,
      count: observable,
      setCount: action,
    }) // 指定要暴露出去的属性
  }

  @observable name = 'amin'
  count = 1

  @action setCount = () => {
    this.count++
    this.name = 'zf'
    console.log(this.count)
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
      gender: 1,
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

  @action login = async (params) => {
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
