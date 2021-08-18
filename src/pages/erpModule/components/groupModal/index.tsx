import React from 'react'
import { Modal, Form, Input, InputNumber } from 'antd'
import { isAdd } from '@/utils/tool'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const GroupModal = props => {
  const { title, visible, handleOk, handleCancel, current = {} } = props
  const { name, sortNo } = current
  const [form] = Form.useForm()
  const { validateFields } = form

  const initialValues = {
    name,
    sortNo
  }

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
      <Form
        {...layout}
        form={form}
        name="certification"
        key={isAdd(current) ? 'add' : current.id}
        initialValues={initialValues}
      >
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
