import React, { useEffect, useState, useMemo } from 'react'
import { Steps } from 'antd'
import styles from './index.module.less'
import { Icon } from '@/components'
import { useHistory, useParams } from 'react-router'
import ConfirmTable from './components/confirmTable'
import OnGoing from './components/onGoing'
import classNames from 'classnames'
import { useStores, observer } from '@/utils/mobx'
import moment from 'moment'
import { dateDiff } from '@/utils/tool'

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

const initConfigs = [
  {
    label: '发单商',
    field: 'purchaserName',
    value: ''
  },
  {
    label: '订单数量',
    field: 'totalAmount',
    value: ''
  },
  {
    label: '确认时间',
    field: 'confirmTime',
    value: ''
  },
  {
    label: '交货时间',
    field: 'expectDeliveryTime',
    value: ''
  }
]

const StateTracking = () => {
  const history = useHistory()
  const routerParams: { id?: string } = useParams()
  const { orderStore } = useStores()
  const { getTrackState } = orderStore

  const title = '状态跟踪'
  const [curStep, setCurStep] = useState<number>(1)
  const [configs, setConfigs] = useState<any>(initConfigs)
  const [orderName, setOrderName] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      const data = await getTrackState({ id: routerParams.id })
      if (data) {
        const { orderMsg = {} } = data
        let target = initConfigs.map(item => {
          if (item.field === 'purchaserName') {
            item.value = orderMsg['purchaserName']
          }
          if (item.field === 'totalAmount') {
            item.value = orderMsg['totalAmount'] + '件'
          }
          if (item.field === 'confirmTime') {
            item.value = orderMsg['confirmTime']
              ? moment(orderMsg['confirmTime']).format('YYYY-MM-DD HH:mm:ss')
              : null
          }
          if (item.field === 'expectDeliveryTime') {
            item.value = orderMsg['expectDeliveryTime']
              ? moment(orderMsg['expectDeliveryTime']).format('YYYY-MM-DD')
              : null
          }
          return item
        })
        setConfigs(target)
        setOrderName(orderMsg.name)
        setCurStep(orderMsg.currentType - 1 || 0)
      }
    })()
  }, [])

  const stepChange = (cur: number) => {
    setCurStep(cur)
  }

  const back = () => {
    history.goBack()
  }

  const delayDay = useMemo(() => {
    const targetTime = configs[3].value
    const diffDay = targetTime ? dateDiff(targetTime).day : 0
    return diffDay > 0 ? 0 : Math.abs(diffDay)
  }, [configs])

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
            <div className={styles.orderTopText}>{orderName}</div>
            <div className={styles.orderTopText}>
              {curStep > 0 ? (
                <>
                  已延期&nbsp;
                  <span
                    className={classNames(
                      styles.orderTopCount,
                      styles.orderTopRedCount
                    )}
                  >
                    {delayDay}
                  </span>
                  &nbsp;天
                </>
              ) : null}
            </div>
          </div>
          <div
            className={classNames(
              styles.orderBasic,
              +curStep ? styles.between : ''
            )}
          >
            {configs.map((itme, idx) => {
              if (!curStep && [2, 3].includes(idx)) {
                return null
              }
              return (
                <div className={styles.orderText} key={idx}>
                  {itme.label}
                  <span className={styles.orderValue}>{itme.value}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {+curStep === 0 ? <ConfirmTable curStep={+curStep}></ConfirmTable> : null}
      {+curStep === 1 ? <OnGoing></OnGoing> : null}
      {+curStep === 2 ? <ConfirmTable curStep={+curStep}></ConfirmTable> : null}
    </div>
  )
}

export default observer(StateTracking)
