import React, { useEffect } from 'react'
import styles from './newHeader.module.less'
import { useHistory } from 'react-router'
import { getCurrentUser } from '@/utils/tool'

const Header = () => {
  const history = useHistory()

  useEffect(() => {
    const currentUser = getCurrentUser()
    console.log(currentUser)
  }, [])

  const toLogin = () => {
    history.push('/login')
  }

  return (
    <header className={styles.header}>
      <div>
        欢迎来到Jack产能云平台，请
        <span className={styles.orangeText} onClick={toLogin}>
          登录
        </span>
        或<span className={styles.orangeText}>免费注册</span>
      </div>

      <div className={styles.chunks}>
        <span className={styles.headerChunk}>帮助中心</span>
        <span className={styles.headerChunk}>会员中心</span>
      </div>
    </header>
  )
}

export default Header
