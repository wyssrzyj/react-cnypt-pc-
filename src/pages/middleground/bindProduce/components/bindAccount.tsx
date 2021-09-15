import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd'
import styles from './bindAccount.module.less'
import { Icon } from '@/components'
import { useHistory } from 'react-router'

const USER_ICON = (
  <Icon type={'jack-gerenzhongxin1'} className={styles.icon}></Icon>
)
const PWD_ICON = <Icon type={'jack-mima'} className={styles.icon}></Icon>

const BindAccount = props => {
  const history = useHistory()
  const { callback } = props
  const [bindFlag, setBindFlag] = useState(false)
  const [showBindRes, setShowBindRes] = useState(false)
  const [times, setTimes] = useState(5)
  const [timer, setTimer] = useState(null)

  const bindClick = () => {
    const flag = Math.random() > 0.5
    setBindFlag(flag)
    setShowBindRes(f => !f)
    if (setTimes) {
      const t = setInterval(() => {
        setTimes(n => n - 1)
      }, 1000)
      setTimer(t)
    }
  }

  const toNext = () => {
    callback && callback()
  }

  const reBind = () => {
    setBindFlag(false)
    setShowBindRes(false)
    setTimes(5)
    clearInterval(timer)
    setTimer(null)
  }

  const cancel = () => {
    history.goBack()
  }

  useEffect(() => {
    if (times <= 0) {
      clearInterval(timer)
      setTimer(null)
      toNext()
    }
  }, [times])

  return (
    <div className={styles.container}>
      {showBindRes ? (
        <>
          {bindFlag ? (
            <div className={styles.statusBox}>
              <Icon type={'jack-wc'} className={styles.successIcon}></Icon>
              <div className={styles.statusTitle}>账号绑定成功</div>
              <div className={styles.statusText}>
                {times}s后自动跳转到下一步
              </div>
              <Button type={'primary'} onClick={toNext} className={styles.btn}>
                立即前往
              </Button>
            </div>
          ) : null}
          {!bindFlag ? (
            <div className={styles.statusBox}>
              <Icon type={'jack-sptg1'} className={styles.failIcon}></Icon>
              <div className={styles.statusTitle}>账号绑定失败</div>
              <div className={styles.statusText}>请确认账号密码是否正确</div>
              <div>
                <Button
                  type={'primary'}
                  ghost
                  onClick={cancel}
                  className={styles.cancelBtn}
                >
                  取消
                </Button>
                <Button
                  type={'primary'}
                  onClick={reBind}
                  className={styles.btn}
                >
                  重新绑定
                </Button>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className={styles.inputBox}>
          <Input
            placeholder={'请输入账号'}
            prefix={USER_ICON}
            className={styles.input}
          />
          <Input
            placeholder={'请输入用户密码'}
            prefix={PWD_ICON}
            type={'password'}
            className={styles.input}
          />

          <Button
            type={'primary'}
            onClick={bindClick}
            className={styles.nextBtn}
          >
            绑定
          </Button>
        </div>
      )}
    </div>
  )
}

export default BindAccount
