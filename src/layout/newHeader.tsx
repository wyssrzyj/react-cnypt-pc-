import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { Menu, Dropdown } from 'antd'
import { getCurrentUser } from '@/utils/tool'
import styles from './newHeader.module.less'
import { useStores } from '@/utils/mobx'

const Header = () => {
  const currentUser = getCurrentUser() || {}
  const { loginStore } = useStores()
  const { logout } = loginStore

  const history = useHistory()

  const toLogin = () => {
    history.push('/login')
  }

  const toRegister = () => {
    history.push('/register')
  }

  const logoutToLogin = async () => {
    await logout()
    toLogin()
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/control-panel/enterprise">控制台</Link>
      </Menu.Item>
      <Menu.Item>
        <div onClick={logoutToLogin}>退出登录</div>
      </Menu.Item>
    </Menu>
  )

  return (
    <header className={styles.header}>
      <div>
        欢迎来到Jack产能云平台，
        {currentUser.nickName ? (
          <span>{currentUser.nickName}</span>
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
        <span className={styles.headerChunk}>帮助中心</span>
        <Dropdown overlay={menu}>
          <span className={styles.headerChunk}>会员中心</span>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header
