import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { Menu, Dropdown } from 'antd'
import { AuditOutlined } from '@ant-design/icons'
import { isEmpty, isNil } from 'lodash'
import { getCurrentUser, getUserInfo } from '@/utils/tool'
import { useStores } from '@/utils/mobx'
import { Icon } from '@/components'
import styles from './header.module.less'

const memberCenter = [
  {
    title: '账号管理',
    children: [
      {
        title: '账号安全',
        url: '/control-panel/panel/account'
      },
      {
        title: '企业信息',
        url: '/control-panel/panel/enterprise'
      },
      {
        title: '企业照片',
        url: '/control-panel/panel/enterprise-photos'
      }
      // {
      //   title: '发单信息',
      //   url: '/control-panel/panel/issue-bill'
      // }
    ]
  },
  {
    title: '企业认证管理',
    children: [
      {
        title: '企业证件认证',
        url: '/control-panel/panel/certificate'
      },

      {
        title: '资质认证',
        url: '/control-panel/panel/qualification'
      }
    ]
  },
  {
    title: '验厂管理',
    children: [
      {
        title: '基础资料报告',
        url: '/control-panel/panel/report'
      },

      {
        title: '车间设备',
        url: '/control-panel/panel/equipment'
      },
      {
        title: '工厂照片',
        url: '/control-panel/panel/photograph'
      }
    ]
  }
  // 监控列表1
  // {
  //   title: '监控列表',
  //   children: [
  //     {
  //       title: '部门管理',
  //       url: '/control-panel/panel/department'
  //     },
  //     {
  //       title: '监控列表',
  //       url: '/control-panel/panel/monitorPage'
  //     },
  //     {
  //       title: '视频中心',
  //       url: '/control-panel/panel/video-center'
  //     }
  //   ]
  // }
] //会员中心

const Header = () => {
  const currentUser = getCurrentUser() || {}
  const userInfo = getUserInfo() || {}
  const { loginStore } = useStores()

  const { logout } = loginStore
  const { enterpriseType } = userInfo
  const workbenchData = [
    //加工厂
    {
      title: '订单管理',
      type: '加工厂',
      children: [
        {
          title: '全部',
          url: '/control-panel/orderManagement/receiveOrder?key=all&pageNum=1&pageSize=10'
        },
        {
          title: '新需求',
          url: '/control-panel/orderManagement/receiveOrder?key=request&pageNum=1&pageSize=10'
        },
        {
          title: '待反馈',
          url: '/control-panel/orderManagement/receiveOrder?key=doing&pageNum=1&pageSize=10'
        },
        {
          title: '已确认',
          url: '/control-panel/orderManagement/receiveOrder?key=confirm&pageNum=1&pageSize=10'
        },
        {
          title: '被谢绝',
          url: '/control-panel/orderManagement/receiveOrder?key=checked&pageNum=1&pageSize=10'
        },
        {
          title: '已取消',
          url: '/control-panel/orderManagement/receiveOrder?key=complete&pageNum=1&pageSize=10'
        }
      ]
    },
    {
      //发单商
      title: '订单管理',
      type: '发单商',
      children: [
        {
          title: '发布订单',
          url: '/control-panel/issuerBill/demand-sheet'
        },
        {
          title: '订单列表',
          url: '/control-panel/issuerBill/demand-list'
        },
        {
          title: '申请列表',
          url: '/control-panel/issuerBill/demand-applicationList'
        }
      ]
    }
  ] //我的工作台

  // 企业类型 0 加工厂 1 发单商
  //我的工作台

  const workbenchDataFiltering = workbenchData.filter(item => {
    return (
      (enterpriseType == '0' && item.type === '加工厂') ||
      (enterpriseType == '1' && item.type === '发单商')
    )
  })

  //会员中心
  // 加工厂没有发单信息
  // 发单商没有监控列表
  // 企业类型 0 加工厂 1 发单商
  const memberCenterFiltering = memberCenter.filter(item => {
    if (item.title == '账号管理') {
      item.children = [
        {
          title: '账号安全',
          url: '/control-panel/panel/account'
        },
        {
          title: '企业信息',
          url: '/control-panel/panel/enterprise'
        }
      ]

      if (userInfo.factoryId || userInfo.purchaserId) {
        item.children.push({
          title: '企业照片',
          url: '/control-panel/panel/enterprise-photos'
        })
      }
    }
    if (item.title == '企业认证管理') {
      item.children = [
        {
          title: '企业证件认证',
          url: '/control-panel/panel/certificate'
        }
      ]
      if (userInfo.factoryId || userInfo.purchaserId) {
        item.children.push({
          title: '资质认证',
          url: '/control-panel/panel/qualification'
        })
      }
    }

    if (enterpriseType === '1') {
      if (item) {
        return item.title !== '验厂管理'
      }
    }
    if (enterpriseType === null) {
      if (item) {
        return item.title !== '验厂管理'
      }
    }

    return item

    // 发单商不显示  验厂管理
  })

  const history = useHistory()

  const toLogin = () => {
    history.push('/user/login')
  }

  const toRegister = () => {
    history.push('/user/register')
  }

  const toAccountSafe = () => {
    history.push('/control-panel/panel/account')
  }
  const toAccountRight = () => {
    if (+enterpriseType) {
      history.push('/control-panel/home')
    } else {
      history.push('/control-panel/home')
    }
  }

  const logoutToLogin = async () => {
    const res = await logout()
    res && toLogin()
  }

  const menu = (
    <Menu className={styles.menuContent}>
      <Menu.Item>
        <div onClick={toAccountSafe} className={styles.menuItem}>
          <Icon type="jack-gerenzhongxin1" className={styles.menuIcon} />
          账号安全
        </div>
      </Menu.Item>
      {currentUser.userId ? (
        <Menu.Item className={styles.menuItem}>
          <div onClick={logoutToLogin}>
            <Icon type="jack-tuichu1" className={styles.logoIcon} />
            退出登录
          </div>
        </Menu.Item>
      ) : null}
    </Menu>
  )

  /* -----------------------------我的工作台----------------------------- */
  //

  const workbenchDataFilteringMethod = (
    <div className={enterpriseType !== null ? styles.console : null}>
      {workbenchDataFiltering.map((item, index) => {
        const { title, children } = item
        return (
          <div key={index}>
            <div className={styles.title}>{title}</div>
            <div className={styles.titleContent}>
              {!isEmpty(children) &&
                children.map((o, index) => {
                  return (
                    <Link key={index} to={o.url} className={styles.routerItems}>
                      {o.title}
                    </Link>
                  )
                })}
            </div>
          </div>
        )
      })}
    </div>
  )
  /* -----------------------------会员中心---------------------------- */
  const memberCenterFilteringMethod = (
    <div className={styles.console}>
      {memberCenterFiltering.map((item, index) => {
        const { title, children } = item
        return (
          <div key={index}>
            <div className={styles.title}>{title}</div>
            <div className={styles.titleContent}>
              {!isEmpty(children) &&
                children.map((o, index) => {
                  if (o.title === '首页' && isNil(enterpriseType)) {
                    return null
                  }
                  if (
                    o.title === '发单管理' &&
                    !isNil(enterpriseType) &&
                    +enterpriseType
                  ) {
                    return null
                  }
                  if (
                    o.title === '接单管理' &&
                    !isNil(enterpriseType) &&
                    +enterpriseType
                  ) {
                    return null
                  }
                  return (
                    <Link key={index} to={o.url} className={styles.routerItem}>
                      {o.title}
                    </Link>
                  )
                })}
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <header>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/" className={styles.home}>
            <Icon type={'jack-shouye2'} className={styles.homeIcon}></Icon>
            <span className={styles.homeName}>优产云平台首页</span>
          </Link>

          {currentUser.userId ? (
            <Dropdown overlay={menu}>
              <span className={styles.user}>
                <span>
                  <Icon
                    type={'jack-yonghu2'}
                    className={styles.userIcon}
                  ></Icon>
                </span>

                <span>
                  您好，
                  {currentUser.nickName || currentUser.username}
                  {+enterpriseType === 1 && enterpriseType != null ? (
                    <span className={styles.role}>(发单商)</span>
                  ) : null}
                  {+enterpriseType === 0 && enterpriseType != null ? (
                    <span className={styles.role}>(加工厂)</span>
                  ) : null}
                </span>
              </span>
            </Dropdown>
          ) : (
            <>
              <span style={{ cursor: 'pointer' }} onClick={toRegister}>
                <Icon type={'jack-yonghu2'} className={styles.userIcon}></Icon>
                注册
              </span>
              <span>&nbsp;/ &nbsp;</span>
              <a onClick={toLogin}>登录</a>
            </>
          )}
        </div>
        {/* -----------------------------我的工作台----------------------------- */}
        <div className={styles.headerRight}>
          {currentUser.userId ? (
            <Dropdown
              className={styles.headerLeftest}
              overlay={workbenchDataFilteringMethod}
            >
              <div className={styles.chunks} onClick={toAccountRight}>
                <span className={styles.consoleBox}>
                  <Icon
                    type={'jack-bussiness-man'}
                    className={styles.workbench}
                  ></Icon>
                  <span className={styles.headerChunk}>我的工作台</span>
                </span>
              </div>
            </Dropdown>
          ) : null}
        </div>
        {/* -----------------------------会员中心----------------------------- */}
        <div className={styles}>
          {currentUser.userId ? (
            <Dropdown overlay={memberCenterFilteringMethod}>
              <div className={styles.chunks} onClick={toAccountSafe}>
                <span className={styles.consoleBox}>
                  <AuditOutlined className={styles.member} />
                  <span className={styles.headerChunk}>会员中心</span>
                </span>
              </div>
            </Dropdown>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Header
