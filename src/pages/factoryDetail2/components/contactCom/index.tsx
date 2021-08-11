import React, { useState, useEffect } from 'react'
import { isEmpty, isNil } from 'lodash'
import { Scene, Marker, MarkerLayer } from '@antv/l7'
import { GaodeMap } from '@antv/l7-maps'
import { Icon, NoData } from '@/components'
import { useStores } from '@/utils/mobx'
import { getCurrentUser, checkValue } from '@/utils/tool'
import styles from './index.module.less'

const contactCom = props => {
  const { factoryId } = props
  const currentUser = getCurrentUser() || {}
  const { factoryDetailStore } = useStores()
  const { contactPort } = factoryDetailStore
  const [contactInfo, setContactInfo] = useState<any>({})

  const getContactInfo = () => {
    contactPort({ factoryId }).then(response => {
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
      const scene = new Scene({
        id: 'address',
        logoVisible: false,
        map: new GaodeMap({
          style: 'normal',
          center: [longitude, latitude],
          pitch: 0,
          zoom: 13,
          rotation: 0
        })
      })

      scene.on('loaded', () => {
        const markerLayer = new MarkerLayer()
        const el = document.createElement('label')
        el.className = 'labelclass'
        el.style.background =
          'url(https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*BJ6cTpDcuLcAAAAAAAAAAABkARQnAQ)'
        const marker: any = new Marker({
          element: el
        }).setLnglat({ lng: longitude, lat: latitude })
        markerLayer.addMarker(marker)
        scene.addMarkerLayer(markerLayer)
      })
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
            {checkValue(contactInfo.realName)}
          </span>
        </li>
        <li>
          <span className={styles.rightLabel}>
            <Icon type="jack-shoujihao" className={styles.icon} />
            手机号
          </span>
          <span className={styles.rightValue}>
            {notLoggedIn(contactInfo.mobilePhone, 3, 4)}
          </span>
        </li>
        <li>
          <span className={styles.rightLabel}>
            <Icon type="jack-zuoji" className={styles.icon} />
            座机号码
          </span>
          <span className={styles.rightValue}>
            {notLoggedIn(contactInfo.contactPhone, 5, 1)}
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
