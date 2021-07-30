import React, { useState, useRef } from 'react'
import { Modal, Form, Input } from 'antd'
import styles from './index.module.less'
import VerifyCodeInput from '@/pages/register/verifyCodeInput'
import classNames from 'classnames'
import SUCCESS_SVG from './imgs/success.svg'
import { useStores } from '@/utils/mobx'
import { getCurrentUser } from '@/utils/tool'
import { cloneDeep } from 'lodash'
import { pwdReg } from '@/pages/register/content'

const FromItem = Form.Item

// step 1 手机验证码 4 手机密码 2 新手机验证码 5 成功

const phoneReg =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
// const pwdReg = /^[0-9a-zA-Z]{6,20}$/g

const PhoneModal = ({ cancel }) => {
  const [form] = Form.useForm()
  const { validateFields, resetFields } = form
  const { controlPanelStore } = useStores()
  const { verificationCode, changeMobile, checkPhonePwd } = controlPanelStore
  const formRef = useRef<any>()

  const currentUser = getCurrentUser()

  const [step, setStep] = useState(1)
  const [mobile, setMoible] = useState('')

  const valuesChange = (values, _allValues) => {
    if (values.mobile) {
      setMoible(values.mobile)
    }
  }

  const onCancel = () => {
    cancel && cancel()
  }

  const showPwdChangePhone = () => {
    setStep(4)
  }

  const onOk = async () => {
    try {
      const values = await validateFields()
      if (step === 1) {
        const res = await verificationCode(values)
        res && setStep(2)
        res && resetFields()
      }
      if (step === 4) {
        values.password = btoa(values.password)
        const res = await checkPhonePwd({
          ...values
        })
        console.log('🚀 ~ file: phoneModal.tsx ~ line 59 ~ onOk ~ res', res)
        res && setStep(2)
        res && resetFields()
      }

      if (step === 2) {
        const res = await changeMobile({
          userId: currentUser.userId,
          ...values
        })

        const newUser = cloneDeep(currentUser)
        newUser.mobilePhone = values.mobile
        localStorage.setItem('currentUser', JSON.stringify(newUser))
        res && setStep(5)
      }
    } catch (e) {
      console.log(e)
    }

    if (step === 5) {
      onCancel()
    }
  }

  return (
    <Modal
      centered
      visible={true}
      title={'修改手机号'}
      wrapClassName={classNames(
        styles.pwdModal,
        step === 5 ? styles.pwdModal2 : null
      )}
      okText={step === 5 ? '确定' : '下一步'}
      cancelText={'取消'}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form} ref={formRef} onValuesChange={valuesChange}>
        {step === 4 && (
          <>
            <FromItem key={'mobile'} name={'mobile'} label={'手机号'}>
              <div>{currentUser.mobilePhone}</div>
            </FromItem>

            <FromItem
              name="password"
              label="密码"
              rules={[
                {
                  pattern: pwdReg,
                  required: true,
                  message: '请输入密码',
                  whitespace: false
                }
              ]}
            >
              <Input type={'password'} placeholder={'请输入密码~'} />
            </FromItem>
          </>
        )}
        {step === 1 && (
          <>
            <FromItem
              key={'mobile'}
              name={'mobile'}
              label={'手机号'}
              rules={[{ required: true }]}
              // initialValue={'13326135285'}
              initialValue={currentUser.mobilePhone}
            >
              <div>{currentUser.mobilePhone}</div>
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
                code={'pCode'}
                tel={currentUser.mobilePhone}
                // tel={13326135285}
                placeholder={'请输入验证码~'}
              />
            </FromItem>
            <div className={styles.tips}>
              原手机已丢失或停用，使用
              <span
                className={styles.pwdChangeText}
                onClick={showPwdChangePhone}
              >
                账号密码修改
              </span>
              。
            </div>
            <div className={styles.tips2}>
              如还需帮助，请联系管理员（0571-8888888）
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <FromItem
              name={'mobile'}
              label={'新手机号'}
              rules={[
                {
                  pattern: phoneReg,
                  required: true,
                  message: '请输入正确的手机号',
                  whitespace: true
                }
              ]}
            >
              <Input placeholder={'请输入手机号'} />
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
                code={'nCode'}
                tel={mobile}
                placeholder={'请输入验证码~'}
              />
            </FromItem>
          </>
        )}

        {step === 5 && (
          <div className={styles.successBox}>
            <img className={styles.successImg} src={SUCCESS_SVG}></img>
            <div className={styles.successText}>修改成功！</div>
          </div>
        )}
      </Form>
    </Modal>
  )
}

export default PhoneModal
