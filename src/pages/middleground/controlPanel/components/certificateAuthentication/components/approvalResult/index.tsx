import React, { useState, useEffect } from 'react'
import { Result, Button } from 'antd'
import { get } from 'lodash'
import moment from 'moment'
import axios from '@/utils/axios'
import { getUserInfo } from '@/utils/tool'
// import { useHistory } from 'react-router'
import { Icon } from '@/components'
import styles from './index.module.less'

const titleMap = {
  pending: '提交成功，请等待审批',
  approval: '审批通过',
  noPass: '审批不通过'
}

const iconMap = {
  pending: <Icon className={styles.statusIcon} type="jack-ddsp" />,
  approval: <Icon className={styles.statusIcon} type="jack-sptg" />,
  noPass: <Icon className={styles.statusIcon} type="jack-spbtg" />
}

const statusMap = {
  '0': 'noPass',
  '1': 'approval',
  '2': 'pending',
  '3': 'pending'
}

const ApprovalResult = props => {
  const { submit } = props
  // const history = useHistory()
  const currentUser = getUserInfo() || {}
  const [status, setStatus] = useState('pending')
  // const [start, setStart] = useState(0)
  // const [end, setEnd] = useState(2)
  const [subTitleMap, setSubTitleMap] = useState<any>({})

  // const enterpriseInfo = JSON.parse(localStorage.getItem('enterpriseInfo')) || {}

  const getApprovalResult = () => {
    axios
      .get(
        '/api/factory/enterprise/get-enterprise-certificate-approval-result',
        {
          enterpriseId: currentUser.enterpriseId
        }
      )
      .then(response => {
        const { success, data } = response
        console.log('请求时间测试', data)

        if (success) {
          const {
            approvalStatus: approvalStatus,
            approvalDesc,
            requestCertificateApprovalTime
          } = data
          const newCurrentUser = { ...currentUser, approvalStatus }
          localStorage.setItem('userInfo', JSON.stringify(newCurrentUser))
          const newStatus = get(statusMap, approvalStatus)
          setStatus(newStatus)
          // setStart(newStatus === 'approval' ? 1 : 0)
          // setEnd(newStatus === 'noPass' ? 1 : 2)
          setSubTitleMap({
            pending: (
              <div className={styles.pending}>
                <div className={styles.subTitle}>
                  您的企业信息审核请求已收到，平台将在1~3个工作日与您取得联系，请注意接听来电。
                </div>
                <div className={styles.time}>
                  <Icon type="jack-shijian" />
                  请求时间
                  {moment(requestCertificateApprovalTime).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                </div>
              </div>
            ),
            approval: (
              <div className={styles.subTitle}>
                恭喜您，企业信息审核通过，已为您开通企业权限。
              </div>
            ),
            noPass: (
              <div className={styles.pending}>
                <div className={styles.subTitle}>
                  <Icon type="jack-cwyy" /> {'   '}
                  错误原因如下：
                </div>
                <div className={styles.time}>{approvalDesc}</div>
              </div>
            )
          })
        }
      })
  }
  useEffect(() => {
    getApprovalResult()
  }, [])

  return (
    <div className={styles.approvalResult}>
      <Result
        // status={status === 'noPass' ? 'error' : 'success'}
        icon={get(iconMap, status)}
        title={get(titleMap, status)}
        subTitle={get(subTitleMap, status)}
        extra={[
          <Button
            key="console"
            className={styles.perStep}
            onClick={() => submit(0)}
          >
            上一步
          </Button>
        ]}
        // extra={[
        //   <Button
        //     key="console"
        //     className={styles.perStep}
        //     onClick={() => submit(0)}
        //   >
        //     上一步
        //   </Button>,
        //   <Button
        //     type="primary"
        //     className={styles.confirm}
        //     key="buy"
        //     onClick={() => {
        //       history.push('/control-panel/enterprise')
        //     }}
        //   >
        //     确认
        //   </Button>
        // ].slice(start, end)}
      />
    </div>
  )
}

export default ApprovalResult
