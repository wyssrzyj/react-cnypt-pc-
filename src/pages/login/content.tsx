import React, { useState, useEffect, ChangeEvent } from 'react'
import styles from './index.module.less'
import { Input, Button, Carousel, Tabs } from 'antd'
import Icon from '@/components/Icon'
// import { Link } from 'react-router-dom'
import classNamess from 'classnames'
import { useStores, observer } from '@/utils/mobx'
import { useHistory } from 'react-router'
import BANNER0 from './images/u104.png'
import BANNER1 from './images/u105.png'
import BANNER2 from './images/u106.png'
import BANNER3 from './images/u107.png'

const { TabPane } = Tabs

const UserIcon = () => <Icon type="jack-yonghu" className={styles.icon} />
const PwdIcon = () => <Icon type="jack-suo" className={styles.icon} />

type InputEvent = ChangeEvent<HTMLInputElement>

const LoginContent = () => {
  // const title = '春秋季服装订单大促'
  // const desc = '全场两季7折，最高满赠2万元代金券！'
  const userPlaceholder = '手机号/用户名'
  const pwdPlaceholder = '请输入登录密码'

  const { loginStore } = useStores()
  const { login, verifyCode, userInfo } = loginStore
  const history = useHistory()

  const errorTexts = new Map()
  errorTexts.set(0, '登录名或登录密码不正确')

  const [user, setUser] = useState<string>()
  const [pwd, setPwd] = useState<string>()
  const [activeTab, setActiveTab] = useState<string>('1')
  const [phoneNumer, setPhoneNumber] = useState<string>()
  const [verification, setVerification] = useState<string>()
  const [error, setError] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)

  const valueChange = (event: InputEvent, type: string) => {
    const { value } = event.target
    type === 'user' && setUser(value)
    type === 'pwd' && setPwd(value)
    type === 'phoneNumer' && setPhoneNumber(value)
    type === 'verification' && setVerification(value)
  }

  const callback = activeKey => {
    setActiveTab(activeKey)
    if (activeKey === '1') {
      const flag = user && pwd ? false : true
      setDisabled(flag)
    } else {
      const flag = phoneNumer && verification ? false : true
      setDisabled(flag)
    }
  }

  useEffect(() => {
    const flag = user && pwd ? false : true
    setDisabled(flag)
  }, [user, pwd])

  useEffect(() => {
    const flag = phoneNumer && verification ? false : true
    setDisabled(flag)
  }, [phoneNumer, verification])

  const submit = async () => {
    const params =
      +activeTab - 1
        ? {
            mobilePhone: phoneNumer,
            code: verification,
            loginType: 'sms_code'
          }
        : {
            userName: user,
            passWord: pwd,
            loginType: 'password'
          }
    const res = await login(params)
    const info = await userInfo()
    console.log('🚀 ~ file: content.tsx ~ line 86 ~ submit ~ info', info)
    setError(!res.success)
    if (res.success) {
      history.push('/platform/home')
    }
  }

  const getVerification = async () => {
    await verifyCode(phoneNumer)
  }

  return (
    <div className={styles.loginContent}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Carousel autoplay className={styles.carousel} autoplaySpeed={2000}>
            <img src={BANNER0} alt="" />
            <img src={BANNER1} alt="" />
            <img src={BANNER2} alt="" />
            <img src={BANNER3} alt="" />
          </Carousel>
        </div>

        <div className={styles.right}>
          <Tabs activeKey={activeTab} onChange={callback} centered>
            <TabPane className={styles.rightContent} tab="帐户密码登录" key="1">
              <Input
                prefix={<UserIcon />}
                className={styles.input}
                placeholder={userPlaceholder}
                onChange={(event: InputEvent) => valueChange(event, 'user')}
              />
              <Input
                prefix={<PwdIcon />}
                className={styles.input}
                placeholder={pwdPlaceholder}
                type="password"
                onChange={(event: InputEvent) => valueChange(event, 'pwd')}
              />
            </TabPane>
            <TabPane className={styles.rightContent} tab="手机号登录" key="2">
              <Input
                prefix={<UserIcon />}
                className={styles.input}
                placeholder="手机号"
                onChange={(event: InputEvent) => valueChange(event, 'phoneNumer')}
              />
              <div className={styles.verificationBox}>
                <Input
                  prefix={<PwdIcon />}
                  className={styles.verification}
                  placeholder="验证码"
                  onChange={(event: InputEvent) => valueChange(event, 'verification')}
                />
                <Button className={styles.getVerification} onClick={getVerification}>
                  获取验证码
                </Button>
              </div>
            </TabPane>
          </Tabs>

          <div className={styles.loginOperation}>
            {/* <Checkbox onChange={automaticLogin}>自动登录</Checkbox> */}
            <a>忘记密码</a>
          </div>

          <Button disabled={disabled} type={'primary'} className={styles.btn} onClick={submit}>
            登录
          </Button>
          <div className={classNamess(styles.errorText, error && styles.showError)}>{errorTexts.get(0)}</div>
        </div>
      </div>
    </div>
  )
}

export default observer(LoginContent)
