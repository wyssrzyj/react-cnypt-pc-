import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import VerifyInput from './verifyInput'
import { Icon } from '@/components'
import styles from './index.module.less'
import { phoneReg, pwdReg } from '../register/content'
import { useStores } from '@/utils/mobx'
import { useHistory } from 'react-router'

const FromItem = Form.Item

const PwdIcon = () => <Icon type="jack-mima" className={styles.icon} />
const PhoneIcon = () => <Icon type="jack-shouji1" className={styles.icon} />
const CodeIcon = () => <Icon type="jack-yanzhengma" className={styles.icon} />

const Reset = () => {
  const [form] = Form.useForm()
  const { getFieldValue, validateFields } = form

  const { registerStore, loginStore } = useStores()
  const { checkUser } = registerStore
  const { resetPwd } = loginStore
  const history = useHistory()

  const [phone, setPhone] = useState()

  const newPwdValidator = (_, value) => {
    if (!value) {
      return Promise.reject('请输入新密码~')
    }
    if (!pwdReg.test(value)) {
      return Promise.reject('请输入符合规则的新密码~')
    }
    return Promise.resolve()
  }

  const pwdValidator = (_, value) => {
    const target = getFieldValue('password')
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
      values.password = btoa(values.password)
      delete values.newPassword2
      await resetPwd(values)
    } catch (e) {
      console.log(e)
    }
  }

  const valuesChange = changedValues => {
    const { mobile = '' } = changedValues
    const keys = Reflect.ownKeys(changedValues)
    if (keys.includes('mobile')) {
      setPhone(mobile)
    }
  }

  const backLogin = () => {
    history.push('/user/login')
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
          name="mobile"
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
          name="code"
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
          name="password"
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
        <div className={styles.resetBtnBox}>
          <Button onClick={backLogin} className={styles.resetBtn}>
            返回
          </Button>
          <Button type={'primary'} onClick={submit} className={styles.resetBtn}>
            修改
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Reset
