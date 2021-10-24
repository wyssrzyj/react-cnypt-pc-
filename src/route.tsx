import React from 'react'
import { Route, Switch } from 'react-router-dom'

const HomePage = React.lazy(() => import('@/pages/home/newHome'))
const LoginAndRegister = React.lazy(() => import('@/pages/login'))
const FactoryDetail = React.lazy(() => import('@/pages/factoryDetail2'))
const OrderDetail = React.lazy(() => import('@/pages/orderDetail'))
const Platform = React.lazy(() => import('@/pages/platform'))
const NotFound = React.lazy(() => import('@/components/404'))
const MapSearch = React.lazy(() => import('@/pages/mapSearch/index'))
const FactoryPage = React.lazy(() => import('@/pages/factoryPage'))
const ErpModule = React.lazy(() => import('@/pages/erpModule'))
const Excel = React.lazy(() => import('@/pages/homePage/excel'))
const MiddleGround = React.lazy(() => import('@/pages/middleground'))
const DemandDocQuery = React.lazy(() => import('@/pages/demandDocQuery'))

// const ControlPanel = React.lazy(() => import('@/pages/controlPanel'))
// const GDMap = React.lazy(() => import('@/pages/homePage/GDMap'))

const RouteList = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/factory-search" component={Platform} />
      <Route path="/user" component={LoginAndRegister} />
      <Route path="/order-detail" component={OrderDetail} />
      <Route path="/factory-detail/:id" component={FactoryDetail} />
      <Route path="/mapSearch" component={MapSearch} />
      <Route path="/factoryPage" component={FactoryPage} />
      <Route path="/erp" component={ErpModule} />
      <Route path="/excel" component={Excel} />
      <Route path="/control-panel" component={MiddleGround} />
      <Route path="/demandDocQuery" component={DemandDocQuery} />

      <Route path="*" component={NotFound} />
      {/* <Route path="/GDMap" component={GDMap} /> */}
      {/* <Route path="/control-panel" component={ControlPanel} /> */}
    </Switch>
  )
}

export default RouteList
