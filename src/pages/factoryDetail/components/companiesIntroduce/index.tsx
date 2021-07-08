import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, message } from 'antd'
import classNames from 'classnames'
import moment from 'moment'
import { toJS } from 'mobx'
import { Icon } from '@/components'
import { getCurrentUser } from '@/utils/tool'
import { useStores, observer } from '@/utils/mobx'
import axios from '@/utils/axios'
import styles from './index.module.less'

const CompaniesIntroduce = props => {
  const { current = {}, factoryId, update } = props
  const {
    followStatus,
    enterpriseName,
    enterpriseDesc,
    effectiveLocation,
    factoryArea,
    factoryCreateTime,
    productLineNum,
    yearOutputValue,
    yearOutputProd,
    factoryAuditorImage
  } = current
  const currentUser = getCurrentUser() || {}
  const { userId } = currentUser
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { factoryYearOutputValue = [], factoryYearOutputProd = [] } = toJS(dictionary)
  const [validationTime, setValidationTime] = useState('')
  const [memberText, setMemberText] = useState('')

  const getInspectionMember = () => {
    axios.get('/api/factory/info/get-audit-info', { factoryId }).then(response => {
      const { success, data } = response
      if (success) {
        const { auditPersonInfoList, factoryRealAuditTime } = data
        // setInspectionMember([...auditPersonInfoList])
        setValidationTime(factoryRealAuditTime)

        const text = auditPersonInfoList.map(item => item.userName).join('、')
        setMemberText(text)
      }
    })
  }

  const focusOn = () => {
    if (userId) {
      axios
        .post('/api/factory/follow-factory/add-or-cancel', {
          factoryId,
          userId,
          followStatus: followStatus
        })
        .then(response => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
          success && update()
        })
    } else {
      message.info('请先登录！')
    }
  }

  useEffect(() => {
    getInspectionMember()
  }, [])

  return (
    <div className={styles.companiesIntroduce}>
      <header className={styles.header}>
        <div>
          <span className={styles.textCn}>企业介绍</span>
          <span className={styles.textEn}>ENTERPRISE INTRODUCTION</span>
        </div>
        <div className={classNames(styles.focusBox, followStatus ? styles.boxActive : styles.boxNormal)} onClick={focusOn}>
          <Icon type="jack-xingxingmianxing" className={classNames(styles.focusOn, followStatus ? styles.active : null)} />
          <span>{followStatus ? '已关注' : '关注'}</span>
        </div>
      </header>
      <div className={styles.content}>
        <div>
          <div>
            <span className={styles.name}>{enterpriseName}</span>
            <Tag className={styles.factoryTag} color="#45CC7E">
              <Icon type="jack-shiming1" className={styles.tagIcon} />
              实名
            </Tag>
            <Tag className={styles.factoryTag} color="#3B88FF">
              <Icon type="jack-ycsq" className={styles.tagIcon} />
              验厂
            </Tag>
          </div>
          <div className={styles.people}>
            <Icon type="jack-ycgl" className={styles.tagIcon} />
            <span className={styles.head}>验厂负责人</span>
            <span>{memberText}</span>
            <Icon type="jack-shijian" className={styles.time} />
            <span>{validationTime ? moment(validationTime).format('YYYY-MM-DD') : '--'}</span>
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
                <span className={styles.strong}>{effectiveLocation ? effectiveLocation : '--'} 人</span>
              </Col>
              <Col className={styles.gutterRow} span={12}>
                <span className={styles.label}>厂房面积 </span>
                <span className={styles.strong}>{factoryArea ? factoryArea : '--'} 平方米</span>
              </Col>
              <Col className={styles.gutterRow} span={12}>
                <span className={styles.label}>成立时间 </span>
                <span className={styles.strong}>{factoryCreateTime ? moment(factoryCreateTime).format('YYYY年') : '--'}</span>
              </Col>
              <Col className={styles.gutterRow} span={12}>
                <span className={styles.label}>生产线数 </span>
                <span className={styles.strong}>{productLineNum ? productLineNum : '--'} 条</span>
              </Col>
              <Col className={styles.gutterRow} span={12}>
                <span className={styles.label}>年产值</span>
                <span className={styles.strong}>
                  {factoryYearOutputValue.find(item => item.value === yearOutputValue)
                    ? factoryYearOutputValue.find(item => item.value === yearOutputValue).label
                    : '--'}
                </span>
              </Col>
              <Col className={styles.gutterRow} span={12}>
                <span className={styles.label}>年产量 </span>
                <span className={styles.strong}>
                  {factoryYearOutputProd.find(item => item.value === yearOutputProd)
                    ? factoryYearOutputProd.find(item => item.value === yearOutputProd).label
                    : '--'}
                </span>
              </Col>
            </Row>
          </div>
          <div className={styles.right}>
            {factoryAuditorImage ? <img className={styles.photo} src={factoryAuditorImage} alt="" /> : <span>暂无</span>}

            <div className={styles.text}>验厂人员现场照</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(CompaniesIntroduce)
