import { Icon } from '@/components'
import React from 'react'
import styles from './index.module.less'
import { getCurrentUser } from '@/utils/tool'

const footerLogo = 'https://s3.bmp.ovh/imgs/2021/09/74478139d6713a55.png'

const transparentLogo = 'https://s3.bmp.ovh/imgs/2021/09/74478139d6713a55.png'

const Footer = () => {
  const currentUser = getCurrentUser() || {}
  const list = [
    { label: '帮助', url: '' },
    { label: '隐私', url: '' },
    { label: '条款', url: '' }
  ]

  const configs = [
    {
      icon: 'jack-kefu',
      value: '36049302'
    },
    {
      icon: 'jack-swrx',
      value: '0521-2914241'
    },
    {
      icon: 'jack-swyx',
      value: 'jiaqing@163.com'
    }
  ]
  console.log()

  return (
    <div className={currentUser.userId ? styles.footerBox : styles.footerBoxst}>
      <div className={styles.footerTopBox}>
        <div className={styles.footerTop}>
          <div className={styles.leftLogo}>
            <img
              src={currentUser.userId ? footerLogo : transparentLogo}
              alt=""
              className={styles.logo}
            />
            <div className={styles.logoText}>优产云平台</div>
          </div>

          <div className={styles.footerTopRight}>
            {configs.map((item, idx) => {
              return (
                <div key={idx} className={styles.topItem}>
                  <Icon type={item.icon} className={styles.topItemIcon}></Icon>
                  <div className={styles.topItemR}>
                    <div className={styles.topItemValue}>{item.value}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerItems}>
          {list.map((item, idx) => (
            <div key={idx} className={styles.footerItem}>
              {item.label}
            </div>
          ))}
          <div>copyright@2015 杰克保留所有权利。</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
