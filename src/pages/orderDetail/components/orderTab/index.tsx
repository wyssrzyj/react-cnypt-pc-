import React from 'react'
import { Tabs, Row, Col } from 'antd'
import styles from './index.module.less'
import u1017 from '@/static/images/u914.png'

const { TabPane } = Tabs

const OrderTab = () => {
  return (
    <div className={styles.orderTab}>
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane tab="订单信息" key="1">
          <Row className={styles.orderInfo}>
            <Col span={8} className={styles.orderInfoCol}>
              <span className={styles.orderInfoLabel}>货号</span>
              <span>2951</span>
            </Col>
            <Col span={8} className={styles.orderInfoCol}>
              <span className={styles.orderInfoLabel}>产地</span>
              <span>广州</span>
            </Col>
            <Col span={8} className={styles.orderInfoCol}>
              <span className={styles.orderInfoLabel}>主图来源</span>
              <span>实拍无模特</span>
            </Col>
            <Col span={8} className={styles.orderInfoCol}>
              <span className={styles.orderInfoLabel}>货号</span>
              <span>2951</span>
            </Col>
            <Col span={8} className={styles.orderInfoCol}>
              <span className={styles.orderInfoLabel}>货号</span>
              <span>2951</span>
            </Col>
            <Col span={8} className={styles.orderInfoCol}>
              <span className={styles.orderInfoLabel}>货号</span>
              <span>2951</span>
            </Col>
            <Col span={8} className={styles.orderInfoCol}>
              <span className={styles.orderInfoLabel}>货号</span>
              <span>2951</span>
            </Col>
            <Col span={8} className={styles.orderInfoCol}>
              <span className={styles.orderInfoLabel}>货号</span>
              <span>2951</span>
            </Col>
            <Col span={8} className={styles.orderInfoCol}>
              <span className={styles.orderInfoLabel}>货号</span>
              <span>2951</span>
            </Col>
            <Col span={8} className={styles.orderInfoCol}>
              <span className={styles.orderInfoLabel}>货号</span>
              <span>2951</span>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="加工说明" key="2">
          <div className={styles.processingInstruction}>
            <img className={styles.instructionImg} src={u1017} alt="" />
            <img className={styles.instructionImg} src={u1017} alt="" />
            <img className={styles.instructionImg} src={u1017} alt="" />
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default OrderTab
