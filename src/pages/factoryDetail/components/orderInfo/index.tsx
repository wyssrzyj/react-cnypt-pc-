import React, { useState, useEffect } from 'react'
import { Badge } from 'antd'
import { filter, find } from 'lodash'
import axios from '@/utils/axios'
import { getTypeOptions, getProductClass, getProductMode } from '@/utils/tool'
import { Icon } from '@/components'
import styles from './index.module.less'

const OrderInfo = props => {
  const { factoryId } = props
  const productClassOptions = getProductClass()
  const productionModeOptions = getProductMode()
  const [currentFactory, setCurrentFactory] = useState<any>({})
  const [mainList, setMainList] = useState<any>([])
  const [orderType, setOrderType] = useState<any>([])

  const getOrderReceiving = () => {
    const typeOptions = getTypeOptions()
    axios
      .get('/api/factory/info/get-detail-receive-order-desc', {
        factoryId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          const { factoryCategoryList, factoryProcessTypeList } = data
          setCurrentFactory({ ...data })
          const newLabel = factoryCategoryList.map(item => `${item.name}（${item.remark}）`)
          setMainList([...newLabel])
          const newOrderType = filter(typeOptions, function (o) {
            return find(factoryProcessTypeList, function (item) {
              return item.processType === o.value
            })
          })
          setOrderType([...newOrderType])
        }
      })
  }

  useEffect(() => {
    getOrderReceiving()
  }, [])

  return (
    <div className={styles.companiesIntroduce}>
      <header className={styles.header}>
        <div>
          <span className={styles.textCn}>生产接单介绍</span>
          <span className={styles.textEn}>INTRODUCTION OF PRODUCTION ORDER RECEIVING</span>
        </div>
      </header>
      <ul className={styles.content}>
        <li className={styles.product}>
          <div className={styles.left}>
            <Icon type="jack-cplb1" className={styles.icon} />
            <span className={styles.subTitle}>产品类别</span>
          </div>
          <div className={styles.right}>
            <ul className={styles.classes}>
              <li className={styles.classesLi}>
                <Badge color="blue" text="主营类别" className={styles.classesSubtitle} />
                <span>{mainList.join('，')}</span>
              </li>
              <li className={styles.classesLi}>
                <Badge color="blue" text="擅长产品品类" className={styles.classesSubtitle} />
                <span>{currentFactory.mainProductCategoriesDesc ? currentFactory.mainProductCategoriesDesc : '--'}</span>
              </li>
              <li className={styles.classesLi}>
                <Badge color="blue" text="产品档次" className={styles.classesSubtitle} />
                <span>
                  {productClassOptions.find(item => item.value == currentFactory.clothesGrade)
                    ? productClassOptions.find(item => item.value == currentFactory.clothesGrade).label
                    : '--'}
                </span>
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
            {productionModeOptions.find(item => item.value == currentFactory.productionMode)
              ? productionModeOptions.find(item => item.value == currentFactory.productionMode).label
              : '--'}
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type="jack-jdlx" className={styles.icon} />
            <span className={styles.subTitle}>接单类型</span>
          </div>
          <div className={styles.right}>{orderType.map(item => item.label).join('、')}</div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type="jack-qdl" className={styles.icon} />
            <span className={styles.subTitle}>起订量</span>
          </div>
          <div className={styles.right}>最少起订量{currentFactory.moq ? currentFactory.moq : '--'}件</div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type="jack-jdls" className={styles.icon} />
            <span className={styles.subTitle}>接单历史说明</span>
          </div>
          <div className={styles.right}>{currentFactory.receiveOrderHistoryDesc ? currentFactory.receiveOrderHistoryDesc : '无'}</div>
        </li>
      </ul>
    </div>
  )
}

export default OrderInfo
