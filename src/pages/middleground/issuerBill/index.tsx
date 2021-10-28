import React, { useState, useEffect } from 'react'
import { useStores } from '@/utils/mobx'
import { useLocation } from 'react-router'
import { menuKeys, subsMap } from './routeConfig'

import { Redirect, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './index.module.less'
import { Icon } from '@/components'
import { Menu } from 'antd'
import { getCurrentUser, getUserInfo } from '@/utils/tool'

const Title = ({ title, icon }) => {
  return (
    <div className={styles.menuTitle}>
      <Icon type={icon} className={styles.menuIcon}></Icon>
      {title}
    </div>
  )
}
function IssuerBill() {
  const currentUser = getCurrentUser()
  const userInfo = getUserInfo() || {}

  const { factoryStore } = useStores()
  const { productCategory } = factoryStore
  const [currentMenu, setCurrentMenu] = useState<Array<string>>([])
  const [openKeys, setOpenKeys] = useState<Array<string>>([])

  const location = useLocation()
  const handleMenu = ({ keyPath }) => {
    setCurrentMenu(keyPath)
  }

  const onOpenChange = keys => {
    setOpenKeys(keys)
  }

  useEffect(() => {
    setCurrentMenu(menuKeys.get(location.pathname))
    setOpenKeys(subsMap.get(location.pathname)) //往useState中存一个数据

    // get() 方法用来获取一个 Map?对象中指定的元素。
  }, [location.pathname])

  useEffect(() => {
    ;(async () => {
      await productCategory()
    })()
    setCurrentMenu(menuKeys.get(location.pathname))
  }, [])

  return (
    <div>
      <div className={styles.controlPanel}>
        <div className={styles.controlPanelContainer}>
          <div className={styles.controlPanelLeft}>
            <div className={styles.managementCenter}>会员中心</div>
            <Menu
              openKeys={openKeys}
              selectedKeys={currentMenu} //当前选中的菜单项 key 数组
              onClick={handleMenu}
              mode="inline"
              onOpenChange={onOpenChange} //	SubMenu 展开/关闭的回调
            >
              <Menu.ItemGroup
                key="g1"
                title={
                  <Title title={'账号管理'} icon={'jack-bussiness-man'}></Title>
                }
              >
                <Menu.Item className={styles.items} key="account">
                  <Link
                    to="/control-panel/panel/account"
                    className={styles.minutest}
                  >
                    账号安全
                  </Link>
                </Menu.Item>
                <Menu.Item key="enterprise" className={styles.items}>
                  <Link
                    className={styles.minutest}
                    to="/control-panel/panel/enterprise"
                  >
                    企业信息
                  </Link>
                </Menu.Item>
                <Menu.Item key="enterprise-photos" className={styles.items}>
                  <Link
                    className={styles.minutest}
                    to="/control-panel/panel/enterprise-photos"
                  >
                    企业照片
                  </Link>
                </Menu.Item>
                {+currentUser.enterpriseType === 1 ? (
                  <Menu.Item key="issue-bill" className={styles.items}>
                    <Link
                      className={styles.minutest}
                      to="/control-panel/panel/issue-bill"
                    >
                      发单信息
                    </Link>
                  </Menu.Item>
                ) : null}
              </Menu.ItemGroup>

              <Menu.ItemGroup
                key="g2"
                title={
                  <Title title={'企业认证管理'} icon={'jack-company'}></Title>
                }
              >
                <Menu.Item key="certificate" className={styles.items}>
                  <Link
                    className={styles.minutest}
                    to="/control-panel/panel/certificate"
                  >
                    企业证件认证
                  </Link>
                </Menu.Item>

                <Menu.Item key="qualification" className={styles.items}>
                  <Link
                    className={styles.minutest}
                    to="/control-panel/panel/qualification"
                  >
                    资质认证
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
              {userInfo.enterpriseType !== null &&
              +userInfo.enterpriseType === 0 ? (
                <Menu.ItemGroup
                  key="g3"
                  title={
                    <Title
                      title={'验厂管理'}
                      icon={'jack-banzhengfuwu'}
                    ></Title>
                  }
                >
                  <Menu.Item key="report">
                    <Link
                      className={styles.minute}
                      to="/control-panel/panel/report"
                    >
                      基础资料报告
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="equipment">
                    <Link
                      className={styles.minute}
                      to="/control-panel/panel/equipment"
                    >
                      车间设备
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="photograph">
                    <Link
                      className={styles.minute}
                      to="/control-panel/panel/photograph"
                    >
                      工厂照片
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              ) : null}
              {userInfo.enterpriseType !== null &&
              +userInfo.enterpriseType === 0 ? (
                <Menu.ItemGroup
                  key="g4"
                  title={
                    <Title title={'监控列表'} icon={'jack-video1'}></Title>
                  }
                >
                  <Menu.Item key="monitorPage">
                    <Link
                      className={styles.minute}
                      to="/control-panel/panel/monitorPage"
                    >
                      监控列表
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="department">
                    <Link
                      className={styles.minute}
                      to="/control-panel/panel/department"
                    >
                      部门管理
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="videoCenter">
                    <Link
                      className={styles.minute}
                      to="/control-panel/panel/video-center"
                    >
                      视频中心
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              ) : null}
              {userInfo.enterpriseType !== null &&
              +userInfo.enterpriseType === 0 ? (
                <Menu.ItemGroup
                  key="g5"
                  title={
                    <Title title={'接单管理'} icon={'jack-video1'}></Title>
                  }
                >
                  <Menu.Item key="receiveOrder">
                    <Link
                      className={styles.minute}
                      to="/control-panel/panel/receiveOrder?key=all"
                    >
                      订单管理
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              ) : null}
              {userInfo.enterpriseType !== null &&
              +userInfo.enterpriseType === 1 ? (
                <Menu.ItemGroup
                  key="g6"
                  title={
                    <Title title={'发布订单'} icon={'jack-video1'}></Title>
                  }
                >
                  <Menu.Item key="demandSheet">
                    <Link
                      className={styles.minute}
                      to="/control-panel/demand-sheet"
                    >
                      发布订单
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="demandList">
                    <Link
                      className={styles.minute}
                      to="/control-panel/demand-list"
                    >
                      订单列表
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="applicationList">
                    <Link
                      className={styles.minute}
                      to="/control-panel/demand-applicationList"
                    >
                      申请列表
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              ) : null}
            </Menu>
          </div>

          <div className={styles.controlPanelRight}>
            <Switch>
              {/* 企业照片 */}
              <Route
                path="/control-panel/panel/enterprise-photos"
                // component={FactoryPhotos}
              />
              {/* 发单信息 */}
              <Route
                path="/control-panel/panel/receiveOrder"
                // component={ReceiveOrders}
              />
              <Route
                path="/control-panel/panel/ordersManage"
                // component={OrderManage}
              />
              {/* 发单信息 */}
              <Route
                path="/control-panel/panel/department"
                // component={Department}
              />
              {/* 发单信息 */}
              <Route
                path="/control-panel/panel/issue-bill"
                // component={IssuerEnterpriseInfo}
              />
              {/* 企业信息 */}
              <Route
                path="/control-panel/panel/enterprise"
                // component={EnterpriseInfo}
              />
              {/* 企业证件认证 */}
              <Route
                path="/control-panel/panel/certificate"
                // component={CertificateAuthentication}
              />
              {/* 工厂照片 */}
              <Route
                path="/control-panel/panel/photo"
                // component={PlantSitePhoto}
              />
              {/* 资质认证 */}
              <Route
                path="/control-panel/panel/qualification"
                // component={QualificationCertification}
              />
              {/* 登录日志 */}
              <Route
                path="/control-panel/panel/logs/:id"
                // component={LoginLogs}
              />
              {/* 验厂报告*/}
              <Route
                path="/control-panel/panel/report"
                // component={FactoryReport}
              />
              <Route
                path="/control-panel/panel/account"
                // component={AccountSafe}
              />
              {/* 车间设备 */}
              <Route
                path="/control-panel/panel/equipment"
                // component={FactoryEquipment}
              />
              {/* 工厂照片 */}
              <Route
                path="/control-panel/panel/photograph"
                // component={FactoryPhotograph}
              />
              {/* 监控列表 */}
              <Route
                path="/control-panel/panel/monitorPage"
                // component={MonitorPage}
              />
              <Route
                path="/control-panel/panel/video-center"
                // component={VideoCenter}
              />

              <Redirect to="/platform" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssuerBill
