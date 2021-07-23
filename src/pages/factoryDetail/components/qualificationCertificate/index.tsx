import React, { useState, useEffect } from 'react'
import { Empty } from 'antd'
import { isEmpty } from 'lodash'
import { toJS } from 'mobx'
import axios from '@/utils/axios'
import { useStores, observer } from '@/utils/mobx'
import styles from './index.module.less'

const QualificationCertificate = props => {
  const { factoryId } = props
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { factoryCertificate = [] } = toJS(dictionary)
  const [certificate, setCertificate] = useState<any>([])

  // 资质证书
  const getCertificate = async () => {
    const response = await axios.post('/api/factory/factory-certificate/list', {
      factoryId,
      status: 0 //已通过
    })
    const { success, data = {} } = response
    if (success) {
      const { records = [] } = data
      const newData = records.map(item => ({
        ...item,
        certificationName:
          factoryCertificate.find(o => o.value === item.certificationName) || {}
      }))
      setCertificate([...newData])
    }
  }

  useEffect(() => {
    dictionary && getCertificate()
  }, [dictionary])

  return (
    <div className={styles.qualificationCertificate}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <span className={styles.textCn}>资质证件</span>
            <span className={styles.textEn}>QUALIFICATION CERTIFICATE</span>
          </div>
        </header>
        <div className={styles.imgBox}>
          {isEmpty(certificate) ? (
            <Empty style={{ margin: 'auto' }} />
          ) : (
            certificate.map(item => (
              <div key={item.id} className={styles.certificateBox}>
                <img
                  className={styles.certificateImg}
                  src={item.certificateImageURI}
                />
                <span>{item.certificationName.label}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default observer(QualificationCertificate)
