import React, { useEffect, useState } from 'react'
import { Col, Row, Tooltip } from 'antd'
import { toJS, useStores } from '@/utils/mobx'
import { getTrees } from '../../method'

import styles from './index.module.less'

function index({ initialValues, enterpriseType }) {
  const {
    isEnterpriseInfoPublic,
    name,
    effectiveLocation,
    otherRequirement,
    enterpriseName
  } = initialValues

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
          {/* 0 加工厂 1 发单商  发单商可以看到所有的信息，加工厂需要根据是否公开才能看 */}
          <div className={styles.title}>
            订单标题：
            <Tooltip placement="top" title={name}>
              <span className={styles.contents}>{name}</span>
            </Tooltip>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.title}>
            有效车位：
            <span className={styles.contests}>{parkingLot}</span>
          </div>
        </Col>
      </Row>
      <Row>
        {+enterpriseType === 1 ? (
          <Col span={12}>
            <div className={styles.title}>
              企业名称:
              <span className={styles.content}>
                {enterpriseName ? enterpriseName : '暂无'}
              </span>
            </div>
          </Col>
        ) : (
          <Col span={12}>
            <div className={styles.title}>
              企业名称:
              {isEnterpriseInfoPublic === 1 ? (
                <span className={styles.content}>{enterpriseName}</span>
              ) : (
                <span className={styles.content}>暂不公开</span>
              )}
            </div>
          </Col>
        )}

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
      </Row>
      <Row>
        <Col span={12}>
          <Tooltip placement="top" title={otherRequirement}>
            <div className={styles.title}>
              其他要求:
              <span className={styles.content}>
                {otherRequirement ? otherRequirement : '暂无'}
              </span>
            </div>
          </Tooltip>
        </Col>
      </Row>
    </div>
  )
}

export default index
