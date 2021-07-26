import React from 'react'
import { isEmpty } from 'lodash'
import CompaniesIntroduce from '../companiesIntroduce'
import EnterpriseImage from '../enterpriseImage'
import OrderInfo from '../orderInfo'
import WorkshopEquipment from '../workshopEquipment'
import Digital from '../digital'
import CommercialInfo from '../commercialInfo'
import QualificationCertificate from '../qualificationCertificate'

const EnterpriseInformation = props => {
  const { factoryId, current } = props
  return (
    <div style={{ marginTop: 30, padding: 40, backgroundColor: '#fff' }}>
      {/* 企业介绍 */}
      <CompaniesIntroduce factoryId={factoryId} current={current} />
      {/* 企业照片 */}
      {!isEmpty(current) && <EnterpriseImage current={current} />}
      {/* 接单需求 */}
      <OrderInfo factoryId={factoryId} />
      {/* 车间设备 */}
      <WorkshopEquipment factoryId={factoryId} />
      {/* 数字化情况 */}
      <Digital factoryId={factoryId} />
      {/* 营业执照 */}
      <CommercialInfo factoryId={factoryId} />
      {/* 资质证件 */}
      <QualificationCertificate factoryId={factoryId} />
    </div>
  )
}

export default EnterpriseInformation
