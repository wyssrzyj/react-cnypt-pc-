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

const noShow = ['单位', '品牌', '工艺', '币种']

const USwitch = props => {
  const { value, onChange } = props
  const onSelfChange = checked => {
    onChange(checked)
  }
  return (
    <Switch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      checked={value}
      onChange={onSelfChange}
    />
  )
}

const AddModal = props => {
  const {
    title,
    visible,
    handleOk,
    handleCancel,
    current = {},
    groupOptions = []
  } = props
  const [form] = Form.useForm()
  const { validateFields } = form

  const { code, name, sortNo, id, status = true, groupId } = current

  const initialValues = {
    status,
    code,
    name,
    sortNo,
    groupId
  }

  const handleSelfOk = () => {
    validateFields().then(values => {
      handleOk({ ...values, id })
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

        {!noShow.includes(title) && (
          <Form.Item label="所属组名" name="groupId">
            <Select placeholder="请选择所属组名">
              {!isEmpty(groupOptions) &&
                groupOptions.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
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
          name="status"
          rules={[{ required: true, message: '请选择状态!' }]}
        >
          <USwitch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddModal
