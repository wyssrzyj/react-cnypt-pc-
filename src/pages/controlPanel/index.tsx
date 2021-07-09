import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { Menu, Tooltip } from 'antd'
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
import { getUserInfo } from '@/utils/tool'
import styles from './index.module.less'
import FactoryInformation from './factoryInformation'
import { useLocation, useHistory } from 'react-router'
import AccountSafe from './accountSafe'
import LoginLogs from './loginLogs'
import { Icon } from '@/components'

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

const menuKeys = new Map()
menuKeys.set('/control-panel/qualification', ['qualification', 'sub2', 'sub1'])
menuKeys.set('/control-panel/photo', ['photo', 'sub1'])
menuKeys.set('/control-panel/information', ['information', 'sub1'])
menuKeys.set('/control-panel/enterprise', ['enterprise', 'sub1'])
menuKeys.set('/control-panel/certificate', ['certificate', 'sub1'])
menuKeys.set('/control-panel/report', ['report', 'sub1'])
menuKeys.set('/control-panel/account', ['account', 'sub1'])
menuKeys.set('/control-panel/logs', ['account', 'sub1'])

const subsMap = new Map()
subsMap.set('/control-panel/qualification', ['sub2', 'sub1'])
subsMap.set('/control-panel/photo', ['sub1'])
subsMap.set('/control-panel/information', ['sub1'])
subsMap.set('/control-panel/enterprise', ['sub1'])
subsMap.set('/control-panel/certificate', ['sub1'])
subsMap.set('/control-panel/report', ['sub1'])
subsMap.set('/control-panel/account', ['sub1'])
subsMap.set('/control-panel/logs', ['sub1'])

const ControlPanel = () => {
  const { factoryStore } = useStores()
  const { productCategory } = factoryStore
  const currentUser = getUserInfo() || {}
  const { approvalStatus, factoryAuditStatus } = currentUser
  const [currentMenu, setCurrentMenu] = useState<Array<string>>([])

  const [openKeys, setOpenKeys] = useState<Array<string>>([])

  const location = useLocation()
  const history = useHistory()

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

  const toHome = () => {
    history.push('/home')
  }

  const toTarget = path => {
    history.push(path)
  }

  return (
    <div className={styles.controlPanel}>
      <div className={styles.controlPanelContainer}>
        <div className={styles.controlPanelLeft}>
          <div className={styles.slideBar}>
            <Icon type={'jack-logo1'} className={styles.logoIcon}></Icon>
            <div className={styles.slideIconBox}>
              <Tooltip title={'首页'}>
                <div
                  className={styles.activeIcon}
                  onClick={() => toTarget('/home')}
                >
                  <Icon
                    type={'jack-shouye'}
                    className={styles.slideIcon}
                  ></Icon>
                </div>
              </Tooltip>
              <Tooltip title={'企业管理'}>
                <div className={styles.activeIconBox}>
                  <Icon
                    type={'jack-qiyeguanli'}
                    className={styles.slideIcon}
                  ></Icon>
                </div>
              </Tooltip>
              <Tooltip title={'订单管理'}>
                <div className={styles.activeIcon}>
                  <Icon
                    type={'jack-dingdanguanli'}
                    className={styles.slideIcon}
                  ></Icon>
                </div>
              </Tooltip>
            </div>
          </div>
          <Menu
            // defaultSelectedKeys={['enterprise']}
            openKeys={openKeys}
            selectedKeys={currentMenu}
            mode="inline"
            // theme="dark"
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

              {/* <Menu.Item key="information" icon={<FileSearchOutlined />}>
                <Link to="/control-panel/information">工厂资料</Link>
              </Menu.Item> */}
              {/* <Menu.Item key="photo" icon={<BankOutlined />}>
                <Link to="/control-panel/photo">厂房现场照</Link>
              </Menu.Item> */}
            </SubMenu>
            {approvalStatus && (
              <Menu.Item key="qualification" icon={<TagsOutlined />}>
                <Link to="/control-panel/qualification">资质认证</Link>
              </Menu.Item>
            )}
            {factoryAuditStatus == '1' && (
              <Menu.Item key="report" icon={<BankOutlined />}>
                <Link to="/control-panel/report">验厂报告</Link>
              </Menu.Item>
            )}
            <Menu.Item
              key="account"
              icon={
                <Icon
                  className={styles.menuIcon}
                  type={'jack-zhanghaoanquan'}
                />
              }
            >
              <Link to="/control-panel/account">账号安全</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className={styles.controlPanelRight}>
          <header className={styles.contentTitle}>
            <div className={styles.contentLeft}>
              {menusName.get(location.pathname)}
            </div>
            <div>
              <Tooltip title={'首页'}>
                <Icon
                  onClick={toHome}
                  type={'jack-wzsy'}
                  className={styles.headerIcon}
                ></Icon>
              </Tooltip>
              <Tooltip title={'个人中心'}>
                <Icon
                  type={'jack-gerenzhongxin'}
                  className={styles.headerIcon}
                ></Icon>
              </Tooltip>
              <Tooltip title={'收藏'}>
                <Icon
                  type={'jack-shoucangjia'}
                  className={styles.headerIcon}
                ></Icon>
              </Tooltip>
              <Tooltip title={'消息'}>
                <Icon type={'jack-xiaoxi'} className={styles.headerIcon}></Icon>
              </Tooltip>
            </div>
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
            {/* 登录日志 */}
            <Route path="/control-panel/logs/:id" component={LoginLogs} />
            {/* 验厂报告*/}
            <Route path="/control-panel/report" component={FactoryReport} />
            <Route path="/control-panel/account" component={AccountSafe} />
            <Redirect to="/platform" />
          </Switch>
        </div>
      </div>
    </div>
  )
}
export default ControlPanel
