import initHomeStore from './home/index'
import { loginStore } from './login/loginStore'
import { registerStore } from './register'
import { factoryPageStore } from './factoryPage'
import { factoryStore } from './factory'
import { commonStore } from './common'
import { controlPanelStore } from './controlPanel'
import { factoryDetailStore } from './factoryDetail'
import { erpModuleStore } from './erpModule'
import { orderStore } from './middleground/order'

export const stores = {
  ...initHomeStore,
  loginStore,
  registerStore,
  factoryPageStore,
  factoryStore,
  commonStore,
  controlPanelStore,
  factoryDetailStore,
  erpModuleStore,
  orderStore
}
