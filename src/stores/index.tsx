import initHomeStore from './home/index'
import { loginStore } from './login/loginStore'
import { registerStore } from './register'
import { factoryPageStore } from './factoryPage'

export const stores = {
  ...initHomeStore,
  loginStore,
  registerStore,
  factoryPageStore
}
