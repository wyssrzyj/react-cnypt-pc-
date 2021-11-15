import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import styles from './index.module.less'
import { observer, toJS, useStores } from '@/utils/mobx'
import { getTrees } from '../../method'
import { isEmpty } from 'lodash'
function index({ initialValues, enterpriseType }) {
  {
    /* 0 加工厂 1 发单商   只有加工厂才能看到form */
  }

  const { contactPerson, contactPersonMobile, address, isContactPublic } =
    initialValues

  const { commonStore } = useStores()
  const { allArea } = commonStore
  const [treeData, setTreeData] = useState([])

  useEffect(() => {
    // 地区要求的获取
    if (initialValues.location && !isEmpty(toJS(allArea))) {
      console.log('地址', initialValues.location)
      console.log('地图', toJS(allArea))
      console.log(
        getTrees(initialValues.location, toJS(allArea), 'value', 'label')
      )

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
              {treeData[0] !== undefined
                ? ` ${treeData.join('-')}-${address}`
                : '暂无'}
            </span>
          </div>
        </Col>
      </Row>

      {+enterpriseType === 1 ? (
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
      ) : (
        <div>
          <Row>
            {+isContactPublic === 1 ? (
              <>
                <Col span={12}>
                  <div className={styles.title}>
                    订单联系人:
                    <span className={styles.contents}>{contactPerson}</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.title}>
                    联系人电话:
                    <span className={styles.content}>
                      {contactPersonMobile}
                    </span>
                  </div>
                </Col>
              </>
            ) : null}
            {+isContactPublic === 2 ? (
              <>
                <Col span={12}>
                  <div className={styles.title}>
                    订单联系人:
                    <span className={styles.contents}>
                      {'提交订单后可查看'}
                    </span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.title}>
                    联系人电话:
                    <span className={styles.content}>
                      <span>{'提交订单后可查看'}</span>
                    </span>
                  </div>
                </Col>
              </>
            ) : null}
          </Row>
        </div>
      )}
    </div>
  )
}

export default observer(index)
