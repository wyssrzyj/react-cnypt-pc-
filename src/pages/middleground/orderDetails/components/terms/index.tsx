import React from 'react'
import { Col, Row } from 'antd'
import styles from './index.module.less'
import { timestampToTime } from '../../time'

function index({ initialValues }) {
  const { payDetails } = initialValues
  return (
    <div>
      <Row>
        <Col span={12}>
          <div className={styles.title}>
            <div className={styles.textLeft}>付款信息:</div>
            <div className={styles.text}>{payDetails}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className={styles.title}>
            交货期:
            <span className={styles.delivery}>
              {timestampToTime(initialValues.deliveryDate)}
            </span>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.title}>
            订单有效期:
            <span className={styles.content}>
              {timestampToTime(initialValues.inquiryEffectiveDate)}
            </span>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default index
