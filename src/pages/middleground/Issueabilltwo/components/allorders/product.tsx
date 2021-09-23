import React, { useState, useEffect } from 'react'
import styles from './todo.module.less'
import { Icon } from '@/components'
import { Checkbox, Divider, Row, Col, Button, Modal, Pagination } from 'antd'
import Empty from './empty'
const { confirm } = Modal //弹窗
function showConfirm() {
  confirm({
    title: '取消订单',
    centered: true,
    closable: true,
    icon: <Icon type="jack-ts" className={styles.ulIcon} />,

    content: '确认取消当前订单 ',
    onOk() {
      console.log('确认删除')
      // 删除逻辑
    },
    onCancel() {}
  })
}
function Returndraft() {
  confirm({
    title: '退回草稿箱',
    centered: true,
    closable: true,
    icon: <Icon type="jack-thcgx" className={styles.ulIcon} />,

    content: '确认将当前订单退回至草稿箱？ ',
    onOk() {
      console.log('确认退回')
    },
    onCancel() {}
  })
}
function reason() {
  confirm({
    title: '退回原因',
    centered: true,
    closable: true,
    icon: <Icon type="jack-thyy" className={styles.ulIcon} />,

    content: '价格不合适 ',
    onOk() {
      console.log('确认退回')
    },
    onCancel() {}
  })
}
function acceptance() {
  confirm({
    title: '确认验收',
    centered: true,
    closable: true,
    icon: <Icon type="jack-qrys1" className={styles.ulIcon} />,
    content: '确定验收当前订单数据，结束订单流程？ ',
    onOk() {
      console.log('确认验收')
    },
    onCancel() {}
  })
}

const Product = props => {
  const { data } = props
  const { keyt, completed } = data //传过来的数据
  const [buttondisplay, Buttondisplay] = useState(false) //判断已完成和草稿箱的按钮显示
  const [ompletiontime, setCompletiontime] = useState(false) //判断已完成的数据显示
  const [topping, setTopping] = useState(false) //判断置顶
  console.log(setTopping)
  const judgeTopping = () => {
    console.log('置顶测试')

    setTopping(!topping)
  }
  useEffect(() => {
    if (keyt == '8' || completed == '5') {
      Buttondisplay(true)
    } else {
      Buttondisplay(false)
    }
    if (completed == '5') {
      setCompletiontime(true)
    } else {
      setCompletiontime(false)
    }
  }, [keyt, completed])

  // 静态数据
  //  订单号 orderNumber
  //  时间 Time
  //  厂名字 FactoryName
  //  图片 img
  //  商品名称 name
  //  加工类型 ProcessingType
  //  订单类别  OrderCategory
  //  数量 quantity
  //  总金额 TotalAmount
  //  状态数据 StatusDataJudgment  //根据后台返回的状态显示不同的按数据
  // OrderCompletiontime //订单完成时间   让所有的状态数据都消失，map数据中的完成时间和按钮
  const Commoditys = [
    {
      orderNumber: '1795037941400163361',
      Time: '2021-05-14 16:24:52',
      FactoryName: '杭州创启服装厂',
      img: 'https://img0.baidu.com/it/u=3745474458,891795346&fm=26&fmt=auto&gp=0.jpg',
      name: '女士梭织连衣裙',
      ProcessingType: '经销单，来图加工',
      OrderCategory: '针织服装（薄料）',
      quantity: '100',
      TotalAmount: '10000',
      StatusDataJudgment: 1,
      OrderCompletiontime: 10086
    },
    {
      orderNumber: '1795037941400163361',
      Time: '2021-05-14 16:24:52',
      FactoryName: '杭州创启服装厂',
      img: 'https://img0.baidu.com/it/u=3745474458,891795346&fm=26&fmt=auto&gp=0.jpg',
      name: '女士梭织连衣裙',
      ProcessingType: '经销单，来图加工',
      OrderCategory: '针织服装（薄料）',
      quantity: '100',
      TotalAmount: '20000',
      StatusDataJudgment: 2,
      OrderCompletiontime: 10086
    },
    {
      orderNumber: '1795037941400163361',
      Time: '2021-05-14 16:24:52',
      FactoryName: '杭州创启服装厂',
      img: 'https://img0.baidu.com/it/u=3745474458,891795346&fm=26&fmt=auto&gp=0.jpg',
      name: '女士梭织连衣裙',
      ProcessingType: '经销单，来图加工',
      OrderCategory: '针织服装（薄料）',
      quantity: '100',
      TotalAmount: '30000',
      StatusDataJudgment: 3,
      OrderCompletiontime: 10086
    },
    {
      orderNumber: '1795037941400163361',
      Time: '2021-05-14 16:24:52',
      FactoryName: '杭州创启服装厂',
      img: 'https://img0.baidu.com/it/u=3745474458,891795346&fm=26&fmt=auto&gp=0.jpg',
      name: '女士梭织连衣裙',
      ProcessingType: '经销单，来图加工',
      OrderCategory: '针织服装（薄料）',
      quantity: '100',
      TotalAmount: '40000',
      StatusDataJudgment: 4,
      OrderCompletiontime: 10086
    },
    {
      orderNumber: '1795037941400163361',
      Time: '2021-05-14 16:24:52',
      FactoryName: '杭州创启服装厂',
      img: 'https://img0.baidu.com/it/u=3745474458,891795346&fm=26&fmt=auto&gp=0.jpg',
      name: '女士梭织连衣裙',
      ProcessingType: '经销单，来图加工',
      OrderCategory: '针织服装（薄料）',
      quantity: '100',
      TotalAmount: '50000',
      StatusDataJudgment: 5,
      OrderCompletiontime: 10086
    }
  ]
  const [empty, setEmpty] = useState(true)
  //当数据没有的时候显示为空页面
  useEffect(() => {
    if (Commoditys.length > 1) {
      setEmpty(false)
    }
  }, [empty])

  const [choice, setChoice] = useState(false) //单选按钮
  const [indeterminate, setIndeterminate] = React.useState(true) //中心点的状态全选之后为false
  const [checkAll, setCheckAll] = React.useState(false) //用来判断全选的状态
  const onChange = e => {
    console.log('我是单选')
    setChoice(e.target.checked)
  }
  const onCheckAllChange = e => {
    console.log('我是全选')
    console.log(e)
    setChoice(!choice) //点击全选状态和单选一样
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  return (
    <>
      {empty ? (
        <Empty />
      ) : (
        <div className={styles.ayer}>
          <div>
            {Commoditys.map(data => {
              return (
                <>
                  <div className={styles.themeatx}>
                    <Row className={styles.left}>
                      <Col span={6}>
                        <span className={styles.color}>订单号：</span>
                        <span>{data.orderNumber}</span>
                      </Col>
                      <Col span={5}>
                        <span className={styles.color}>{data.Time}</span>
                      </Col>
                      <Col span={10}>
                        <span className={styles.overflow}>
                          {data.FactoryName}
                        </span>
                        <span> 查看他的所有订单</span>
                      </Col>
                      <Col span={3}>
                        {topping ? (
                          <div className={styles.counts} onClick={judgeTopping}>
                            <Icon
                              type="jack-zhiding_1"
                              className={styles.ulIcon}
                            />
                            置顶
                          </div>
                        ) : (
                          <div className={styles.count} onClick={judgeTopping}>
                            <Icon type="jack-zhiding_2" />
                            置顶
                          </div>
                        )}
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.theme}>
                    <Row>
                      <Col span={9}>
                        <div>
                          <Divider />
                          {/* buttondisplay */}
                          {buttondisplay ? (
                            <Checkbox
                              className={styles.check}
                              onChange={onChange}
                              checked={choice}
                            ></Checkbox>
                          ) : null}
                          <div className={styles.imgs}>
                            <img src={data.img} alt="" />
                          </div>
                          <div>
                            <p>{data.name}</p>
                            <p>
                              加工类型：<span>{data.ProcessingType}</span>
                            </p>
                            <p>
                              订单类别：<span>{data.OrderCategory}</span>
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col span={4}>
                        <span className={styles.position}>
                          {data.quantity}件
                        </span>
                      </Col>
                      <Col span={3}>
                        <span className={styles.position}>
                          {data.TotalAmount}
                        </span>
                      </Col>
                      {/* 判断是否是已完成界面 */}
                      {ompletiontime ? (
                        <Col className={styles.completionime} span={4}>
                          <span>{data.OrderCompletiontime}</span>
                        </Col>
                      ) : (
                        <Col span={4}>
                          {/* 有5中状态 */}
                          {/* completed */}
                          {/* {ompletiontime&&} */}
                          <div>
                            {data.StatusDataJudgment == 1 ? (
                              <div className={styles.kuangsz}>
                                <span className={styles.confirmed}>待确认</span>
                              </div>
                            ) : null}
                          </div>

                          <div></div>
                          {data.StatusDataJudgment == 2 ? (
                            <div className={styles.kuangsz}>
                              {/* 进行中 */}
                              <p style={{ color: '#3B80FF' }}>进行中</p>
                              <p className={styles.receiving}>期望收货时间</p>
                              <p className={styles.time}>2021-09-05</p>
                              <p className={styles.surplus}>
                                剩余 <span className={styles.day}>5</span>天
                              </p>
                            </div>
                          ) : null}
                          {data.StatusDataJudgment == 3 ? (
                            <div className={styles.kuangsz}>
                              {/* 待验收 */}
                              <p className={styles.kuangszsax}>待验收</p>
                              <p>已签收 2021-08-30 12:05</p>
                            </div>
                          ) : null}
                          {data.StatusDataJudgment == 4 ? (
                            <div className={styles.kuangsz}>
                              {/* 退回订单 */}
                              <p
                                className={styles.Returnorder}
                                style={{ color: 'red' }}
                              >
                                退回订单
                              </p>
                              <p onClick={reason}>查看原因</p>
                            </div>
                          ) : null}
                          {data.StatusDataJudgment == 5 ? (
                            <div className={styles.kuangsz}>
                              <p className={styles.order}>取消订单</p>
                            </div>
                          ) : null}
                        </Col>
                      )}
                      {ompletiontime ? (
                        <Col span={4}>
                          <Button className={styles.button}>再次下单</Button>
                          <Button className={styles.button}>状态跟踪</Button>
                          <Button className={styles.button}>删除订单</Button>
                        </Col>
                      ) : (
                        <Col span={4}>
                          {/* 待确认 */}
                          {data.StatusDataJudgment == 1 ? (
                            <Button
                              onClick={() => {
                                showConfirm()
                              }}
                              className={styles.button}
                            >
                              取消订单
                            </Button>
                          ) : null}

                          {/* 进行中 */}
                          {data.StatusDataJudgment == 2 ? (
                            <>
                              <Button className={styles.button} type="primary">
                                状态跟踪
                              </Button>
                              <Button className={styles.button}>
                                在线跟单
                              </Button>
                            </>
                          ) : null}

                          {/* 待验收 */}
                          {data.StatusDataJudgment == 3 ? (
                            <>
                              <Button
                                className={styles.button}
                                type="primary"
                                onClick={() => {
                                  acceptance()
                                }}
                              >
                                确认验收
                              </Button>
                              <Button className={styles.button}>
                                状态跟踪
                              </Button>
                            </>
                          ) : null}

                          {/* 退回订单 */}
                          {data.StatusDataJudgment == 4 ? (
                            <>
                              <Button className={styles.button} type="primary">
                                重新编辑
                              </Button>
                              <Button
                                className={styles.btn}
                                onClick={() => {
                                  Returndraft()
                                }}
                              >
                                退回草稿箱
                              </Button>
                            </>
                          ) : null}

                          {/* 取消订单 */}
                          {data.StatusDataJudgment == 5 ? (
                            <>
                              <Button className={styles.button} type="primary">
                                重新编辑
                              </Button>
                              <Button
                                className={styles.btn}
                                onClick={() => {
                                  Returndraft()
                                }}
                              >
                                退回草稿箱
                              </Button>
                            </>
                          ) : null}
                        </Col>
                      )}
                    </Row>
                  </div>
                </>
              )
            })}
          </div>

          <div className={styles.move}>
            <span>
              {buttondisplay && (
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                >
                  全选
                </Checkbox>
              )}
            </span>
            <span>
              {}
              {buttondisplay && <Button danger>批量删除</Button>}
            </span>
          </div>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      )}
    </>
  )
}
export default Product
