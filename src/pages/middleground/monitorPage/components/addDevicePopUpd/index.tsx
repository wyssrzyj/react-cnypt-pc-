import React, { useEffect, useRef } from 'react'
import styles from './index.module.less'
import { Icon } from '@/components'
import { Select } from 'antd'
import {
  Form,
  Input,
  Button,
  Modal,
  TreeSelect
  // message
} from 'antd'

// setIsModalVisible(true)

const { Option } = Select
const { SHOW_PARENT } = TreeSelect

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
    codeAvailable,
    equipmentbrand,
    department,
    setConnection,
    judgment,
    setJudgment,
    cancellation,
    failed,
    ConnectionFailedCancel,
    numberofequivalue,
    onChange,
    errorStatus,
    modify,
    count,
    changeCount
  } = props
  console.log('🚀 ~ file: index.tsx ~ line 40 ~ judgment', judgment)
  const intervalRef = useRef<any>(null)
  // setIsModalVisible(false)

  useEffect(() => {
    clearInterval(intervalRef.current)
  }, [])
  useEffect(() => {
    if (codeAvailable) {
      changeCount(5)
    } else {
      clearInterval(intervalRef.current)
    }
  }, [codeAvailable])

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
        title={modify ? '编辑设备' : '新增设备'}
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
            rules={[{ required: true, message: `请输入设备品牌` }]}
          >
            <Select
              defaultValue="请输入设备品牌"
              style={{ width: 373 }}
              // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            >
              {equipmentbrand.map((item, index) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.label}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item
            className={styles.item}
            colon={false}
            label="设备部门 "
            name="orgIdList"
            rules={[{ required: true, message: `请输入设备部门` }]}
          >
            <TreeSelect
              key={department.id}
              onChange={onChange}
              value={numberofequivalue}
              treeCheckable={true}
              showCheckedStrategy={SHOW_PARENT}
              treeData={department} //数据
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请输入设备部门"
            ></TreeSelect>
          </Form.Item>

          <Form.Item
            className={styles.item}
            colon={false}
            label="设备序列号"
            name="serialNumber"
            rules={[
              { pattern: /^[^\s]*$/, message: '录入信息不能包含空格' },
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
              { pattern: /^[^\s]*$/, message: '录入信息不能包含空格' },
              { max: 99, message: '名称不得超过99个字符' },
              { required: true, message: `请输入验证码` }
            ]}
          >
            <Input
              value="请输入请输入验证码"
              disabled={codeAvailable}
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
              onClick={() => {
                cancellation()
                clearInterval(intervalRef.current)
              }}
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
          <p className={styles.textural}>{errorStatus}</p>
          <p className={styles.bunas}>
            <Button className={styles.bantams} onClick={ConnectionFailedCancel}>
              取消
            </Button>
            <Button
              className={styles.bant}
              type="primary"
              onClick={ConnectionFailedCancel}
            >
              重新编辑
            </Button>
          </p>
        </div>
      </Modal>
    </div>
  )
}
export default AddDevicePopUpd
