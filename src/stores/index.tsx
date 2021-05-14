import initHomeStore from './home/index'
import { loginStore } from './login/loginStore'
import { registerStore } from './register'

export const stores = {
  ...initHomeStore,
  loginStore,
  registerStore,
}
