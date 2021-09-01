import React, { useState, useRef } from 'react'
import { Modal, Form, Input } from 'antd'
import styles from './index.module.less'
import VerifyCodeInput from '@/pages/register/verifyCodeInput'
import classNames from 'classnames'
import SUCCESS_SVG from './imgs/success.svg'

const FromItem = Form.Item

const emailReg =
  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

const EmailModal = ({ cancel }) => {
  const [form] = Form.useForm()
  const formRef = useRef<any>()
  const phone = '13587760358'

  const [success, setSuccess] = useState(false)

  const onCancel = () => {
    cancel && cancel()
  }

  const onOk = () => {
    if (!success) {
      setSuccess(true)
    } else {
      onCancel()
    }
  }

  return (
    <Modal
      centered
      visible={true}
      title={'添加邮箱'}
      wrapClassName={classNames(
        styles.pwdModal,
        success ? styles.pwdModal2 : null
      )}
      okText={'确定'}
      cancelText={'取消'}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form} ref={formRef}>
        {success ? (
          <div className={styles.successBox}>
            <img className={styles.successImg} src={SUCCESS_SVG}></img>
            <div className={styles.successText}>修改成功！</div>
          </div>
        ) : (
          <>
            <FromItem
              name={'email'}
              label={'邮箱'}
              rules={[
                {
                  pattern: emailReg,
                  message: '请输入正确的邮箱地址~',
                  required: true
                }
              ]}
            >
              <Input placeholder={'请输入绑定的邮箱地址~'} />
            </FromItem>

            <FromItem
              name="code"
              label="验证码"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                  whitespace: false
                }
              ]}
            >
              <VerifyCodeInput
                code={'eCode'}
                tel={phone}
                placeholder={'请输入验证码~'}
              />
            </FromItem>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default EmailModal
