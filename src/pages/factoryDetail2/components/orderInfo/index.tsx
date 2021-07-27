import React, { useState, useEffect } from 'react'
import { Badge } from 'antd'
import { filter, find, isEmpty } from 'lodash'
import classNames from 'classnames'
import axios from '@/utils/axios'
import {
  getTypeOptions,
  getProductMode,
  checkValue,
  getProductClassMap
} from '@/utils/tool'
import { Icon } from '@/components'
import HeaderLine from '../headerLine'
import styles from './index.module.less'

const OrderInfo = props => {
  const { factoryId } = props
  const productClassOptions = getProductClassMap()
  const productionModeOptions = getProductMode()
  const [currentFactory, setCurrentFactory] = useState<any>({})
  const [mainList, setMainList] = useState<any>([])
  const [orderType, setOrderType] = useState<any>([])
  const [grade, setGrade] = useState<string>('--')

  const getOrderReceiving = () => {
    const typeOptions = getTypeOptions()
    axios
      .get('/api/factory/info/get-detail-receive-order-desc', {
        factoryId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          const { factoryCategoryList, factoryProcessTypeList, clothesGrade } =
            data
          setCurrentFactory({ ...data })
          if (factoryCategoryList) {
            const newLabel = factoryCategoryList.map(item => `${item.name}`)
            setMainList([...newLabel])
          }
          if (factoryProcessTypeList) {
            const newOrderType = filter(typeOptions, function (o) {
              return find(factoryProcessTypeList, function (item) {
                return item.processType === o.value
              })
            })
            setOrderType([...newOrderType])
          }
          // 产品档次
          if (clothesGrade) {
            const newGrade = productClassOptions.find(
              item => item.value == clothesGrade
            )
            if (newGrade) {
              const gradeText = newGrade.label.split('').join('、')
              setGrade(gradeText)
            }
          }
        }
      })
  }

  useEffect(() => {
    getOrderReceiving()
  }, [])

  return (
    <div className={styles.companiesIntroduce}>
      <HeaderLine chinese="接单需求" english="ORDER RECEIVING DEMAND" />
      <ul className={styles.content}>
        <li className={styles.product}>
          <div className={styles.left}>
            <Icon type="jack-cplb1" className={styles.icon} />
            <span className={styles.subTitle}>产品类别</span>
          </div>
          <div className={styles.right}>
            <ul className={styles.classes}>
              <li className={styles.classesLi}>
                <Badge
                  color="blue"
                  text="主营类别"
                  className={styles.classesSubtitle}
                />
                <span className={classNames(styles.strongText, styles.mainBox)}>
                  {isEmpty(mainList) ? '--' : mainList.join('，')}
                </span>
              </li>
              <li className={styles.classesLi}>
                <Badge
                  color="blue"
                  text="擅长产品品类"
                  className={styles.classesSubtitle}
                />
                <span className={styles.strongText}>
                  {currentFactory.mainProductCategoriesDesc
                    ? currentFactory.mainProductCategoriesDesc
                    : '--'}
                </span>
              </li>
              <li className={styles.classesLi}>
                <Badge
                  color="blue"
                  text="产品档次"
                  className={styles.classesSubtitle}
                />
                <span className={styles.strongText}>{grade}</span>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type="jack-scfs" className={styles.icon} />
            <span className={styles.subTitle}>生产方式</span>
          </div>
          <div className={styles.right}>
            {productionModeOptions.find(
              item => item.value == currentFactory.productionMode
            )
              ? productionModeOptions.find(
                  item => item.value == currentFactory.productionMode
                ).label
              : '--'}
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type="jack-jdlx" className={styles.icon} />
            <span className={styles.subTitle}>接单类型</span>
          </div>
          <div className={styles.right}>
            {isEmpty(orderType)
              ? '--'
              : orderType.map(item => item.label).join('、')}
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type="jack-qdl" className={styles.icon} />
            <span className={styles.subTitle}>起订量</span>
          </div>
          <div className={styles.right}>
            最少起订量{checkValue(currentFactory.moq)}件
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type="jack-jdls" className={styles.icon} />
            <span className={styles.subTitle}>接单历史说明</span>
          </div>
          <div className={styles.right}>
            {checkValue(currentFactory.receiveOrderHistoryDesc)}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default OrderInfo
