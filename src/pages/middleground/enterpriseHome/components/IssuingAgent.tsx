import React, { useState } from 'react'
import styles from './todo.module.less'
import { Button } from 'antd'
import { Icon } from '@/components' //路径
import { useHistory } from 'react-router-dom'

import { useStores } from '@/utils/mobx'

function processingAgency({ enterpriseId, name, data }) {
  const history = useHistory()

  const { demandListStore } = useStores()
  const [cnformationIgnore, setInformationIgnore] = useState<any>(true) //信息隐藏
  const [certificateNeglect, setCertificateNeglect] = useState<any>(true) //证件隐藏

  const { ignorePrompt } = demandListStore
  const ignore = async type => {
    // 信息
    if (type === 'information') {
      await ignorePrompt({
        enterpriseId: enterpriseId,
        isIgnoreInfoApproval: 1
      })
      setInformationIgnore(false)
    }
    //证件忽略
    if (type === 'certificates') {
      await ignorePrompt({
        enterpriseId: enterpriseId,
        isIgnoreCertificateApproval: 1
      })
      setCertificateNeglect(false)
    }
  }
  const findOrder = e => {
    if (e === 1) {
      history.push({ pathname: '/control-panel/panel/certificate' })
    }
    if (e === 2) {
      history.push({ pathname: '/control-panel/issuerBill/demand-sheet' })
    }
    if (e === 3) {
      history.push({ pathname: '/control-panel/panel/enterprise' })
    }
  }
  return (
    <div>
      <div>
        {/* 证件 */}
        {data.infoApprovalStatus === '1' &&
        data.isIgnoreCertificateApproval !== 1 ? (
          <>
            {certificateNeglect ? (
              <div className={styles.content}>
                <div className={styles.icons}>
                  <Icon type="jack-xttz_icon" className={styles.previous} />
                </div>
                <div className={styles.txts}>
                  <div className={styles.test}>
                    <div className={styles.announcement}>系统通知</div>
                    <div className={styles.written}>
                      尊敬的【{name}】
                      (发单商),您好，您还可以进行企业证件认证，提高您的订单曝光度
                    </div>
                  </div>
                  <div className={styles.btn}>
                    <Button
                      type="primary"
                      onClick={() => {
                        findOrder(1)
                      }}
                      ghost
                    >
                      立即前往
                    </Button>
                    <div
                      className={styles.ignore}
                      onClick={() => {
                        ignore('certificates')
                      }}
                    >
                      忽略
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        ) : null}

        {/* 信息通过 */}
        {data.infoApprovalStatus === '1' && data.isIgnoreInfoApproval !== 1 ? (
          <>
            {cnformationIgnore ? (
              <div className={styles.content}>
                <div className={styles.icons}>
                  <Icon type="jack-xttz_icon" className={styles.previous} />
                </div>
                <div className={styles.txts}>
                  <div className={styles.test}>
                    <div className={styles.announcement}>系统通知</div>
                    <div className={styles.written}>
                      尊敬的【{name}】
                      (发单商)您好，您提交的企业信息审批已通过，您可以使用平台相应的功能
                    </div>
                  </div>
                  <div className={styles.btn}>
                    <Button
                      type="primary"
                      onClick={() => {
                        findOrder(2)
                      }}
                      ghost
                    >
                      立即发单
                    </Button>
                    <div
                      className={styles.ignore}
                      onClick={() => {
                        ignore('information')
                      }}
                    >
                      忽略
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        ) : null}

        {/* 信息不通过 */}
        {data.infoApprovalStatus === '0' ? (
          <div className={styles.content}>
            <div className={styles.icons}>
              <Icon type="jack-xttz_icon" className={styles.previous} />
            </div>
            <div className={styles.txts}>
              <div className={styles.test}>
                <div className={styles.announcement}>系统通知</div>
                <div className={styles.written}>
                  尊敬的【{name}】
                  (发单商)您好，您提交的企业信息审批不通过，请您前往
                  <span className={styles.cont}>企业信息</span>
                  ,查看审批失败原因并修改重新提交
                </div>
              </div>
              <div className={styles.btn}>
                <Button
                  type="primary"
                  onClick={() => {
                    findOrder(3)
                  }}
                  ghost
                >
                  立即前往
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default processingAgency
