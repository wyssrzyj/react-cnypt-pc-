import React from 'react'
import { Row, Col } from 'antd'
import styles from './todo.module.less'

const TopList = props => {
  const { data } = props
  const { completed } = data
  return (
    <div>
      {/* 表格 */}
      <div className={styles.tabletop}>
        <Row>
          <Col span={7}>订单详情</Col>
          <Col span={4}>数量</Col>
          <Col span={5}>总金额</Col>
          <Col span={4}>{completed == '5' ? '订单完成时间' : '订单状态'}</Col>
          <Col span={4}>操作</Col>
        </Row>
      </div>
    </div>
  )
}
export default TopList
