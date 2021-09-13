import React, { useState } from 'react'

import { Icon } from '@/components'
import styles from './index.module.less'

import { Divider, Form, Input, Button, Table, Space, Modal, Select } from 'antd'

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
  const [isDisable, setIsDibble] = useState(true) //判断按钮是否可用
  const [isModalVisible, setIsModalVisible] = useState(false) //设备弹窗
  const [judgment, setJudgment] = useState(false) //连接成功
  const [failed, setFailed] = useState(false) //连接失败
  const [deletionFailed, setDeletionFailed] = useState(false) //删除设备
  const [successFailure, setSuccessFailure] = useState(false) //判断是成功还是失败
  const [connection, setConnection] = useState(false) //判断是连接测试还是提交
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
            let color = '#45CB77'
            if (tag === '失败') {
              color = '#E81414'
            }
            const style = {
              color: color
            }
            return <span style={style}>{tag}</span>
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
      render: (c, rData) => (
        <Space size="middle">
          <a
            onClick={() => {
              setIsModalVisible(true)
              console.log(123)
              console.log(c)
              console.log(rData)
              form.setFieldsValue({
                ...rData,
                id: rData.key
              })
            }}
          >
            编辑
          </a>
          <span>|</span>
          <a onClick={DeleteDeviceDisplay}> 删除</a>
          <span>|</span>

          <a onClick={accountShowModal}>绑定优产部门</a>
        </Space>
      )
    }
  ]

  const [form] = Form.useForm()
  // 查询form
  const onQueryFinish = (values: any) => {
    console.log('Success:', values)
    form.resetFields()
  }

  //   连接成功
  const showModals = () => {
    setJudgment(true)
  }
  const cancellation = () => {
    setJudgment(false)
  }
  //连接失败
  const connectionFailed = () => {
    setFailed(true)
  }
  const ConnectionFailedCancel = () => {
    setFailed(false)
  }
  //删除设备
  const DeleteDeviceDisplay = () => {
    setDeletionFailed(true)
  }
  const deleteDeviceCancel = () => {
    setDeletionFailed(false)
  }
  // 新增提交按钮事件
  const equipmentHandleOk = () => {
    setJudgment(false)
    setFailed(false)
    setIsModalVisible(false)
    form.submit()

    console.log(123)

    // setIsModalVisible(false)
  }
  // 新增取消按钮事件
  const equipmentHandleCancel = () => {
    setIsDibble(true)
    setIsModalVisible(false)
  }
  // 设备form
  const onFinish = (v: any) => {
    connections()
    console.log(setList)
    console.log(v)
  }
  // 新增显示
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
    if (connection) {
      if (successFailure) {
        showModals()
      } else {
        connectionFailed()
      }
    }
    setConnection(false)
    setIsDibble(false)
  }

  // 返回上一级
  const previous = () => {
    console.log('返回上一级')
  }

  return (
    <div className={styles.monitor}>
      <div>
        <span onClick={previous}>
          <Icon type="jack-left-copy" className={styles.previous} />
        </span>
        <span className={styles.system}>监控系统</span>
      </div>
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
        <Form.Item label="设备关键名字" name="Equipments">
          <Input className={styles.Input} placeholder="请输入设备名称" />
        </Form.Item>
        <Form.Item>
          <Button className={styles.query} type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Button
          icon={<Icon type="jack-del" className={styles.del} />}
          className={styles.added}
          onClick={showModal}
        >
          新增按钮
        </Button>
      </Form>
      <Table
        className={styles.Table}
        columns={columns}
        dataSource={list}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          position: ['bottomCenter'],
          onShowSizeChange(c, s) {
            console.log(c, s)
          }
        }}
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
            htmlType="submit"
          >
            提交
          </Button>
        ]}
        confirmLoading={true}
        visible={isModalVisible}
        centered={true}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="设备名称"
            name="Equipment"
            rules={[{ required: true, message: `请输入设备名称` }]}
          >
            <Input placeholder={`请输入请输入设备名称`} />
          </Form.Item>

          <Form.Item
            label="设备品牌 "
            name="brand"
            rules={[{ required: true, message: `请输入设备品牌` }]}
          >
            <Select placeholder="请输入设备品牌">
              <Select.Option value="demo">设备品牌</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="设备部门 "
            name="Department"
            rules={[{ required: true, message: `请输入设备部门` }]}
          >
            <Select placeholder="请输入设备部门">
              <Select.Option value="demo">设备部门</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="设备序列号"
            name="serial"
            rules={[{ required: true, message: `请输入设备序列号` }]}
          >
            <Input placeholder={`请输入请输入设备序列号`} />
          </Form.Item>
          <Form.Item
            label="验证码"
            name="Code"
            rules={[{ required: true, message: `请输入验证码` }]}
          >
            <Input placeholder={`请输入请输入验证码`} />
          </Form.Item>

          <Form.Item
            className={styles.Submit}
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button
              onClick={() => {
                setConnection(true)
              }}
              type="primary"
              htmlType="submit"
            >
              测试连接
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* 绑定优产账号弹窗 */}
      <Modal
        title="绑定优产账号"
        visible={accountModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        centered={true}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          initialValues={{ remember: true }}
          onFinish={onFinishProduction}
          onFinishFailed={onFinishFailedProduction}
          autoComplete="off"
        >
          <Form.Item name="username">
            <Input
              prefix={<Icon type="jack-gerenzhongxin1" />}
              placeholder="请输入账号"
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              prefix={<Icon type="jack-mima" />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item
            className={styles.binds}
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button
              onClick={handleOk}
              className={styles.bind}
              type="primary"
              htmlType="submit"
            >
              立即绑定
            </Button>
          </Form.Item>
          <Form.Item
            className={styles.cancel}
            wrapperCol={{ offset: 8, span: 18 }}
          >
            <Button
              className={styles.cancels}
              onClick={() => {
                setaceousModalVisible(false)
              }}
              htmlType="submit"
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 成功的 */}
      <Modal
        className={styles.ok}
        centered={true}
        footer={null}
        visible={judgment}
      >
        <p>
          <Icon type="jack-chenggong" className={styles.menuIcon} />
        </p>
        <p>连接成功</p>
        <p>设备连接成功，X秒后返回</p>
        <p>
          <Button type="primary" onClick={cancellation}>
            立即返回
          </Button>
        </p>
      </Modal>
      {/* 失败的 */}
      <Modal
        className={styles.ok}
        centered={true}
        footer={null}
        visible={failed}
        onCancel={ConnectionFailedCancel}
      >
        <p>
          <Icon type="jack-sptg1" className={styles.menuIcon} />
        </p>
        <p>连接失败</p>
        <p>您所提交的信息有误，请确认序列号或验证码</p>
        <p>
          <Button type="primary" onClick={ConnectionFailedCancel}>
            立即返回
          </Button>
        </p>
      </Modal>
      {/* 删除设备 */}
      <Modal
        className={styles.ok}
        onCancel={deleteDeviceCancel}
        centered={true}
        footer={null}
        visible={deletionFailed}
      >
        <p>
          <Icon type="jack-sptg1" className={styles.menuIcon} />
        </p>
        <p className={styles.current}>确认将当前设备删除</p>
        <p>
          <Button className={styles.cancels} onClick={deleteDeviceCancel}>
            取消
          </Button>

          <Button
            className={styles.deleteDeviceCancels}
            type="primary"
            onClick={deleteDeviceCancel}
          >
            确认
          </Button>
        </p>
      </Modal>
    </div>
  )
}
export default MonitorPage
