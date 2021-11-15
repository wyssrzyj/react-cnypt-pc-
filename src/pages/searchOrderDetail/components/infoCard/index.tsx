import React from 'react'
import { Row, Col } from 'antd'
import { isEmpty } from 'lodash'
import { Title, autoAddTooltip } from '@/components'
import styles from './index.module.less'

const InfoCard = props => {
  const { infoList = [], orderList = [], imgList = [] } = props
  return (
    <div className={styles.infoCard}>
      <Title title={'商品信息'} />
      <Row gutter={16}>
        {console.log(infoList)}
        {infoList.map((item, index) => (
          <Col key={index} span={item.span} className={styles.infoCol}>
            <span className={styles.label}>{item.label}</span>
            {autoAddTooltip(
              ref => (
                <span ref={ref} className={styles.tooltipBpx}>
                  {item.value}
                </span>
              ),
              { title: item.value }
            )}
            {/* <span className={styles.value}>{item.value}</span> */}
          </Col>
        ))}
        <Col className={styles.imgBox} span={24}>
          <span className={styles.label}>款图</span>
          <div className={styles.modelFigure}>
            {isEmpty(imgList)
              ? '--'
              : imgList.map((item, index) => (
                  <div key={index} className={styles.imageList}>
                    <img src={item} />
                  </div>
                ))}
          </div>
        </Col>
      </Row>
      <Title title={'接单条件'} />
      <Row gutter={16}>
        {orderList.map((item, index) => (
          <Col key={index} span={item.span} className={styles.infoCol}>
            <span className={styles.label}>{item.label}</span>
            {autoAddTooltip(
              ref => (
                <span ref={ref} className={styles.tooltipBpx}>
                  {item.value}
                </span>
              ),
              { title: item.value }
            )}
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default InfoCard
