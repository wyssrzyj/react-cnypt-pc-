import React, { useState, useEffect, ChangeEvent } from 'react'
import styles from './index.module.less'
import { Input, Button } from 'antd'
import { useStores } from '@/utils/mobx'

type InputEvent = ChangeEvent<HTMLInputElement>

const VerifyCodeInput = props => {
  const { onChange, value, tel } = props

  const { registerStore } = useStores()
  const { sendVerifyCode } = registerStore
  const verifyTime = 60

  const [val, setVal] = useState<string>(value)
  const [lastTime, setLastTime] = useState<number>(verifyTime)
  const [sending, setSending] = useState<boolean>(false)
  const [timer, setTimer] = useState<any>(null)

  const valueChange = (event: InputEvent) => {
    setVal(event.target.value)
  }

  useEffect(() => {
    const last = localStorage.getItem('verifyTime')
    if (last) {
      setLastTime(+last)
      setSending(true)
      timerRun()
    }
  }, [])

  useEffect(() => {
    onChange && onChange(val)
  }, [val])

  const timerRun = () => {
    const t = setInterval(() => {
      setLastTime(t => {
        const n = t - 1
        localStorage.setItem('verifyTime', `${n}`)
        return n
      })
    }, 1000)
    setTimer(t)
  }

  const sendCode = async () => {
    if (sending) return
    setSending(true)
    timerRun()

    await sendVerifyCode(tel)
  }

  useEffect(() => {
    if (lastTime <= 0) {
      setSending(false)
      clearInterval(timer)
      setTimer(null)
      setLastTime(verifyTime)
    }
  }, [lastTime])

  return (
    <div style={{ display: 'flex' }}>
      <Input onChange={valueChange} value={value} />
      <Button
        disabled={sending}
        onClick={sendCode}
        type={'primary'}
        className={styles.verifyBtn}
      >
        {sending ? `${lastTime}s` : '发送验证码'}
      </Button>
    </div>
  )
}

export default VerifyCodeInput
