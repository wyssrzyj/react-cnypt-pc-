import React, { useState, useEffect } from 'react'
import { Badge, Tooltip } from 'antd'
import { filter, find, isEmpty } from 'lodash'
import { toJS, useStores } from '@/utils/mobx'
import { getTrees } from './method'
import classNames from 'classnames'
import axios from '@/utils/axios'
import {
  // getProductMode,
  checkValue
} from '@/utils/tool'
import { Icon } from '@/components'
import HeaderLine from '../headerLine'
import styles from './index.module.less'

const OrderInfo = props => {
  const { commonStore, demandListStore } = useStores()
  const { gradingOfProducts } = demandListStore

  const { dictionary } = commonStore
  const { productType = [], processType = [] } = toJS(dictionary)
  const { factoryId } = props
  // const productClassOptions = getProductClassMap()
  // const productionModeOptions = getProductMode()
  const [currentFactory, setCurrentFactory] = useState<any>({})
  const [mainList, setMainList] = useState<any>([])
  const [orderType, setOrderType] = useState<any>([])
  const [grade, setGrade] = useState<string>('--')
  const [treeData, setTreeData] = useState<any>([])
  const [production, setProduction] = useState<any>([])

  useEffect(() => {
    getOrderReceiving()
  }, [treeData])
  useEffect(() => {
    gradeS()
  }, [])
  const gradeS = async () => {
    let res = await gradingOfProducts() //订单档次
    if (res.code === 200) {
      setTreeData(res.data)
    }
  }

  const getOrderReceiving = () => {
    axios
      .get('/api/factory/info/get-detail-receive-order-desc', {
        factoryId
      })
      .then(response => {
        const { success, data } = response

        if (success) {
          const {
            factoryCategoryList,
            factoryProcessTypeList,
            productGradeValues
          } = data
          setCurrentFactory({ ...data })
          if (factoryCategoryList) {
            const newLabel = factoryCategoryList.map(item => `${item.name}`)
            setMainList([...newLabel])
          }
          if (factoryProcessTypeList) {
            const newOrderType = filter(processType, function (o) {
              return find(factoryProcessTypeList, function (item) {
                return item.processType === o.value
              })
            })
            console.log('加工类型newOrderType', newOrderType)

            setOrderType([...newOrderType])
          }
          // 产品档次
          if (treeData.length > 0) {
            setGrade(
              getTrees(productGradeValues, treeData, 'value', 'label').join(
                '、'
              )
            )
          }
          // 生产方式
          if (data.productTypeValues) {
            setProduction(
              getTrees(
                data.productTypeValues,
                productType,
                'value',
                'label'
              ).join('、')
            )
          }
        }
      })
  }

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
                <Tooltip placement="top" title={grade}>
                  <div className={styles.hidden}>
                    <span className={styles.strongText}>{grade}</span>
                  </div>
                </Tooltip>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type="jack-scfs" className={styles.icon} />
            <span className={styles.subTitle}>生产方式</span>
          </div>
          <div className={styles.right}>{production ? production : '--'}</div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type="jack-jdlx" className={styles.icon} />
            <span className={styles.subTitle}>加工类型</span>
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
