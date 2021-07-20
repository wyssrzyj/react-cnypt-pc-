import React from 'react'
import LOGO from '@/components/tabBar/logo.png'
import styles from './index.module.less'
import { Link } from 'react-router-dom'

const LoginHeader = () => {
  const navs = [
    { label: '网站首页', url: '/' },
    { label: '联系我们', url: '' },
    { label: '最新活动', url: '' },
    { label: '产品分类', url: '' }
  ]

  return (
    <div className={styles.loginHeader}>
      <img src={LOGO} alt="" className={styles.logo} />
      <div>
        {navs.map((item, idx: number) => (
          <Link to={item.url} key={idx} className={styles.link}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LoginHeader
