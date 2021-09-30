import React, { useState, useCallback, useEffect } from 'react'
import { Steps } from 'antd'
import styles from './index.module.less'
import { Icon } from '@/components'
import { useHistory } from 'react-router'
import BindSoftWare from './components/bindSoftWare'
import BindAccount from './components/bindAccount'
import BindOrder from './components/bindOrder'
import { useStores } from '@/utils/mobx'

const { Step } = Steps

const CheckIcon = (
  <Icon type={'jack-bdgprj_1'} className={styles.stepIcon}></Icon>
)
const CheckActiveIcon = (
  <Icon type={'jack-bdgprj_2'} className={styles.stepActiveIcon}></Icon>
)
const DoingIcon = (
  <Icon type={'jack-gprjzh_1'} className={styles.stepIcon}></Icon>
)
const DoingActiveIcon = (
  <Icon type={'jack-gprjzh_2'} className={styles.stepActiveIcon}></Icon>
)
const FinishIcon = (
  <Icon type={'jack-ddqr_1'} className={styles.stepIcon}></Icon>
)
const FinishActiveIcon = (
  <Icon type={'jack-ddqr_2'} className={styles.stepActiveIcon}></Icon>
)

const BindProduce = () => {
  const history = useHistory()
  const title = '状态跟踪'
  const { orderStore } = useStores()
  const { checkYOUCHAN } = orderStore

  const [curStep, setCurStep] = useState<number>(0)
  const stepChange = useCallback((cur: number) => {
    setCurStep(cur)
  }, [])

  useEffect(() => {
    ;(async () => {
      const res = await checkYOUCHAN()
      if (res) {
        setCurStep(2)
      }
    })()
  }, [])

  const back = () => {
    history.goBack()
  }

  return (
    <div>
      <div className={styles.header}>
        <Icon
          onClick={back}
          type={'jack-left-copy'}
          className={styles.headerIcon}
        ></Icon>
        {title}
      </div>

      <div className={styles.stepsBox}>
        <Steps
          type="navigation"
          size="small"
          current={curStep}
          onChange={stepChange}
          className={styles.steps}
        >
          <Step
            title="绑定工票软件"
            icon={curStep === 0 ? CheckActiveIcon : CheckIcon}
          />
          <Step
            title="绑定工票软件账号"
            icon={curStep === 1 ? DoingActiveIcon : DoingIcon}
          />
          <Step
            title="绑定工票软件订单"
            icon={curStep === 2 ? FinishActiveIcon : FinishIcon}
          />
        </Steps>
      </div>

      {curStep === 0 ? (
        <BindSoftWare callback={() => stepChange(1)}></BindSoftWare>
      ) : null}
      {curStep === 1 ? (
        <BindAccount callback={() => stepChange(2)}></BindAccount>
      ) : null}
      {curStep === 2 ? <BindOrder></BindOrder> : null}
    </div>
  )
}

export default BindProduce
