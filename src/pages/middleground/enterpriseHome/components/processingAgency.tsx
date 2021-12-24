import React, { useState } from 'react'
import styles from './todo.module.less'
import { Button } from 'antd'
import { Icon } from '@/components' //路径
import { useHistory } from 'react-router-dom'
import { useStores } from '@/utils/mobx'

function processingAgency({
  enterpriseId,
  name,
  enterpriseStatus,
  information
}) {
  const { demandListStore } = useStores()
  const [cnformationIgnore, setInformationIgnore] = useState<any>(true) //信息隐藏
  const [certificateNeglect, setCertificateNeglect] = useState<any>(true) //证件隐藏
  const { push } = useHistory()
  const { ignorePrompt } = demandListStore
  const ignore = async type => {
    if (type === 'information') {
      await ignorePrompt({
        enterpriseId: enterpriseId,
        isIgnoreInfoApproval: 1
      })
      setInformationIgnore(false)
    }
    if (type === 'certificates') {
      await ignorePrompt({
        enterpriseId: enterpriseId,
        isIgnoreCertificateApproval: 1
      })
      setCertificateNeglect(false)
    }
  }
  const findOrder = () => {
    push({ pathname: '/order-search' })
  }
  const certificates = () => {
    push({ pathname: '/control-panel/panel/certificate' })
  }
  return (
    <div>
      <div>
        {/* //通过 */}
        {enterpriseStatus === '1' && information.isIgnoreInfoApproval !== 1 ? (
          // 点击忽略后 隐藏改信息
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
                      (加工厂),您好，您提供的企业信息已审批通过，您可以使用平台相应的功能
                    </div>
                  </div>
                  <div className={styles.btn}>
                    <Button
                      type="primary"
                      ghost
                      onClick={() => {
                        findOrder()
                      }}
                    >
                      找订单
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

        {/* //不通过 */}
        {enterpriseStatus === '0' ? (
          <div className={styles.content}>
            <div className={styles.icons}>
              <Icon type="jack-xttz_icon" className={styles.previous} />
            </div>
            <div className={styles.txts}>
              <div className={styles.test}>
                <div className={styles.announcement}>系统通知</div>
                <div className={styles.written}>
                  尊敬的【{name}】
                  (加工厂)您好，您提交的企业信息审批不通过，请您前往
                  <span className={styles.cont}>企业信息</span>
                  ,查看审批失败原因并修改重新提交
                </div>
              </div>
              <div className={styles.btn}>
                <Button type="primary" ghost>
                  立即前往
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {/* //曝光度 */}
        {enterpriseStatus === '1' &&
        information.isIgnoreCertificateApproval !== 1 ? (
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
                      (加工厂)您好，您可以进行企业证件认证，提高您的工厂曝光度。
                    </div>
                  </div>
                  <div className={styles.btn}>
                    <Button type="primary" onClick={certificates} ghost>
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
      </div>
    </div>
  )
}

export default processingAgency
