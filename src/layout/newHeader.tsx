import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { Menu, Dropdown } from 'antd'
import { isEmpty } from 'lodash'
import { getCurrentUser } from '@/utils/tool'
import styles from './newHeader.module.less'
import { useStores } from '@/utils/mobx'

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
  const { loginStore } = useStores()
  const { logout } = loginStore
  const { approvalStatus, factoryAuditStatus } = currentUser
  const newConsoleOptions = consoleOptions
    .filter(item => !(approvalStatus && item.title === '资质认证'))
    .filter(obj => !(factoryAuditStatus == '1' && obj.title === '验厂管理'))

  const history = useHistory()

  const toLogin = () => {
    history.push('/user/login')
  }

  const toRegister = () => {
    history.push('/user/register')
  }

  const logoutToLogin = async () => {
    await logout()
    toLogin()
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <div>账号安全</div>
      </Menu.Item>
      {currentUser.userId ? (
        <Menu.Item>
          <div onClick={logoutToLogin}>退出登录</div>
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
      <div>
        <Link to="/home" className={styles.home}>
          产能云平台首页
        </Link>

        {currentUser.realName ? (
          <Dropdown overlay={menu}>
            <span className={styles.user}>您好，{currentUser.realName || currentUser.username}</span>
          </Dropdown>
        ) : (
          <>
            <span>请</span>
            <span className={styles.orangeText} onClick={toLogin}>
              登录
            </span>
            <span>或</span>
            <span className={styles.orangeText} onClick={toRegister}>
              免费注册
            </span>
          </>
        )}
      </div>

      <div className={styles.chunks}>
        <Dropdown overlay={consoleMenu}>
          <span className={styles.headerChunk}>控制台</span>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header
