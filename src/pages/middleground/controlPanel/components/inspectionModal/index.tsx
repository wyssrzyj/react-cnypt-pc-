import React from 'react'
import { Modal, Form, DatePicker, message, Input } from 'antd'
import moment from 'moment'
import axios from '@/utils/axios'

const { TextArea } = Input

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const InspectionModal = props => {
  const [form] = Form.useForm()
  const { validateFields } = form
  const { visible, handleCancel, handleOk, factoryId } = props
  // const [userOptions, setUserOptions] = useState<any>([])

  // const getEmployees = () => {
  //   axios.post('/api/admin/manage/user/sysUserList', {}).then(response => {
  //     const { success, data } = response
  //     if (success) {
  //       setUserOptions([...data])
  //     }
  //   })
  // }

  const handleSelfOk = () => {
    validateFields().then(values => {
      const { factoryAuditPerson, factoryExpectAuditTime } = values
      axios
        .post('/api/factory/info/inform-audit-person', {
          factoryExpectAuditPerson: factoryAuditPerson,
          factoryExpectAuditTime: moment(factoryExpectAuditTime).format('x'),
          factoryId,
          auditorStatus: '2'
        })
        .then(response => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
          handleCancel()
          handleOk()
        })
    })
  }
  function disabledDate(current) {
    return current && current < moment().endOf('day')
  }
  // useEffect(() => {
  //   getEmployees()
  // }, [])

  return (
    <Modal
      title="验厂审批"
      visible={visible}
      width={500}
      onOk={handleSelfOk}
      onCancel={handleCancel}
    >
      <Form {...layout} form={form} name="certification">
        {/* <Form.Item
          label="验厂员"
          name="factoryAuditPerson"
          rules={[{ required: true, message: '请选择验厂员！' }]}
        >
          <Select placeholder="请选择验厂员">
            {userOptions.map(item => (
              <Option key={item.userId} value={item.userId}>
                {item.userName}
              </Option>
            ))}
          </Select>
        </Form.Item> */}

        <Form.Item
          label="期望到场时间"
          name="factoryExpectAuditTime"
          rules={[{ required: true, message: '请选择期望到场时间!' }]}
        >
          <DatePicker disabledDate={disabledDate} style={{ width: 300 }} />
        </Form.Item>

        <Form.Item
          label="申请描述"
          name="factoryExpectAuditTime"
          rules={[{ required: true, message: '请填写申请描述!' }]}
        >
          <TextArea rows={4} placeholder="请填写申请描述" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default InspectionModal
