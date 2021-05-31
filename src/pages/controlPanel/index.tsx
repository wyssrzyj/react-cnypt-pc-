import React, { useState } from 'react'
import { Menu } from 'antd'
import {
  BankOutlined,
  ContainerOutlined,
  FileSearchOutlined,
  VerifiedOutlined,
  TagsOutlined,
  BookOutlined
} from '@ant-design/icons'
import { get } from 'lodash'
import { EnterpriseInfo } from './components'
import styles from './index.module.less'

const { SubMenu } = Menu
const menuMap = {
  enterprise: '企业信息',
  factory: '工厂资料',
  workshop: '厂房现场照',
  qualification: '资质认证'
}

const ControlPanel = () => {
  const [currentMenu, setCurrentMenu] = useState<String>('enterprise')
  const handleMenu = ({ item, key, keyPath, domEvent }) => {
    console.log({ item, key, keyPath, domEvent })
    setCurrentMenu(key)
  }
  return (
    <div className={styles.controlPanel}>
      <div className={styles.controlPanelContainer}>
        <div className={styles.controlPanelLeft}>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            onClick={handleMenu}
          >
            <SubMenu key="sub1" icon={<BookOutlined />} title="企业管理">
              <Menu.Item key="enterprise" icon={<ContainerOutlined />}>
                企业信息
              </Menu.Item>
              <Menu.Item key="factory" icon={<FileSearchOutlined />}>
                工厂资料
              </Menu.Item>
              <Menu.Item key="workshop" icon={<BankOutlined />}>
                厂房现场照
              </Menu.Item>
              <SubMenu key="sub2" title="认证管理" icon={<VerifiedOutlined />}>
                <Menu.Item key="qualification" icon={<TagsOutlined />}>
                  资质认证
                </Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
        <div className={styles.controlPanelRight}>
          <header className={styles.contentTitle}>
            {get(menuMap, currentMenu)}
          </header>
          {currentMenu === 'enterprise' && <EnterpriseInfo />}
        </div>
      </div>
    </div>
  )
}
export default ControlPanel
