import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import styles from './index.module.less'

const OverviewCard = props => {
  const { id, name, deliveryDate, releaseTime, details = [] } = props
  const { push } = useHistory()

  const [dayDiff, setDayDiff] = useState<number>(0)
  const [hourDiff, setHourDiff] = useState<number>(0)

  const goOrderDetail = () => {
    push({
      pathname: '/control-panel/panel/orderDetails',
      state: { id: id, source: 2 }
    })
  }

  const getTimeDifference = () => {
    const a = moment(deliveryDate)
    const b = moment(releaseTime)
    const dateDiff = a.diff(b)
    const day = Math.floor(dateDiff / (24 * 3600 * 1000)) //计算出相差天数
    const leave1 = dateDiff % (24 * 3600 * 1000)
    const hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
    setDayDiff(day)
    setHourDiff(hours)
  }

  useEffect(() => {
    if (deliveryDate && releaseTime) {
      getTimeDifference()
    }
  }, [deliveryDate, releaseTime])

  return (
    <div className={styles.overviewCard}>
      <div className={styles.title}>{name}</div>
      <div className={styles.content}>
        <Row gutter={16} className={styles.contentLeft}>
          {details.map((detail, index) => (
            <Col key={index} className={styles.leftItem} span={detail.span}>
              {detail.label}：{detail.value}
            </Col>
          ))}
        </Row>

        <div className={styles.contentRight}>
          <div className={styles.offer}>
            <div>
              <div>剩余时间</div>
              <div>
                <strong>{dayDiff}</strong>天<strong>{hourDiff}</strong>小时
              </div>
            </div>
            <Button type="primary" onClick={goOrderDetail}>
              立即报价
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewCard