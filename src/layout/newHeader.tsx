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

const consoleOptions = [
  {
    title: '企业管理',
    children: [
      {
        title: '首页',
        url: '/control-panel/home'
      },
      {
        title: '企业信息',
        url: '/control-panel/panel/enterprise'
      },
      {
        title: '企业证件认证',
        url: '/control-panel/panel/certificate'
      },
      {
        title: '发单管理',
        url: '/control-panel/put-manage'
      },
      {
        title: '接单管理',
        url: '/control-panel/receive-manage'
      }
    ]
  },
  {
    title: '资质认证',
    children: [
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
]

const Header = () => {
  const currentUser = getCurrentUser() || {}
  const userInfo = getUserInfo() || {}
  const { loginStore } = useStores()
  const { logout } = loginStore
  const { infoApprovalStatus, factoryAuditStatus, enterpriseType } = userInfo
  const newConsoleOptions = consoleOptions
    .filter(item => {
      return !(infoApprovalStatus != '1' && item.title === '资质认证')
    })
    .filter(obj => !(factoryAuditStatus != '1' && obj.title === '验厂管理'))

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
  const consoleMenu = (
    <div className={styles.console}>
      {newConsoleOptions.map((item, index) => {
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
                    +enterpriseType !== 1
                  ) {
                    return null
                  }
                  if (
                    o.title === '接单管理' &&
                    !isNil(enterpriseType) &&
                    +enterpriseType !== 0
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
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/" className={styles.home}>
          <Icon type={'jack-shouye2'} className={styles.homeIcon}></Icon>
          <span className={styles.homeName}>优产云平台首页</span>
          {/* <Icon type={'jack-logo1'} className={styles.logoIcon}></Icon> */}
          {/* <img className={styles.logo} src={logo} alt="优产云平台" /> */}
          {/* <span className={styles.verticalBar}>|</span> */}
        </Link>

        {currentUser.userId ? (
          <Dropdown overlay={menu}>
            <span className={styles.user}>
              <Icon type={'jack-yonghu2'} className={styles.userIcon}></Icon>
              您好，{currentUser.nickName || currentUser.username}
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
      <div className={styles.headerLeft}>
        {/* {currentUser.userId ? (
          <div className={styles.chunks}>
            <span className={styles.consoleBox} onClick={toErp}>
              <PartitionOutlined className={styles.icon} />
              <span className={styles.headerChunk}>ERP管理系统</span>
            </span>
          </div>
        ) : null} */}
        {currentUser.userId ? (
          <Dropdown overlay={consoleMenu}>
            <div className={styles.chunks}>
              <span className={styles.consoleBox}>
                <AuditOutlined className={styles.icon} />
                <span className={styles.headerChunk}>企业管理</span>
              </span>
            </div>
          </Dropdown>
        ) : null}
      </div>
    </header>
  )
}

export default Header
