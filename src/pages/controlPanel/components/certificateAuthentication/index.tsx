import React, { useState, useEffect } from 'react'
import { Steps } from 'antd'
import { IdcardFilled, CarryOutFilled } from '@ant-design/icons'
import { CertificateInformation, ApprovalResult } from './components'
import Title from '../title'
import axios from '@/utils/axios'
import { getUserInfo } from '@/utils/tool'
import styles from './index.module.less'

const { Step } = Steps

const CertificateAuthentication = () => {
  const currentUser = getUserInfo() || {}
  // const { certificateApprovalStatus } = currentUser
  const [currentStep, setCurrentStep] = useState<number>(undefined)

  const handleSubmit = step => {
    setCurrentStep(step)
  }

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
        if (success) {
          const { certificateApprovalStatus } = data
          setCurrentStep(certificateApprovalStatus ? 1 : 0)
        }
      })
  }

  useEffect(() => {
    getApprovalResult()
  }, [])

  return (
    <div className={styles.stepsBox}>
      <Title title={'企业证件认证'} />
      <div className={styles.steps}>
        <Steps
          type="navigation"
          size="small"
          className="site-navigation-steps"
          current={currentStep}
        >
          <Step title="证件信息" icon={<IdcardFilled />} />
          <Step title="待审核" icon={<CarryOutFilled />} />
        </Steps>
      </div>

      {currentStep === 0 && <CertificateInformation submit={handleSubmit} />}
      {currentStep === 1 && <ApprovalResult submit={handleSubmit} />}
    </div>
  )
}

export default CertificateAuthentication
