import React, { useState, useRef } from 'react'
import { Modal, Form, Input } from 'antd'
import styles from './index.module.less'
import VerifyCodeInput from '@/pages/register/verifyCodeInput'
import SUCCESS_SVG from './imgs/success.svg'
import classNames from 'classnames'
import { getCurrentUser } from '@/utils/tool'
import { useStores } from '@/utils/mobx'
import { pwdReg } from '@/pages/register/content'

const FromItem = Form.Item

const PwdModal = ({ cancel }) => {
  const [form] = Form.useForm()
  const formRef = useRef<any>()
  // const pwdReg = /^[0-9a-zA-Z]{6,20}$/
  const { controlPanelStore } = useStores()
  const { updatePwd, codeUpdatePwd } = controlPanelStore

  const [success, setSuccess] = useState(false)
  const [phoneFlag, setPhoneFlag] = useState(false)
  const currentUser = getCurrentUser()
  const { getFieldValue } = form

  const showForget = () => {
    setPhoneFlag(f => !f)
    setTimeout(() => {
      formRef.current.resetFields()
    })
  }

  const onCancel = () => {
    if (phoneFlag) {
      showForget()
    }

    if (!phoneFlag) {
      cancel && cancel()
    }
  }

  const onOk = async () => {
    if (success) {
      cancel && cancel()
      return
    }
    if (!phoneFlag) {
      try {
        const values = await formRef.current.validateFields()
        delete values.newPassword2
        values.oldPassword = btoa(values.oldPassword)
        values.newPassword = btoa(values.newPassword)
        const res = await updatePwd(values)
        setSuccess(res)
      } catch (error) {
        console.log('🚀 ~ file: pwdModal.tsx ~ line 138 ~ onOk ~ error', error)
      }
    }

    if (phoneFlag) {
      try {
        const values = await formRef.current.validateFields()
        delete values.newPassword2
        values.newPassword = btoa(values.newPassword)
        const res = await codeUpdatePwd(values)
        setSuccess(res)
      } catch (error) {
        console.log('🚀 ~ file: pwdModal.tsx ~ line 138 ~ onOk ~ error', error)
      }
    }
  }

  const pwdValidator = (_, value) => {
    const target = formRef.current.getFieldValue('newPassword')
    if (!value) {
      return Promise.reject('请输入确认密码~')
    }
    if (value !== target) {
      return Promise.reject('确认密码与新密码不同，请再次确认~')
    }
    return Promise.resolve()
  }

  const oldPwdValidator = (_, value) => {
    if (!value) {
      return Promise.reject('请输入原密码~')
    }
    if (!pwdReg.test(value)) {
      return Promise.reject('请输入符合规则的原密码~')
    }
    return Promise.resolve()
  }

  const newPwdValidator = (_, value) => {
    const oldPwd = getFieldValue('oldPassword')
    if (!value) {
      return Promise.reject('请输入新密码~')
    }
    if (!pwdReg.test(value)) {
      return Promise.reject('请输入符合规则的新密码~')
    }
    if (oldPwd === value) {
      return Promise.reject('新密码不能与原密码相同~')
    }
    return Promise.resolve()
  }

  return (
    <Modal
      centered
      visible={true}
      title={success ? '修改成功' : '设置密码'}
      wrapClassName={classNames(
        styles.pwdModal,
        success ? styles.pwdModal2 : null
      )}
      okText={'确定'}
      cancelText={phoneFlag ? '上一步' : '取消'}
      onCancel={onCancel}
      onOk={onOk}
    >
      {success ? (
        <div className={styles.successBox}>
          <img className={styles.successImg} src={SUCCESS_SVG}></img>
          <div className={styles.successText}>修改成功！</div>
        </div>
      ) : (
        <Form form={form} ref={formRef}>
          {phoneFlag ? (
            <FromItem
              key={'mobilePhone'}
              name={'mobilePhone'}
              label={'手机号'}
              initialValue={currentUser.mobilePhone}
            >
              {/* TODO: 用户名 */}
              <div>{currentUser.mobilePhone}</div>
            </FromItem>
          ) : (
            <FromItem
              key={'userName'}
              name={'userName'}
              label={'用户名'}
              initialValue={currentUser.username}
            >
              {/* TODO: 用户名 */}
              <div>{currentUser.username}</div>
            </FromItem>
          )}

          {phoneFlag ? (
            <Form.Item
              name="smsCode"
              label="验证码"
              rules={[
                {
                  required: true,
                  message: '请输入验证码'
                }
              ]}
            >
              <VerifyCodeInput
                code={'pwdCode'}
                tel={currentUser.mobilePhone}
                placeholder={'请输入验证码~'}
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="oldPassword"
              label="原密码"
              rules={[
                {
                  required: true,
                  validator: oldPwdValidator
                }
              ]}
            >
              <Input placeholder={'请输入原密码~'} type="password" />
            </Form.Item>
          )}

          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              {
                required: true,
                validator: newPwdValidator
                // pattern: pwdReg,
                // message: '请输入新密码~'
              }
            ]}
          >
            <Input placeholder={'请输入新密码~'} type="password" />
          </Form.Item>

          <Form.Item
            name="newPassword2"
            label="确认密码"
            rules={[
              {
                required: true,
                whitespace: true,
                validator: pwdValidator
              }
            ]}
          >
            <Input placeholder={'请输入确认密码~'} type="password" />
          </Form.Item>

          <div className={styles.tips}>
            密码必须包含字母，符号或数字中至少两项且长度超过6位的密码。
          </div>
          {!phoneFlag ? (
            <span onClick={showForget} className={styles.forget}>
              忘记原密码？
            </span>
          ) : null}
        </Form>
      )}
    </Modal>
  )
}

export default PwdModal
