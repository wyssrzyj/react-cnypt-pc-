import HomeStore, { homeStore } from './home/homeStore'
import LoginStore, { loginStore } from './login/loginStore'
import RegisterStore, { registerStore } from './register'
import FactoryPageStore, { factoryPageStore } from './factoryPage'
import FactoryStore, { factoryStore } from './factory'
import CommonStore, { commonStore } from './common'
import ControlPanelStore, { controlPanelStore } from './controlPanel'
import FactoryDetailStore, { factoryDetailStore } from './factoryDetail'
import ErpModuleStore, { erpModuleStore } from './erpModule'
import OrderStore, { orderStore } from './middleground/order'

export interface Stores {
  homeStore: HomeStore
  loginStore: LoginStore
  registerStore: RegisterStore
  factoryPageStore: FactoryPageStore
  factoryStore: FactoryStore
  commonStore: CommonStore
  controlPanelStore: ControlPanelStore
  factoryDetailStore: FactoryDetailStore
  erpModuleStore: ErpModuleStore
  orderStore: OrderStore
}

export const stores = {
  homeStore,
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
