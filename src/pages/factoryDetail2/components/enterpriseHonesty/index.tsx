import React from 'react'
import { Icon } from '@/components'
import styles from './index.module.less'

function EnterpriseHonesty() {
  return (
    <div className={styles.enterpriseHonesty}>
      <h2>企业诚信</h2>
      <ul className={styles.enterpriseContent}>
        <li className={styles.contentItem}>
          <Icon type="jack-chengxinguanli" className={styles.enterpriseIcon} />
          <span>诚信等级</span>
        </li>
        <li className={styles.contentItem}>
          <Icon
            type="jack-companyreggongshangcaishui"
            className={styles.enterpriseIcon}
          />
          <span>工商变更</span>
        </li>
        <li className={styles.contentItem}>
          <Icon
            type="jack-gongshangnianbao"
            className={styles.enterpriseIcon}
          />
          <span>企业年报</span>
        </li>
        <li className={styles.contentItem}>
          <Icon type="jack-shuiwu" className={styles.enterpriseIcon} />
          <span>税务评级</span>
        </li>
        <li className={styles.contentItem}>
          <Icon type="jack-shixinchaxun" className={styles.enterpriseIcon} />
          <span>失信信息</span>
        </li>
        <li className={styles.contentItem}>
          <Icon
            type="jack-biaoqiankuozhan_jiaoyi-174"
            className={styles.enterpriseIcon}
          />
          <span>交易信息</span>
        </li>
      </ul>
    </div>
  )
}

export default EnterpriseHonesty
