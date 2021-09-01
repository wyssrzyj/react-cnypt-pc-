// 发单商首页
import { Icon } from '@/components'
import React from 'react'
import { Title } from '../../accountSafe'
import styles from './basic.module.less'

const InfoCard = ({ data }) => {
  return (
    <div className={styles.infoCard} style={{ background: data.color }}>
      <div className={styles.info}>
        <div className={styles.infoCount}>{data.count}</div>
        <div className={styles.infoLabel}>{data.label}</div>
      </div>
      <Icon type={data.icon} className={styles.infoIcon}></Icon>
    </div>
  )
}

const AddCrad = ({ data }) => {
  return (
    <div className={styles.addCard}>
      <Icon type={'jack-jian'} className={styles.addIcon}></Icon>
      <div>{data.label}</div>
    </div>
  )
}

const BasciInfo = ({ configs = [], title }) => {
  return (
    <div className={styles.basciInfo}>
      <Title title={title}></Title>
      <div className={styles.basciContent}>
        {configs.map((data, idx) => {
          if (!data.type) {
            return <InfoCard data={data} key={idx}></InfoCard>
          }
          if (data.type === 'add') {
            return <AddCrad data={data} key={idx}></AddCrad>
          }
        })}
      </div>
    </div>
  )
}

export default BasciInfo
