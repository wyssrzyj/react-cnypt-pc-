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
