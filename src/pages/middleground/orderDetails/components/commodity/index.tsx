import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import styles from './index.module.less'
import { toJS, useStores } from '@/utils/mobx'
import { getTrees } from '../../method'

function index({ initialValues }) {
  const {
    categoryId,
    plusMaterialType,
    goodsPrice,
    processTypeList,
    goodsRemark,
    stylePicture
  } = initialValues

  const { factoryStore, commonStore } = useStores()
  const { productCategoryList } = factoryStore
  const { dictionary } = commonStore
  const {
    goodsNum = [],
    materialType = [],
    inquiryProcessType = []
  } = toJS(dictionary) //字典

  const [productCategory, setProductCategory] = useState([]) //商品品类
  const [issue, setIssue] = useState([]) //发单量
  const [fabric, setFabric] = useState() //面料
  const [orderReceiving, setOrderReceiving] = useState([]) //接单类型

  useEffect(() => {
    //商品品类
    if (categoryId) {
      setProductCategory(
        getTrees(categoryId, toJS(productCategoryList), 'id', 'name')
      )
    }
    //发单量
    if (initialValues.goodsNum) {
      setIssue(
        goodsNum.filter(item => item.value === initialValues.goodsNum)[0].label
      )
    }
    //面料
    if (plusMaterialType) {
      setFabric(
        materialType.filter(item => item.value === plusMaterialType)[0].label
      )
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
          <div className={styles.title}>
            商品品类:
            <span className={styles.content}>{productCategory.join('、')}</span>
          </div>
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
            <span className={styles.content}>{fabric}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.title}>
            目标单价: <span className={styles.content}>{goodsPrice}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className={styles.title}>
            接单类型:
            <span className={styles.content}>{orderReceiving.join('、')}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.title}>
            备注说明: <span className={styles.content}>{goodsRemark}</span>
          </div>
        </Col>
      </Row>
      <div className={styles.title}>
        款图:
        <span className={styles.content}>
          {stylePicture !== undefined && stylePicture.length > 0 ? (
            stylePicture.map((v, i) => (
              <img key={i} className={styles.img} src={v} alt="" />
            ))
          ) : (
            <span className={styles.wu}>暂无</span>
          )}
        </span>
      </div>
    </div>
  )
}

export default index
