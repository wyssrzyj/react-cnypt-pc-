import React, { useState } from 'react'
import { Icon } from '@/components'
import { Popover, Button, Modal, Checkbox } from 'antd'
import styles from './listCard.module.less'
import classNames from 'classnames'

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
PUT_STATUS.set(2, '待绑定')
PUT_STATUS.set(3, '进行中')
PUT_STATUS.set(4, '待验收')
PUT_STATUS.set(-3, '退回订单')
PUT_STATUS.set(-2, '取消订单')
PUT_STATUS.set(5, '已完成')

// 草稿箱 -1 已完成 5

const COLOR_CLASS_MAP = new Map()
COLOR_CLASS_MAP.set(1, styles.red)
COLOR_CLASS_MAP.set(2, styles.orange)
COLOR_CLASS_MAP.set(3, styles.blue)
COLOR_CLASS_MAP.set(4, styles.green)
COLOR_CLASS_MAP.set(-2, styles.gray)
COLOR_CLASS_MAP.set(-3, styles.red)
COLOR_CLASS_MAP.set(-2, styles.black)
COLOR_CLASS_MAP.set(5, styles.green)

interface Props {
  data?: any
  callback?: (event: any) => void
  showCheck?: boolean
  curKey?: string
}

const ListCard = ({ data, callback, showCheck, curKey }: Props) => {
  const { type = 'receive', orderStatus = 'orderStatus', checked } = data
  const topFlag = true

  const [visible, setVisible] = useState(false)
  const [modalType, setModalType] = useState()

  const getEditBtns = (status, type?) => {
    switch (status) {
      case -1:
        return (
          <>
            <Button type={'primary'} className={styles.btn}>
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
            <Button type={'primary'} className={styles.btn2}>
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
              <Button type={'primary'} className={styles.btn}>
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
            <Button type={'primary'} className={styles.btn}>
              绑定生产单
            </Button>
          )
        }

      case 3:
        if (type === 'receive') {
          return (
            <>
              <Button
                type={'primary'}
                className={styles.btn}
                onClick={() => showModal('complete')}
              >
                完成生产
              </Button>
              <Button type={'primary'} ghost className={styles.btn2}>
                现场查看
              </Button>
            </>
          )
        }
        if (type === 'put') {
          return (
            <>
              <Button type={'primary'} className={styles.btn}>
                状态跟踪
              </Button>
              <Button type={'primary'} ghost className={styles.btn2}>
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
              <Button type={'primary'} ghost className={styles.btn2}>
                状态跟踪
              </Button>
            </>
          )
        }

      case 5:
        if (type === 'put') {
          return (
            <>
              <Button type={'primary'} className={styles.btn}>
                再次下单
              </Button>
              <div className={styles.textBtn}>状态跟踪</div>
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
              <Button type={'primary'} className={styles.btn}>
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
              <Button type={'primary'} className={styles.btn}>
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

  const getPutOrderStatus = status => {
    switch (status) {
      case 3:
        return (
          <div className={styles.statusTextBox}>
            <div className={styles.exceptTimeText}>期望收货时间</div>
            <div className={styles.exceptTime}>2021-09-05</div>
            <div className={styles.actualText}>
              剩余<span className={styles.ractualTime}>&nbsp;5&nbsp;</span>天
            </div>
          </div>
        )
      case 4:
        return (
          <div className={styles.statusTextBox}>已签收 2021-08-30 12:05</div>
        )
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
            <div className={styles.statusTimeLabel}>新增时间</div>
            <div className={styles.statusTime}>2021-08-30 09:20:35</div>
            <div className={styles.statusTimeLabel}>最后编辑时间</div>
            <div className={styles.statusTime}>2021-08-30 09:20:35</div>
          </div>
        )
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
              <span className={styles.reasonFile}>
                <Icon type={'jack-fujian'} className={styles.reasonIcon}></Icon>
                xxxx.doc
              </span>
            </div>
            <div className={styles.delText}>退回原因：价格不合适</div>
          </>
        ) : null}
        <div className={styles.delModalBtnBox}>
          <Button
            onClick={() => showModal(null)}
            type={'primary'}
            ghost
            className={styles.cancelBtn}
          >
            取消
          </Button>
          <Button type={'primary'} className={styles.submitBtn}>
            确定
          </Button>
        </div>
      </div>
    )
  }

  const showModal = type => {
    setVisible(f => !f)
    setModalType(type)
  }

  return (
    <div className={styles.card}>
      <Modal
        visible={visible}
        footer={false}
        centered
        onCancel={() => showModal(null)}
        maskClosable={false}
      >
        {getModalContent(modalType)}
      </Modal>
      <div
        className={classNames(styles.header, topFlag ? styles.topHeader : '')}
      >
        <div className={styles.left}>
          <div className={styles.order}>
            <span className={styles.orderLabel}>订单号：</span>
            <span className={styles.orderNum}>1795037941400163361</span>
          </div>

          <div className={styles.cardTime}>2021-05-14 16:24:52</div>

          <div className={styles.showBox}>
            <Popover content={'助战科技有限责任公司'}>
              <div className={styles.companyName}>助战科技有限责任公司</div>
            </Popover>

            <div className={styles.line}></div>
            <div className={styles.showOrder}>查看他的所有订单</div>
          </div>
        </div>

        <div
          className={classNames(styles.right, topFlag ? styles.topRight : '')}
        >
          {topFlag ? (
            <Icon type={'jack-zhiding_1'} className={styles.topping}></Icon>
          ) : (
            <Icon type={'jack-zhiding_2'} className={styles.topping}></Icon>
          )}
          置顶
        </div>
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

          <img src={''} alt="" className={styles.orderImg} />
          <div className={styles.orderInfoRight}>
            <div className={styles.orderTitle}>女士梭织连衣裙</div>
            <div className={styles.orderText}>
              加工类型：经销单，来图/来样加工
            </div>
            <div className={styles.orderText}>订单类别：针织服装（薄料）</div>
          </div>
        </div>
        <div className={styles.orderCount}>100件</div>
        <div className={styles.orderAmount}>{Number(20000).toFixed(2)}</div>
        <div className={styles.orderStatus}>
          {type === 'receive' ? (
            <div>
              {/* 已完成状态  tab在完成页 */}
              {orderStatus === 5 && curKey === 'complete' ? (
                <div>2021-08-30 09:20:35</div>
              ) : null}
              {/* 退回状态  tab在退回页 */}
              {orderStatus === -3 && curKey === 'return' ? (
                <div>
                  <div>2021-08-30 09:20:35</div>
                  <div className={styles.seeReason}>查看原因</div>
                </div>
              ) : null}
              {/* 非退回 已完成tab页 */}
              {!['complete', 'return'].includes(curKey) ? (
                <>
                  <div className={COLOR_CLASS_MAP.get(orderStatus)}>
                    {RECEIVE_STATUS.get(orderStatus)}
                  </div>
                  {![-2, -3, 5].includes(orderStatus) ? (
                    <div>状态跟踪 &gt;</div>
                  ) : null}
                </>
              ) : null}
            </div>
          ) : (
            <div>
              {/* 已完成状态  tab在完成页 */}
              {orderStatus === 5 && curKey === 'complete' ? (
                <div>2021-08-30 09:20:35</div>
              ) : null}

              {/* 非退回 已完成tab页 */}
              {!['complete'].includes(curKey) ? (
                <>
                  <div className={COLOR_CLASS_MAP.get(orderStatus)}>
                    {PUT_STATUS.get(orderStatus)}
                  </div>
                  {getPutOrderStatus(orderStatus)}
                </>
              ) : null}
            </div>
          )}
        </div>
        <div className={styles.btnBox}>{getEditBtns(orderStatus, type)}</div>
      </div>
    </div>
  )
}

export default ListCard
