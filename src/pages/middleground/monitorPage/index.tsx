import React, { useState } from 'react'
import {
  PlusCircleOutlined,
  UserOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { Icon } from '@/components'
import styles from './index.module.less'

import {
  PageHeader,
  Divider,
  Form,
  Input,
  Button,
  Table,
  Space,
  Tag,
  Modal
} from 'antd'

const data = [
  {
    key: 1,
    Equipment: '测试设备1号',
    brand: '萤石',
    serial: '17786647',
    Connection: ['成功'],
    Department: '车间1组1号位'
  },
  {
    key: 2,
    Equipment: '测试设备1号',
    brand: '萤石',
    serial: '17786647',
    Connection: ['失败'],
    Department: '车间1组1号位'
  },
  {
    key: 3,
    Equipment: '测试设备1号',
    brand: '萤石',
    serial: '17786647',
    Connection: ['成功'],
    Department: '车间1组1号位',
    ss: '车间1组1号位'
  }
]

const MonitorPage = () => {
  const [list, setList] = useState(data)
  const [isDisable, setIsDibble] = useState(true)
  const [successFailure, setSuccessFailure] = useState(false) //判断是成功还是失败
  console.log(setSuccessFailure)

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'Equipment',
      key: 'Equipment'
    },
    {
      title: '设备品牌',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: '设备序列号',
      dataIndex: 'serial',
      key: 'serial'
    },
    {
      title: '连接状态',
      key: 'Connection',
      dataIndex: 'Connection',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = 'green'
            if (tag === '失败') {
              color = 'red'
            }

            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: '所属部门',
      key: 'Department',
      dataIndex: 'Department'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>编辑</a>
          <a onClick={showConfirm}> |删除</a>
          <a onClick={accountShowModal}>|绑定优产部门</a>
        </Space>
      )
    }
  ]

  const equipment = [
    {
      label: '设备名称',
      name: 'Equipment '
    },
    {
      label: '设备品牌',
      name: 'brand'
    },
    {
      label: '设备部门',
      name: 'Department'
    },
    {
      label: '设备序列号',
      name: 'serial'
    },

    {
      label: '验证码',
      name: 'Code'
    }
  ]

  const [form] = Form.useForm()

  const { confirm } = Modal
  //   删除设备
  function showConfirm() {
    confirm({
      title: '删除设备',
      icon: <ExclamationCircleOutlined />,
      content: '确认将当前设备删除',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  //   连接成功
  function succeeded() {
    confirm({
      title: '连接成功',
      icon: <Icon type="jack-wc" className={styles.menuIcon} />,

      content: '设备连接成功，X秒后返回列表页',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  //   连接失败
  function snowfall() {
    confirm({
      title: '连接失败',
      icon: <Icon type="jack-sptg1" className={styles.menuIcon} />,
      content: '您所提交的信息有误，请确认序列号或验证码',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  // 查询form
  const onQueryFinish = (values: any) => {
    console.log('Success:', values)
    form.resetFields()
  }

  //设备弹窗
  const [isModalVisible, setIsModalVisible] = useState(false)
  const equipmentHandleOk = () => {
    form.submit()
    setIsDibble(true)
    setIsModalVisible(false)
  }
  const equipmentHandleCancel = () => {
    setIsDibble(true)
    setIsModalVisible(false)
  }
  // 设备form
  const onFinish = (v: any) => {
    console.log(v)
    console.log(setList)
    //   先判断接口是否湖获取成功 成功后再新增
  }

  const showModal = () => {
    setIsModalVisible(true)
    form.resetFields()
  }

  //优产账号弹窗
  const [accountModalVisible, setaceousModalVisible] = useState(false)
  const accountShowModal = () => {
    form.resetFields()
    setaceousModalVisible(true)
  }
  const handleOk = () => {
    form.submit()
    setaceousModalVisible(false)
  }

  const handleCancel = () => {
    setaceousModalVisible(false)
  }
  //优产账号form
  const onFinishProduction = (values: any) => {
    console.log('优产账号form:', values)
  }
  const onFinishFailedProduction = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  //   连接测试
  const connections = () => {
    if (successFailure) {
      succeeded()
    } else {
      snowfall()
    }

    // succeeded()
    setIsDibble(false)
  }

  return (
    <div className={styles.monitor}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="监控列表"
      />
      <Divider />
      <Form
        className={styles.header}
        form={form}
        name="basic"
        labelCol={{ span: 2 }}
        initialValues={{ remember: true }}
        onFinish={onQueryFinish}
        autoComplete="off"
      >
        <Form.Item label="设备关键名字" name="Equipment">
          <Input className={styles.Input} placeholder="请输入设备名称" />
        </Form.Item>

        <Form.Item>
          <Button className={styles.query} type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Button
          className={styles.added}
          onClick={showModal}
          icon={<PlusCircleOutlined twoToneColor="#3b80ff" />}
        >
          新增按钮
        </Button>
      </Form>
      <Table
        // pagination={{ position: [topCenter] }}
        columns={columns}
        dataSource={list}
      ></Table>
      {/* 新增设备弹窗 */}
      <Modal
        title="新增设备"
        okText="提交"
        onCancel={equipmentHandleCancel}
        footer={[
          <Button onClick={equipmentHandleCancel}>取消</Button>,
          <Button
            type="primary"
            disabled={isDisable}
            onClick={equipmentHandleOk}
          >
            提交
          </Button>
        ]}
        confirmLoading={true}
        visible={isModalVisible}
        centered
        // onOk={equipmentHandleOk}
        // onCancel={equipmentHandleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {equipment.map((item, index) => {
            return (
              <Form.Item
                key={index}
                label={item.label}
                name={item.name}
                rules={[{ required: true, message: `请输入${item.label}` }]}
              >
                <Input key={index} placeholder={`请输入${item.label}`} />
              </Form.Item>
            )
          })}
        </Form>
        <Button
          type="primary"
          onClick={connections}
          className={styles.Connection}
        >
          连接测试
        </Button>
      </Modal>
      {/* 绑定优产账号弹窗 */}
      <Modal
        title="绑定优产账号"
        visible={accountModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          initialValues={{ remember: true }}
          onFinish={onFinishProduction}
          onFinishFailed={onFinishFailedProduction}
          autoComplete="off"
        >
          <Form.Item name="username">
            <Input prefix={<UserOutlined />} placeholder="请输入账号" />
          </Form.Item>
          <Form.Item name="password">
            <Input
              prefix={<Icon type="jack-mima" className={styles.menuIcon} />}
              placeholder="请输入密码"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default MonitorPage
