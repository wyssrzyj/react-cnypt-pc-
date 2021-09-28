import React, { useState, useMemo, useEffect } from 'react'
import { Icon } from '@/components'
import {
  Popover,
  Button,
  Modal,
  Checkbox,
  Radio,
  TreeSelect,
  message
} from 'antd'
import styles from './listCard.module.less'
import classNames from 'classnames'
import moment from 'moment'
import { dateDiff } from '@/utils/tool'
import { useHistory } from 'react-router'
import { toJS, useStores, observer } from '@/utils/mobx'
import { Title } from '../controlPanel/accountSafe'
import { cloneDeep, isNil } from 'lodash'

const { SHOW_PARENT } = TreeSelect

const RECEIVE_STATUS = new Map()
RECEIVE_STATUS.set(1, '待确认')
RECEIVE_STATUS.set(2, '待绑定')
RECEIVE_STATUS.set(3, '进行中')
RECEIVE_STATUS.set(4, '待验收')
RECEIVE_STATUS.set(-2, '失效订单') // 加工厂下的 取消订单
RECEIVE_STATUS.set(5, '已完成')
RECEIVE_STATUS.set(-3, '已退回')

const PUT_STATUS = new Map()
PUT_STATUS.set(1, '待确认')
PUT_STATUS.set(2, '进行中')
PUT_STATUS.set(3, '进行中')
PUT_STATUS.set(4, '待验收')
PUT_STATUS.set(-3, '退回订单')
PUT_STATUS.set(-2, '取消订单')
PUT_STATUS.set(5, '已完成')
PUT_STATUS.set(-1, '')
// PUT_STATUS.set(-1, '草稿箱')

// 草稿箱 -1 已完成 5
const COLOR_CLASS_MAP = new Map()
COLOR_CLASS_MAP.set(1, styles.red)
COLOR_CLASS_MAP.set(2, styles.orange)
COLOR_CLASS_MAP.set(3, styles.blue)
COLOR_CLASS_MAP.set(4, styles.green)
COLOR_CLASS_MAP.set(-2, styles.gray)
COLOR_CLASS_MAP.set(-3, styles.red)
COLOR_CLASS_MAP.set(5, styles.green)

const COLOR_CLASS_MAP2 = new Map()
COLOR_CLASS_MAP2.set(1, styles.red)
COLOR_CLASS_MAP2.set(2, styles.blue)
COLOR_CLASS_MAP2.set(3, styles.blue)
COLOR_CLASS_MAP2.set(4, styles.green)
COLOR_CLASS_MAP2.set(-2, styles.gray)
COLOR_CLASS_MAP2.set(-3, styles.red)
COLOR_CLASS_MAP2.set(5, styles.green)

const STICK_TIPS = new Map()
STICK_TIPS.set(1, '取消置顶')
STICK_TIPS.set(0, '置顶')
interface Props {
  data?: any
  callback?: (event: any) => void
  showCheck?: boolean
  curKey?: string
  getData?: () => void
  searchBar: any
  type: 'put' | 'receive'
}

interface BindInfo {
  productionIdList: any[]
  type: number | string
}

/**
 *
 * @data
 * @code 订单号
 * @confirmTime 确认时间
 * @supplierName 加工厂名称
 * @name 订单名称
 * @processType 加工类型
 * @goodsCategoryId 商品品类ID
 * @totalAmount 商品总数
 * @totalPrice 商品总价
 * @expectDeliveryTime 期望收货时间
 * @status 订单状态
 * @updateTime 最后编辑时间
 */
const ListCard = ({
  data,
  callback,
  showCheck,
  curKey,
  getData,
  searchBar,
  type
}: Props) => {
  const history = useHistory()
  const { orderStore, commonStore, factoryStore } = useStores()
  const {
    setFromProduct,
    cancelOrder,
    backToDraft,
    delOrders,
    getFailReason,
    factoryFinishProduct,
    acceptanceOrder,
    reproduce,
    changeOrderStick,
    initOrderAndProduct,
    enterpriseDepartment,
    bindProcduce,
    getBindInfo
  } = orderStore
  const { dictionary } = commonStore
  const { productCategoryList } = factoryStore
  const { orderProcessType = [] } = toJS(dictionary)

  const {
    checked,
    confirmTime,
    supplierName,
    name,
    processType,
    goodsCategoryId,
    totalAmount,
    totalPrice,
    expectDeliveryTime = new Date('2021-9-15'),
    status,
    id,
    updateTime,
    pictureUrl = null,
    stickType = 0,
    purchaserName,
    code,
    supplierTenantId
  } = data

  const [visible, setVisible] = useState(false)
  const [bindVisible, setBindVisible] = useState(false)
  const [modalType, setModalType] = useState()
  const [bindType, setBindType] = useState('add') // add 绑定 edit 编辑绑定
  const [bindInfo, setBindInfo] = useState<Partial<BindInfo>>({
    productionIdList: [],
    type: null
  }) // add 绑定 edit 编辑绑定
  const [lastBindInfo, setLastBindInfo] = useState<Partial<BindInfo>>({
    productionIdList: [],
    type: null
  }) // add 绑定 edit 编辑绑定
  // 订单退回 原因
  const [failReasonText, setFailReasonText] = useState('')
  // 订单退回 附件
  const [failReasonAnnex, setFailReasonAnnex] = useState([])

  useEffect(() => {
    return () => {
      setFromProduct(false)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (bindType === 'edit' && bindVisible) {
        const bindInfo: Partial<BindInfo> = (await getBindInfo(id)) || {
          productionIdList: [],
          type: null
        }
        setBindInfo(bindInfo)
        setLastBindInfo(bindInfo)
      }
    })()
  }, [bindType, bindVisible])

  const bindValuesChange = (event, field) => {
    const value = field === 'type' ? event.target.value : event
    const newBindInfo = cloneDeep(bindInfo)
    newBindInfo[field] = value
    if (field === 'type') {
      newBindInfo['productionIdList'] =
        +event.target.value === +lastBindInfo.type
          ? cloneDeep(lastBindInfo['productionIdList'])
          : []
    }
    setBindInfo(newBindInfo)
  }

  // chooseProduceType
  const chooseProduceType = async () => {
    if (isNil(bindInfo.type)) {
      message.warning('请选择绑定类型~')
    }

    if (+bindInfo.type === 1) {
      toProduce()
    }
    if (!isNil(bindInfo.type) && +bindInfo.type === 0) {
      if (!bindInfo.productionIdList || !bindInfo.productionIdList.length) {
        message.warning('请选择生产部门~')
        return
      }
      const res = await bindProcduce({
        productionIdList: bindInfo.productionIdList,
        platformOrderId: id,
        status: 3,
        type: bindInfo.type
      })

      res && showBindModal()
      getData && (await getData())
    }
  }

  const diffDay = useMemo(() => {
    return dateDiff(expectDeliveryTime)
  }, [expectDeliveryTime])

  const modalSubmit = async () => {
    modalType === 'cancel' && (await putCancelOrder())
    modalType === 'draft' && (await backDraft())
    modalType === 'del' && (await doDelOrders())
    modalType === 'complete' && (await finishOrder())
    modalType === 'check' && (await checkOrder())
    modalType === 'returnProduct' && (await reproduceOrder())
    getData && (await getData())
    showModal(null)
  }
  // 状态跟踪
  const statusTrack = () => {
    history.push(`/control-panel/state/${id}`)
  }
  // 绑定生产单
  const toProduce = () => {
    history.push(`/control-panel/bind-produce/${id}`)
  }
  // 返回生产
  const reproduceOrder = async () => {
    await reproduce(id)
  }
  const checkOrder = async () => {
    await acceptanceOrder(id)
  }
  // 完成生产
  const finishOrder = async () => {
    await factoryFinishProduct(id)
  }
  // 删除订单
  const doDelOrders = async () => {
    await delOrders([id])
  }
  // 取消订单
  const putCancelOrder = async () => {
    await cancelOrder(id)
  }
  // 退回草稿
  const backDraft = async () => {
    await backToDraft(id)
  }
  // 在线跟单
  const toViewPage = () => {
    history.push(
      `/control-panel/video-center/${id}/${supplierTenantId}/${type}`
    )
  }
  // 确认订单
  const confirmOrder = () => {
    history.push(`/control-panel/order/confirm?id=${id}`)
  }
  // 编辑订单
  const editOrder = async () => {
    initOrderAndProduct()
    history.push(`/control-panel/order/edit?id=${id}`)
  }

  // 再次下单
  const restartOrder = async () => {
    initOrderAndProduct()
    history.push(`/control-panel/order/add?id=${id}`)
  }
  // 绑定生产单弹窗
  const showBindModal = (type?) => {
    bindVisible &&
      setBindInfo({
        productionIdList: [],
        type: null
      })
    setBindVisible(f => !f)
    type && setBindType(type)
  }
  // 查看订单
  const viewOrder = () => {
    history.push(`/control-panel/order/detail?id=${id}`)
  }

  const showModal = async type => {
    setVisible(f => !f)
    setModalType(type)
    if (type === 'reason') {
      const failReason = await getFailReason(id)
      if (failReason) {
        setFailReasonText(failReason.passFailReason)
        setFailReasonAnnex(failReason.urlList)
      }
    }
  }

  const prodTypeText = useMemo(() => {
    const target =
      orderProcessType.find(item => item.value === processType) || {}
    return target.label || ''
  }, [orderProcessType, processType])

  const matchTreeData = (data, value) => {
    let target
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      if (item.id === value) {
        target = item
        return target
      }
      if (Array.isArray(item.children)) {
        target = matchTreeData(item.children, value)
        if (target) {
          return target
        }
      }
    }
  }

  const goodsCategory = useMemo(() => {
    const target = matchTreeData(productCategoryList, goodsCategoryId) || {}
    return target.name || ''
  }, [])

  const changeStickStatus = async () => {
    // 1 置顶  0 取消置顶
    const code = await changeOrderStick({
      stickType: 1 - stickType,
      id
    })
    if (+code === 200) {
      getData && (await getData())
    }
  }

  const showMoreAbout = async target => {
    let option: { label: string; value: string } = { label: '', value: '' }
    if (type === 'put') {
      option = {
        label: target.supplierName,
        value: target.supplierTenantId
      }
      await searchBar.valuesChange(option.value, 'supplierTenantId')
    }
    if (type === 'receive') {
      option = {
        label: target.purchaserName,
        value: target.purchaserTenantId
      }
      await searchBar.valuesChange(option.value, 'purchaserTenantId')
    }
    await searchBar.changeOptions(option)
    await searchBar.onSubmit()
  }

  const getEditBtns = (status, type?) => {
    switch (+status) {
      case -1:
        return (
          <>
            <Button type={'primary'} className={styles.btn} onClick={editOrder}>
              编辑订单
            </Button>
            <Button
              type={'primary'}
              ghost
              className={styles.btn2}
              onClick={() => showModal('del')}
            >
              删除订单
            </Button>
          </>
        )
      case 1:
        if (type === 'receive') {
          return (
            <Button
              type={'primary'}
              className={styles.btn2}
              onClick={confirmOrder}
            >
              确认订单
            </Button>
          )
        }
        if (type === 'put') {
          return (
            <Button
              type={'primary'}
              ghost
              className={styles.btn2}
              onClick={() => showModal('cancel')}
            >
              取消订单
            </Button>
          )
        }
      case 2:
        if (type === 'receive') {
          return (
            <>
              <Button
                type={'primary'}
                className={styles.btn}
                onClick={() => showBindModal('add')}
              >
                绑定生产单
              </Button>
              <Button
                type={'primary'}
                ghost
                className={styles.btn2}
                onClick={() => showModal('complete')}
              >
                完成生产
              </Button>
            </>
          )
        }
        if (type === 'put') {
          return (
            <>
              <Button
                type={'primary'}
                className={styles.btn}
                onClick={statusTrack}
              >
                状态跟踪
              </Button>
              <Button
                onClick={toViewPage}
                type={'primary'}
                ghost
                className={styles.btn2}
              >
                在线跟单
              </Button>
            </>
          )
        }

      case 3:
        if (type === 'receive') {
          return (
            <>
              <Button
                type={'primary'}
                className={styles.btn}
                onClick={() => showBindModal('edit')}
              >
                编辑绑定
              </Button>
              <Button
                type={'text'}
                className={styles.textBtn}
                onClick={() => showModal('complete')}
              >
                完成生产
              </Button>
              <Button
                onClick={toViewPage}
                type={'text'}
                className={styles.textBtn}
              >
                现场查看
              </Button>
            </>
          )
        }
        if (type === 'put') {
          return (
            <>
              <Button
                type={'primary'}
                className={styles.btn}
                onClick={statusTrack}
              >
                状态跟踪
              </Button>
              <Button
                onClick={toViewPage}
                type={'primary'}
                ghost
                className={styles.btn2}
              >
                在线跟单
              </Button>
            </>
          )
        }

      case 4:
        if (type === 'receive') {
          return (
            <Button
              type={'primary'}
              className={styles.btn2}
              onClick={() => showModal('returnProduct')}
            >
              返回生产
            </Button>
          )
        }
        if (type === 'put') {
          return (
            <>
              <Button
                type={'primary'}
                className={styles.btn}
                onClick={() => showModal('check')}
              >
                确认验收
              </Button>
              <Button
                type={'primary'}
                ghost
                className={styles.btn2}
                onClick={statusTrack}
              >
                状态跟踪
              </Button>
            </>
          )
        }

      case 5:
        if (type === 'put') {
          return (
            <>
              <Button
                type={'primary'}
                className={styles.btn}
                onClick={restartOrder}
              >
                再次下单
              </Button>
              <div className={styles.textBtn} onClick={statusTrack}>
                状态跟踪
              </div>
              <div className={styles.textBtn} onClick={() => showModal('del')}>
                删除订单
              </div>
            </>
          )
        }
        if (type === 'receive') {
          return (
            <>
              <Button
                type={'primary'}
                ghost
                className={styles.btn2}
                onClick={() => showModal('del')}
              >
                删除订单
              </Button>
            </>
          )
        }
      case -2:
        if (type === 'put') {
          return (
            <>
              <Button
                type={'primary'}
                className={styles.btn}
                onClick={editOrder}
              >
                重新编辑
              </Button>
              <Button
                type={'primary'}
                ghost
                className={styles.btn2}
                onClick={() => showModal('draft')}
              >
                退回草稿箱
              </Button>
            </>
          )
        }
        if (type === 'receive') {
          return (
            <>
              <Button
                type={'primary'}
                ghost
                className={styles.btn2}
                onClick={() => showModal('del')}
              >
                删除订单
              </Button>
            </>
          )
        }

      case -3:
        if (type === 'receive') {
          return (
            <Button
              type={'primary'}
              ghost
              className={styles.btn2}
              onClick={() => showModal('del')}
            >
              删除订单
            </Button>
          )
        }
        if (type === 'put') {
          return (
            <>
              <Button
                type={'primary'}
                className={styles.btn}
                onClick={editOrder}
              >
                重新编辑
              </Button>
              <Button
                type={'primary'}
                ghost
                className={styles.btn2}
                onClick={() => showModal('draft')}
              >
                退回草稿箱
              </Button>
            </>
          )
        }
    }
  }

  const getPutstatus = status => {
    switch (+status) {
      case 2:
      case 3:
        return (
          <div className={styles.statusTextBox}>
            <div className={styles.exceptTimeText}>期望收货时间</div>
            <div className={styles.exceptTime}>
              {expectDeliveryTime
                ? moment(expectDeliveryTime).format('YYYY-MM-DD')
                : null}
            </div>
            <div className={styles.actualText}>
              {diffDay.day > 0 ? '剩余' : '超出'}
              <span className={styles.ractualTime}>
                &nbsp;{Math.abs(diffDay.day)}&nbsp;
              </span>
              天
            </div>
          </div>
        )
      // case 4:
      //   return (
      //     <div className={styles.statusTextBox}>
      //       已签收
      //       2021-08-30 12:05
      //     </div>
      //   )
      case -3:
        return (
          <div className={styles.statusTextBox}>
            <div
              className={styles.returnReason}
              onClick={() => showModal('reason')}
            >
              查看原因
            </div>
          </div>
        )
      case -1:
        return (
          <div className={styles.statusTextBox}>
            {/* <div className={styles.statusTimeLabel}>新增时间</div>
            <div className={styles.statusTime}>2021-08-30 09:20:35</div> */}
            <div className={styles.statusTimeLabel}>最后编辑时间</div>
            <div className={styles.statusTime}>
              {updateTime
                ? moment(updateTime).format('YYYY-MM-DD HH:mm:ss')
                : null}
            </div>
          </div>
        )
      case 5:
        return <div>{moment(updateTime).format('YYYY-MM-DD HH:mm:ss')}</div>
    }
  }

  const getModalContent = type => {
    return (
      <div className={styles.delContent}>
        {type === 'returnProduct' ? (
          <>
            <Icon type={'jack-fhsc'} className={styles.delIcon}></Icon>
            <div className={styles.delTitle}>返回生产</div>
            <div className={styles.delText}>确定修改订单状态为返回生产？</div>
          </>
        ) : null}
        {type === 'del' ? (
          <>
            <Icon type={'jack-sptg1'} className={styles.delIcon}></Icon>
            <div className={styles.delTitle}>删除订单</div>
            <div className={styles.delText}>确认将当前订单删除？</div>
          </>
        ) : null}
        {type === 'complete' ? (
          <>
            <Icon type={'jack-wc'} className={styles.delIcon}></Icon>
            <div className={styles.delTitle}>完成生产</div>
            <div className={styles.delText}>请确定当前订单已全部完成生产？</div>
          </>
        ) : null}
        {type === 'check' ? (
          <>
            <Icon type={'jack-qrys1'} className={styles.delIcon}></Icon>
            <div className={styles.delTitle}>确认验收</div>
            <div className={styles.delText}>
              确定验收当前订单数据，结束订单流程？
            </div>
          </>
        ) : null}
        {type === 'cancel' ? (
          <>
            <Icon type={'jack-ts'} className={styles.delIcon}></Icon>
            <div className={styles.delTitle}>取消订单</div>
            <div className={styles.delText}>确定取消当前订单？</div>
          </>
        ) : null}
        {type === 'draft' ? (
          <>
            <Icon type={'jack-thcgx'} className={styles.delIcon}></Icon>
            <div className={styles.delTitle}>退回草稿箱</div>
            <div className={styles.delText}>确认将当前订单退回至草稿箱？</div>
          </>
        ) : null}
        {type === 'reason' ? (
          <>
            <Icon type={'jack-thyy'} className={styles.delIcon}></Icon>
            <div className={styles.delTitle}>退回原因</div>
            <div className={styles.delText}>
              附件：
              {Array.isArray(failReasonAnnex) &&
                failReasonAnnex.map((item, idx) => {
                  return (
                    <a href={item} className={styles.reasonFile} key={idx}>
                      <Icon
                        type={'jack-fujian'}
                        className={styles.reasonIcon}
                      ></Icon>
                      {item.split('__')[1]}
                    </a>
                  )
                })}
            </div>
            <div className={styles.delText}>退回原因：{failReasonText}</div>
          </>
        ) : null}
        <div className={styles.delModalBtnBox}>
          <Button
            onClick={() => {
              showModal(null)
            }}
            type={'primary'}
            ghost
            className={styles.cancelBtn}
          >
            取消
          </Button>
          <Button
            type={'primary'}
            className={styles.submitBtn}
            onClick={modalSubmit}
          >
            确定
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      {/* 订单通用弹窗 */}
      <Modal
        visible={visible}
        footer={false}
        centered
        onCancel={() => showModal(null)}
        maskClosable={false}
      >
        {getModalContent(modalType)}
      </Modal>
      {/* 订单绑定生产单前的确认弹窗 */}
      <Modal
        visible={bindVisible}
        footer={false}
        centered
        onCancel={showBindModal}
        maskClosable={false}
      >
        <Title title={'绑定生产'}></Title>
        <Radio.Group
          onChange={event => bindValuesChange(event, 'type')}
          value={bindInfo.type}
        >
          <div className={styles.bindText}>
            <Radio value={1}>绑定软件</Radio>
          </div>
          <div className={styles.bindText}>
            <Radio value={0}>绑定生产部门(没有使用信息化软件)</Radio>
          </div>
        </Radio.Group>
        {!isNil(bindInfo.type) && +bindInfo.type !== 1 ? (
          <div className={styles.departmentTree}>
            <TreeSelect
              onChange={event => bindValuesChange(event, 'productionIdList')}
              value={bindInfo.productionIdList}
              style={{ width: '100%', minWidth: 100 }}
              allowClear
              treeData={enterpriseDepartment}
              treeCheckable={true}
              showCheckedStrategy={SHOW_PARENT}
              placeholder={'请选择部门'}
            />
          </div>
        ) : null}

        <div className={styles.bindBtns}>
          <Button
            type={'primary'}
            ghost
            className={styles.bindBtn}
            onClick={showBindModal}
          >
            取消
          </Button>
          <Button
            type={'primary'}
            className={styles.bindBtn}
            onClick={chooseProduceType}
          >
            确认
          </Button>
        </div>
      </Modal>

      <div
        className={classNames(styles.header, stickType ? styles.topHeader : '')}
      >
        <div className={styles.left}>
          <div className={styles.order}>
            <span className={styles.orderLabel}>订单号：</span>
            <span className={styles.orderNum}>{code}</span>
          </div>
          <Popover content={'订单确认时间'}>
            <div className={styles.cardTime}>
              {confirmTime
                ? moment(confirmTime).format('YYYY-MM-DD HH:mm:ss')
                : null}
            </div>
          </Popover>

          <div className={styles.showBox}>
            <Popover content={type === 'put' ? supplierName : purchaserName}>
              <div className={styles.companyName}>
                {type === 'put' ? supplierName : purchaserName}
              </div>
            </Popover>

            <div className={styles.line}></div>
            <div
              className={styles.showOrder}
              onClick={() => showMoreAbout(data)}
            >
              查看他的所有订单
            </div>
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

      <div className={styles.content}>
        <div className={styles.orderInfo}>
          {showCheck ? (
            <Checkbox
              onChange={callback}
              className={styles.orderSelect}
              checked={checked}
            ></Checkbox>
          ) : null}
          {/* ?x-oss-process=image/crop,limit_0,m_fill,w100,h_100/quality,q_100 */}
          <div className={styles.orderInfoContent} onClick={viewOrder}>
            <img src={`${pictureUrl}`} alt="" className={styles.orderImg} />
            <div className={styles.orderInfoRight}>
              <div className={styles.orderTitle}>{name}</div>
              <div className={styles.orderText}>加工类型：{prodTypeText}</div>
              <div className={styles.orderText}>商品品类：{goodsCategory}</div>
            </div>
          </div>
        </div>

        <div className={styles.orderCount}>{totalAmount}件</div>
        <div className={styles.orderAmount}>{totalPrice}</div>
        <div className={styles.status}>
          {type === 'receive' ? (
            <div className={styles.statusTextBox}>
              {/* 已完成状态  tab在完成页 */}
              {+status === 5 && curKey === 'complete' ? (
                <div>2021-08-30 09:20:35</div>
              ) : null}
              {/* 退回状态  tab在退回页 */}
              {+status === -3 && curKey === 'return' ? (
                <div>
                  <div>2021-08-30 09:20:35</div>
                  <div
                    className={styles.seeReason}
                    onClick={() => showModal('reason')}
                  >
                    查看原因
                  </div>
                </div>
              ) : null}
              {/* 非退回 已完成tab页 */}
              {!['complete', 'return'].includes(curKey) ? (
                <>
                  <div className={COLOR_CLASS_MAP.get(+status)}>
                    {RECEIVE_STATUS.get(+status)}
                  </div>
                  {![-2, -3, 5].includes(+status) ? (
                    <div onClick={statusTrack} className={styles.statusTrack}>
                      状态跟踪 &gt;
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          ) : (
            <div className={styles.statusTextBox}>
              <div className={COLOR_CLASS_MAP2.get(+status)}>
                {PUT_STATUS.get(+status)}
              </div>
              {getPutstatus(+status)}
            </div>
          )}
        </div>
        <div className={styles.btnBox}>{getEditBtns(+status, type)}</div>
      </div>
    </div>
  )
}

export default observer(ListCard)
