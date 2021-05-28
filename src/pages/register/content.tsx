import React, { useState, ChangeEvent } from 'react'
import styles from './index.module.less'
import { Form, Input, Button } from 'antd'
import classNames from 'classnames'
import { useHistory } from 'react-router'
import ConcatInput from './concatInput'
import VerifyCodeInput from './verifyCodeInput'
import { useStores } from '@/utils/mobx'
import * as _ from 'lodash'

type InputEvent = ChangeEvent<HTMLInputElement>
type CommonObj = {
  [key: string]: any
}

const hasEmpty = (obj: CommonObj) => {
  if (!obj) return true
  const keys = Reflect.ownKeys(obj)

  return keys.some((item: any) => {
    if (typeof obj[item] === 'object') {
      return hasEmpty(obj[item])
    } else {
      return !obj[item]
    }
  })
}

// type TelInfo = Partial<{
//   code?: string
//   mobilePhone?: string
// }>

const initErrors = {
  userName: false,
  pwd: false,
  pwd2: false,
  telInfo: false,
  code: false
}

const initHelps = {
  userName: '',
  pwd: '',
  pwd2: '',
  telInfo: '',
  code: ''
}

const Register = () => {
  const [form] = Form.useForm()
  const { validateFields } = form
  const history = useHistory()
  const { registerStore } = useStores()
  const { vrifyCode, register, checkUser } = registerStore

  // const { getFieldValue, validateFields, setFieldsValue } = form
  const [disabled, setDisabled] = useState<boolean>(false)
  const [telInfo, setTelInfo] = useState<any>({})

  const [errors, setErrors] = useState(initErrors)
  const [helps, setHelps] = useState(initHelps)

  const getValueFromEvent = (event: InputEvent, type: string) => {
    // 可根据需要 通过 setFieldsValue 设置联动效果
    if (type === 'telConcat') {
      return event
    }
    if (type === 'verifyCode') {
      return event
    }
    return event.target.value
  }

  const handleSubmit = async () => {
    try {
      const values = await validateFields()
      const verifyParams = {
        mobile: values.telInfo.mobilePhone,
        code: values.code
      }
      // const verifyRef = await vrifyCode(verifyParams)
      // console.log(verifyRef, 'verifyRef')

      delete values.pwd2
      const params = {
        code: values.code,
        mobilePhone: values.telInfo.mobilePhone,
        password: values.pwd,
        userName: values.userName
      }
      console.log(params)
      // const registerRes = await register(params)
      // if (registerRes.success) {
      //   history.push('/login')
      // }
    } catch (err) {
      console.log(err)
      const { errorFields } = err
      console.log(errorFields, '---')
    }
  }

  const onValuesChange = async (changedValues: any, allValues: CommonObj) => {
    console.log(allValues, 'allValues')
    const key = Object.keys(changedValues)[0]
    const value = changedValues[key]
    const nHelps = _.cloneDeep(helps)
    const nErrors = _.cloneDeep(errors)
    switch (key) {
      case 'userName':
        const flag = await checkUser(value, 'userName')
        if (!value) {
          nHelps[key] = '请输入用户名~'
        } else {
          nHelps[key] = !flag && '用户名已注册~'
        }
        nErrors[key] = !flag
        setErrors(nErrors)
        setHelps(nHelps)
        break
      case 'pwd2':
        if (!value) {
          nHelps[key] = '请再次输入你的密码~'
          nErrors[key] = true
        } else {
          nHelps[key] = value !== allValues.pwd && '两次密码输入不一致~'
          nErrors[key] = value !== allValues.pwd
        }
        setErrors(nErrors)
        setHelps(nHelps)
        break
      case 'telInfo':
        const { telInfo } = allValues
        const { mobilePhone } = telInfo
        if (!value) {
          nHelps[key] = '请再次输入你的密码~'
          nErrors[key] = true
        } else {
          nHelps[key] = value !== allValues.pwd && '两次密码输入不一致~'
          nErrors[key] = value !== allValues.pwd
        }
        setErrors(nErrors)
        setHelps(nHelps)
        break
    }

    const flag = hasEmpty(allValues)
    setTelInfo(allValues.telInfo)

    setDisabled(flag)
  }

  const toLogin = () => {
    history.push('/login')
  }

  return (
    <div className={styles.content}>
      <div>
        <div className={styles.title}>欢迎新用户注册</div>
      </div>
      <Form
        form={form}
        scrollToFirstError={true}
        className={styles.form}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          name="userName"
          label=""
          rules={[{ required: true, message: '请输入用户名~' }]}
          getValueFromEvent={getValueFromEvent}
          validateStatus={errors.userName ? 'error' : 'success'}
          help={helps.userName}
        >
          <Input placeholder="设置用户名"></Input>
        </Form.Item>
        <Form.Item
          name="pwd"
          label=""
          rules={[{ required: true, message: '请输入密码' }]}
          getValueFromEvent={getValueFromEvent}
        >
          <Input placeholder="设置你的登录密码" type="password"></Input>
        </Form.Item>
        <Form.Item
          name="pwd2"
          label=""
          rules={[{ required: false }]}
          validateStatus={errors.pwd2 ? 'error' : 'success'}
          help={helps.pwd2}
          getValueFromEvent={getValueFromEvent}
        >
          <Input placeholder="请再次输入你的密码" type="password"></Input>
        </Form.Item>
        <Form.Item
          name="telInfo"
          label=""
          trigger={'onChange'}
          // rules={[{ required: true }, phoneInfoValidate]}
          initialValue={{ code: '+86', mobilePhone: null }}
          getValueFromEvent={event => getValueFromEvent(event, 'telConcat')}
        >
          <ConcatInput />
        </Form.Item>
        <Form.Item
          name="code"
          label=""
          trigger={'onChange'}
          getValueFromEvent={event => getValueFromEvent(event, 'verifyCode')}
        >
          <VerifyCodeInput tel={telInfo.mobilePhone} />
        </Form.Item>
        {/* 滑动验证 */}
        <div id="your-dom-id" className="nc-container"></div>
        <Button
          className={classNames(styles.agreeBtn, !disabled && styles.blueBtn)}
          disabled={disabled}
          type={'primary'}
          htmlType={'submit'}
          onClick={handleSubmit}
        >
          同意条款并注册
        </Button>
      </Form>
      <div className={styles.fastLogin}>
        已有账号？<span onClick={toLogin}>{'快速登录>>'}</span>
      </div>
    </div>
  )
}

export default Register
