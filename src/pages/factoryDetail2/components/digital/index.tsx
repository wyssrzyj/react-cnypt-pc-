import React, { useState, useEffect } from 'react'
import { Icon } from '@/components'
import axios from '@/utils/axios'
import { checkValue } from '@/utils/tool'
import HeadLine from '../headerLine'
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
      <HeadLine chinese="数字化情况" english="DIGITALIZATION" />
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.equipment}>
            <div className={styles.label}>
              <Icon type="jack-rjyy2" className={styles.icon} />
              <span className={styles.labelName}>软件应用</span>
            </div>
            <div>{checkValue(digitalInfo.softwareApplicationUsage)}</div>
          </div>
          <div className={styles.equipment}>
            <div className={styles.label}>
              <Icon type="jack-sblw2" className={styles.icon} />
              <span className={styles.labelName}>设备联网情况 </span>
            </div>
            <div>{checkValue(digitalInfo.deviceNetworkDesc)}</div>
          </div>
          <div className={styles.equipment}>
            <div className={styles.label}>
              <Icon type="jack-qtsm2" className={styles.icon} />
              <span className={styles.labelName}>其它说明</span>
            </div>
            <div>{checkValue(digitalInfo.digitalOtherDesc)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Digital
