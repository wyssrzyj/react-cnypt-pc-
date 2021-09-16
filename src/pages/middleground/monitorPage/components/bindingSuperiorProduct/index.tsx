import React from 'react'
import styles from './index.module.less'
import { Icon } from '@/components'

import { Form, Input, Button, Modal } from 'antd'
const BindingSuperiorProduct = props => {
  const { onFinish, visible, onCancel } = props
  console.log(props)
  return (
    <div>
      <Modal
        title="绑定优产账号"
        visible={visible}
        footer={null}
        centered={true}
        onCancel={onCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item name="password">
            <Input
              prefix={<Icon type="jack-gerenzhongxin1" />}
              placeholder="请输入账号"
            />
          </Form.Item>
          <Form.Item name="mobile">
            <Input
              prefix={<Icon type="jack-mima" />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item
            className={styles.binds}
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button className={styles.bind} type="primary" htmlType="submit">
              立即绑定
            </Button>
          </Form.Item>
          <Form.Item
            className={styles.cancel}
            wrapperCol={{ offset: 8, span: 18 }}
          >
            <Button className={styles.cancels} onClick={onCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default BindingSuperiorProduct
