import React, { useState, useEffect } from 'react'
import { isEmpty, isNil } from 'lodash'
import { Icon, NoData } from '@/components'
import { useStores } from '@/utils/mobx'
import { getCurrentUser, checkValue } from '@/utils/tool'
import styles from './index.module.less'

const contactCom = props => {
  const _AMap = window.AMap as any
  const { enterpriseId } = props
  const currentUser = getCurrentUser() || {}
  const { factoryDetailStore } = useStores()
  const { contactPort } = factoryDetailStore
  const [contactInfo, setContactInfo] = useState<any>({})

  const getContactInfo = () => {
    contactPort({ enterpriseId }).then(response => {
      const { success, data } = response
      if (success) {
        setContactInfo({ ...data })
      }
    })
  }

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

  useEffect(() => {
    if (!isNil(contactInfo.longitude)) {
      const { latitude = '30.404645', longitude = '20.311123' } = contactInfo
      const map = new _AMap.Map('address', {
        zoom: 15,
        animateEnable: true,
        center: [longitude, latitude],
        mapStyle: 'amap://styles/dcf78c909fec3cc16509c3afe6513956'
      })

      let marker = new _AMap.Marker({
        position: new _AMap.LngLat(longitude, latitude)
      })
      map.add(marker)
    }
  }, [contactInfo])

  useEffect(() => {
    getContactInfo()
  }, [])

  return (
    <div className={styles.factoryInfo}>
      <ul className={styles.factoryInfoList}>
        <li>
          <span className={styles.rightLabel}>
            <Icon type="jack-lianxiren" className={styles.icon} />
            联系人
          </span>
          <span className={styles.rightValue}>
            {checkValue(contactInfo.name)}
          </span>
        </li>
        <li>
          <span className={styles.rightLabel}>
            <Icon type="jack-shoujihao" className={styles.icon} />
            手机号
          </span>
          <span className={styles.rightValue}>
            {notLoggedIn(contactInfo.mobile, 3, 4)}
          </span>
        </li>
        <li>
          <span className={styles.rightLabel}>
            <Icon type="jack-zuoji" className={styles.icon} />
            座机号码
          </span>
          <span className={styles.rightValue}>
            {notLoggedIn(contactInfo.telephone, 5, 1)}
          </span>
        </li>
        <li>
          <span className={styles.rightLabel}>
            <Icon type="jack-youxiang" className={styles.icon} />
            邮箱
          </span>
          <span className={styles.rightValue}>
            {notLoggedIn(contactInfo.email, 1, 7)}
          </span>
        </li>
        <li>
          <span className={styles.rightLabel}>
            <Icon type="jack-dizhi" className={styles.icon} />
            地址
          </span>
          <span className={styles.rightValue}>
            {checkValue(contactInfo.address)}
          </span>
        </li>
      </ul>
      {!isNil(contactInfo.latitude) ? (
        <div id="address" className={styles.mapTemp}></div>
      ) : (
        <NoData
          style={{
            width: 540,
            height: 280,
            backgroundColor: '#f6f6f6'
          }}
        />
      )}
    </div>
  )
}

export default contactCom
