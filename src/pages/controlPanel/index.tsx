import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
  BankOutlined,
  ContainerOutlined,
  FileSearchOutlined,
  // VerifiedOutlined,
  // ExceptionOutlined,
  TagsOutlined,
  BookOutlined
} from '@ant-design/icons'
import { useStores } from '@/utils/mobx'
import {
  EnterpriseInfo,
  PlantSitePhoto,
  QualificationCertification,
  CertificateAuthentication,
  FactoryReport
} from './components'
import styles from './index.module.less'
import FactoryInformation from './factoryInformation'
import { useLocation } from 'react-router'

const { SubMenu } = Menu

const menusName = new Map()
menusName.set('/control-panel/qualification', '资质认证')
menusName.set('/control-panel/photo', '厂房现场照')
menusName.set('/control-panel/information', '工厂资料')
menusName.set('/control-panel/enterprise', '企业信息')
menusName.set('/control-panel/certificate', '企业证件认证')
menusName.set('/control-panel/report', '验厂报告')

const menuKeys = new Map()
menuKeys.set('/control-panel/qualification', ['qualification', 'sub2', 'sub1'])
menuKeys.set('/control-panel/photo', ['photo', 'sub1'])
menuKeys.set('/control-panel/information', ['information', 'sub1'])
menuKeys.set('/control-panel/enterprise', ['enterprise', 'sub1'])
menuKeys.set('/control-panel/certificate', ['certificate', 'sub1'])
menuKeys.set('/control-panel/report', ['report', 'sub1'])

const subsMap = new Map()
subsMap.set('/control-panel/qualification', ['sub2', 'sub1'])
subsMap.set('/control-panel/photo', ['sub1'])
subsMap.set('/control-panel/information', ['sub1'])
subsMap.set('/control-panel/enterprise', ['sub1'])
subsMap.set('/control-panel/certificate', ['sub1'])
subsMap.set('/control-panel/report', ['sub1'])

const ControlPanel = () => {
  const { factoryStore } = useStores()
  const { productCategory } = factoryStore
  const [currentMenu, setCurrentMenu] = useState<Array<string>>([])

  const [openKeys, setOpenKeys] = useState<Array<string>>([])

  const location = useLocation()

  useEffect(() => {
    ;(async () => {
      await productCategory()
    })()
    setCurrentMenu(menuKeys.get(location.pathname))
    setOpenKeys(subsMap.get(location.pathname))
  }, [])

  const handleMenu = ({ keyPath }) => {
    setCurrentMenu(keyPath)
  }

  const onOpenChange = keys => {
    setOpenKeys(keys)
  }

  return (
    <div className={styles.controlPanel}>
      <div className={styles.controlPanelContainer}>
        <div className={styles.controlPanelLeft}>
          <Menu
            // defaultSelectedKeys={['enterprise']}
            openKeys={openKeys}
            selectedKeys={currentMenu}
            mode="inline"
            theme="dark"
            onClick={handleMenu}
            onOpenChange={onOpenChange}
          >
            <SubMenu key="sub1" icon={<BookOutlined />} title="企业管理">
              <Menu.Item key="enterprise" icon={<ContainerOutlined />}>
                <Link to="/control-panel/enterprise">企业信息</Link>
              </Menu.Item>

              <Menu.Item key="certificate" icon={<FileSearchOutlined />}>
                <Link to="/control-panel/certificate">企业证件认证</Link>
              </Menu.Item>

              {/* <Menu.Item key="result" icon={<ExceptionOutlined />}>
                <Link to="/control-panel/result">审批结果</Link>
              </Menu.Item> */}

              <Menu.Item key="information" icon={<FileSearchOutlined />}>
                <Link to="/control-panel/information">工厂资料</Link>
              </Menu.Item>
              {/* <Menu.Item key="photo" icon={<BankOutlined />}>
                <Link to="/control-panel/photo">厂房现场照</Link>
              </Menu.Item> */}
            </SubMenu>
            <Menu.Item key="qualification" icon={<TagsOutlined />}>
              <Link to="/control-panel/qualification">资质认证</Link>
            </Menu.Item>
            <Menu.Item key="report" icon={<BankOutlined />}>
              <Link to="/control-panel/report">验厂报告</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className={styles.controlPanelRight}>
          <header className={styles.contentTitle}>
            {menusName.get(location.pathname)}
          </header>
          <Switch>
            {/* 企业信息 */}
            <Route
              path="/control-panel/enterprise"
              component={EnterpriseInfo}
            />
            {/* 企业证件认证 */}
            <Route
              path="/control-panel/certificate"
              component={CertificateAuthentication}
            />
            <Route
              path="/control-panel/information"
              component={FactoryInformation}
            />
            <Route path="/control-panel/photo" component={PlantSitePhoto} />
            {/* 资质认证 */}
            <Route
              path="/control-panel/qualification"
              component={QualificationCertification}
            />
            {/* 验厂报告*/}
            <Route path="/control-panel/report" component={FactoryReport} />
            <Redirect to="/platform" />
          </Switch>
        </div>
      </div>
    </div>
  )
}
export default ControlPanel
