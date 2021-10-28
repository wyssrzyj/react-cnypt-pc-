import React, { useState } from 'react'
import styles from './index.module.less'
import { Route, Switch } from 'react-router'

import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { observer } from '@/utils/mobx'

// import { getCurrentUser, getUserInfo } from '@/utils/tool'

const DemandList = React.lazy(() => import('./demandList'))
const DemandSheet = React.lazy(() => import('./release'))
const applicationList = React.lazy(() => import('./applicationList'))

function index() {
  // const currentUser = getCurrentUser()
  // const userInfo = getUserInfo() || {}

  const [openKeys, setOpenKeys] = useState<Array<string>>([])
  const [currentMenu, setCurrentMenu] = useState<Array<string>>([])

  const handleMenu = ({ keyPath }) => {
    console.log(keyPath)

    setCurrentMenu(keyPath)
  }
  const onOpenChange = keys => {
    setOpenKeys(keys)
  }
  return (
    <div className={styles.controlPanel}>
      <div className={styles.controlPanelContainer}>
        {/* 左侧 */}
        <div className={styles.controlPanelLeft}>
          <div className={styles.managementCenter}>订单管理</div>
          <Menu
            openKeys={openKeys}
            selectedKeys={currentMenu} //当前选中的菜单项 key 数组
            onClick={handleMenu}
            mode="inline"
            onOpenChange={onOpenChange} //	SubMenu 展开/关闭的回调
          >
            <Menu.ItemGroup key="g6">
              <Menu.Item key="demandSheet">
                <Link
                  className={styles.minute}
                  to="/control-panel/issuerBill/demand-sheet"
                >
                  发布订单
                </Link>
              </Menu.Item>
              <Menu.Item key="demandList">
                <Link
                  className={styles.minute}
                  to="/control-panel/issuerBill/demand-list"
                >
                  订单列表
                </Link>
              </Menu.Item>
              <Menu.Item key="applicationList">
                <Link
                  className={styles.minute}
                  to="/control-panel/issuerBill/demand-applicationList"
                >
                  申请列表
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </div>
        {/* 主体 */}
        <div className={styles.controlPanelRight}>
          <Switch>
            {/* 申请列表 */}
            <Route
              path="/control-panel/issuerBill/demand-applicationList"
              component={applicationList}
            />
            <Route
              path="/control-panel/issuerBill/demand-sheet"
              component={DemandSheet}
            />
            {/* {订单列表} */}
            <Route
              path="/control-panel/issuerBill/demand-list"
              component={DemandList}
            />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default observer(index)
