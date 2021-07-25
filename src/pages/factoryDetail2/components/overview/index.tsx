import React, { useState, useEffect } from 'react'
import { isEmpty, isNil } from 'lodash'
import { Icon } from '@/components'
import axios from '@/utils/axios'
import { getCurrentUser } from '@/utils/tool'
import styles from './index.module.less'

const Overview = props => {
  const { current = {}, factoryId } = props
  const currentUser = getCurrentUser() || {}
  const [contactInfo, setContactInfo] = useState<any>({})

  const notLoggedIn = (str, frontLen, endLen) => {
    if (!isNil(str)) {
      if (isEmpty(currentUser)) {
        var len = str.length - frontLen - endLen
        var xing = ''
        for (var i = 0; i < len; i++) {
          xing += '*'
        }
        return (
          str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
        )
      } else {
        return str
      }
    } else {
      return '--'
    }
  }

  const getContactInfo = () => {
    axios
      .get('/api/user/get-user-info-factory-id', {
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
      <img
        className={styles.img}
        src="http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/31bb1afd955c4450931f71e523707119.png"
        alt=""
      />
      <div>
        <h3></h3>
        <ul className={styles.factoryInfoList}>
          <li style={{ alignItems: 'flex-start' }}>
            <span className={styles.rightLabel}>
              <Icon type="jack-dizhi" className={styles.icon} />
              工厂地区
            </span>
            <span className={styles.rightValue}>{current.address}</span>
          </li>
          <li>
            <span className={styles.rightLabel}>
              <Icon type="jack-chewei" className={styles.icon} />
              有效车位
            </span>
            <span className={styles.rightValue}>
              {contactInfo.realName ? contactInfo.realName : '--'}
            </span>
          </li>
          <li>
            <span className={styles.rightLabel}>
              <Icon type="jack-zhuying_bai" className={styles.icon} />
              主营类别
            </span>
            <span className={styles.rightValue}>
              {notLoggedIn(contactInfo.mobilePhone, 3, 4)}
            </span>
          </li>
          <li>
            <span className={styles.rightLabel}>
              <Icon type="jack-qdl_lan" className={styles.icon} />
              最低起订量{' '}
            </span>
            <span className={styles.rightValue}>
              {notLoggedIn(contactInfo.contactPhone, 5, 1)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Overview
