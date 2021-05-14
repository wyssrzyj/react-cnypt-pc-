import { makeAutoObservable, action } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'

export default class LoginStore {
  constructor() {
    makeAutoObservable(this)
  }

  @action login = async (params) => {
    try {
      const res: ResponseProps = await axios.post(
        '/api/user/capacity/login',
        params
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
}

export const loginStore = new LoginStore()
