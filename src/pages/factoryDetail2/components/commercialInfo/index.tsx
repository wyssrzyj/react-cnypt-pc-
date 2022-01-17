import React, { useState, useEffect } from 'react'
import { Row, Col, Image } from 'antd'
import { NoData } from '@/components'
import axios from '@/utils/axios'
import { checkValue } from '@/utils/tool'
import HeaderLine from '../headerLine'
import styles from './index.module.less'
import { useLocation } from 'react-router-dom'
import { isEmpty } from 'lodash'
const CommercialInfo = () => {
  const location = useLocation()
  const { state } = location

  const [businessInfo, setBusinessInfo] = useState<any>({})

  const getBusinessInfo = () => {
    if (!isEmpty(state)) {
    }
    axios
      .get('/api/factory/enterprise/get-enterprise-business-license-info', {
        enterpriseId: state['enterpriseId']
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
        <HeaderLine chinese="营业执照" english="BUSINESS LICENSE" />
        <div className={styles.content}>
          <div className={styles.introduce}>
            <div className={styles.left}>
              <Row gutter={16}>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>名称</span>
                  <span className={styles.strong}>
                    {checkValue(businessInfo.enterpriseName)}
                  </span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>注册地址</span>
                  <span className={styles.strong}>
                    {checkValue(businessInfo.companyAddress)}
                  </span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>信用代码</span>
                  <span className={styles.strong}>
                    {checkValue(businessInfo.orgCode)}
                  </span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>注册资本</span>
                  <span className={styles.strong}>
                    {checkValue(businessInfo.companyRegisteredCapital)}
                  </span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>成立时间</span>
                  <span className={styles.strong}>
                    {checkValue(businessInfo.companyCreateTime)}
                  </span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>类型</span>
                  <span className={styles.strong}>
                    {checkValue(businessInfo.companyOrgType)}
                  </span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>法定代表人</span>
                  <span className={styles.strong}>
                    {checkValue(businessInfo.legalPersonName)}
                  </span>
                </Col>
                <Col className={styles.gutterRow} span={12}>
                  <span className={styles.label}>营业期限</span>
                  <span className={styles.strong}>
                    {checkValue(businessInfo.companyBusinessTerm)}
                  </span>
                </Col>
                <Col className={styles.gutterRow} span={24}>
                  <span className={styles.label}>经营范围</span>
                  <span className={styles.strong}>
                    {checkValue(businessInfo.companyBusinessScope)}
                  </span>
                </Col>
              </Row>
            </div>
            <div className={styles.right}>
              {businessInfo.businessLicenseUrl ? (
                // <img
                //   className={styles.photo}
                //   src={businessInfo.businessLicenseUrl}
                //   alt=""
                // />
                <Image
                  className={styles.photo}
                  src={businessInfo.businessLicenseUrl}
                />
              ) : (
                <NoData
                  bgColor="#f6f6f6"
                  width={308}
                  height={209}
                  logoWidth={150}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommercialInfo
