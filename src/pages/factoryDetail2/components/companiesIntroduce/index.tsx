import React from 'react'
import { Tag, Row, Col, Image } from 'antd'
import moment from 'moment'
import { toJS } from 'mobx'
import { isArray } from 'lodash'
import { Icon, NoData } from '@/components'
import { checkValue } from '@/utils/tool'
import { useStores, observer } from '@/utils/mobx'
import HeaderLine from '../headerLine'
import styles from './index.module.less'

const CompaniesIntroduce = props => {
  const { current = {} } = props
  const {
    enterpriseName,
    enterpriseDesc,
    effectiveLocation,
    factoryArea,
    factoryCreateTime,
    productLineNum,
    yearOutputValue,
    yearOutputProd,
    factoryAuditorImage,
    factoryTagCodeList = []
  } = current
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { factoryYearOutputValue = [], factoryYearOutputProd = [] } =
    toJS(dictionary)
  return (
    <div className={styles.companiesIntroduce}>
      <HeaderLine chinese="企业介绍" english="ENTERPRISE INTRODUCTION" />
      <div className={styles.content}>
        <div>
          <div>
            <span className={styles.name}>{enterpriseName}</span>
            {isArray(factoryTagCodeList) &&
              factoryTagCodeList.find(item => item === 'verified_tag') && (
                <Tag className={styles.factoryTag} color="#45CC7E">
                  <Icon type="jack-shiming1" className={styles.tagIcon} />
                  实名
                </Tag>
              )}
            <Tag className={styles.factoryTag} color="#3B88FF">
              <Icon type="jack-ycsq" className={styles.tagIcon} />
              验厂
            </Tag>
          </div>
        </div>
        <div className={styles.introduce}>
          <div className={styles.left}>
            <div className={styles.title}>企业简介</div>
            <div className={styles.abstract}>{enterpriseDesc}</div>
            <div className={styles.title}>企业概览</div>
            <Row gutter={16}>
              <Col className={styles.gutterRow} span={12}>
                <span className={styles.label}>有效车位</span>
                <span className={styles.strong}>
                  <span className={styles.strongNumber}>
                    {checkValue(effectiveLocation)}
                  </span>
                  {'  '}台
                </span>
              </Col>
              <Col className={styles.gutterRow} span={12}>
                <span className={styles.label}>厂房面积 </span>
                <span className={styles.strong}>
                  <span className={styles.strongNumber}>
                    {checkValue(factoryArea)}
                  </span>
                  平方米
                </span>
              </Col>
              <Col className={styles.gutterRow} span={12}>
                <span className={styles.label}>成立时间 </span>
                <span className={styles.strong}>
                  <span className={styles.strongNumber}>
                    {factoryCreateTime
                      ? moment(factoryCreateTime).format('YYYY')
                      : '--'}
                  </span>
                  {'  '}年
                </span>
              </Col>
              <Col className={styles.gutterRow} span={12}>
                <span className={styles.label}>生产线数 </span>
                <span className={styles.strong}>
                  <span className={styles.strongNumber}>
                    {checkValue(productLineNum)}
                  </span>
                  {'  '}条
                </span>
              </Col>
              <Col className={styles.gutterRow} span={12}>
                <span className={styles.label}>年产值</span>
                <span className={styles.strong}>
                  <span className={styles.strongNumber}>
                    {factoryYearOutputValue.find(
                      item => item.value === yearOutputValue
                    )
                      ? factoryYearOutputValue.find(
                          item => item.value === yearOutputValue
                        ).label
                      : '--'}
                  </span>
                </span>
              </Col>
              <Col className={styles.gutterRow} span={12}>
                <span className={styles.label}>年产量 </span>
                <span className={styles.strong}>
                  <span className={styles.strongNumber}>
                    {factoryYearOutputProd.find(
                      item => item.value === yearOutputProd
                    )
                      ? factoryYearOutputProd.find(
                          item => item.value === yearOutputProd
                        ).label
                      : '--'}
                  </span>
                </span>
              </Col>
            </Row>
          </div>
          <div className={styles.right}>
            {factoryAuditorImage ? (
              <Image className={styles.photo} src={factoryAuditorImage} />
            ) : (
              // <img className={styles.photo} src={factoryAuditorImage} alt="" />
              <NoData
                bgColor="#f6f6f6"
                width={236}
                height={280}
                logoWidth={150}
              />
            )}

            <div className={styles.text}>验厂人员现场照</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(CompaniesIntroduce)
