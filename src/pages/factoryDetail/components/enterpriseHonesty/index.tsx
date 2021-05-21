import React from 'react'
import { Icon } from '@/components'
import styles from './index.module.less'

function EnterpriseHonesty() {
  return (
    <div className={styles.enterpriseHonesty}>
      <h2>企业诚信</h2>
      <ul className={styles.enterpriseContent}>
        <li className={styles.contentItem}>
          <Icon type="jack-a" className={styles.enterpriseIcon} />
          <span>诚信等级</span>
        </li>
        <li className={styles.contentItem}>
          <Icon type="jack-gongshang" className={styles.enterpriseIcon} />
          <span>工商变更</span>
        </li>
        <li className={styles.contentItem}>
          <Icon type="jack-qiyenianbao" className={styles.enterpriseIcon} />
          <span>企业年报</span>
        </li>
        <li className={styles.contentItem}>
          <Icon type="jack-shuiwupingji" className={styles.enterpriseIcon} />
          <span>税务评级</span>
        </li>
        <li className={styles.contentItem}>
          <Icon type="jack-xinxifabu" className={styles.enterpriseIcon} />
          <span>失信信息</span>
        </li>
        <li className={styles.contentItem}>
          <Icon type="jack-jiaoyiguanli" className={styles.enterpriseIcon} />
          <span>交易信息</span>
        </li>
      </ul>
    </div>
  )
}

export default EnterpriseHonesty
