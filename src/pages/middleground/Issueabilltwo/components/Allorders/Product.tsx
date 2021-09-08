import React, { useState } from 'react'
import styles from './todo.module.less'

import { Checkbox, Divider, Row, Col, Button, Modal } from 'antd'
import {
  FileExcelFilled,
  HeartTwoTone,
  LikeFilled,
  PauseCircleOutlined,
  SwitcherFilled
} from '_@ant-design_icons@4.6.4@@ant-design/icons'

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

const Product = person => {
  const { data } = person

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
  const judge = data.StatusDataJudgment //判断状态
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleOk = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const CheckboxGroup = Checkbox.Group
  const plainOptions = ['1']
  const defaultCheckedList = ['Apple', 'Orange']
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList)
  const [indeterminate, setIndeterminate] = React.useState(false)
  const [checkAll, setCheckAll] = React.useState(false)

  const onChange = list => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }
  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        全选
      </Checkbox>
      <Divider />

      <div className={styles.ayer}>
        {/* 标题 */}
        <div className={styles.themeatx}>
          <Row className={styles.left}>
            <Col span={6}>
              <span className={styles.color}>订单号：</span>{' '}
              <span>{data.orderNumber}</span>{' '}
            </Col>
            <Col span={5}>
              {' '}
              <span className={styles.color}>{data.Time}</span>
            </Col>
            <Col span={10}>
              <span className={styles.overflow}>{data.FactoryName}</span>|
              <span> 查看他的所有订单</span>
            </Col>
            <Col span={3}>
              {' '}
              <div className={styles.count}>
                {' '}
                <PauseCircleOutlined /> 置顶
              </div>{' '}
            </Col>
          </Row>
        </div>
        {/* 内容 */}
        <div className={styles.theme}>
          <Row>
            <Col span={9}>
              <div>
                <CheckboxGroup
                  options={plainOptions}
                  value={checkedList}
                  onChange={onChange}
                />
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
              {' '}
              <span className={styles.position}>{data.TotalAmount}</span>
            </Col>
            <Col span={4}>
              {/* 有5中状态 */}
              {judge == 1 ? (
                <div className={styles.kuangsz}>
                  {/* 待确认 */}
                  <span className={styles.confirmed}>待确认</span>
                </div>
              ) : null}
              {judge == 2 ? (
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
              {judge == 3 ? (
                <div className={styles.kuangsz}>
                  {/* 待验收 */}
                  <p className={styles.kuangszsax}>待验收</p>
                  <p>已签收 2021-08-30 12:05</p>
                </div>
              ) : null}
              {judge == 4 ? (
                <div className={styles.kuangsz}>
                  {/* 退回订单 */}
                  <p className={styles.Returnorder} style={{ color: 'red' }}>
                    退回订单
                  </p>
                  <p
                    onClick={() => {
                      reason()
                    }}
                  >
                    查看原因
                  </p>
                </div>
              ) : null}
              {judge == 5 ? (
                <div className={styles.kuangsz}>
                  <p className={styles.order}>取消订单</p>
                </div>
              ) : null}
            </Col>
            <Col span={4}>
              {/* 待确认 */}
              {judge == 1 ? (
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
              {judge == 2 ? (
                <>
                  <Button className={styles.button} type="primary">
                    状态跟踪
                  </Button>
                  <Button className={styles.button}>在线跟单</Button>
                </>
              ) : null}

              {/* 待验收 */}
              {judge == 3 ? (
                <>
                  <Button
                    className={styles.button}
                    type="primary"
                    onClick={() => {
                      acceptance()
                    }}
                  >
                    确认验收{' '}
                  </Button>
                  <Button className={styles.button}>状态跟踪</Button>
                </>
              ) : null}

              {/* 退回订单 */}
              {judge == 4 ? (
                <>
                  <Button className={styles.button} type="primary">
                    重新编辑{' '}
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
              {judge == 5 ? (
                <>
                  <Button className={styles.button} type="primary">
                    重新编辑{' '}
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
