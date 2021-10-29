import React, { useState, useEffect } from 'react'
import { Form, Row, Col, DatePicker } from 'antd'
import styles from './index.module.less'
import moment from 'moment'

const FormItem = Form.Item
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 16
  }
}

const date = ({ validity }) => {
  const [processingType, setProcessingType] = useState()
  const [unitPrice, setUnitPrice] = useState({})
  useEffect(() => {
    let res = { processingType: processingType, unitPrice: unitPrice }
    validity(res)
  }, [processingType, unitPrice])

  function onChange(date, dateString) {
    console.log(date)
    setProcessingType(dateString)
  }
  function onChanges(date, dateString) {
    console.log(date)

    setUnitPrice(dateString)
  }
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }

  return (
    <Row>
      <Col span={12}>
        <FormItem
          className={styles.processingType}
          name="processingType"
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
      </Col>
      <Col span={12}>
        <FormItem
          name="unitPrice"
          className={styles.processingType}
          label="交货期"
          rules={[{ required: true, message: '请选择日期' }]}
          {...layout}
        >
          <DatePicker
            style={{ width: '100%' }}
            onChange={onChanges}
            disabledDate={disabledDate}
          />
        </FormItem>
      </Col>
    </Row>
  )
}

export default date
