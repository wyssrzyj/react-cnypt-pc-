import React, { useState } from 'react'
import { Row, Col, Button, Tooltip, Modal } from 'antd'
import styles from './index.module.less'
import { Icon } from '@/components' //路径
import { useHistory } from 'react-router-dom'

const MultipleChoice = ({
  data,
  deleteRecord,
  toppingMethod,
  earlyEnd,
  oneMoreOrder,
  DemandOrderDetail
}) => {
  const { push } = useHistory()

  const { id, stickType } = data
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [windowType, setWindowType] = useState<any>({}) //弹窗类型

  // const [topping, setTopping] = useState() //置顶

  const Topping = new Map()
  Topping.set(1, 'jack-zhiding_1')
  Topping.set(0, 'jack-zhiding_2')
  const examine = new Map()
  examine.set(0, 'jack-shenhe-copy')
  examine.set(1, 'jack-shenhe')
  let Simg = 'http://dev.uchat.com.cn:8002/images/b140ef.png'

  // 置顶事件
  const changeSort = async value => {
    let ccc = stickType == 0 ? 1 : 0
    toppingMethod({ id: value, stickType: ccc })
  }

  // 失败原因
  const failureReason = e => {
    console.log(e)
    console.log('失败原因')
  }

  const showModal = () => {
    setWindowType({ type: 'mov' })
    setIsModalVisible(true)
  }
  //  点击确认 判断是删除还是提前结束
  const handleOk = () => {
    console.log(windowType)
    if (windowType.type === 'advance') {
      earlyEnd(id)
    }
    if (windowType.type === 'mov') {
      deleteRecord(id)
    }
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const advance = () => {
    setWindowType({ type: 'advance' })
    setIsModalVisible(true)
  }
  const onCancel = () => {
    setIsModalVisible(false)
  }
  const modify = e => {
    push({
      pathname: '/control-panel/issuerBill/demand-sheet',
      state: { id: e, modify: 'modify' }
    })
  }
  return (
    <div className={styles.bos}>
      {/* 头部 */}
      <div className={stickType === 1 ? styles.topping : styles.noTopping}>
        <Row>
          <Col span={8}>
            <span className={styles.requisition}>
              <span className={styles.color}>订单编号 :</span>
              <span className={styles.font}>{data.code}</span>
            </span>
          </Col>

          <Col span={8}>
            {data.status !== -1 ? (
              <span>
                <span className={styles.color}> 发布时间 :</span>
                <span className={styles.font}>{data.releaseTime}</span>
              </span>
            ) : null}
          </Col>
          <Col span={6} className={styles.examine}>
            {data.status !== -1 ? (
              <div>
                <span>
                  <Icon
                    type={examine.get(data.systemApprovalStatus)}
                    className={styles.listHeaderSortIcon}
                  ></Icon>
                </span>
                {data.systemApprovalStatus ? (
                  <span>审核通过</span>
                ) : (
                  <span>审核不通过</span>
                )}
              </div>
            ) : null}
          </Col>
          <Col span={1} className={styles.toppingFather}>
            <span
              onClick={() => {
                changeSort(data.id)
              }}
            >
              <Icon
                type={Topping.get(stickType)}
                className={styles.listHeaderSortIcon}
              ></Icon>
            </span>
          </Col>
        </Row>
      </div>
      {/* 主题 */}
      <div className={styles.theme}>
        <Row>
          <Col span={1}>
            {/* <Checkbox
              className={styles.checked}
              // onChange={callback}
              checked={checked}
            /> */}
          </Col>
          <Col span={8}>
            <div className={styles.subject}>
              <img
                className={styles.img}
                src={data.pictureUrl ? data.pictureUrl : Simg}
                alt=""
              />
              <div>
                <p className={styles.name}>{data.name}</p>
                <Tooltip placement="top" title={data.processing.join('、')}>
                  <div className={styles.hidden}>
                    加工类型：
                    {data.processing.join('、')}
                  </div>
                </Tooltip>
                <Tooltip placement="top" title={data.categoryIdList.join('、')}>
                  <div className={styles.category}>
                    商品品类：
                    {data.categoryIdList.join('、')}
                  </div>
                </Tooltip>
                <p className={styles.ddl}>
                  订单量：{data.totalOrderAmount ? data.totalOrderAmount : 0} 件
                </p>
              </div>
            </div>
          </Col>
          <Col span={7}>
            <div className={styles.feedback}>
              <p>
                共
                <span className={styles.fontColor}>
                  {data.enterpriseNum ? data.enterpriseNum : 0}
                </span>
                家，
                <span className={styles.fontColor}>
                  {data.enterpriseRefuseTotalNum
                    ? data.enterpriseRefuseTotalNum
                    : 0}
                </span>
                家已谢绝
                {/* <span className={styles.fontColor}>1</span> 家已反馈 */}
              </p>
              {/* <p>
                <span className={styles.fontColor}>{data.issuedBill}</span>
                家已发单，已发订单量
                <span className={styles.fontColor}>
                  {data.issuedorderQuantity}
                </span>
                件
              </p> */}
              <p className={styles.moreOrder}>
                <span
                  className={styles.cursor}
                  onClick={() => {
                    oneMoreOrder(data.id)
                  }}
                >
                  再来一单
                </span>
                &ensp;|&ensp;
                <span
                  onClick={() => {
                    DemandOrderDetail(data.id)
                  }}
                  className={styles.cursor}
                >
                  查看订单详情
                </span>
              </p>
            </div>
          </Col>
          <Col className={styles.state} span={6}>
            {/* -1 草稿箱 1 提交需求单 -2审核失败 -3已结束 */}
            {/* 生效中 */}
            {+data.status === 1 ? (
              <div>
                <p className={styles.effect}>生效中</p>
                <p className={styles.validity}>
                  <span className={styles.hui}>有效期：</span>
                  <span> {data.time}</span>
                </p>
                <p>
                  剩余{data.surplus.day}天{data.surplus.hour}小时
                </p>
              </div>
            ) : null}
            {/* 已结束 */}
            {data.status === -3 ? (
              <div>
                <p className={styles.already}>已结束</p>
                <p className={styles.validity}>有效期：{data.time}</p>
                {data.surplus.day < 0 ? (
                  <p>
                    已经超时
                    <span className={styles.tina}>
                      {Math.abs(data.surplus.day)}
                    </span>
                    天
                  </p>
                ) : null}
              </div>
            ) : null}
            {/* 审核失败 */}
            {+data.status === -2 ? (
              <div>
                <p className={styles.end}>审核失败</p>
                <p
                  className={styles.cursor}
                  onClick={() => {
                    failureReason(data.id)
                  }}
                >
                  查看失败原因
                </p>
              </div>
            ) : null}
            {/* 草稿 */}
            {+data.status === -1 ? (
              <div>
                <p className={styles.draft}>草稿</p>
              </div>
            ) : null}
          </Col>
          <Col className={styles.state} span={2}>
            {data.status === 1 && data.surplus.day > 0 ? (
              <div className={styles.btn}>
                <Button type="primary" onClick={advance}>
                  提前结束
                </Button>
              </div>
            ) : (
              <div>
                {data.status === -1 ? (
                  <div className={styles.btn}>
                    <Button
                      ghost
                      type="primary"
                      className={styles.mov}
                      onClick={showModal}
                    >
                      删除记录
                    </Button>
                    <Button
                      type="primary"
                      className={styles.mov}
                      onClick={() => {
                        modify(id)
                      }}
                    >
                      修改草稿
                    </Button>
                    {/* </Popconfirm> */}
                  </div>
                ) : (
                  <div className={styles.btn}>
                    <Button className={styles.mov} onClick={showModal}>
                      删除记录
                    </Button>
                    {/* </Popconfirm> */}
                  </div>
                )}
              </div>
            )}
          </Col>

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
                  <div className={styles.delText}>确定删除订单？</div>
                </div>
              ) : null}
              {windowType.type === 'advance' ? (
                <div className={styles.delContent}>
                  <Icon type={'jack-ts'} className={styles.delIcon}></Icon>
                  <div className={styles.delText}>确定提前结束？</div>
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
                  onClick={handleOk}
                  size="large"
                >
                  确认
                </Button>
              </div>
            </div>
          </Modal>
        </Row>
      </div>
    </div>
  )
}

export default MultipleChoice
