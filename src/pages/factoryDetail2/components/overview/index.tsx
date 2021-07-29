import React, { useState, useEffect } from 'react'
import { Icon, NoData } from '@/components'
import axios from '@/utils/axios'
import { checkValue } from '@/utils/tool'
import styles from './index.module.less'

const Overview = props => {
  const { factoryId } = props
  const [contactInfo, setContactInfo] = useState<any>({})

  const getContactInfo = () => {
    axios
      .get('/api/factory/info/get-details-head-info', {
        factoryId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          setContactInfo({ ...data })
        }
      })
  }

  useEffect(() => {
    getContactInfo()
  }, [])

  return (
    <div className={styles.factoryInfo}>
      {contactInfo.headImageUrl ? (
        <img className={styles.img} src={contactInfo.headImageUrl} alt="" />
      ) : (
        <NoData bgColor="#f6f6f6" height={200} width={300} float="left" />
      )}

      <div className={styles.box}>
        <h3 className={styles.name}>{contactInfo.factoryName}</h3>
        <ul className={styles.factoryInfoList}>
          <li style={{ alignItems: 'flex-start' }}>
            <span className={styles.rightLabel}>
              <Icon type="jack-dizhi" className={styles.icon} />
              工厂地区
            </span>
            <span className={styles.rightValue}>
              {checkValue(contactInfo.districtName)}
            </span>
          </li>
          <li>
            <span className={styles.rightLabel}>
              <Icon type="jack-chewei" className={styles.icon1} />
              有效车位
            </span>
            <span className={styles.rightValue}>
              {checkValue(contactInfo.effectiveLocation)} 台
            </span>
          </li>
          <li>
            <span className={styles.rightLabel}>
              <Icon type="jack-zhuying_bai" className={styles.icon1} />
              主营类别
            </span>
            <span className={styles.rightValue}>
              {contactInfo.factoryCategoryList
                ? contactInfo.factoryCategoryList
                    .map(item => item.name)
                    .join('、')
                : '--'}
            </span>
          </li>
          <li>
            <span className={styles.rightLabel}>
              <Icon type="jack-qdl_lan" className={styles.icon1} />
              最低起订量
            </span>
            <span className={styles.rightValue}>
              {checkValue(contactInfo.moq)} 件
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Overview
