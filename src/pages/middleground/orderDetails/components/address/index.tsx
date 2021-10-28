import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import styles from './index.module.less'
import { toJS, useStores } from '@/utils/mobx'
import { getTrees } from '../../method'

function index({ initialValues }) {
  const { contactPerson, contactPersonMobile, address } = initialValues

  const { commonStore } = useStores()
  const { allArea } = commonStore
  const [treeData, setTreeData] = useState([])

  useEffect(() => {
    // 地区要求的获取
    if (initialValues.location) {
      const res = getTrees(
        initialValues.location,
        toJS(allArea),
        'value',
        'label'
      )
      setTreeData(res)
    }
  }, [initialValues, allArea])

  return (
    <div>
      <Row>
        <Col span={12}>
          <div className={styles.title}>
            收货地址:
            <span className={styles.content}>
              {console.log(treeData)}
              {treeData.length == 0
                ? `${treeData.join('-')}-${address}`
                : '暂无'}
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className={styles.title}>
            订单联系人:
            <span className={styles.contents}>{contactPerson}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.title}>
            联系人电话:
            <span className={styles.content}>{contactPersonMobile}</span>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default index
