import React, { useState, useEffect } from 'react'
import { Icon } from '@/components'
import axios from '@/utils/axios'
import styles from './index.module.less'

const Digital = props => {
  const { factoryId } = props
  const [digitalInfo, setDigitalInfo] = useState<any>({})

  const getDigitalInfo = () => {
    axios
      .get('/api/factory/info/get-details-digital-desc', {
        factoryId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          setDigitalInfo({ ...data })
        }
      })
  }

  useEffect(() => {
    getDigitalInfo()
  }, [])

  return (
    <div className={styles.digital}>
      <div className={styles.title}>
        <h2 className={styles.nameCn}>企业数字化情况</h2>
        <h4 className={styles.nameEn}>DIGITALIZATION OF ENTERPRISES</h4>
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <h5 className={styles.subtitle}>车间设备</h5>
          <div className={styles.equipment}>
            <div className={styles.label}>
              <Icon type="jack-rjyy1" className={styles.icon} />
              <span>软件应用</span>
            </div>
            <div>{digitalInfo.softwareApplicationUsage}</div>
          </div>
          <div className={styles.equipment}>
            <div className={styles.label}>
              <Icon type="jack-sblw1" className={styles.icon} />
              <span>设备联网情况 </span>
            </div>
            <div>{digitalInfo.deviceNetworkDesc}</div>
          </div>
          <div className={styles.equipment}>
            <div className={styles.label}>
              <Icon type="jack-qtsm1" className={styles.icon} />
              <span>其它说明 </span>
            </div>
            <div>{digitalInfo.digitalOtherDesc}</div>
          </div>
          <div className={styles.imageBox}>
            <img className={styles.image} src={require('@/static/images/qyszhqk_bg.png')} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Digital
