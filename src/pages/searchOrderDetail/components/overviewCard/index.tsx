import React from 'react'
import { Row, Col, Button } from 'antd'
import styles from './index.module.less'

const details = [
  { label: '需求单编号', value: '166641' },
  { label: '需求单编号', value: '166641' },
  { label: '需求单编号', value: '166641' },
  { label: '需求单编号', value: '166641' },
  { label: '需求单编号', value: '166641' },
  { label: '需求单编号', value: '166641' }
]

const OverviewCard = () => {
  return (
    <div className={styles.overviewCard}>
      <div className={styles.title}>
        鸿星尔克女生2020年夏季上新运动短袖简约透气上衣百搭舒适运动服
      </div>
      <div className={styles.content}>
        <Row gutter={16} className={styles.contentLeft}>
          {details.map(detail => (
            <Col key={detail.value} className={styles.leftItem} span={12}>
              {detail.label}：{detail.value}
            </Col>
          ))}
        </Row>

        <div className={styles.contentRight}>
          <div className={styles.offer}>
            <div>
              <div>剩余时间</div>
              <div>
                <strong>07</strong>天<strong>23</strong>小时
              </div>
            </div>
            <Button type="primary">立即报价</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewCard
