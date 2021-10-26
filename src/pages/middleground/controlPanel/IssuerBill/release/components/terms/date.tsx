import React, { useState, useEffect } from 'react'
import { Form, Col, DatePicker } from 'antd'
const FormItem = Form.Item
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 12
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

  return (
    <>
      <Col span={13}>
        <FormItem
          {...layout}
          name="processingType"
          label="订单有效期"
          rules={[{ required: true, message: '请选择日期' }]}
        >
          <DatePicker onChange={onChange} />
        </FormItem>
      </Col>
      <Col span={13}>
        <FormItem
          {...layout}
          name="unitPrice"
          label="交货期"
          rules={[{ required: true, message: '请选择日期' }]}
        >
          <DatePicker onChange={onChanges} />
        </FormItem>
      </Col>
    </>
  )
}

export default date
