import React, { useState, ChangeEvent } from 'react'
import styles from './index.module.less'
import { Form, Input, Button } from 'antd'
import classNames from 'classnames'
import { useHistory } from 'react-router'
import ConcatInput from './concatInput'
import VerifyCodeInput from './verifyCodeInput'
import { useStores } from '@/utils/mobx'

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

type TelInfo = Partial<{
  code?: string
  mobilePhone?: string
}>

const Register = () => {
  const [form] = Form.useForm()
  const { validateFields, getFieldValue } = form
  const history = useHistory()
  const { registerStore } = useStores()
  const { vrifyCode, register } = registerStore

  // const { getFieldValue, validateFields, setFieldsValue } = form
  const [disabled, setDisabled] = useState<boolean>(false)
  const [init, setInit] = useState<boolean>(false)
  const [telInfo, setTelInfo] = useState<TelInfo>({})

  const getValueFromEvent = (event: InputEvent, type: string) => {
    console.log(event)

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
        code: values.code,
      }
      const verifyRef = await vrifyCode(verifyParams)
      console.log(verifyRef, 'verifyRef')

      delete values.pwd2
      const params = {
        code: values.code,
        mobilePhone: values.telInfo.mobilePhone,
        password: values.pwd,
      }
      const registerRes = await register(params)
      if (registerRes.success) {
        history.push('/login')
      }
    } catch (err) {
      const { errorFields } = err
      console.log(errorFields, '---')
    }
  }

  const onValuesChange = (_changedValues: any, allValues: CommonObj) => {
    const flag = hasEmpty(allValues)
    console.log(allValues)
    setTelInfo(allValues.telInfo)

    setDisabled(flag)
  }

  const phoneInfoValidate = ({}) => ({
    validator(_, value) {
      const { code, mobilePhone } = value
      if (!init) {
        setInit(true)
        return Promise.resolve()
      }

      if (code && mobilePhone) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('手机号码格式不正确'))
    },
  })

  const pwdValidate = ({}) => ({
    validator(_, value) {
      const pwd = getFieldValue('pwd')

      if (!init) {
        setInit(true)
        return Promise.resolve()
      }

      if (value === pwd) {
        return Promise.resolve()
      }

      return Promise.reject(new Error('两次密码输入不一致'))
    },
  })

  // useEffect(() => {
  //   // @ts-ignore
  //   const noCaptcha = window.noCaptcha
  //   let nc_token = [
  //     'FFFF0N0000000000884C',
  //     new Date().getTime(),
  //     Math.random(),
  //   ].join(':')

  //   let NC_Opt = {
  //     renderTo: '#your-dom-id',
  //     appkey: 'FFFF0N0000000000884C',
  //     scene: 'nc_login',
  //     token: nc_token,
  //     customWidth: 300,
  //     trans: { key1: 'code0' },
  //     elementID: ['usernameID'],
  //     is_Opt: 0,
  //     language: 'cn',
  //     isEnabled: true,
  //     timeout: 3000,
  //     times: 5,
  //     apimap: {
  //       // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
  //       // 'get_captcha': '//b.com/get_captcha/ver3',
  //       // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
  //       // 'get_img': '//c.com/get_img',
  //       // 'checkcode': '//d.com/captcha/checkcode.jsonp',
  //       // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
  //       // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
  //       // 'umid_serUrl': 'https://g.com/service/um.json'
  //     },
  //     callback: function (data) {
  //       window.console && console.log(nc_token)
  //       window.console && console.log(data.csessionid)
  //       window.console && console.log(data.sig)
  //     },
  //   }
  //   let nc = new noCaptcha(NC_Opt)
  //   nc.upLang('cn', {
  //     _startTEXT: '请按住滑块，拖动到最右边',
  //     _yesTEXT: '验证通过',
  //     _error300:
  //       '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
  //     _errorNetwork:
  //       '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>',
  //   })
  // }, [])

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
        {/* <Form.Item
          name="vipName"
          label=""
          rules={[{ required: true, message: '会员名格式不正确' }]}
          // normalize={normalizeAll}
          getValueFromEvent={getValueFromEvent}
        >
          <Input placeholder="设置会员名"></Input>
        </Form.Item> */}
        <Form.Item
          name="pwd"
          label=""
          rules={[{ required: true, message: '登录密码格式不正确' }]}
          getValueFromEvent={getValueFromEvent}
        >
          <Input placeholder="设置你的登录密码" type="password"></Input>
        </Form.Item>
        <Form.Item
          name="pwd2"
          label=""
          rules={[{ required: false }, pwdValidate]}
          getValueFromEvent={getValueFromEvent}
        >
          <Input placeholder="请再次输入你的密码" type="password"></Input>
        </Form.Item>
        <Form.Item
          name="telInfo"
          label=""
          trigger={'onChange'}
          rules={[
            { required: true, message: '手机号码格式不正确' },
            phoneInfoValidate,
          ]}
          initialValue={{ code: '+86', mobilePhone: null }}
          getValueFromEvent={(event) => getValueFromEvent(event, 'telConcat')}
        >
          <ConcatInput />
        </Form.Item>
        <Form.Item
          name="code"
          label=""
          trigger={'onChange'}
          getValueFromEvent={(event) => getValueFromEvent(event, 'verifyCode')}
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
