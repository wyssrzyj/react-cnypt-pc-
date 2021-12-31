// 发单商首页
import { Icon } from '@/components'
import React from 'react'
import { Title } from '../../controlPanel/accountSafe'
import styles from './basic.module.less'
import { useHistory } from 'react-router'
import { getUserInfo } from '@/utils/tool'
import classNames from 'classnames'
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

const AddCrad = props => {
  const { data } = props
  const { callback } = data
  const addClick = () => {
    callback && callback()
  }

  return (
    <div className={styles.addCard} onClick={addClick}>
      <Icon type={'jack-jian'} className={styles.addIcon}></Icon>
      <div>{data.label}</div>
    </div>
  )
}

const BasciInfo = ({ configs = [], title }) => {
  const userInfo = getUserInfo() || {}
  const { enterpriseType } = userInfo

  const history = useHistory()
  const toTarget = () => {
    history.push('/control-panel/issuerBill/demand-sheet')
  }
  return (
    <div
      className={classNames(
        enterpriseType === '1' ? styles.basciInfos : styles.basciInfo
      )}
    >
      <Title title={title}></Title>
      <div className={styles.basciContent}>
        <div className={styles.top}>
          {configs.map((data, idx) => {
            if (!data.type) {
              return <InfoCard data={data} key={idx}></InfoCard>
            }
            if (data.type === 'add') {
              return <AddCrad data={data} key={idx}></AddCrad>
            }
          })}
        </div>
        {enterpriseType === '1' ? (
          <div className={styles.newly}>
            <div
              className={styles.tex}
              onClick={() => {
                toTarget()
              }}
            >
              <Icon type={'jack-jian'} className={styles.icons}></Icon>
              <span>新增订单</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default BasciInfo
