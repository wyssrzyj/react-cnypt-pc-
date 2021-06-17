import React, { useEffect } from 'react'
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
  noPass: '您的企业信息审核不通过，请根据错误原因重新上传对应信息。原因如下：'
}

const ApprovalResult = props => {
  const { status, submit } = props
  const start = status === 'approval' ? 1 : 0
  const end = status === 'noPass' ? 1 : 2
  const enterpriseInfo =
    JSON.parse(localStorage.getItem('enterpriseInfo')) || {}

  const getApprovalResult = () => {
    axios
      .get('/api/factory/enterprise/get-enterprise-approval-result', {
        enterpriseId: enterpriseInfo.enterpriseId
      })
      .then(response => {
        console.log(
          '🚀 ~ file: index.tsx ~ line 30 ~ getApprovalResult ~ response',
          response
        )
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
