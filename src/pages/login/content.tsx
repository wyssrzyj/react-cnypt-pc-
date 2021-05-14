import React, { useState, useEffect, ChangeEvent } from 'react'
import styles from './index.module.less'
import { Input, Button } from 'antd'
import Icon from '@/components/Icon'
import { Link } from 'react-router-dom'
import classNamess from 'classnames'
import { useStores, observer } from '@/utils/mobx'
import { useHistory } from 'react-router'

const UserIcon = () => <Icon type="jack-yonghu" className={styles.icon} />
const PwdIcon = () => <Icon type="jack-suo" className={styles.icon} />

type InputEvent = ChangeEvent<HTMLInputElement>

const LoginContent = () => {
  const title = '春秋季服装订单大促'
  const desc = '全场两季7折，最高满赠2万元代金券！'
  const userPlaceholder = '手机号/用户名'
  const pwdPlaceholder = '请输入登录密码'

  const { loginStore } = useStores()
  const { login } = loginStore
  const history = useHistory()

  const todoList = [
    { label: '忘记密码', url: '/register' },
    { label: '忘记用户名', url: '/register' },
    { label: '免费注册', url: '/register' },
  ]

  const errorTexts = new Map()
  errorTexts.set(0, '登录名或登录密码不正确')

  const [user, setUser] = useState<string>()
  const [pwd, setPwd] = useState<string>()
  const [error, setError] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)

  const valueChange = (event: InputEvent, type: string) => {
    const { value } = event.target
    type === 'user' && setUser(value)
    type === 'pwd' && setPwd(value)
  }

  useEffect(() => {
    const flag = user && pwd ? false : true
    console.log(flag)
    setDisabled(flag)
  }, [user, pwd])

  const submit = async () => {
    const params = {
      mobilePhone: user,
      password: pwd,
    }
    const res = await login(params)
    setError(!res.success)
    if (res.success) {
      history.push('/home')
    }
  }

  return (
    <div className={styles.loginContent}>
      <div className={styles.content}>
        <div className={styles.left}>
          <img src="" alt="" className={styles.img} />
          <div className={styles.leftText}>
            <div className={styles.title}>{title}</div>
            <div className={styles.desc}>{desc}</div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.rTitle}>密码登录</div>
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
          <Button
            disabled={disabled}
            type={'primary'}
            className={styles.btn}
            onClick={submit}
          >
            登录
          </Button>
          <div
            className={classNamess(styles.errorText, error && styles.showError)}
          >
            {errorTexts.get(0)}
          </div>
          <div className={styles.todoList}>
            {todoList.map((item, idx) => (
              <Link to={item.url} key={idx} className={styles.todoLink}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(LoginContent)
