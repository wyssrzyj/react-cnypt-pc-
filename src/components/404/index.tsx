import './index.less'
import { NavLink } from 'react-router-dom'

import React from 'react'

const NotFound = () => {
  return (
    <div className="layout404">
      <div className="layout404-bg" />
      <div className="layout404-content">
        <div className="layout404-content-title">'找不到页面！'</div>
        <div className="layout404-content-subTitle">
          抱歉！您访问的页面不存在 <NavLink to={'/'}>回到首页</NavLink>
        </div>
      </div>
    </div>
  )
}

export default NotFound
