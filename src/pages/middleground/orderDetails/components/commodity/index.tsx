import React, { useEffect, useState } from 'react'
import { Col, Row, Tooltip } from 'antd'
import styles from './index.module.less'
import { observer, toJS, useStores } from '@/utils/mobx'
import { getTrees } from '../../method'

import { matchGoodValue } from '@/utils/tool'

function index({ initialValues }) {
  const {
    categoryId,
    // plusMaterialType,
    goodsPrice,
    processTypeList,
    goodsRemark,
    stylePicture
  } = initialValues

  const { factoryStore, commonStore } = useStores()
  const { productCategoryList, productCategory } = factoryStore
  const { dictionary } = commonStore
  const {
    goodsNum = [],
    plusMaterialType = [],
    inquiryProcessType = []
  } = toJS(dictionary) //字典

  const [productCategoric, setProductCategoric] = useState([]) //商品品类
  const [issue, setIssue] = useState([]) //发单量
  const [fabric, setFabric] = useState<any>() //面料
  const [orderReceiving, setOrderReceiving] = useState([]) //接单类型
  // 商品品类 接口
  const api = async () => {
    await productCategory()
  }

  useEffect(() => {
    api()
    //商品品类
    if (categoryId) {
      setProductCategoric(matchGoodValue(toJS(productCategoryList), categoryId))
    }
    //发单量
    if (initialValues.goodsNum) {
      setIssue(
        goodsNum.filter(item => item.value === initialValues.goodsNum)[0].label
      )
    }
    //面料
    if (plusMaterialType) {
      let res = plusMaterialType.filter(
        item => item.value === initialValues.plusMaterialType
      )[0]
      if (res) {
        setFabric(res.label)
      }
    }
    //接单类型
    if (processTypeList) {
      setOrderReceiving(
        getTrees(processTypeList, inquiryProcessType, 'value', 'label')
      )
    }
  }, [initialValues])

  return (
    <div>
      <Row>
        <Col span={12}>
          <Tooltip placement="top" title={productCategoric}>
            <div className={styles.title}>
              商品品类:
              <span className={styles.content}>{productCategoric}</span>
            </div>
          </Tooltip>
        </Col>
        <Col span={12}>
          <div className={styles.title}>
            发单量: <span className={styles.contents}>{issue}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className={styles.title}>
            面料类型:
            <span className={styles.content}>{fabric ? fabric : '暂无'}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.title}>
            目标单价:
            <span className={styles.content}>
              {goodsPrice ? goodsPrice : '暂无'}
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Tooltip placement="top" title={orderReceiving.join('、')}>
            <div className={styles.title}>
              接单类型:
              <span className={styles.content}>
                {orderReceiving.join('、')}
              </span>
            </div>
          </Tooltip>
        </Col>
        <Col span={12}>
          <Tooltip placement="top" title={goodsRemark}>
            <div className={styles.title}>
              备注说明:
              <span className={styles.content}>
                {goodsRemark ? goodsRemark : '暂无'}
              </span>
            </div>
          </Tooltip>
        </Col>
      </Row>
      <div className={styles.titles}>
        款图:
        <div className={styles.content}>
          {stylePicture !== undefined && stylePicture.length > 0 ? (
            stylePicture.map((v, i) => (
              <img key={i} className={styles.img} src={v} alt="" />
            ))
          ) : (
            <span className={styles.wu}>暂无</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default observer(index)
