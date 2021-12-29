import React from 'react'
import { Button } from 'antd'
import styles from './todo.module.less'
import { Icon } from '@/components' //路径
import { Tooltip } from 'antd'
import { isNil, isEmpty } from 'lodash'
import { useHistory } from 'react-router-dom'

function IssuingData({ issuingData }) {
  const history = useHistory()
  let map = new Map()
  map.set(-1, '草稿箱')
  map.set(1, '生效中')
  map.set(-2, '审核失败')
  map.set(-3, '已结束')
  const findOrder = () => {
    history.push({
      pathname: '/control-panel/issuerBill/demand-applicationList'
    })
  }

  return (
    <div>
      <div>
        {!isNil(issuingData) && !isEmpty(issuingData) ? (
          <>
            {issuingData.map(item => (
              <div className={styles.content} key={item.id}>
                <div className={styles.icons}>
                  <Icon type="jack-gcmc_icon" className={styles.previous} />
                </div>
                <div className={styles.txtF}>
                  <div className={styles.test}>
                    <div className={styles.announcement}>
                      {item.enterpriseName}
                      <div className={styles.tip}>申请接单</div>
                    </div>
                    <div className={styles.written}>
                      <div className={styles.data}>
                        <div className={styles.subject}>
                          <Tooltip placement="top" title={item.factoryDistrict}>
                            所在地区&nbsp;　&nbsp;
                            <span className={styles.typeface}>
                              {item.factoryDistrict}
                            </span>
                          </Tooltip>
                        </div>
                        <div className={styles.subject}>
                          <Tooltip
                            placement="top"
                            title={item.factoryCategoryList}
                          >
                            主营类别&nbsp;　&nbsp;
                            <span className={styles.typeface}>
                              {item.factoryCategoryList}
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                      <div className={styles.data}>
                        <div className={styles.subject}>
                          <Tooltip placement="top" title={item.staffNumber}>
                            人数&nbsp;&nbsp;　&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className={styles.typeface}>
                              {item.staffNumber}
                            </span>
                          </Tooltip>
                        </div>
                        <div className={styles.subject}>
                          <Tooltip
                            placement="top"
                            title={item.processTypeValues}
                          >
                            加工类型&nbsp;　&nbsp;
                            <span className={styles.typeface}>
                              {item.processTypeValues}
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                      <div className={styles.data}>
                        <div className={styles.subject}>
                          <Tooltip placement="top" title={item.contactsMobile}>
                            联系方式&nbsp;　&nbsp;
                            <span className={styles.typeface}>
                              {item.contactsMobile}
                            </span>
                          </Tooltip>
                        </div>
                        <div className={styles.subject}>
                          <Tooltip placement="top" title={item.contactsEmail}>
                            电子邮箱&nbsp;　&nbsp;
                            <span className={styles.typeface}>
                              {item.contactsEmail}
                            </span>
                          </Tooltip>
                        </div>
                      </div>

                      <div className={styles.companys}>
                        <div className={styles.subject}>
                          订单名称　&nbsp;&nbsp;<span>{item.name}</span>
                        </div>
                        <div className={styles.orderStatus}>
                          订单状态　&nbsp;&nbsp;
                          <span>{map.get(item.inquiryStatus)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.btn}>
                    <Button
                      type="primary"
                      onClick={() => {
                        findOrder()
                      }}
                      ghost
                    >
                      前往处理
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default IssuingData
