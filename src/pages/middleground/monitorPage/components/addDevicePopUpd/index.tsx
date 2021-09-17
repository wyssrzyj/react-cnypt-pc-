import React, { useEffect, useState, useRef } from 'react'
import styles from './index.module.less'
import { Icon } from '@/components'

import {
  Form,
  Input,
  Button,
  Modal,
  TreeSelect
  // message
} from 'antd'
const { TreeNode } = TreeSelect

const AddDevicePopUpd = props => {
  const {
    equipmentHandleCancel,
    buttonIsAvailable,
    toeplateSerialNumber,
    toeplateVerificationCode,
    equipmentHandleOk,
    onFinish,
    isModalVisible,
    form,
    equipmentbrand,
    department,
    setConnection,
    judgment,
    setJudgment,
    cancellation,
    failed,
    ConnectionFailedCancel
  } = props
  const intervalRef = useRef<any>(null)

  const [count, changeCount] = useState(0)

  useEffect(() => {
    if (judgment) {
      console.log('是成功按钮')
      changeCount(5)
    } else {
      clearInterval(intervalRef.current)
    }
  }, [judgment])

  useEffect(() => {
    if (count === 5) {
      intervalRef.current = setInterval(() => {
        changeCount(preCount => preCount - 1)
      }, 1000)
    } else if (count === 0) {
      clearInterval(intervalRef.current)
      cancellation()
    }
  }, [count])

  return (
    <div>
      {/* 新增设备弹窗 */}
      <Modal
        title="新增设备"
        okText="提交"
        onCancel={equipmentHandleCancel}
        footer={[
          <Button onClick={equipmentHandleCancel}>取消</Button>,
          <Button
            type="primary"
            disabled={buttonIsAvailable}
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
          onFinish={onFinish}
        >
          <Form.Item
            className={styles.item}
            colon={false}
            label="设备名称"
            name="name"
            rules={[
              { max: 99, message: '名称不得超过99个字符' },
              { required: true, message: `请输入设备名称` }
            ]}
          >
            <Input placeholder={`请输入请输入设备名称`} />
          </Form.Item>

          <Form.Item
            className={styles.item}
            colon={false}
            label="设备品牌 "
            name="brand"
            rules={[
              { max: 99, message: '名称不得超过99个字符' },
              { required: true, message: `请输入设备品牌` }
            ]}
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
            rules={[
              { max: 99, message: '名称不得超过99个字符' },
              { required: true, message: `请输入设备部门` }
            ]}
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
            ></TreeSelect>
          </Form.Item>

          <Form.Item
            className={styles.item}
            colon={false}
            label="设备序列号"
            name="serialNumber"
            rules={[
              { max: 99, message: '名称不得超过99个字符' },
              { required: true, message: `请输入设备序列号` }
            ]}
          >
            <Input
              onChange={toeplateSerialNumber}
              placeholder={`请输入请输入设备序列号`}
            />
          </Form.Item>
          <Form.Item
            className={styles.item}
            colon={false}
            label="验证码"
            name="verificationCode"
            rules={[
              { max: 99, message: '名称不得超过99个字符' },
              { required: true, message: `请输入验证码` }
            ]}
          >
            <Input
              value="12345"
              onChange={toeplateVerificationCode}
              placeholder={`请输入请输入验证码`}
            />
          </Form.Item>

          <Form.Item
            className={styles.submit}
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button onClick={setConnection} type="primary" htmlType="submit">
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
        onCancel={setJudgment}
      >
        <div className={styles.oksa}>
          <div className={styles.connectok}></div>
          <p>
            <Icon type="jack-chenggong" className={styles.menuIcon} />
          </p>
          <p className={styles.text}>连接成功</p>
          <p className={styles.textural}>设备连接成功，{count}秒后返回</p>
          <p>
            <Button
              className={styles.bant}
              type="primary"
              onClick={cancellation}
            >
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
        <div className={styles.oksa}>
          <div className={styles.connectok}></div>

          <p>
            <Icon type="jack-sptg1" className={styles.menuIcon} />
          </p>
          <p className={styles.text}>连接失败</p>
          <p className={styles.textural}>
            您所提交的信息有误，请确认序列号或验证码
          </p>
          <p>
            <Button
              className={styles.bant}
              type="primary"
              onClick={ConnectionFailedCancel}
            >
              立即返回
            </Button>
          </p>
        </div>
      </Modal>
    </div>
  )
}
export default AddDevicePopUpd
