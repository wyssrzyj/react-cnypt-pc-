import React, { useState } from 'react'
import styles from './index.module.less'

import { Form, Input, Button, Col, Space, DatePicker, Row } from 'antd'
const { RangePicker } = DatePicker

function Query({ query }) {
  const [form] = Form.useForm()

  const [dateString, setDateString] = useState([])
  const onFinish = (values: any) => {
    {
      values.issuingTime = dateString
    }
    query && query(values)
  }
  const handleSelectTime = (value, dateString) => {
    console.log(value)
    setDateString(dateString)
  }

  return (
    <div className={styles.off}>
      <Form
        className={styles.form}
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 15 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row>
          <Col span={12} className={styles.username}>
            <Form.Item label="订单标题" name="name">
              <Input placeholder="请输入订单标题" />
            </Form.Item>
          </Col>
          <Col span={12} className={styles.username}>
            <Form.Item label="发单时间" name="issuingTime">
              <Space direction="vertical" size={12}>
                <RangePicker onChange={handleSelectTime} />
              </Space>
            </Form.Item>
          </Col>
          <Col span={12} className={styles.username}>
            <Form.Item label="加工厂名称" name="enterpriseName">
              <Input placeholder="请输入加工厂名称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              className={styles.btn}
              wrapperCol={{ offset: 8, span: 16 }}
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
              <Button className={styles.reset} type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Query
