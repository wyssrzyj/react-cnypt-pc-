import React from 'react'
import styles from './index.module.less'
import { Route, Switch } from 'react-router'

// import { Menu } from 'antd'
// import { Link } from 'react-router-dom'
// import { getCurrentUser, getUserInfo } from '@/utils/tool'

const ReceiveOrders = React.lazy(() => import('../controlPanel/receiveOrders'))

function index() {
  // const currentUser = getCurrentUser()
  // const userInfo = getUserInfo() || {}

  // const [openKeys, setOpenKeys] = useState<Array<string>>([])
  // const [currentMenu, setCurrentMenu] = useState<Array<string>>([])

  // const handleMenu = ({ keyPath }) => {
  //   setCurrentMenu(keyPath)
  // }
  // const onOpenChange = keys => {
  //   setOpenKeys(keys)
  // }
  return (
    <div className={styles.controlPanel}>
      <div className={styles.controlPanelContainer}>
        {/* 左侧 */}
        {/* 主体 */}
        <div className={styles.controlPanelRight}>
          <Switch>
            {/* 发单信息 */} /control-panel/orderManagement
            <Route
              path="/control-panel/orderManagement/receiveOrder"
              component={ReceiveOrders}
            />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default index
