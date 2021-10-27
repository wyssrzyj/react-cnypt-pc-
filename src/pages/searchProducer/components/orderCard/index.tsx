import React, { useState } from 'react'
import { Icon, Title } from '@/components'
import styles from './index.module.less'
import { Button, Modal, Row, Col } from 'antd'

const RequestCard = () => {
  return (
    <div className={styles.requestCard}>
      <img src={''} alt="" className={styles.modalImg} />
      <div className={styles.modalOrderInfo}>
        <div>
          <div className={styles.modalTitle}>阿斯顿发斯蒂芬阿斯顿发斯蒂芬</div>
          <div className={styles.modalCount}>100件</div>
        </div>
        <Button type={'primary'} className={styles.modalBtn}>
          发送
        </Button>
      </div>
    </div>
  )
}

const OrderCard = () => {
  const title = '石狮市一叶知秋服饰有限公司'
  const tag = '实名'
  const checkFactory = '验厂'
  const address = '福建省 泉州市 石狮市'

  const configs = [
    {
      label: '生产人数',
      icon: 'jack-scrs',
      field: 'a'
    },
    {
      label: '主要生产',
      icon: 'jack-zysc',
      field: 'b'
    },
    {
      label: '加工类型',
      icon: 'jack-jglx',
      field: 'c'
    }
  ]

  const [modalFlag, setModalFlag] = useState(false)

  const modalShow = () => {
    setModalFlag(f => !f)
  }

  return (
    <div className={styles.orderCard}>
      <img src={''} alt="" className={styles.img} />
      <div className={styles.orderInfo}>
        {/* 标题 */}
        <div className={styles.orderHeader}>
          <div className={styles.titleBox}>
            <span className={styles.title}>{title}</span>
            <span className={styles.titleTag}>
              <Icon type={'jack-shiming1'} className={styles.titleIcon}></Icon>
              {tag}
            </span>
            <span className={styles.titleTag2}>
              <Icon type={'jack-ycsq'} className={styles.titleIcon}></Icon>
              {checkFactory}
            </span>
          </div>
          <div className={styles.address}>
            <Icon type={'jack-weizhi'} className={styles.icon}></Icon>
            {address}
          </div>
        </div>
        {/* 公司信息 */}
        <div className={styles.content}>
          <div className={styles.contentBody}>
            {configs.map(item => {
              return (
                <div key={item.field} className={styles.config}>
                  <Icon type={item.icon} className={styles.configIcon}></Icon>
                  <span className={styles.configLable}>{item.label}</span>
                  <span>xxxxx</span>
                </div>
              )
            })}
          </div>
          <Button type={'primary'} onClick={modalShow}>
            立即询价
          </Button>
        </div>
      </div>

      <Modal
        visible={modalFlag}
        width={700}
        footer={false}
        onCancel={modalShow}
        maskClosable={false}
      >
        <Title title={'选择需求单'}></Title>
        <div>
          <Row gutter={16}>
            {new Array(8).fill('').map((_item, idx) => {
              return (
                <Col span={12} key={idx}>
                  <RequestCard></RequestCard>
                </Col>
              )
            })}
          </Row>
        </div>
      </Modal>
    </div>
  )
}

export default OrderCard
