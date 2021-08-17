import React from 'react'
import { Modal, Form, Input, InputNumber } from 'antd'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const GroupModal = props => {
  const { title, visible, handleOk, handleCancel } = props
  const [form] = Form.useForm()
  const { validateFields } = form

  const handleSelfOk = () => {
    validateFields().then(values => {
      handleOk({ ...values })
    })
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleSelfOk}
      onCancel={handleCancel}
    >
      <Form {...layout} form={form} name="certification">
        <Form.Item
          label="分组名称"
          name="name"
          rules={[{ required: true, message: '请输入分组名称!' }]}
        >
          <Input placeholder="请输入分组名称" />
        </Form.Item>

        <Form.Item label="排序" name="sortNo">
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default GroupModal
