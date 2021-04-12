import React from 'react'
import styles from './index.module.less'
import LoginHeader from '@/pages/login/header'
import Footer from '@/pages/login/footer'
import Content from './content'

const Register = () => {
  return (
    <div className={styles.registerContainer}>
      <LoginHeader></LoginHeader>
      <Content></Content>
      <Footer></Footer>
    </div>
  )
}

export default Register
