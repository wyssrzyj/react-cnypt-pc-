import React from 'react'
import styles from './index.module.less'
import LoginHeader from './header'
import LoginContent from './content'
import Footer from './footer'

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <LoginHeader></LoginHeader>
      <LoginContent></LoginContent>
      <Footer></Footer>
    </div>
  )
}

export default Login
