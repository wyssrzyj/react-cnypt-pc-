import React, { useState, useEffect } from 'react'
import { Empty, Image } from 'antd'
import { isEmpty } from 'lodash'
import { toJS } from 'mobx'
import axios from '@/utils/axios'
import { useStores, observer } from '@/utils/mobx'
import HeaderLine from '../headerLine'
import styles from './index.module.less'
import { useLocation } from 'react-router-dom'

const QualificationCertificate = props => {
  const location = useLocation()
  const { state } = location

  const {} = props
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { factoryCertificate = [] } = toJS(dictionary)
  const [certificate, setCertificate] = useState<any>([])

  // 资质证书
  const getCertificate = async () => {
    const response = await axios.post(
      '/api/factory/enterprise-qualification-certificate/list',
      {
        enterpriseId: state['enterpriseId'],
        status: 1 //已通过
      }
    )
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
        <HeaderLine chinese="资质证件" english="QUALIFICATION CERTIFICATE" />
        <div className={styles.imgBox}>
          {isEmpty(certificate) ? (
            <Empty style={{ margin: 'auto' }} />
          ) : (
            certificate.map(item => (
              <div key={item.id} className={styles.certificateBox}>
                {/* <img
                  className={styles.certificateImg}
                  src={item.certificateImageURI}
                /> */}
                <Image
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
