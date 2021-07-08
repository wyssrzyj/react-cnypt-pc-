import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import axios from '@/utils/axios'
import styles from './index.module.less'

const CommercialInfo = props => {
  const { factoryId } = props
  const [businessInfo, setBusinessInfo] = useState<any>({})

  const getBusinessInfo = () => {
    axios
      .get('/api/factory/enterprise/get-enterprise-business-license-info', {
        factoryId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          setBusinessInfo({ ...data })
        }
      })
  }

  useEffect(() => {
    getBusinessInfo()
  }, [])
  return (
    <div className={styles.commercialInfo}>
      <div className={styles.companiesIntroduce}>
        <header className={styles.header}>
          <div>
            <span className={styles.textCn}>工商信息</span>
            <span className={styles.textEn}>BUSINESS INFORMATION</span>
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.introduce}>
            <div className={styles.left}>
              <div className={styles.title}>营业执照信息</div>
              <Row gutter={16}>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>名称</span>
                  <span className={styles.strong}>{businessInfo.enterpriseName}</span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>注册地址</span>
                  <span className={styles.strong}>{businessInfo.companyAddress}</span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>信用代码</span>
                  <span className={styles.strong}>{businessInfo.orgCode}</span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>注册资本</span>
                  <span className={styles.strong}>{businessInfo.companyRegisteredCapital}</span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>成立时间</span>
                  <span className={styles.strong}>{businessInfo.companyCreateTime}</span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>类型</span>
                  <span className={styles.strong}>{businessInfo.companyOrgType}</span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>法定代表人</span>
                  <span className={styles.strong}>{businessInfo.legalPersonName}</span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>营业期限</span>
                  <span className={styles.strong}>{businessInfo.companyBusinessTerm}</span>
                </Col>
                <Col className={styles.gutterRow} span={24}>
                  <span className={styles.label}>经营范围</span>
                  <span className={styles.strong}>{businessInfo.companyBusinessScope}</span>
                </Col>
              </Row>
            </div>
            <div className={styles.right}>
              {businessInfo.businessLicenseUrl ? (
                <img className={styles.photo} src={businessInfo.businessLicenseUrl} alt="" />
              ) : (
                <span>暂无</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommercialInfo
