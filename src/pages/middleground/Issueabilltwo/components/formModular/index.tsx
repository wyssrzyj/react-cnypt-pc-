import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import styles from './todo.module.less'

function Formmodular() {
  const [sum, setSum] = useState(false)
  const [form] = Form.useForm()

  return (
    <>
      <Form
        form={form}
        className={styles.form}
        onFinish={v => {
          if (sum) {
            console.log(v)
            console.log('查询')
          } else {
            return v === null
          }
        }}
      >
        <Form.Item className={styles.Please} label="发单商名称" name="Issuer">
          <Input className={styles.issuer} placeholder="请输入发单商名称" />
        </Form.Item>
        <Form.Item className={styles.order} label="订单关键字" name="keyword">
          <Input
            className={styles.issuer}
            placeholder="请输入订单号、订单名称"
          />
        </Form.Item>

        <Form.Item
          className={styles.Please}
          label="订单总金额"
          name="MinimumAmount"
        >
          <Input className={styles.amountstart} placeholder="最低金额" />
        </Form.Item>
        <Form.Item className={styles.Please} name="MaximumAmount">
          <Input className={styles.amountend} placeholder="最高金额" />
        </Form.Item>

        <Form.Item
          className={styles.Confirmation}
          label="订单确认时间"
          name="rangetart"
        >
          <Input className={styles.amountendstart} placeholder="时间范围起始" />
        </Form.Item>
        <Form.Item className={styles.Please} name="timeRange">
          <Input
            className={styles.amountendstartend}
            placeholder="时间范围起结束"
          />
        </Form.Item>

        <Form.Item
          className={styles.query}
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              setSum(true)
            }}
          >
            查询
          </Button>
        </Form.Item>
        <Form.Item
          className={styles.Reset}
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              setSum(false)
              form.resetFields()
            }}
          >
            重置
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Formmodular
