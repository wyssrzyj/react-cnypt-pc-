import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.less'

export type UrlItem = { label: string; url: string }

const Footer = () => {
  const urlList: Array<UrlItem> = [
    { label: '关于杰克', url: '' },
    { label: '法律声明', url: '' },
    { label: '新闻中心', url: '' },
    { label: '联系我们', url: '' },
    { label: '加入我们', url: '' },
  ]

  const infos = [
    'Copyright© 2015 杰克保留所有权利',
    '备案号ICP备05024056号-3',
    '浙公网安备 33100202000172号',
  ]

  return (
    <div className={styles.footer}>
      <div className={styles.footerLinks}>
        {urlList.map((item: UrlItem, idx: number) => (
          <Link to={item.url} key={idx} className={styles.footerlink}>
            {item.label}
          </Link>
        ))}
      </div>
      <div>
        {infos.slice(0, 2).map((item, idx) => (
          <span key={idx} className={styles.footerInfo}>
            {item}
          </span>
        ))}
      </div>
      <div className={styles.footerInfo}>{infos[2]}</div>
    </div>
  )
}

export default Footer
