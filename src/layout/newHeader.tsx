import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { Menu, Dropdown } from 'antd'
import { AuditOutlined } from '@ant-design/icons'
import { isEmpty, isNil } from 'lodash'
import { getCurrentUser, getUserInfo } from '@/utils/tool'
import { useStores } from '@/utils/mobx'
import { Icon } from '@/components'
import styles from './newHeader.module.less'

// const logo =
//   'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210722/5a113adbb7a24ecc8ebedef760019f84.png'

const workbenchData = [
  {
    title: '接单管理',
    children: [
      {
        title: '待确认',
        url: '/control-panel/receive-manage?key=confirm&pageNum=1&pageSize=10'
      },
      {
        title: '进行中',
        url: '/control-panel/receive-manage?key=doing&pageNum=1&pageSize=10'
      },
      {
        title: '待验收',
        url: '/control-panel/receive-manage?key=checked&pageNum=1&pageSize=10'
      },
      {
        title: '已完成',
        url: '/control-panel/receive-manage?key=complete&pageNum=1&pageSize=10'
      },
      {
        title: '退回',
        url: '/control-panel/receive-manage?key=return&pageNum=1&pageSize=10'
      },
      {
        title: '取消',
        url: '/control-panel/receive-manage?key=cancel&pageNum=1&pageSize=10'
      }
    ]
  },
  {
    title: '发单管理',
    children: [
      {
        title: '待确认',
        url: '/control-panel/receive-manage?key=confirm&pageNum=1&pageSize=10'
      },
      {
        title: '进行中',
        url: '/control-panel/receive-manage?key=doing&pageNum=1&pageSize=10'
      },
      {
        title: '待验收',
        url: '/control-panel/receive-manage?key=checked&pageNum=1&pageSize=10'
      },
      {
        title: '已完成',
        url: '/control-panel/receive-manage?key=complete&pageNum=1&pageSize=10'
      },
      {
        title: '退回',
        url: '/control-panel/receive-manage?key=return&pageNum=1&pageSize=10'
      },
      {
        title: '取消',
        url: '/control-panel/receive-manage?key=cancel&pageNum=1&pageSize=10'
      },

      {
        title: '草稿',
        url: '/control-panel/panel/enterprise'
      }
    ]
  }
] //我的工作台
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
        title: '发单信息',
        url: '/control-panel/panel/issue-bill'
      }
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
  },
  {
    title: '监控列表',
    children: [
      {
        title: '监控列表',
        url: '/control-panel/panel/monitorPage'
      },

      {
        title: '视频中心',
        url: '/control-panel/panel/video-center'
      }
    ]
  }
] //会员中心

const Header = () => {
  const currentUser = getCurrentUser() || {}
  const userInfo = getUserInfo() || {}
  const { loginStore } = useStores()

  const { logout } = loginStore
  const { enterpriseType } = userInfo

  // 企业类型 0 加工厂 1 发单商
  //我的工作台
  const workbenchDataFiltering = workbenchData.filter(item => {
    return (
      (enterpriseType == '0' && item.title === '接单管理') ||
      (enterpriseType == '1' && item.title === '发单管理')
    )
  })

  //会员中心
  // 加工厂没有发单信息
  // 发单商没有监控列表

  const memberCenterFiltering = memberCenter.filter(item => {
    if (enterpriseType === '0') {
      if (item.title == '账号管理') {
        item.children.splice(2, 1)
      }
      return item
    } else {
      if (item.title !== '监控列表' && item.title !== '验厂管理') {
        return item
      }
    }
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
      console.log('真')
      history.push('/control-panel/home')
    } else {
      console.log('假')
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
  /* -----------------------------会员中心----------------------------- */
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
      {currentUser.userId ? (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Link to="/" className={styles.home}>
              <Icon type={'jack-shouye2'} className={styles.homeIcon}></Icon>
              <span className={styles.homeName}>优产云平台首页</span>
            </Link>

            {currentUser.userId ? (
              <Dropdown overlay={menu}>
                <span className={styles.user}>
                  <Icon
                    type={'jack-yonghu2'}
                    className={styles.userIcon}
                  ></Icon>
                  您好，{currentUser.nickName || currentUser.username}
                </span>
              </Dropdown>
            ) : (
              <>
                <span style={{ cursor: 'pointer' }} onClick={toRegister}>
                  <Icon
                    type={'jack-yonghu2'}
                    className={styles.userIcon}
                  ></Icon>
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
      ) : (
        <div className={styles.father}>
          <div className={styles.topCenter}>
            <img
              className={styles.topCenterImg}
              src="http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210722/5a113adbb7a24ecc8ebedef760019f84.png"
              alt=""
            />
            <div onClick={toLogin} className={styles.landing}>
              登录
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
