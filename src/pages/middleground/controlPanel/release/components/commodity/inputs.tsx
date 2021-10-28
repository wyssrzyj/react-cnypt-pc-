import React from 'react'
import { Form, Input } from 'antd'
import styles from './index.module.less'

const Innputs = () => {
  return (
    <div>
      <div className={styles.xing}> *</div>

      <Form.Item label="发单量" style={{ marginBottom: 0 }}>
        <Form.Item
          name="year"
          rules={[{ required: true, message: '请输入最少数量 ' }]}
          style={{ display: 'inline-block', width: 'calc(40% - 8px)' }}
        >
          <Input placeholder="请输入最少数量" />
        </Form.Item>
        <span className={styles.division}>-</span>
        <Form.Item
          name="month"
          rules={[{ required: true, message: '请输入最大数量 ' }]}
          style={{
            display: 'inline-block',
            width: 'calc(40% - 8px)',
            margin: '0 8px'
          }}
        >
          <Input placeholder="请输入最大数量" />
        </Form.Item>
      </Form.Item>
    </div>
  )
}

export default Innputs
