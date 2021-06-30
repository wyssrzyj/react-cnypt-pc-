import React, { useState } from 'react'
import { Steps } from 'antd'
import { CertificateInformation, ApprovalResult } from './components'
import { getUserInfo } from '@/utils/tool'
import styles from './index.module.less'

const { Step } = Steps

const CertificateAuthentication = () => {
  const currentUser = getUserInfo() || {}
  const { approvalStatus } = currentUser
  const [currentStep, setCurrentStep] = useState<number>(approvalStatus ? 1 : 0)

  const handleSubmit = step => {
    setCurrentStep(step)
  }

  return (
    <div>
      <div className={styles.steps}>
        <Steps current={currentStep}>
          <Step title="证件信息" />
          <Step title="待审核" />
        </Steps>
      </div>
      {currentStep === 0 && <CertificateInformation submit={handleSubmit} />}
      {currentStep === 1 && <ApprovalResult submit={handleSubmit} />}
    </div>
  )
}

export default CertificateAuthentication
