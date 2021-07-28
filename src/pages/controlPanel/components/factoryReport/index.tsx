import React, { useState, useEffect } from 'react'
import { Badge, message } from 'antd'
import moment from 'moment'
import { toJS } from 'mobx'
import { filter, find } from 'lodash'
import { useStores, observer } from '@/utils/mobx'
import axios from '@/utils/axios'
import { getTypeOptions, getProductClass, getProductMode } from '@/utils/tool'
import { Icon, autoAddTooltip } from '@/components'
import { getUserInfo } from '@/utils/tool'
import Title from '../title'
import styles from './index.module.less'

const FactoryReport = () => {
  const currentUser = getUserInfo() || {}
  const { factoryId } = currentUser
  const { commonStore, factoryStore } = useStores()
  const { dictionary } = commonStore
  const { productCategoryList } = factoryStore
  const { factoryYearOutputValue = [], factoryYearOutputProd = [] } =
    toJS(dictionary)
  const productClassOptions = getProductClass()
  const productionModeOptions = getProductMode()
  const typeOptions = getTypeOptions()
  const [currentFactory, setCurrentFactory] = useState<any>({})
  const [mainList, setMainList] = useState<any>([])
  const [orderType, setOrderType] = useState<any>([])
  // const [inspectionMember, setInspectionMember] = useState<any>([])
  const [validationTime, setValidationTime] = useState('')
  const [memberText, setMemberText] = useState('')

  const getFactoryInfo = () => {
    const newList = toJS(productCategoryList)
    const childList = newList.reduce((prev, item) => {
      prev.push(...item.children)
      return prev
    }, [])
    axios
      .get('/api/factory/info/get-factory-data', { factoryId })
      .then(response => {
        const { success, data } = response
        if (success) {
          const { mainCategoriesList, factoryProcessTypeList } = data
          setCurrentFactory({ ...data })
          const newLabel = filter(childList, function (o) {
            return find(mainCategoriesList, function (item) {
              return item === o.id
            })
          }).map(item => item.name)
          setMainList([...newLabel])

          const newOrderType = filter(typeOptions, function (o) {
            return find(factoryProcessTypeList, function (item) {
              return item.processType === o.value
            })
          })
          setOrderType([...newOrderType])
        }
      })
  }
  const getInspectionMember = () => {
    axios
      .get('/api/factory/info/get-audit-info', { factoryId })
      .then(response => {
        const { success, data } = response
        if (success) {
          const { auditPersonInfoList, factoryRealAuditTime } = data
          // setInspectionMember([...auditPersonInfoList])
          setValidationTime(factoryRealAuditTime)

          const text = auditPersonInfoList
            .map(item => `${item.realName}（${item.mobile}）`)
            .join('、')
          setMemberText(text)
        }
      })
  }
  const applyInspection = () => {
    axios
      .put('/api/factory/info/update-factory-auditor-status', {
        factoryId,
        auditorStatus: '3'
      })
      .then(response => {
        const { success, msg } = response
        message[success ? 'success' : 'error'](msg)
      })
  }

  useEffect(() => {
    if (productCategoryList) {
      getFactoryInfo()
      getInspectionMember()
    }
  }, [productCategoryList])
  return (
    <div className={styles.factoryReport}>
      <header className={styles.header}>
        <div className={styles.details}>
          工厂由
          {memberText &&
            autoAddTooltip(
              ref => (
                <div ref={ref} className={styles.tooltipBpx}>
                  {memberText}
                </div>
              ),
              { title: memberText }
            )}
          于
          {validationTime ? moment(validationTime).format('YYYY/MM/DD') : '--'}{' '}
          经过实地验厂
        </div>
        <div className={styles.button} onClick={applyInspection}>
          <Icon type="jack-ycsq" className={styles.factoryIcon} />
          <span>申请验厂</span>
        </div>
      </header>
      <div className={styles.box}>
        {/* <header className={styles.title}>
          <span className={styles.name}>工厂基本情况</span>
        </header> */}
        <Title title={'工厂基本情况'} />
        <ul className={styles.content}>
          <li>
            <div className={styles.left}>
              <Icon type="jack-gcjs" className={styles.icon} />
              <span className={styles.subTitle}>工厂介绍</span>
            </div>
            <div className={styles.right}>
              {currentFactory.enterpriseName}成立于
              {moment(currentFactory.factoryCreateTime).format('YYYY年')}
              ，厂房占地面积
              {currentFactory.factoryArea}平米
            </div>
          </li>
          <li>
            <div className={styles.left}>
              <Icon type="jack-didz" className={styles.icon} />
              <span className={styles.subTitle}>地区和地址</span>
            </div>
            <div className={styles.right}>{currentFactory.address}</div>
          </li>
          <li>
            <div className={styles.left}>
              <Icon type="jack-scxcw" className={styles.icon} />
              <span className={styles.subTitle}>生产线和有效车位</span>
            </div>
            <div className={styles.right}>
              生产线
              <b className={styles.strong}> {currentFactory.productLineNum} </b>
              条 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;有效车位
              <b className={styles.strong}>
                {' '}
                {currentFactory.effectiveLocation}{' '}
              </b>
              台
            </div>
          </li>
          <li>
            <div className={styles.left}>
              <Icon type="jack-czcl" className={styles.icon} />
              <span className={styles.subTitle}>产值和产量</span>
            </div>
            <div className={styles.right}>
              年生产值
              <b className={styles.strong}>
                {factoryYearOutputValue.find(
                  item => item.value === currentFactory.yearOutputValue
                )
                  ? factoryYearOutputValue.find(
                      item => item.value === currentFactory.yearOutputValue
                    ).label
                  : '--'}
              </b>
              人民币&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;年生产量
              <b className={styles.strong}>
                {factoryYearOutputProd.find(
                  item => item.value === currentFactory.yearOutputProd
                )
                  ? factoryYearOutputProd.find(
                      item => item.value === currentFactory.yearOutputProd
                    ).label
                  : '--'}
              </b>
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.box}>
        {/* <header className={styles.title}>
          <span className={styles.name}>生产接单介绍</span>
        </header> */}
        <Title title={'生产接单介绍'} />
        <ul className={styles.content}>
          <li className={styles.product}>
            <div className={styles.left}>
              <Icon type="jack-cplb1" className={styles.icon} />
              <span className={styles.subTitle}>产品类别</span>
            </div>
            <div className={styles.right}>
              <ul className={styles.classes}>
                <li className={styles.classesLi}>
                  <Badge
                    color="blue"
                    text="主营类别"
                    className={styles.classesSubtitle}
                  />
                  <span>{mainList.join('、')}</span>
                </li>
                <li className={styles.classesLi}>
                  <Badge
                    color="blue"
                    text="擅长产品品类"
                    className={styles.classesSubtitle}
                  />
                  <span>
                    {currentFactory.mainProductCategoriesDesc
                      ? currentFactory.mainProductCategoriesDesc
                      : '--'}
                  </span>
                </li>
                <li className={styles.classesLi}>
                  <Badge
                    color="blue"
                    text="产品档次"
                    className={styles.classesSubtitle}
                  />
                  <span>
                    {productClassOptions.find(
                      item => item.value == currentFactory.clothesGrade
                    )
                      ? productClassOptions.find(
                          item => item.value == currentFactory.clothesGrade
                        ).label
                      : '--'}
                  </span>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className={styles.left}>
              <Icon type="jack-scfs" className={styles.icon} />
              <span className={styles.subTitle}>生产方式</span>
            </div>
            <div className={styles.right}>
              {productionModeOptions.find(
                item => item.value == currentFactory.productionMode
              )
                ? productionModeOptions.find(
                    item => item.value == currentFactory.productionMode
                  ).label
                : '--'}
            </div>
          </li>
          <li>
            <div className={styles.left}>
              <Icon type="jack-jdlx" className={styles.icon} />
              <span className={styles.subTitle}>接单类型</span>
            </div>
            <div className={styles.right}>
              {orderType.map(item => item.label).join('、')}
            </div>
          </li>
          <li>
            <div className={styles.left}>
              <Icon type="jack-qdl" className={styles.icon} />
              <span className={styles.subTitle}>起订量</span>
            </div>
            <div className={styles.right}>
              最少起订量{currentFactory.moq ? currentFactory.moq : '--'}件
            </div>
          </li>
          <li>
            <div className={styles.left}>
              <Icon type="jack-jdls" className={styles.icon} />
              <span className={styles.subTitle}>接单历史说明</span>
            </div>
            <div className={styles.right}>
              {currentFactory.receiveOrderHistoryDesc
                ? currentFactory.receiveOrderHistoryDesc
                : '无'}
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.box}>
        {/* <header className={styles.title}>
          <span className={styles.name}>工厂数字化情况</span>
        </header> */}
        <Title title={'工厂数字化情况'} />
        <ul className={styles.content}>
          <li>
            <div className={styles.left}>
              <Icon type="jack-rjyy" className={styles.icon} />
              <span className={styles.subTitle}>软件应用</span>
            </div>
            <div className={styles.right}>
              {currentFactory.softwareApplicationUsage
                ? currentFactory.softwareApplicationUsage
                : '无'}
            </div>
          </li>
          <li>
            <div className={styles.left}>
              <Icon type="jack-sblw" className={styles.icon} />
              <span className={styles.subTitle}>设备联网情况</span>
            </div>
            <div className={styles.right}>
              {currentFactory.deviceNetworkDesc
                ? currentFactory.deviceNetworkDesc
                : '无'}
            </div>
          </li>
          <li>
            <div className={styles.left}>
              <Icon type="jack-qtsm" className={styles.icon} />
              <span className={styles.subTitle}>其它说明</span>
            </div>
            <div className={styles.right}>
              {currentFactory.digitalOtherDesc
                ? currentFactory.digitalOtherDesc
                : '无'}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default observer(FactoryReport)
