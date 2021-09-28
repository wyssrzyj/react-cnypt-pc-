import { Icon } from '@/components'
import React from 'react'
import styles from './index.module.less'
import { getCurrentUser } from '@/utils/tool'

const footerLogo =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/footerLogo.png'
const unlistedPictures = 'https://s3.bmp.ovh/imgs/2021/09/74478139d6713a55.png'

https: const Footer = () => {
  const list = [
    { label: '帮助', url: '' },
    { label: '隐私', url: '' },
    { label: '条款', url: '' }
  ]

  const configs = [
    {
      label: '客服QQ',
      icon: 'jack-kefu',
      value: '824216039'
    },
    {
      label: '商务热线',
      icon: 'jack-swrx',
      value: '15620621977'
    },
    {
      label: '商务邮箱',
      icon: 'jack-swyx',
      value: 'uchat@chinajack.com'
    }
  ]
  const currentUser = getCurrentUser() || {}
  console.log(currentUser.userId)

  return (
    <div
      className={
        currentUser.userId === undefined ? styles.sign : styles.footerBox
      }
    >
      <div className={styles.footerTopBox}>
        <div className={styles.footerTop}>
          <div className={styles.leftLogo}>
            <img
              src={currentUser.userId ? footerLogo : unlistedPictures}
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
                    <div className={styles.topItemLabel}>{item.label}</div>
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
        </div>
        <div>copyright@2015 杰克保留所有权利。</div>
      </div>
    </div>
  )
}

export default Footer
