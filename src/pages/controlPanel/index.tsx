import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { useStores } from '@/utils/mobx'
import { getUserInfo } from '@/utils/tool'
import { useLocation } from 'react-router'
import { Icon } from '@/components'
import styles from './index.module.less'

const AccountSafe = React.lazy(() => import('./accountSafe'))
const LoginLogs = React.lazy(() => import('./loginLogs'))
const FactoryInformation = React.lazy(() => import('./factoryInformation'))
const PlantSitePhoto = React.lazy(() => import('./components/plantSitePhoto'))
const EnterpriseInfo = React.lazy(() => import('./components/enterpriseInfo'))
const IssuerEnterpriseInfo = React.lazy(
  () => import('./components/issuerEnterpriseInfo')
)

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
menusName.set('/control-panel/panel/qualification', '资质认证')
menusName.set('/control-panel/panel/photo', '厂房现场照')
menusName.set('/control-panel/panel/information', '工厂资料')
menusName.set('/control-panel/panel/enterprise', '企业信息')
menusName.set('/control-panel/panel/certificate', '企业证件认证')
menusName.set('/control-panel/panel/report', '验厂报告')
menusName.set('/control-panel/panel/account', '账号安全')
menusName.set('/control-panel/panel/logs', '登录日志')
menusName.set('/control-panel/panel/equipment', '车间设备')
menusName.set('/control-panel/panel/photograph', '工厂照片')
menusName.set('/control-panel/panel/issue-bill', '发单信息')

const menuKeys = new Map()
menuKeys.set('/control-panel/panel/qualification', [
  'qualification',
  'sub2',
  'sub1'
])
menuKeys.set('/control-panel/panel/photo', ['photo', 'sub1'])
menuKeys.set('/control-panel/panel/information', ['information', 'sub1'])
menuKeys.set('/control-panel/panel/enterprise', ['enterprise', 'sub1'])
menuKeys.set('/control-panel/panel/certificate', ['certificate', 'sub1'])
menuKeys.set('/control-panel/panel/report', ['report', 'sub1'])
menuKeys.set('/control-panel/panel/account', ['account', 'sub1'])
menuKeys.set('/control-panel/panel/logs', ['account', 'sub1'])
menuKeys.set('/control-panel/panel/report', ['report', 'sub2'])
menuKeys.set('/control-panel/panel/equipment', ['equipment', 'sub2'])
menuKeys.set('/control-panel/panel/photograph', ['photograph', 'sub2'])
menuKeys.set('/control-panel/panel/issue-bill', ['issue-bill', 'sub1'])

const subsMap = new Map()
subsMap.set('/control-panel/panel/qualification', ['sub2', 'sub1'])
subsMap.set('/control-panel/panel/photo', ['sub1'])
subsMap.set('/control-panel/panel/information', ['sub1'])
subsMap.set('/control-panel/panel/enterprise', ['sub1'])
subsMap.set('/control-panel/panel/certificate', ['sub1'])
subsMap.set('/control-panel/panel/report', ['sub1'])
subsMap.set('/control-panel/panel/account', ['sub1'])
subsMap.set('/control-panel/panel/logs', ['sub1'])
subsMap.set('/control-panel/panel/report', ['sub2'])
subsMap.set('/control-panel/panel/equipment', ['sub2'])
subsMap.set('/control-panel/panel/photograph', ['sub2'])
subsMap.set('/control-panel/panel/issue-bill', ['sub1'])

const ControlPanel = () => {
  const { factoryStore } = useStores()
  const { productCategory } = factoryStore
  const currentUser = getUserInfo() || {}
  const { infoApprovalStatus, factoryAuditStatus } = currentUser

  const [currentMenu, setCurrentMenu] = useState<Array<string>>([])

  const [openKeys, setOpenKeys] = useState<Array<string>>([])

  const location = useLocation()
  const userInfo = getUserInfo()

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
              <Link to="/control-panel/panel/account">账号安全</Link>
            </Menu.Item>

            <Menu.Item
              key="enterprise"
              className={styles.item}
              icon={<Icon className={styles.menuIcon} type="jack-qyxx" />}
            >
              <Link to="/control-panel/panel/enterprise">企业信息</Link>
            </Menu.Item>
            {/* infoApprovalStatus === 1 */}
            {userInfo.infoApprovalStatus === 1 ? (
              <Menu.Item
                key="issue-bill"
                className={styles.item}
                icon={<Icon className={styles.menuIcon} type="jack-qyxx" />}
              >
                <Link to="/control-panel/panel/issue-bill">发单信息</Link>
              </Menu.Item>
            ) : null}

            <Menu.Item
              key="certificate"
              className={styles.item}
              icon={<Icon className={styles.menuIcon} type="jack-qyzjrz" />}
            >
              <Link to="/control-panel/panel/certificate">企业证件认证</Link>
            </Menu.Item>

            {infoApprovalStatus == '1' && (
              <Menu.Item
                key="qualification"
                className={styles.item}
                icon={<Icon className={styles.menuIcon} type="jack-zzrz" />}
              >
                <Link to="/control-panel/panel/qualification">资质认证</Link>
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
                  <Link to="/control-panel/panel/report">基础资料报告</Link>
                </Menu.Item>
                <Menu.Item key="equipment">
                  <Link to="/control-panel/panel/equipment">车间设备</Link>
                </Menu.Item>
                <Menu.Item key="photograph">
                  <Link to="/control-panel/panel/photograph">工厂照片</Link>
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
              path="/control-panel/panel/issue-bill"
              component={IssuerEnterpriseInfo}
            />
            <Route
              path="/control-panel/panel/enterprise"
              component={EnterpriseInfo}
            />
            {/* 企业证件认证 */}
            <Route
              path="/control-panel/panel/certificate"
              component={CertificateAuthentication}
            />
            <Route
              path="/control-panel/panel/information"
              component={FactoryInformation}
            />
            <Route
              path="/control-panel/panel/photo"
              component={PlantSitePhoto}
            />
            {/* 资质认证 */}
            <Route
              path="/control-panel/panel/qualification"
              component={QualificationCertification}
            />
            {/* 登录日志 */}
            <Route path="/control-panel/panel/logs/:id" component={LoginLogs} />
            {/* 验厂报告*/}
            <Route
              path="/control-panel/panel/report"
              component={FactoryReport}
            />
            <Route
              path="/control-panel/panel/account"
              component={AccountSafe}
            />
            {/* 车间设备 */}
            <Route
              path="/control-panel/panel/equipment"
              component={FactoryEquipment}
            />
            {/* 工厂照片 */}
            <Route
              path="/control-panel/panel/photograph"
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
