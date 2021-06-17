import React, { useState } from 'react'
import { Steps } from 'antd'
import { CertificateInformation, ApprovalResult } from './components'
import styles from './index.module.less'

const { Step } = Steps

const CertificateAuthentication = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

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
      {currentStep === 1 && (
        <ApprovalResult status="noPass" submit={handleSubmit} />
      )}
    </div>
  )
}

export default CertificateAuthentication
