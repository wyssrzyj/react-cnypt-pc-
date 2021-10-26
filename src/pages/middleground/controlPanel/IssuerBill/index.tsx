import React from 'react'
import { Route, Switch } from 'react-router'

// 订单详情
const OrderDetails = React.lazy(() => import('./orderDetails'))
const RouteList = () => {
  return (
    <Switch>
      <Route
        path="/control-panel/panel/orderDetails"
        component={OrderDetails}
      />
    </Switch>
  )
}

export default RouteList
