import React from 'react'
import styles from './index.module.less'

const Footer = () => {
  const list = [
    { label: '帮助', url: '' },
    { label: '隐私', url: '' },
    { label: '条款', url: '' },
  ]

  return (
    <div className={styles.footerBox}>
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
