import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { useStores } from '@/utils/mobx'
// import {
//   EnterpriseInfo,
//   PlantSitePhoto,
//   QualificationCertification,
//   CertificateAuthentication,
//   FactoryReport,
//   FactoryEquipment,
//   FactoryPhotograph
// } from './components'
import { getUserInfo } from '@/utils/tool'
// import FactoryInformation from './factoryInformation'
import { useLocation } from 'react-router'
// import AccountSafe from './accountSafe'
// import LoginLogs from './loginLogs'
import { Icon } from '@/components'
import styles from './index.module.less'

const AccountSafe = React.lazy(() => import('./accountSafe'))
const LoginLogs = React.lazy(() => import('./loginLogs'))
const FactoryInformation = React.lazy(() => import('./factoryInformation'))
const PlantSitePhoto = React.lazy(() => import('./components/plantSitePhoto'))
const EnterpriseInfo = React.lazy(() => import('./components/enterpriseInfo'))
const QualificationCertification = React.lazy(
  () => import('./components/qualificationCertification')
)
const CertificateAuthentication = React.lazy(
  () => import('./components/certificateAuthentication')
)
const FactoryReport = React.lazy(() => import('./components/factoryReport'))
const FactoryEquipment = React.lazy(
  () => import('./components/factoryEquipment')
)
const FactoryPhotograph = React.lazy(
  () => import('./components/factoryPhotograph')
)

const { SubMenu } = Menu

const menusName = new Map()
menusName.set('/control-panel/qualification', '资质认证')
menusName.set('/control-panel/photo', '厂房现场照')
menusName.set('/control-panel/information', '工厂资料')
menusName.set('/control-panel/enterprise', '企业信息')
menusName.set('/control-panel/certificate', '企业证件认证')
menusName.set('/control-panel/report', '验厂报告')
menusName.set('/control-panel/account', '账号安全')
menusName.set('/control-panel/logs', '登录日志')
menusName.set('/control-panel/equipment', '车间设备')
menusName.set('/control-panel/photograph', '工厂照片')

const menuKeys = new Map()
menuKeys.set('/control-panel/qualification', ['qualification', 'sub2', 'sub1'])
menuKeys.set('/control-panel/photo', ['photo', 'sub1'])
menuKeys.set('/control-panel/information', ['information', 'sub1'])
menuKeys.set('/control-panel/enterprise', ['enterprise', 'sub1'])
menuKeys.set('/control-panel/certificate', ['certificate', 'sub1'])
menuKeys.set('/control-panel/report', ['report', 'sub1'])
menuKeys.set('/control-panel/account', ['account', 'sub1'])
menuKeys.set('/control-panel/logs', ['account', 'sub1'])
menuKeys.set('/control-panel/report', ['report', 'sub2'])
menuKeys.set('/control-panel/equipment', ['equipment', 'sub2'])
menuKeys.set('/control-panel/photograph', ['photograph', 'sub2'])

const subsMap = new Map()
subsMap.set('/control-panel/qualification', ['sub2', 'sub1'])
subsMap.set('/control-panel/photo', ['sub1'])
subsMap.set('/control-panel/information', ['sub1'])
subsMap.set('/control-panel/enterprise', ['sub1'])
subsMap.set('/control-panel/certificate', ['sub1'])
subsMap.set('/control-panel/report', ['sub1'])
subsMap.set('/control-panel/account', ['sub1'])
subsMap.set('/control-panel/logs', ['sub1'])
subsMap.set('/control-panel/report', ['sub2'])
subsMap.set('/control-panel/equipment', ['sub2'])
subsMap.set('/control-panel/photograph', ['sub2'])

const ControlPanel = () => {
  const { factoryStore } = useStores()
  const { productCategory } = factoryStore
  const currentUser = getUserInfo() || {}
  const { approvalStatus, factoryAuditStatus } = currentUser
  const [currentMenu, setCurrentMenu] = useState<Array<string>>([])

  const [openKeys, setOpenKeys] = useState<Array<string>>([])

  const location = useLocation()

  const handleMenu = ({ keyPath }) => {
    setCurrentMenu(keyPath)
  }

  const onOpenChange = keys => {
    console.log(openKeys)
    setOpenKeys(keys)
  }

  useEffect(() => {
    setCurrentMenu(menuKeys.get(location.pathname))
    setOpenKeys(subsMap.get(location.pathname))
  }, [location.pathname])

  useEffect(() => {
    ;(async () => {
      await productCategory()
    })()
    setCurrentMenu(menuKeys.get(location.pathname))
    // setOpenKeys(subsMap.get(location.pathname))
  }, [])

  return (
    <div className={styles.controlPanel}>
      <div className={styles.controlPanelContainer}>
        <div className={styles.controlPanelLeft}>
          <h2 className={styles.management}>企业管理</h2>
          <Menu
            // openKeys={['management']}
            selectedKeys={currentMenu}
            mode="inline"
            onClick={handleMenu}
            onOpenChange={onOpenChange}
          >
            <Menu.Item
              className={styles.item}
              key="account"
              icon={<Icon className={styles.menuIcon} type={'jack-zhaq'} />}
            >
              <Link to="/control-panel/account">账号安全</Link>
            </Menu.Item>

            <Menu.Item
              key="enterprise"
              className={styles.item}
              icon={<Icon className={styles.menuIcon} type="jack-qyxx" />}
            >
              <Link to="/control-panel/enterprise">企业信息</Link>
            </Menu.Item>

            <Menu.Item
              key="certificate"
              className={styles.item}
              icon={<Icon className={styles.menuIcon} type="jack-qyzjrz" />}
            >
              <Link to="/control-panel/certificate">企业证件认证</Link>
            </Menu.Item>

            {approvalStatus && (
              <Menu.Item
                key="qualification"
                className={styles.item}
                icon={<Icon className={styles.menuIcon} type="jack-zzrz" />}
              >
                <Link to="/control-panel/qualification">资质认证</Link>
              </Menu.Item>
            )}

            {factoryAuditStatus == '1' && (
              <SubMenu
                key="sub2"
                className={styles.subItem}
                icon={<Icon className={styles.menuIcon} type="jack-ycgl" />}
                title="验厂管理"
              >
                <Menu.Item key="report">
                  <Link to="/control-panel/report">基础资料报告</Link>
                </Menu.Item>
                <Menu.Item key="equipment">
                  <Link to="/control-panel/equipment">车间设备</Link>
                </Menu.Item>
                <Menu.Item key="photograph">
                  <Link to="/control-panel/photograph">工厂照片</Link>
                </Menu.Item>
              </SubMenu>
            )}
          </Menu>
        </div>
        <div className={styles.controlPanelRight}>
          {/* <header className={styles.contentTitle}>
            <div className={styles.contentLeft}>
              {menusName.get(location.pathname)}
            </div>
          </header> */}
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
            {/* 登录日志 */}
            <Route path="/control-panel/logs/:id" component={LoginLogs} />
            {/* 验厂报告*/}
            <Route path="/control-panel/report" component={FactoryReport} />
            <Route path="/control-panel/account" component={AccountSafe} />
            {/* 车间设备 */}
            <Route
              path="/control-panel/equipment"
              component={FactoryEquipment}
            />
            {/* 工厂照片 */}
            <Route
              path="/control-panel/photograph"
              component={FactoryPhotograph}
            />
            <Redirect to="/platform" />
          </Switch>
        </div>
      </div>
    </div>
  )
}
export default ControlPanel
