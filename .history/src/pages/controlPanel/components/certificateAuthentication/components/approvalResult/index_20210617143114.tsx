import React, { useState, useEffect } from 'react'
import { Result, Button } from 'antd'
import { get } from 'lodash'
import axios from '@/utils/axios'

const titleMap = {
  pending: '提交成功，请等待审批',
  approval: '审批通过',
  noPass: '审批不通过'
}
const subTitleMap = {
  pending:
    '您的企业信息审核请求已收到，平台将在1~3个工作日与您取得联系，请注意接听来电。请求时间  2021年06月31日  17时06分',
  approval: '恭喜您，企业信息审核通过，已为您开通企业权限。',
  noPass: <div></div>
}

const statusMap = { '0': 'noPass', '1': 'approval', '2': 'pending' }

const ApprovalResult = props => {
  const { submit } = props
  const [status, setStatus] = useState('pending')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(2)
  // const [failDes, setFailDes] = useState('')

  const enterpriseInfo =
    JSON.parse(localStorage.getItem('enterpriseInfo')) || {}

  const getApprovalResult = () => {
    axios
      .get('/api/factory/enterprise/get-enterprise-approval-result', {
        enterpriseId: enterpriseInfo.enterpriseId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          const { approvalStatus, approvalDesc } = data
          setStatus(get(statusMap, approvalStatus))
          // setFailDes(approvalDesc)
          setStart(status === 'approval' ? 1 : 0)
          setEnd(status === 'noPass' ? 1 : 2)
          subTitleMap.noPass = (
            <div>
              <div>
                您的企业信息审核不通过，请根据错误原因重新上传对应信息。原因如下：
              </div>
              <div>{approvalDesc}</div>
            </div>
          )
        }
      })
  }
  useEffect(() => {
    getApprovalResult()
  }, [])

  return (
    <div>
      <Result
        status={status === 'noPass' ? 'error' : 'success'}
        title={get(titleMap, status)}
        subTitle={get(subTitleMap, status)}
        extra={[
          <Button type="primary" key="console" onClick={() => submit(0)}>
            返回上一页
          </Button>,
          <Button type="primary" key="buy">
            确认
          </Button>
        ].slice(start, end)}
      />
    </div>
  )
}

export default ApprovalResult
