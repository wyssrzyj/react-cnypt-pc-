import initHomeStore from './home/index'
import { loginStore } from './login/loginStore'
import { registerStore } from './register'
import { factoryPageStore } from './factoryPage'
import { factoryStore } from './factory'
import { commonStore } from './common'

export const stores = {
  ...initHomeStore,
  loginStore,
  registerStore,
  factoryPageStore,
  factoryStore,
  commonStore
}
