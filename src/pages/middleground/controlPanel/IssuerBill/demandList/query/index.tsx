import React, { useState } from 'react'
import styles from './index.module.less'

import { Form, Input, Button, Col, Space, DatePicker } from 'antd'
const { RangePicker } = DatePicker

function Query({ query }) {
  const [dateString, setDateString] = useState([])
  const onFinish = (values: any) => {
    {
      values.password = dateString
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
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Col className={styles.username}>
          <Form.Item label="需求单名称" name="username">
            <Input placeholder="请输入需求单名称" />
          </Form.Item>
        </Col>
        <Col className={styles.username}>
          <Form.Item label="发单时间" name="password">
            <Space direction="vertical" size={12}>
              <RangePicker onChange={handleSelectTime} />
            </Space>
          </Form.Item>
        </Col>

        <Form.Item className={styles.btn} wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Query
