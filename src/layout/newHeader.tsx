import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { Menu, Dropdown } from 'antd'
import { isEmpty } from 'lodash'
import { getCurrentUser, getUserInfo } from '@/utils/tool'
import { useStores } from '@/utils/mobx'
import { Icon } from '@/components'
import styles from './newHeader.module.less'

const consoleOptions = [
  {
    title: '企业管理',
    children: [
      {
        title: '企业信息',
        url: '/control-panel/enterprise'
      },
      {
        title: '企业证件认证',
        url: '/control-panel/certificate'
      }
    ]
  },
  {
    title: '资质认证',
    children: [
      {
        title: '资质认证',
        url: '/control-panel/qualification'
      }
    ]
  },
  {
    title: '验厂管理',
    children: [
      {
        title: '基础资料报告',
        url: '/control-panel/report'
      },
      {
        title: '车间设备',
        url: '/control-panel/equipment'
      },
      {
        title: '工厂照片',
        url: '/control-panel/photograph'
      }
    ]
  }
]

const Header = () => {
  const currentUser = getCurrentUser() || {}
  const userInfo = getUserInfo() || {}
  const { loginStore } = useStores()
  const { logout } = loginStore
  const { approvalStatus, factoryAuditStatus } = userInfo
  const newConsoleOptions = consoleOptions
    .filter(item => {
      return !(!approvalStatus && item.title === '资质认证')
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
    history.push('/control-panel/account')
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
          <Icon type={'jack-logo1'} className={styles.logoIcon}></Icon>
          <span>产能云平台首页</span>
          <span className={styles.verticalBar}>|</span>
        </Link>

        {currentUser.userId ? (
          <Dropdown overlay={menu}>
            <span className={styles.user}>
              您好，{currentUser.nickName || currentUser.username}
            </span>
          </Dropdown>
        ) : (
          <>
            <span style={{ cursor: 'pointer' }} onClick={toRegister}>
              注册
            </span>
            <span>&nbsp;&nbsp; / &nbsp;&nbsp;</span>
            <a onClick={toLogin}>登录</a>
          </>
        )}
      </div>
      {currentUser.userId ? (
        <Dropdown overlay={consoleMenu}>
          <div className={styles.chunks}>
            <span className={styles.consoleBox}>
              <Icon type="jack-kongzhitai1" className={styles.consoleIcon} />
              <span className={styles.headerChunk}>控制台</span>
            </span>
          </div>
        </Dropdown>
      ) : null}
    </header>
  )
}

export default Header
