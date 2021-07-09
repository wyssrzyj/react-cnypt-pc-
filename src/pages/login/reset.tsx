import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import VerifyInput from './verifyInput'
import { Icon } from '@/components'
import styles from './index.module.less'
import { phoneReg, pwdReg } from '../register/content'
import { useStores } from '@/utils/mobx'

const FromItem = Form.Item

const PwdIcon = () => <Icon type="jack-mima" className={styles.icon} />
const PhoneIcon = () => <Icon type="jack-shouji1" className={styles.icon} />
const CodeIcon = () => <Icon type="jack-yanzhengma" className={styles.icon} />

const Reset = () => {
  const [form] = Form.useForm()
  const { getFieldValue, validateFields } = form

  const { controlPanelStore, registerStore } = useStores()
  const { codeUpdatePwd } = controlPanelStore
  const { checkUser } = registerStore

  const [phone, setPhone] = useState()

  const newPwdValidator = (_, value) => {
    const oldPwd = getFieldValue('oldPassword')
    if (!value) {
      return Promise.reject('请输入新密码~')
    }
    console.log(value)
    if (!pwdReg.test(value)) {
      return Promise.reject('请输入符合规则的新密码~')
    }
    if (oldPwd === value) {
      return Promise.reject('新密码不能与原密码相同~')
    }
    return Promise.resolve()
  }

  const pwdValidator = (_, value) => {
    const target = getFieldValue('newPassword')
    if (!value) {
      return Promise.reject('请输入确认密码~')
    }
    if (value !== target) {
      return Promise.reject('确认密码与新密码不同，请再次确认~')
    }
    return Promise.resolve()
  }

  const phoneValidator = async (_, value) => {
    if (!value) {
      return Promise.reject('请输入手机号~')
    }
    if (!phoneReg.test(value)) {
      return Promise.reject('请输入正确的手机号~')
    }

    if (value.length === 11) {
      // true 未注册 false 已注册
      const flag = await checkUser(value, 'mobilePhone')
      if (flag) {
        return Promise.reject('该手机号未注册~')
      }
    }
    return Promise.resolve()
  }

  const submit = async () => {
    try {
      const values = await validateFields()
      values.newPassword = btoa(values.newPassword)
      delete values.newPassword2
      const res = await codeUpdatePwd(values)
      console.log('🚀 ~ file: reset.tsx ~ line 52 ~ submit ~ res', res)
    } catch (e) {
      console.log(e)
    }
  }

  const valuesChange = changedValues => {
    const { mobilePhone = ' ' } = changedValues

    setPhone(mobilePhone)
  }

  return (
    <div className={styles.resetBox}>
      <div className={styles.title}>忘记密码</div>
      <Form
        form={form}
        className={styles.resetForm}
        onValuesChange={valuesChange}
      >
        <FromItem
          name="mobilePhone"
          label=""
          rules={[
            {
              required: true,
              validator: phoneValidator
            }
          ]}
        >
          <Input placeholder="手机号" prefix={<PhoneIcon />}></Input>
        </FromItem>

        <FromItem
          name="smsCode"
          label=""
          rules={[
            {
              required: true,
              message: '请输入验证码'
            }
          ]}
        >
          <VerifyInput
            code={'pwdCode'}
            tel={phone}
            prefix={<CodeIcon />}
            placeholder={'请输入验证码~'}
          />
        </FromItem>
        <FromItem
          name="newPassword"
          label=""
          rules={[{ required: true, validator: newPwdValidator }]}
        >
          <Input
            placeholder="字母,符号或数字中至少两项且超过6位"
            type="password"
            prefix={<PwdIcon />}
          ></Input>
        </FromItem>

        <FromItem
          name="newPassword2"
          label=""
          rules={[
            {
              required: true,
              whitespace: true,
              validator: pwdValidator
            }
          ]}
        >
          <Input
            placeholder={'请输入确认密码~'}
            prefix={<PwdIcon />}
            type="password"
          />
        </FromItem>
        <Button type={'primary'} onClick={submit} className={styles.resetBtn}>
          修改
        </Button>
      </Form>
    </div>
  )
}

export default Reset
