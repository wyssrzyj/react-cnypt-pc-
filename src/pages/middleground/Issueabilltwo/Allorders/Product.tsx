import React, { useState } from 'react'
import styles from './todo.module.less'

import { Checkbox, Divider, Row, Col, Button, Modal } from 'antd'
import {
  FileExcelFilled,
  HeartTwoTone,
  LikeFilled,
  PauseCircleOutlined,
  SwitcherFilled
} from '@ant-design/icons'

// <Icon type="jack-daoru" className={styles.icon} />

const { confirm } = Modal //弹窗
function showConfirm() {
  confirm({
    title: '取消订单',
    centered: true,
    closable: true,
    icon: <HeartTwoTone twoToneColor="#eb2f96" />,
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
    icon: <FileExcelFilled twoToneColor="yellow" />,
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
    icon: <SwitcherFilled twoToneColor="red" />,
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
    icon: <LikeFilled twoToneColor="green" />,
    content: '确定验收当前订单数据，结束订单流程？ ',
    onOk() {
      console.log('确认验收')
    },
    onCancel() {}
  })
}

const Product = props => {
  const { keyt } = props
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
  //  状态数据 StatusDataJudgment
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
      StatusDataJudgment: 1
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
      StatusDataJudgment: 2
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
      StatusDataJudgment: 3
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
      StatusDataJudgment: 4
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
      StatusDataJudgment: 5
    }
  ]

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [choice, setChoice] = useState(false) //单选按钮
  const handleOk = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  // const plainOptions = ['Apple']
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
                      |<span> 查看他的所有订单</span>
                    </Col>
                    <Col span={3}>
                      <div className={styles.count}>
                        <PauseCircleOutlined /> 置顶
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className={styles.theme}>
                  <Row>
                    <Col span={9}>
                      <div>
                        <Divider />
                        {keyt == 8 ? (
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
                      <span className={styles.position}>{data.quantity}件</span>
                    </Col>
                    <Col span={3}>
                      <span className={styles.position}>
                        {data.TotalAmount}
                      </span>
                    </Col>
                    <Col span={4}>
                      {/* 有5中状态 */}
                      {data.StatusDataJudgment == 1 ? (
                        <div className={styles.kuangsz}>
                          {/* 待确认 */}
                          <span className={styles.confirmed}>待确认</span>
                        </div>
                      ) : null}
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
                          <Button className={styles.button}>在线跟单</Button>
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
                          <Button className={styles.button}>状态跟踪</Button>
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
                  </Row>
                </div>
              </>
            )
          })}
        </div>

        <div className={styles.move}>
          <span>
            {keyt == 8 ? (
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                全选
              </Checkbox>
            ) : null}
          </span>
          <span>
            {keyt == 8 ? (
              <Button danger className={styles.btnmov}>
                批量删除
              </Button>
            ) : null}
          </span>
        </div>

        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          title="Modal"
          okText="确认"
          cancelText="取消"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </>
  )
}
export default Product
