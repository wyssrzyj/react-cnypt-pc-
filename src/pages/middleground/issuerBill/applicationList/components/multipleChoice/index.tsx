import React, { useState } from 'react'
import { Row, Col, Button, Tooltip, Modal } from 'antd'
import styles from './index.module.less'
import { Icon } from '@/components' //路径
import { timestampToTime } from '../../time'
import { useStores, toJS } from '@/utils/mobx'
import { getTrees } from '../../method/index'

let Simg = 'http://dev.uchat.com.cn:8002/images/b140ef.png'

const MultipleChoice = ({
  data,
  toppingMethod,
  deleteMethod,
  earlyEnd,
  InitiateOrder,
  reOrder,
  demandSheetDetails
}) => {
  console.log(data)

  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { processType = [] } = toJS(dictionary)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [windowType, setWindowType] = useState<any>({}) //弹窗类型
  const sortColor = new Map()
  sortColor.set(2, styles.red)
  sortColor.set(3, styles.green)
  sortColor.set(1, styles.yellow)
  sortColor.set(-2, styles.grey)
  sortColor.set(-1, styles.blue)
  let map = new Map()
  map.set(1, '等待回复') //设置
  map.set(2, '待反馈') //设置
  map.set(3, '已确认') //设置
  map.set(-2, '已谢绝') //设置
  map.set(-1, '被拒绝') //设置

  const Topping = new Map()
  Topping.set(true, 'jack-zhiding_1')
  Topping.set(false, 'jack-zhiding_2')

  const examine = new Map()
  examine.set(false, 'jack-check-fail')
  examine.set(true, 'jack-check-success')
  // 置顶事件
  const changeSort = e => {
    let stickType = data.purchaserStickType > 0 ? 0 : 1

    toppingMethod({ id: e, purchaserstickType: stickType })
  }

  // 弹窗确认
  const handleOk = id => {
    if (windowType.type === 'mov') {
      deleteMethod(id)
    }

    if (windowType.type === 'CancelConfirmation') {
      reOrder(data.id)
    }
    if (windowType.type === 'confirmCooperation') {
      InitiateOrder(data.id)
      {
      }
    }
    // 谢绝
    if (windowType.type === 'decline') {
      earlyEnd(data.id)
    }
    // 取消申请
    if (windowType.type === 'withdraw') {
      earlyEnd(data.id)
    }

    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  // 删除
  const showModal = () => {
    setIsModalVisible(true)
    setWindowType({ type: 'mov' })
  }
  // 取消确认
  const CancelConfirmation = () => {
    setIsModalVisible(true)
    setWindowType({ type: 'CancelConfirmation' })
  }
  // 确认合作
  const confirmCooperation = () => {
    setIsModalVisible(true)
    setWindowType({ type: 'confirmCooperation' })
  }
  // 谢绝
  const decline = () => {
    setIsModalVisible(true)
    setWindowType({ type: 'decline' })
  }
  // 取消申请
  const withdraw = () => {
    setIsModalVisible(true)
    setWindowType({ type: 'withdraw' })
  }
  const onCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className={styles.bos}>
      {/* 头部 */}
      <div
        className={
          data.purchaserStickType === 1 ? styles.topping : styles.noTopping
        }
      >
        <Row justify="center">
          <Col span={6}>
            <span className={styles.name}>
              <span className={styles.sheetName}>订单名称: </span>
              <span>{data.name}</span>
            </span>
          </Col>
          <Col span={8}>
            <span>
              <span className={styles.sheetName}>发布时间:　</span>
              <span className={styles.sheet}>
                {timestampToTime(data.releaseTime)}
              </span>
            </span>
          </Col>
          <Col span={4}>
            <span
              onClick={() => {
                demandSheetDetails(data.purchaserInquiryId)
              }}
              className={styles.details}
            >
              查看订单详情
              <span className={styles.zuo}>
                <Icon type="jack-you_31" className={styles.prev} />
              </span>
            </span>
          </Col>
          <Col span={3} className={styles.lin}>
            <div className={sortColor.get(+data.status)}>
              <span className={styles.spot}>
                <span>•</span>
              </span>

              <span className={styles.states}>{map.get(data.status)}</span>
            </div>
          </Col>
          <Col span={1}>
            <span>
              <Icon
                onClick={() => changeSort(data.id)}
                type={
                  data.purchaserStickType ? 'jack-zhiding_1' : 'jack-zhiding_2'
                }
                className={styles.listHeaderSortIcon}
              ></Icon>
            </span>
          </Col>
        </Row>
      </div>
      {/* 主题 */}
      <div className={styles.theme}>
        <Row>
          <Col span={11} className={styles.names}>
            <div>
              <img
                className={styles.img}
                src={data.pictureUrl ? data.pictureUrl : Simg}
                alt=""
              />
            </div>

            <div className={styles.imgRight}>
              <div className={styles.namest}>
                <div className={styles.factoryName}>{data.enterpriseName}</div>
                <div className={styles.diqu_bai}>
                  <Icon type="jack-diqu_bai" className={styles.previous} />
                  {data.address ? data.address : '暂无'}
                </div>
              </div>
              <p>人数：{data.staffNumber}人</p>
              <p>联系方式: {data.contactsMobile}</p>
              <p>电子邮箱: {data.contactsEmail}</p>
              <div className={styles.hidden}>
                加工类型：
                {console.log(processType)}
                <Tooltip
                  placement="top"
                  title={
                    data.processTypeValues
                      ? getTrees(
                          data.processTypeValues,
                          processType,
                          'value',
                          'label'
                        ).join('、')
                      : '暂无'
                  }
                >
                  {data.processTypeValues
                    ? getTrees(
                        data.processTypeValues,
                        processType,
                        'value',
                        'label'
                      ).join('、')
                    : '暂无'}
                </Tooltip>
              </div>
              <div className={styles.hidden}>
                主营类别：
                <Tooltip
                  placement="top"
                  title={
                    data.factoryCategoryList
                      ? data.factoryCategoryList.join('、')
                      : '暂无'
                  }
                >
                  {data.factoryCategoryList
                    ? data.factoryCategoryList.join('、')
                    : '暂无'}
                </Tooltip>
              </div>
            </div>
          </Col>
          <Col span={9} className={styles.feedback}>
            <p className={styles.quotationInformation}>
              <span className={styles.information}>•</span> 报价信息:
              <span>{data.quoteInfo ? data.quoteInfo : '暂无'}</span>
            </p>
            <p>
              <span className={styles.information}>•</span> 付款方式:
              <span>{data.payDetails ? data.payDetails : '暂无'}</span>
            </p>
            <p>
              <span className={styles.information}>•</span>可接订单数：
              {data.receiveGoodsNum ? data.receiveGoodsNum : '暂无'}
            </p>
            <p>
              <span className={styles.information}>•</span>备注：
              {data.remark ? data.remark : '暂无'}
            </p>
            <div className={styles.tablefuls}>
              {data.NumberOfOrders ? (
                <div className={styles.table}>
                  <span className={styles.numberOfOrders}>
                    已发订单数：
                    <span className={styles.color}>{data.NumberOfOrders}</span>
                    单
                  </span>
                  <span className={styles.totalOrders}>
                    订单总数:
                    <span className={styles.color}>{data.TotalOrders}</span>件
                  </span>
                </div>
              ) : null}
            </div>
          </Col>

          <Col className={styles.stateBtnBox} span={4}>
            {data.status === 2 ? (
              <>
                <Button
                  onClick={decline}
                  className={styles.btn}
                  type={'primary'}
                >
                  谢绝
                </Button>
                <Button
                  onClick={confirmCooperation}
                  className={styles.btn2}
                  type={'primary'}
                  ghost
                >
                  确认合作
                </Button>
              </>
            ) : null}
            {data.status === 3 ? (
              <Button
                type={'primary'}
                onClick={CancelConfirmation}
                className={styles.btn}
              >
                取消确认
              </Button>
            ) : null}

            {[-1, -2].includes(+data.status) ? (
              <Button
                type={'primary'}
                ghost
                onClick={showModal}
                className={styles.btn}
              >
                删除记录
              </Button>
            ) : null}
            {[1].includes(+data.status) ? (
              <Button
                type={'primary'}
                ghost
                onClick={withdraw}
                className={styles.btn}
              >
                取消申请
              </Button>
            ) : null}
          </Col>
        </Row>
        <Modal
          visible={isModalVisible}
          centered={true}
          footer={null}
          onCancel={onCancel}

          // maskClosable={false}
        >
          <div className={styles.delContent}>
            {windowType.type === 'mov' ? (
              <div className={styles.delContent}>
                <Icon type={'jack-sptg1'} className={styles.delIcon}></Icon>
                <div className={styles.delTitle}>删除订单</div>
                <div className={styles.delText}>确定删除订单？</div>
              </div>
            ) : null}
            {windowType.type === 'CancelConfirmation' ? (
              <div className={styles.delContent}>
                <Icon type={'jack-ts'} className={styles.delIcon}></Icon>
                <div className={styles.delTitle}>取消确认</div>
                <div className={styles.delText}>是否取消确认？</div>
              </div>
            ) : null}
            {windowType.type === 'confirmCooperation' ? (
              <div className={styles.delContent}>
                <Icon type={'jack-wc'} className={styles.delIcon}></Icon>
                <div className={styles.delTitle}>确定合作？</div>
                <div className={styles.delText}>是否确定合作？</div>
              </div>
            ) : null}
            {windowType.type === 'decline' ? (
              <div className={styles.delContent}>
                <Icon type={'jack-ts'} className={styles.delIcon}></Icon>
                <div className={styles.delTitle}>是否谢绝？</div>
                <div className={styles.delText}>是否确定谢绝？</div>
              </div>
            ) : null}
            {windowType.type === 'withdraw' ? (
              <div className={styles.delContent}>
                <Icon type={'jack-ts'} className={styles.delIcon}></Icon>
                <div className={styles.delTitle}>是否取消申请？</div>
                <div className={styles.delText}>
                  取消后将收不到该工厂反馈的消息
                </div>
              </div>
            ) : null}

            <div className={styles.modal}>
              <Button
                className={styles.cancelBtn}
                size="large"
                type="primary"
                ghost
                onClick={handleCancel}
              >
                取消
              </Button>
              <Button
                type="primary"
                className={styles.submitBtn}
                onClick={() => {
                  handleOk(data.id)
                }}
                size="large"
              >
                确认
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default MultipleChoice
