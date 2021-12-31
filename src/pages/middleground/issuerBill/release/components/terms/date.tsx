import React, { useState, useEffect } from 'react'
import { Form, Row, Col, DatePicker } from 'antd'
import styles from './index.module.less'
import moment from 'moment'
import { remainingTime } from '../time'

const FormItem = Form.Item
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 16
  }
}

const date = ({ time }) => {
  const [day, setDay] = useState('')
  useEffect(() => {
    if (time) {
      setDay(remainingTime(time).day)
    }
  }, [time])

  function onChange(date) {
    setDay(remainingTime(date._d.getTime()).day)
  }
  function disabledDate(current) {
    return current && current < moment().endOf('day')
  }

  return (
    <>
      <Row className={styles.top}>
        <Col span={12}>
          <FormItem
            className={styles.processingType}
            name="inquiryEffectiveDate"
            label="订单有效期"
            rules={[{ required: true, message: '请选择日期' }]}
            {...layout}
          >
            <DatePicker
              style={{ width: '100%' }}
              onChange={onChange}
              disabledDate={disabledDate}
            />
          </FormItem>
          {day ? (
            <span className={styles.day}>
              <span className={styles.color}>{day}天</span> 后订单将失效
            </span>
          ) : null}
        </Col>
      </Row>
      <Row className={styles.tops}>
        <Col span={12}>
          <FormItem
            name="deliveryDate"
            className={styles.processingType}
            label="交货期"
            rules={[{ required: true, message: '请选择日期' }]}
            {...layout}
          >
            <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
          </FormItem>
        </Col>
      </Row>
    </>
  )
}

export default date
