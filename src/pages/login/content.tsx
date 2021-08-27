import React, { useState } from 'react'
import styles from './index.module.less'
import { Input, Button, Tabs, Form } from 'antd'
import Icon from '@/components/Icon'
import classNamess from 'classnames'
import { useStores, observer } from '@/utils/mobx'
import { useHistory } from 'react-router'
import VerifyInput from './verifyInput'
import { phoneReg, pwdReg } from '../register/content'

const { TabPane } = Tabs

const UserIcon = () => <Icon type="jack-yonghuming" className={styles.icon} />
const PwdIcon = () => <Icon type="jack-yanzhengma" className={styles.icon} />
const PhoneIcon = () => <Icon type="jack-shouji1" className={styles.icon} />

const pathMap = new Map()
pathMap.set(null, '/')
pathMap.set(0, '/control-panel/factory')
pathMap.set(1, '/control-panel/business')

const LoginContent = () => {
  // const title = '春秋季服装订单大促'
  // const desc = '全场两季7折，最高满赠2万元代金券！'
  const userPlaceholder = '请输入用户名'
  const pwdPlaceholder = '请输入登录密码'

  const { loginStore, registerStore } = useStores()
  const { login, userInfo } = loginStore
  const { checkUser } = registerStore
  const history = useHistory()
  const [form] = Form.useForm()
  const { validateFields, resetFields } = form

  const errorTexts = new Map()
  errorTexts.set(0, '登录名或登录密码不正确')

  const [activeTab, setActiveTab] = useState<string>('1')
  const [phoneNumer, setPhoneNumber] = useState<string>()
  const [error, setError] = useState<boolean>(false)

  const valueChange = changedValues => {
    const { mobilePhone = '' } = changedValues
    setPhoneNumber(mobilePhone)
    setError(false)
  }

  const init = () => {
    resetFields()
    setError(false)
  }

  const callback = activeKey => {
    setActiveTab(activeKey)
    init()
  }

  const submit = async () => {
    // enterpriseType 0 加工厂 1 发单商
    try {
      const values = await validateFields()
      values.loginType = +activeTab === 1 ? 'password' : 'sms_code'
      if (+activeTab === 1) {
        values.passWord = btoa(values.passWord)
      }
      const res = await login(values)

      if (res && res.success) {
        setError(false)
        const { data } = await userInfo()
        if (data) {
          data.enterpriseType && history.push('/control-panel/home')
          !data.enterpriseType && history.push('/')
        } else {
          history.push('/')
        }
      } else {
        setError(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const toRegister = () => {
    history.push('/user/register')
  }

  const toReset = () => {
    history.push('/user/reset')
  }

  return (
    <div
      className={classNamess(
        styles.right,
        +activeTab === 1 ? styles.userLogin : styles.phoneLogin
      )}
    >
      <Form
        form={form}
        onValuesChange={valueChange}
        scrollToFirstError={true}
        className={styles.form}
      >
        <Tabs activeKey={activeTab} onChange={callback} centered>
          <TabPane
            className={styles.rightContent}
            tab="帐户密码登录"
            key="1"
          ></TabPane>
          <TabPane
            className={styles.rightContent}
            tab="手机号登录"
            key="2"
          ></TabPane>
        </Tabs>
        {+activeTab === 1 ? (
          <section>
            <Form.Item
              name="userName"
              label=""
              rules={[{ required: true, message: '请输入用户名~' }]}
            >
              <Input prefix={<UserIcon />} placeholder={userPlaceholder} />
            </Form.Item>

            <Form.Item
              name="passWord"
              label=""
              rules={[
                {
                  required: true,
                  message: '请输入正确格式的密码~',
                  pattern: pwdReg
                }
              ]}
            >
              <Input.Password
                prefix={<PwdIcon />}
                placeholder={pwdPlaceholder}
                // type="password"
                size={'middle'}
              />
            </Form.Item>
          </section>
        ) : (
          <>
            <Form.Item
              name="mobilePhone"
              label=""
              rules={[
                {
                  required: true,
                  message: '请输入11位手机号~',
                  pattern: phoneReg
                }
              ]}
            >
              <Input
                prefix={<PhoneIcon />}
                className={styles.input}
                placeholder="请输入手机号"
              />
            </Form.Item>

            <Form.Item
              name="code"
              label=""
              rules={[
                {
                  required: true,
                  message: '请输入六位验证码~',
                  min: 6,
                  max: 6
                }
              ]}
            >
              <VerifyInput
                prefix={<PwdIcon />}
                className={styles.verification}
                placeholder="请输入验证码"
                tel={phoneNumer}
                checkCallback={checkUser}
                code={'loginVerify'}
              />
            </Form.Item>
          </>
        )}
      </Form>

      <div className={styles.loginOperation}>
        <div
          className={classNamess(styles.errorText, error && styles.showError)}
        >
          <Icon type={'jack-error'} className={styles.errorIcon} />
          {errorTexts.get(0)}
        </div>
        <span className={styles.forgetPwd} onClick={toReset}>
          忘记密码
        </span>
      </div>

      <Button type={'primary'} className={styles.btn} onClick={submit}>
        登录
      </Button>
      <Button type={'text'} className={styles.registerBtn} onClick={toRegister}>
        注册
      </Button>
      {/* <div className={styles.otherLogin}>其他登录方式</div>
      <div className={styles.otherBox}>
        <Icon type={'jack-weixin1'} className={styles.otherIcon}></Icon>
      </div> */}
    </div>
  )
}

export default observer(LoginContent)
