import React, { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
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
import {
  EnterpriseInfo,
  PlantSitePhoto,
  QualificationCertification
} from './components'
import styles from './index.module.less'
import FactoryInformation from './factoryInformation'

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
            defaultSelectedKeys={['enterprise']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            onClick={handleMenu}
          >
            <SubMenu key="sub1" icon={<BookOutlined />} title="企业管理">
              <Menu.Item key="enterprise" icon={<ContainerOutlined />}>
                <Link to="/control-panel/enterprise">企业信息</Link>
              </Menu.Item>
              <Menu.Item key="factory" icon={<FileSearchOutlined />}>
                <Link to="/control-panel/enterprise">工厂资料</Link>
              </Menu.Item>
              <Menu.Item key="workshop" icon={<BankOutlined />}>
                <Link to="/control-panel/photo">厂房现场照</Link>
              </Menu.Item>
              <SubMenu key="sub2" title="认证管理" icon={<VerifiedOutlined />}>
                <Menu.Item key="qualification" icon={<TagsOutlined />}>
                  <Link to="/control-panel/qualification">资质认证</Link>
                </Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
        <div className={styles.controlPanelRight}>
          <header className={styles.contentTitle}>
            {get(menuMap, currentMenu as string)}
          </header>
          <Switch>
            <Route
              path="/control-panel/enterprise"
              component={EnterpriseInfo}
            />
            <Route
              path="/control-panel/information"
              component={FactoryInformation}
            />
            <Route path="/control-panel/photo" component={PlantSitePhoto} />
            <Route
              path="/control-panel/qualification"
              component={QualificationCertification}
            />
            <Redirect to="/platform" />
          </Switch>
        </div>
      </div>
    </div>
  )
}
export default ControlPanel
