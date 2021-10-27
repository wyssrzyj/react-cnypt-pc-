import React, { useEffect, useState } from 'react'
import { Col, Row, Tooltip } from 'antd'
import { toJS, useStores } from '@/utils/mobx'
import { getTrees } from '../../method'

import styles from './index.module.less'

function index({ initialValues }) {
  const { name, effectiveLocation, otherRequirement } = initialValues

  const { commonStore } = useStores()
  const { allArea, dictionary } = commonStore
  const { factoryEffectiveLocation = [] } = toJS(dictionary) //有效车位

  const [treeData, setTreeData] = useState([])
  const [parkingLot, setParkingLot] = useState<any>()

  useEffect(() => {
    // 地区要求的获取
    if (initialValues.regionalIdList) {
      initialValues.regionalIdList = getTrees(
        initialValues.regionalIdList,
        toJS(allArea),
        'value',
        'label'
      )
      setTreeData(initialValues.regionalIdList)
    } else {
      setTreeData((initialValues.regionalIdList = ['全国']))
    }
    // 车位的获取
    if (factoryEffectiveLocation) {
      const res = factoryEffectiveLocation.filter(
        item => item.value === effectiveLocation
      )
      if (res[0] !== undefined) {
        setParkingLot(res[0].label)
      }
    }
  }, [initialValues, allArea])

  return (
    <div>
      <Row>
        <Col span={12}>
          <div className={styles.title}>
            订单标题 <span className={styles.content}>{name}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.title}>
            有效车位
            <span className={styles.content}>{parkingLot}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Tooltip placement="top" title={treeData.join('、')}>
            <div className={styles.hidden}>
              地区要求:
              <span className={styles.content}>
                {treeData ? treeData.join('、') : '暂无'}
              </span>
            </div>
          </Tooltip>
        </Col>
        <Col span={12}>
          <div className={styles.title}>
            其他要求
            <span className={styles.content}> {otherRequirement}</span>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default index
