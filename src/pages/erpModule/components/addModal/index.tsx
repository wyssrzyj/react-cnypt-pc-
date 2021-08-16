import React from 'react'
import { Modal, Form, Input, InputNumber, Switch, Select } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'

const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const groupOptios = [
  {
    value: 'man',
    label: '男装'
  },
  {
    value: '我门',
    label: '女装'
  },
  {
    value: 'child',
    label: '童装'
  }
]

const AddModal = props => {
  const { title, visible, handleOk, handleCancel } = props
  const [form] = Form.useForm()
  const { validateFields } = form

  const handleSelfOk = () => {
    validateFields().then(values => {
      console.log(
        '🚀 ~ file: index.tsx ~ line 11 ~ validateFields ~ values',
        values
      )
      handleOk()
    })
  }

  return (
    <Modal
      title={`新增${title}`}
      visible={visible}
      onOk={handleSelfOk}
      onCancel={handleCancel}
    >
      <Form {...layout} form={form} name="certification">
        <Form.Item
          label="系统编号"
          name="name"
          rules={[{ required: true, message: '请输入系统编号!' }]}
        >
          <Input placeholder="系统自动生成" disabled />
        </Form.Item>

        <Form.Item
          label={`${title}名称`}
          name="name"
          rules={[{ required: true, message: `请输入${title}名称!` }]}
        >
          <Input placeholder={`请输入${title}名称`} />
        </Form.Item>

        <Form.Item label="所属组名" name="name">
          <Select placeholder="请选择企业证件类型">
            {groupOptios.map(type => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="排序" name="index">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="状态"
          name="index"
          rules={[{ required: true, message: '请选择状态!' }]}
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddModal
