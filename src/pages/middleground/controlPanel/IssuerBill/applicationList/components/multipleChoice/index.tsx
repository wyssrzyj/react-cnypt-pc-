import React, { useState } from 'react'
import { Row, Col, Button, Popconfirm, Tooltip } from 'antd'
import styles from './index.module.less'
import { Icon } from '@/components' //路径
import { timestampToTime } from '../../time'

const MultipleChoice = ({
  data,
  toppingMethod,
  deleteMethod,
  earlyEnd,
  InitiateOrder,
  reOrder
}) => {
  const [topping, setTopping] = useState(false) //置顶

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
    setTopping(!topping)
    const stickType = topping ? 0 : 1
    toppingMethod({ id: e, purchaserstickType: stickType })
  }

  // 删除记录
  const deleteRecord = e => {
    console.log(e)
    console.log('删除记录')
    deleteMethod(e)
  }

  const demandSheetDetails = e => {
    console.log(e)
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
              <span>{timestampToTime(data.releaseTime)}</span>
            </span>
          </Col>
          <Col span={4}>
            <span
              onClick={() => {
                demandSheetDetails(data.id)
              }}
              className={styles.details}
            >
              查看订单详情{'>'}
            </span>
          </Col>
          <Col span={5} className={styles.lin}>
            <div className={sortColor.get(+data.status)}>
              <span className={styles.spot}>
                <span>•</span>
              </span>

              <span className={styles.states}>{map.get(data.status)}</span>

              <span>
                <Icon
                  onClick={() => changeSort(data.id)}
                  type={
                    data.purchaserStickType
                      ? 'jack-zhiding_1'
                      : 'jack-zhiding_2'
                  }
                  className={styles.listHeaderSortIcon}
                ></Icon>
              </span>
            </div>
          </Col>
        </Row>
      </div>
      {/* 主题 */}
      <div className={styles.theme}>
        <Row>
          <Col span={11} className={styles.names}>
            <div>
              <img className={styles.img} src={data.img} alt="" />
            </div>

            <div className={styles.imgRight}>
              <p className={styles.name}>
                <span className={styles.factoryName}>
                  {data.enterpriseName}
                </span>
                <span className={styles.diqu_bai}>
                  <Icon type="jack-diqu_bai" className={styles.previous} />
                  {data.address}
                </span>
              </p>
              <p>人数：{data.staffNumber}人</p>
              <p>联系方式: {data.contactsMobile}</p>
              <p>电子邮箱: {data.contactsEmail}</p>
              <div className={styles.hidden}>
                接单类型:
                <Tooltip
                  placement="top"
                  title={data.prodTypeValueList.join('、')}
                >
                  {data.prodTypeValueList.join('、')}
                </Tooltip>
              </div>
              <div className={styles.hidden}>
                擅长产品品类:
                <Tooltip
                  placement="top"
                  title={data.factoryCategoryList.join('、')}
                >
                  {data.factoryCategoryList.join('、')}
                </Tooltip>
              </div>
            </div>
          </Col>
          <Col span={9} className={styles.feedback}>
            <p className={styles.quotationInformation}>
              <span className={styles.information}>•</span> 报价信息:
              <span>
                {data.receiveGoodsNum ? data.receiveGoodsNum : '暂无'}
              </span>
            </p>
            <p>
              <span className={styles.information}>•</span> 付款方式:
              <span>{data.payDetails ? data.payDetails : '暂无'}</span>
            </p>
            <p>
              <span className={styles.information}>•</span>可接订单数：
              {data.availableOrders ? data.availableOrders : '暂无'}
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
                  onClick={() => earlyEnd(data.id)}
                  className={styles.btn}
                  type={'primary'}
                >
                  谢绝
                </Button>
                <Button
                  onClick={() => InitiateOrder(data.id)}
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
                onClick={() => reOrder(data.id)}
                className={styles.btn}
              >
                取消确认
              </Button>
            ) : null}

            {[1, -1, -2].includes(+data.status) ? (
              <Popconfirm
                title="是否确认删除?"
                onConfirm={() => {
                  deleteRecord(data.id)
                }}
                okText="确认"
                cancelText="取消"
              >
                <Button type={'primary'} className={styles.btn}>
                  删除记录
                </Button>
              </Popconfirm>
            ) : null}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default MultipleChoice
