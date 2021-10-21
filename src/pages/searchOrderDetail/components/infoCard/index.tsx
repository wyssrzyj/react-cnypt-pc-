import React from 'react'
import { Row, Col } from 'antd'
import { Title } from '@/components'
import styles from './index.module.less'

const infoList = [
  { label: '商品品类', value: '印花T恤', span: 12 },
  { label: '附件信息', value: '100～1000件', span: 12 },
  { label: '订单数量', value: '100～1000件', span: 12 },
  { label: '目标单价', value: '未知', span: 12 },
  {
    label: '备注说明',
    value: '春江潮水连海平，海上明月共潮生，滟滟随波千万里，何处春江无月明',
    span: 24
  }
]
const imgList = [
  {
    src: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/rc-upload-1634716789660-41.png'
  },
  {
    src: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/rc-upload-1634716789660-41.png'
  },
  {
    src: 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/rc-upload-1634716789660-41.png'
  }
]

const InfoCard = () => {
  return (
    <div className={styles.infoCard}>
      <Title title={'商品信息'} />
      <Row gutter={16}>
        {infoList.map(item => (
          <Col key={item.value} span={item.span} className={styles.infoCol}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>{item.value}</span>
          </Col>
        ))}
        <Col className={styles.imgBox} span={24}>
          <span className={styles.label}>款图</span>
          <div className={styles.modelFigure}>
            {imgList.map((item, index) => (
              <div className={styles.imageList}>
                <img key={index} src={item.src} />
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Title title={'接单条件'} />
      <Row gutter={16}>
        {infoList.map(item => (
          <Col key={item.value} span={item.span} className={styles.infoCol}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>{item.value}</span>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default InfoCard
