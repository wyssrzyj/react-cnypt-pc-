import React, { useState } from 'react'
import { Steps } from 'antd'
import { IdcardFilled, CarryOutFilled } from '@ant-design/icons'
import { CertificateInformation, ApprovalResult } from './components'
import Title from '../title'
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
