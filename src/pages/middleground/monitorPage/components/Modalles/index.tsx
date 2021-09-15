import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'

import { Icon } from '@/components'
import styles from './index.module.less'
import { Form, Input, Button, Modal, TreeSelect, message } from 'antd'
const { TreeNode } = TreeSelect
const dealTypeData = data => {
  data.forEach(item => {
    item.label = item.deptName
    item.value = item.id

    if (Array.isArray(item.children) && item.children.length) {
      dealTypeData(item.children)
    }
  })
  return data
}
import { useStores } from '@/utils/mobx'

const MonitorPage = props => {
  console.log(props)
  const { visible } = props

  const { monitorPage } = useStores()
  const { newlyAddedAPI, insertModelAPI, equipmentDepartmentAPI } = monitorPage
  const [isDisable, setIsDibble] = useState(true) //判断按钮是否可用
  const [isModalVisible, setIsModalVisible] = useState(visible) //设备弹窗
  const [judgment, setJudgment] = useState(false) //连接成功
  const [failed, setFailed] = useState(false) //连接失败
  const [successFailure, setSuccessFailure] = useState(true) //判断是成功还是失败
  const [connection, setConnection] = useState(false) //判断是连接测试还是提交
  // const [list, setList] = useState([]) //数据
  const [department, setDepartment] = useState<any>([]) // 设备部门
  const [equipmentbrand, setEquipmentbrand] = useState<any>([]) // 设备品牌
  const onChangeset = value => {
    console.log(value)
  }
  // 获取设备品牌
  const allDictionary = async () => {
    const brand = await insertModelAPI([])
    console.log(brand)

    setEquipmentbrand(brand.cameraBrand)
  }

  const getFactoryInfo = async () => {
    const equipment = await equipmentDepartmentAPI()
    setDepartment(dealTypeData(equipment.data))
  }

  useEffect(() => {
    getFactoryInfo()
    allDictionary()
  }, [])
  console.log(setSuccessFailure)

  const [form] = Form.useForm()

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

  // 新增提交按钮事件
  const equipmentHandleOk = () => {
    setJudgment(false)
    setFailed(false)
    // setIsModalVisible(false)//关闭弹窗
    setIsDibble(true)
    form.submit()

    // setIsModalVisible(false)
  }
  // 新增取消按钮事件
  const equipmentHandleCancel = () => {
    setIsDibble(true)
    setIsModalVisible(false)
  }
  // 设备form
  const onFinish = async (v: any) => {
    //  判断是测试还是提交
    if (connection) {
      const { serialNumber, verificationCode } = v
      const connectParamVO = { serialNumber, verificationCode }
      axios
        .post('/api/factory/factory-camera/connect', { connectParamVO })
        .then(res => {
          console.log(res)
        })
    } else {
      const newlywed = await newlyAddedAPI(v)
      if (newlywed) {
        setIsModalVisible(false)
        getFactoryInfo()
        message.success(newlywed.msg)
      } else {
        message.warning(newlywed.msg)
      }

      getFactoryInfo()
    }

    connections()
    console.log(v)
  }
  // 新增显示
  // const showModal = () => {
  //   setIsModalVisible(true)
  //   form.resetFields()
  // }

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

  return (
    <div className={styles.monitor}>
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
            className={styles.item}
            colon={false}
            label="设备名称"
            name="name"
            rules={[{ required: true, message: `请输入设备名称` }]}
          >
            <Input placeholder={`请输入请输入设备名称`} />
          </Form.Item>

          <Form.Item
            className={styles.item}
            colon={false}
            label="设备品牌 "
            name="brand"
            rules={[{ required: true, message: `请输入设备品牌` }]}
          >
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请输入设备品牌"
              allowClear
              treeDefaultExpandAll
            >
              {equipmentbrand.map(item => {
                return (
                  <TreeNode
                    key={item}
                    value={item.value}
                    title={item.label}
                  ></TreeNode>
                )
              })}
            </TreeSelect>
          </Form.Item>

          <Form.Item
            className={styles.item}
            colon={false}
            label="设备部门 "
            name="orgIdList"
            rules={[{ required: true, message: `请输入设备部门` }]}
          >
            <TreeSelect
              showSearch
              treeData={department}
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请输入设备部门"
              allowClear
              multiple
              treeDefaultExpandAll
              onChange={onChangeset}
            ></TreeSelect>
          </Form.Item>

          <Form.Item
            className={styles.item}
            colon={false}
            label="设备序列号"
            name="serialNumber"
            rules={[{ required: true, message: `请输入设备序列号` }]}
          >
            <Input placeholder={`请输入请输入设备序列号`} />
          </Form.Item>
          <Form.Item
            className={styles.item}
            colon={false}
            label="验证码"
            name="verificationCode"
            rules={[{ required: true, message: `请输入验证码` }]}
          >
            <Input placeholder={`请输入请输入验证码`} />
          </Form.Item>

          <Form.Item
            className={styles.submit}
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

      {/* 成功的 */}
      <Modal
        className={styles.ok}
        centered={true}
        footer={null}
        visible={judgment}
      >
        <div className={styles.oksa}>
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
        </div>
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
    </div>
  )
}
export default MonitorPage
