import React, { useState } from 'react'
import { Steps } from 'antd'
import styles from './index.module.less'
import { Icon } from '@/components'
import { useHistory } from 'react-router'
import ConfirmTable from './components/confirmTable'
import OnGoing from './components/onGoing'
import classNames from 'classnames'

const { Step } = Steps

const CheckIcon = <Icon type={'jack-ddqr_1'} className={styles.stepIcon}></Icon>
const CheckActiveIcon = (
  <Icon type={'jack-ddqr_2'} className={styles.stepActiveIcon}></Icon>
)
const DoingIcon = <Icon type={'jack-jxz_1'} className={styles.stepIcon}></Icon>
const DoingActiveIcon = (
  <Icon type={'jack-jxz_2'} className={styles.stepActiveIcon}></Icon>
)
const FinishIcon = <Icon type={'jack-ywc_1'} className={styles.stepIcon}></Icon>
const FinishActiveIcon = (
  <Icon type={'jack-ywc_2'} className={styles.stepActiveIcon}></Icon>
)

const StateTracking = () => {
  const history = useHistory()
  const title = '状态跟踪'
  const [curStep, setCurStep] = useState<number>(1)
  const stepChange = (cur: number) => {
    setCurStep(cur)
  }

  const back = () => {
    history.goBack()
  }

  const configs = [
    {
      label: '发单商',
      value: '成都助战科技有限公司a'
    },
    {
      label: '订单数量',
      value: '400件'
    },
    {
      label: '确认时间',
      value: '2021-05-31 14:17:27'
    },
    {
      label: '交货时间',
      value: '2021-07-31'
    }
  ]

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
            title="订单确认"
            icon={curStep === 0 ? CheckActiveIcon : CheckIcon}
          />
          <Step
            title="进行中"
            icon={curStep === 1 ? DoingActiveIcon : DoingIcon}
          />
          <Step
            title="已完成"
            icon={curStep === 2 ? FinishActiveIcon : FinishIcon}
          />
        </Steps>
      </div>

      <div className={styles.content}>
        <div className={styles.orderInfo}>
          <div className={styles.orderTop}>
            <div className={styles.orderTopText}>女士梭织连衣裙</div>
            <div className={styles.orderTopText}>
              已延期&nbsp;
              <span
                className={classNames(
                  styles.orderTopCount,
                  true ? styles.orderTopRedCount : ''
                )}
              >
                0
              </span>
              &nbsp;天
            </div>
          </div>
          <div className={styles.orderBasic}>
            {configs.map((itme, idx) => (
              <div className={styles.orderText} key={idx}>
                {itme.label}
                <span className={styles.orderValue}>{itme.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {+curStep === 0 ? <ConfirmTable></ConfirmTable> : null}
      {+curStep === 1 ? <OnGoing></OnGoing> : null}
      {+curStep === 2 ? <ConfirmTable></ConfirmTable> : null}
    </div>
  )
}

export default StateTracking
