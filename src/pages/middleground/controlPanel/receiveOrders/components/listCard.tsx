import React from 'react'
import { Icon } from '@/components'
import { Popover, Button } from 'antd'
import styles from './listCard.module.less'
import { observer, useStores } from '@/utils/mobx'
import classNames from 'classnames'
import moment from 'moment'
import { dateDiff, findTreeTarget } from '@/utils/tool'
import { isEmpty } from 'lodash'
import { useHistory } from 'react-router'

const STICK_TIPS = new Map()
STICK_TIPS.set(1, '取消置顶')
STICK_TIPS.set(0, '置顶')

const SOURCE_TEXT = new Map()
SOURCE_TEXT.set(0, '主动申请')
SOURCE_TEXT.set(1, '指向接受')

const STATUS_CLASSES = new Map()
STATUS_CLASSES.set(1, styles.status1) // 新需求
STATUS_CLASSES.set(-1, styles.status2) // 已取消、被谢绝
STATUS_CLASSES.set(-2, styles.status2) // 已取消、被谢绝
STATUS_CLASSES.set(2, styles.status3) // 待反馈
STATUS_CLASSES.set(3, styles.status4) // 已发单

const STATUS_TEXT = new Map()
STATUS_TEXT.set(1, '新需求')
STATUS_TEXT.set(2, '待反馈 ')
STATUS_TEXT.set(3, '已确认')
STATUS_TEXT.set(-1, '已取消')
STATUS_TEXT.set(-2, '已谢绝')

const ListCard = props => {
  const history = useHistory()
  const { commonStore, factoryStore, searchOrderStore } = useStores()
  const { dictionary } = commonStore
  const { inquiryProcessType, goodsNum } = dictionary
  const { productCategoryList } = factoryStore
  const { changeOrderStick, factoryDelOrder } = searchOrderStore

  const { data, getData } = props
  console.log('🚀 ~ file: listCard.tsx ~ line 43 ~ data', data)
  const { stickType = 0 } = data
  const diffDay = dateDiff(data.inquiryEffectiveDate)

  const configs = [
    {
      label: '加工类型:',
      field: 'processTypeValues',
      value: '经销单，来图/来样加工'
    },
    {
      label: '商品品类:',
      field: 'factoryCategoryIds',
      value: '针织服装（薄料）'
    },
    {
      label: '订单量:',
      field: 'goodsNum',
      value: '100件'
    }
  ]

  const configs2 = [
    {
      label: '报价信息:',
      field: 'quoteInfo'
    },
    {
      label: '付款方式:',
      field: 'payDetails'
    },
    {
      label: '可接订单数:',
      field: 'receiveGoodsNum'
    },
    {
      label: '备注:',
      field: 'remark'
    }
  ]

  const changeStickStatus = async () => {
    // 1 置顶  0 取消置顶
    const code = await changeOrderStick({
      stickType: 1 - stickType,
      id: data.supplierInquiryId
    })
    if (+code === 200) {
      getData && (await getData())
    }
  }

  const getTarget = (field, value) => {
    if (field === 'processTypeValues') {
      return value.reduce((prev, item, idx) => {
        const target = inquiryProcessType.find(i => i.value === item)?.label
        return prev + target + (idx === value.length - 1 ? '' : '、')
      }, '')
    }
    if (field === 'goodsNum') {
      return goodsNum.find(item => item.value === value)?.label
    }
    if (field === 'factoryCategoryIds') {
      return value.reduce((prev, item, idx) => {
        const target = findTreeTarget([item], productCategoryList) || {}

        return (
          prev +
          (!isEmpty(target) ? target.name : '') +
          (idx === value.length - 1 || !target.name ? '' : '、')
        )
      }, '')
    }
  }

  const getEdit = () => {
    if (data.status === 1) {
      return (
        <Button type={'primary'} onClick={reply}>
          立即回复
        </Button>
      )
    }
    if (data.status === 2) {
      return (
        <>
          <Button type={'primary'} onClick={reply}>
            修改回复
          </Button>
          <Button type={'text'} onClick={del} className={styles.delBtn}>
            删除记录
          </Button>
        </>
      )
    }

    return (
      <Button type={'primary'} onClick={del}>
        删除记录
      </Button>
    )
  }

  const reply = () => {
    history.push({
      pathname: '/control-panel/orderDetails',
      state: {
        id: data.purchaserInquiryId,
        supplierInquiryId: data.supplierInquiryId
      }
    })
  }

  const del = async () => {
    await factoryDelOrder({
      supplierInquiryId: data.supplierInquiryId
    })

    getData && getData()
  }

  return (
    <div className={styles.cardContainer}>
      <div
        className={classNames(styles.header, stickType ? styles.topHeader : '')}
      >
        <div className={styles.left}>
          <div className={styles.order}>
            <span className={styles.orderLabel}>发单商:</span>
            <Popover content={data.enterpriseName}>
              <span className={styles.orderNum}>{data.enterpriseName}</span>
            </Popover>
          </div>
          <Popover content={'发布时间'}>
            <div className={styles.order}>
              <span className={styles.orderLabel}>发布时间:</span>
              <div className={styles.orderNum}>
                {moment(data.releaseTime || new Date()).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </div>
            </div>
          </Popover>

          <div className={styles.order}>
            <span className={styles.orderLabel}>
              {diffDay.day > 0 ? '剩余时间:' : '已超出'}
            </span>
            <span className={styles.orderDate}>{Math.abs(diffDay.day)}天</span>
          </div>

          <div className={styles.order}>
            <span className={STATUS_CLASSES.get(data.status)}>
              {STATUS_TEXT.get(data.status)}
            </span>
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
          <img src={data.stylePicture} alt="" className={styles.orderImg} />
          <div className={styles.info}>
            <div className={styles.orderName}>{data.inquiryPurchaserName}</div>
            {configs.map(item => (
              <div key={item.field} className={styles.infoItem}>
                <span className={styles.infoLabel}>{item.label}</span>
                <span className={styles.infoValue}>
                  {getTarget(item.field, data[item.field])}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.produceInfo}>
          {configs2.map(item => (
            <div key={item.field} className={styles.produceInfoItem}>
              <span className={styles.produceInfoLabel}>{item.label}</span>
              <span className={styles.produceInfoValue}>
                {data[item.field]}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.from}>{SOURCE_TEXT.get(data.source)}</div>
        <div className={styles.btnBox}>{getEdit()}</div>
      </div>
    </div>
  )
}

export default observer(ListCard)
