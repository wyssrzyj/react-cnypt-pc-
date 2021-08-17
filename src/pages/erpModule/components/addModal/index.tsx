import React from 'react'
import { Modal, Form, Input, InputNumber, Switch, Select } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'
import { isAdd } from '@/utils/tool'

const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const AddModal = props => {
  const {
    title,
    visible,
    handleOk,
    handleCancel,
    current,
    options = []
  } = props
  const [form] = Form.useForm()
  const { validateFields } = form

  const initialValues = {
    openStatus: true
  }

  const handleSelfOk = () => {
    validateFields().then(values => {
      handleOk({ ...values })
    })
  }

  return (
    <Modal
      title={`新增${title}`}
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
        {!isAdd(current) && (
          <Form.Item
            label="系统编号"
            name="code"
            rules={[{ required: true, message: '请输入系统编号!' }]}
          >
            <Input placeholder="系统自动生成" disabled />
          </Form.Item>
        )}

        <Form.Item
          label={`${title}名称`}
          name="name"
          rules={[{ required: true, message: `请输入${title}名称!` }]}
        >
          <Input placeholder={`请输入${title}名称`} />
        </Form.Item>

        {title !== '单位' && (
          <Form.Item label="所属组名" name="groupId">
            <Select placeholder="请选择企业证件类型">
              {!isEmpty(options) &&
                options.map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item label="排序" name="sortNo">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="状态"
          name="openStatus"
          rules={[{ required: true, message: '请选择状态!' }]}
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddModal
