import React, { useState, useEffect } from 'react'
import styles from './index.module.less'

import { Form, Input, Button, Col, Space, DatePicker, Row } from 'antd'
const { RangePicker } = DatePicker

function Query({ query, state }) {
  useEffect(() => {
    if (state) {
      form.setFieldsValue(state)
    }
  }, [state])
  const [form] = Form.useForm()

  const [dateString, setDateString] = useState([])
  const onFinish = (values: any) => {
    {
      values.issuingTime = dateString
    }
    query && query(values)
  }
  const handleSelectTime = (value, dateString) => {
    setDateString(dateString)
    console.log(value)
  }

  return (
    <div className={styles.off}>
      <Form
        className={styles.form}
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 15 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row className={styles.issuingTime}>
          <Col span={12} className={styles.username}>
            <Form.Item label="订单名称" name="name">
              <Input placeholder="请输入订单名称" />
            </Form.Item>
          </Col>
          <Col span={12} className={styles.username}>
            <Form.Item label="发单时间" name="issuingTime">
              <Space direction="vertical" size={12}>
                <RangePicker onChange={handleSelectTime} />
              </Space>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} className={styles.username}>
            <Form.Item label="加工厂名称" name="supplierName">
              <Input placeholder="请输入加工厂名称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <div className={styles.btns}>
              <Form.Item
                className={styles.btn}
                wrapperCol={{ offset: 81, span: 24 }}
              >
                <Button
                  ghost
                  type="primary"
                  onClick={() => {
                    setDateString([])
                    form.resetFields()
                  }}
                >
                  重置
                </Button>
                <Button
                  className={styles.reset}
                  type="primary"
                  htmlType="submit"
                >
                  查询
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Query
