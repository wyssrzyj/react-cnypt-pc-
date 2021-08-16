import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router'
import { compose } from 'redux'

// 商品分类维护
const Classify = React.lazy(() => import('@/pages/erpModule/classify'))

// 颜色维护
const Colour = React.lazy(() => import('@/pages/erpModule/colour'))

// 尺寸维护
const Measure = React.lazy(() => import('@/pages/erpModule/measure'))

// 其它配置
const Others = React.lazy(() => import('@/pages/erpModule/others'))

const RouteList = () => {
  return (
    <Switch>
      <Route path="/erp/classify" component={Classify} />
      <Route path="/erp/colour" component={Colour} />
      <Route path="/erp/measure" component={Measure} />
      <Route path="/erp/others" component={Others} />
      <Redirect to="/erp/classify" />
    </Switch>
  )
}

export default compose(withRouter)(RouteList)
