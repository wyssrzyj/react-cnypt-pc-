import React, { useState } from 'react'
import { Checkbox, Row, Col, Button, Popconfirm, Tooltip } from 'antd'
import styles from './index.module.less'
import { Icon } from '@/components' //路径

const MultipleChoice = ({
  data,
  callback,
  deleteRecord,
  toppingMethod,
  earlyEnd,
  oneMoreOrder
}) => {
  const { checked, id, stickType } = data
  const [topping, setTopping] = useState(false) //置顶

  const Topping = new Map()
  Topping.set(1, 'jack-zhiding_1')
  Topping.set(0, 'jack-zhiding_2')
  const examine = new Map()
  examine.set(0, 'jack-check-fail')
  examine.set(1, 'jack-check-success')
  // 置顶事件
  const changeSort = async value => {
    setTopping(!topping)
    const stickType = topping ? 0 : 1

    toppingMethod({ id: value, stickType })
  }

  // 失败原因
  const failureReason = e => {
    console.log(e)
    console.log('失败原因')
  }

  const DemandOrderDetail = e => {
    console.log('查看订单信息')
    console.log(e)
  }

  return (
    <div className={styles.bos}>
      {/* 头部 */}
      <div className={stickType === 1 ? styles.topping : styles.noTopping}>
        <Row>
          <Col span={6}>
            <span className={styles.requisition}>
              <span className={styles.color}>订单编号 :</span>
              <span>{data.code}</span>
            </span>
          </Col>

          <Col span={7}>
            <span>
              <span className={styles.color}> 发布时间 :</span>
              <span>{data.releaseTime}</span>
            </span>
          </Col>
          <Col span={9} className={styles.examine}>
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
            <Checkbox
              className={styles.checked}
              onChange={callback}
              checked={checked}
            />
          </Col>
          <Col span={8}>
            <div className={styles.subject}>
              <img className={styles.img} src={data.pictureUrl} alt="" />
              <div>
                <p className={styles.name}>{data.name}</p>
                <div className={styles.hidden}>
                  加工类型：
                  <Tooltip placement="top" title={data.processing.join('、')}>
                    {data.processing.join('、')}
                  </Tooltip>
                </div>
                <Tooltip placement="top" title={data.categoryIdList.join('、')}>
                  <div className={styles.category}>
                    商品品类：
                    {data.categoryIdList.join('、')}
                  </div>
                </Tooltip>
                <p>订单量：{data.totalOrderAmount} 件</p>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.feedback}>
              <p>
                共<span className={styles.fontColor}>{data.enterpriseNum}</span>
                家，
                <span className={styles.fontColor}>
                  {data.enterpriseRefuseTotalNum}
                </span>
                家已谢绝
                {/* <span className={styles.fontColor}>1</span> 家已反馈 */}
              </p>
              {/* <p>
                <span className={styles.fontColor}>{data.issuedBill}</span>
                家已发单，已发订单量
                <span className={styles.fontColor}>
                  {data.issuedOrderQuantity}
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
          <Col className={styles.state} span={5}>
            {/* -1 草稿箱 1 提交需求单 -2审核失败 -3已结束 */}
            {/* 生效中 */}
            {data.status === 1 && data.surplus.day > 0 ? (
              <div>
                <p className={styles.effect}>生效中</p>
                <p className={styles.validity}>
                  有效期：<span> {data.time}</span>
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
                  <p>已经超时{Math.abs(data.surplus.day)}天</p>
                ) : null}
              </div>
            ) : null}
            {/* 审核失败 */}
            {data.status === -2 ? (
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
            {data.status === -1 ? (
              <div>
                <p className={styles.draft}>草稿</p>
              </div>
            ) : null}
          </Col>
          <Col className={styles.state} span={2}>
            {data.status === 1 && data.surplus.day > 0 ? (
              <div className={styles.btn}>
                <Button
                  type="primary"
                  onClick={() => {
                    earlyEnd(id)
                  }}
                >
                  提前结束
                </Button>
              </div>
            ) : (
              <div className={styles.btn}>
                <Popconfirm
                  onConfirm={() => {
                    deleteRecord(id)
                  }}
                  title="是否确认删除？"
                  okText="是"
                  cancelText="否"
                >
                  <Button>删除记录</Button>
                </Popconfirm>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default MultipleChoice
