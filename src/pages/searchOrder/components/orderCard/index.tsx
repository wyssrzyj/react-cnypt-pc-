import React, { useState } from 'react'
import { isEmpty, isNil } from 'lodash'
import classNames from 'classnames'
import { Icon, autoAddTooltip } from '@/components'
import styles from './index.module.less'

const NODATA =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/noData.png'

const OrderCard = props => {
  const { headerConfig, contentConfig = {}, footerConfig } = props
  const [demand, setDemand] = useState<string>('up')
  const [above, setAbove] = useState<number>(177)

  const { name, imgSrc, cardList = [], demandList = [] } = contentConfig

  const showDemand = () => {
    if (demand === 'up') {
      setDemand('down')
      setAbove(62)
    }
    if (demand === 'down') {
      setDemand('up')
      setAbove(177)
    }
  }
  return (
    <div className={styles.orderCard}>
      {!isNil(headerConfig) && (
        <header className={styles.cardHeader}>
          <span>{headerConfig.title}</span>
          <span>
            <Icon type="jack-weizhi" className={styles.headerIcon} />
            {headerConfig.address}
          </span>
        </header>
      )}

      <div className={styles.cardContent}>
        <div className={styles.left}>
          <img
            className={classNames(imgSrc ? styles.leftImg : styles.noDta)}
            src={imgSrc || NODATA}
          />
        </div>
        <ul className={styles.right}>
          <li className={styles.rightTitle}>{name}</li>
          {cardList.map((item, index) => (
            <li key={index} className={styles.cardItem}>
              <span className={styles.cardValue}>{item.label}：</span>
              {autoAddTooltip(
                ref => (
                  <span ref={ref} className={styles.tooltipBpx}>
                    {item.value}
                  </span>
                ),
                { title: item.value }
              )}
            </li>
          ))}
        </ul>
        {!isEmpty(demandList) && (
          <div
            className={styles.obscuration}
            style={{ top: above }}
            onMouseEnter={showDemand}
            onMouseLeave={showDemand}
          >
            {demandList.map((item, index) => (
              <div key={index} className={styles.demandItem}>
                <div className={styles.demandLabel}>{item.label}</div>
                <div className={styles.demandValue}>
                  {autoAddTooltip(
                    ref => (
                      <div ref={ref} className={styles.tooltipBpx}>
                        {item.value}
                      </div>
                    ),
                    { title: item.value }
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {!isNil(footerConfig) && (
        <footer className={styles.orderFooter}>
          <span
            className={styles.requirements}
            onMouseEnter={showDemand}
            onMouseLeave={showDemand}
          >
            <span>接单要求</span>
            <Icon
              type={`jack-Icon_${demand}`}
              className={
                demand === 'up'
                  ? styles.requirementsUpIcon
                  : styles.requirementsDownIcon
              }
            />
          </span>
          <span className={styles.deadline}>{footerConfig.time}</span>
        </footer>
      )}
    </div>
  )
}

export default OrderCard
