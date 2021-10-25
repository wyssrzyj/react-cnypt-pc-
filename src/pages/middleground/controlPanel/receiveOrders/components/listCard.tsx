import React, { useState, useMemo, useEffect } from 'react'
import { Icon, Title } from '@/components'
import { Popover, Button, Modal, Checkbox, Radio } from 'antd'
import styles from './listCard.module.less'
import { observer } from '@/utils/mobx'
import { useHistory } from 'react-router'
import classNames from 'classnames'
import moment from 'moment'

const STICK_TIPS = new Map()
STICK_TIPS.set(1, '取消置顶')
STICK_TIPS.set(0, '置顶')

const STATUS_CLASSES = new Map()
STATUS_CLASSES.set(1, styles.status1) // 新需求
STATUS_CLASSES.set(2, styles.status2) // 已取消、被谢绝
STATUS_CLASSES.set(3, styles.status3) // 待反馈
STATUS_CLASSES.set(4, styles.status4) // 已发单

const ListCard = props => {
  const history = useHistory()

  const { data } = props
  const { stickType = 0, confirmTime } = data

  const title = '女士梭织连衣裙'

  const configs = [
    {
      label: '加工类型:',
      field: 'a',
      value: '经销单，来图/来样加工'
    },
    {
      label: '商品品类:',
      field: 'b',
      value: '针织服装（薄料）'
    },
    {
      label: '订单量:',
      field: 'c',
      value: '100件'
    }
  ]

  const configs2 = [
    {
      label: '报价信息:',
      field: 'a'
    },
    {
      label: '付款方式:',
      field: 'b'
    },
    {
      label: '可接订单数:',
      field: 'c'
    },
    {
      label: '备注:',
      field: 'd'
    }
  ]

  const changeStickStatus = async () => {
    // 1 置顶  0 取消置顶
    // const code = await changeOrderStick({
    //   stickType: 1 - stickType,
    //   id
    // })
    // if (+code === 200) {
    //   getData && (await getData())
    // }
  }

  return (
    <div className={styles.cardContainer}>
      <div
        className={classNames(styles.header, stickType ? styles.topHeader : '')}
      >
        <div className={styles.left}>
          <div className={styles.order}>
            <span className={styles.orderLabel}>发单商:</span>
            <span className={styles.orderNum}>某某有限公司</span>
          </div>
          <Popover content={'发布时间'}>
            <div className={styles.order}>
              <span className={styles.orderLabel}>发布时间:</span>
              <div className={styles.orderNum}>
                {moment(confirmTime || new Date()).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </div>
            </div>
          </Popover>

          <div className={styles.order}>
            <span className={styles.orderLabel}>剩余时间:</span>
            <span className={styles.orderNum}>2天</span>
          </div>

          <div className={styles.order}>
            <span className={styles.status1}>新需求</span>
          </div>
        </div>

        <Popover content={STICK_TIPS.get(stickType)}>
          <div
            className={classNames(
              styles.right,
              stickType ? styles.topRight : ''
            )}
            onClick={changeStickStatus}
          >
            {stickType ? (
              <Icon type={'jack-zhiding_1'} className={styles.topping}></Icon>
            ) : (
              <Icon type={'jack-zhiding_2'} className={styles.topping}></Icon>
            )}
            置顶
          </div>
        </Popover>
      </div>

      <div className={styles.card}>
        <div className={styles.orderInfo}>
          <img src={''} alt="" className={styles.orderImg} />
          <div className={styles.info}>
            <div className={styles.orderName}>{title}</div>
            {configs.map(item => (
              <div key={item.field} className={styles.infoItem}>
                <span className={styles.infoLabel}>{item.label}</span>
                <span className={styles.infoValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.produceInfo}>
          {configs2.map(item => (
            <div key={item.field} className={styles.produceInfoItem}>
              <span className={styles.produceInfoLabel}>{item.label}</span>
              <span className={styles.produceInfoValue}>2222</span>
            </div>
          ))}
        </div>
        <div className={styles.from}>指向接收</div>
        <div className={styles.btnBox}>
          <Button>修改回复</Button>
        </div>
      </div>
    </div>
  )
}

export default observer(ListCard)
