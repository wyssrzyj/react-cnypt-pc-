import React, { useState, useEffect } from 'react'
import { toJS } from 'mobx'
import { isEmpty, cloneDeep } from 'lodash'
import moment from 'moment'
import { useStores } from '@/utils/mobx'
import classNames from 'classnames'
import { SimpleSearchTop } from '@/components'
import { Advertising } from './components'
import styles from './index.module.less'
import { getTrees } from './components/method/index'
import HomePag from './components/homePage'
import EnterpriseInformation from './components/enterpriseInformation'
import OrderRecord from './components/orderRecord'
import { useLocation } from 'react-router-dom'
const SearchOrderDetail = () => {
  const location = useLocation()
  const { state } = location
  const { commonStore, demandListStore } = useStores()
  const {
    getTheIssuerHomePageInformation,
    orderQuantityStatisticsOfTheFrontPageOfTheIssuer,
    issuerHomePageData,
    obtainIssuerCompanyInformation
  } = demandListStore
  const { dictionary, allArea } = commonStore
  const { goodsNum = [], purchaserRole = [] } = toJS(dictionary)
  const [current, setCurrent] = useState<any>(1)
  const [topName, setTopName] = useState<any>({})
  const [NumberCooperation, setNumberCooperation] = useState<any>({}) //合作数量
  const [processingData, setProcessingData] = useState<any>({}) //列表数据
  const [newData, setNewData] = useState<any>() //更改完的数据
  const [information, setInformation] = useState<any>({}) //企业信息数据
  const [informationData, setInformationData] = useState<any>() //更改后的企业信息数据
  const newAllArea = JSON.parse(localStorage.getItem('allArea'))
  const productCategoryList = JSON.parse(
    localStorage.getItem('productCategoryList')
  )

  // 获取企业id
  useEffect(() => {
    api(state)
    homePageData('')
  }, [])
  useEffect(() => {
    reconstructData()
  }, [processingData])
  useEffect(() => {
    if (allArea) {
      enterpriseDataChange()
    }
  }, [information, allArea])
  let api = async v => {
    let arr = await getTheIssuerHomePageInformation({ enterpriesId: v.id }) //头部数据
    const dataNum = await orderQuantityStatisticsOfTheFrontPageOfTheIssuer({
      tenantId: v.id
    })
    const enterprise = await obtainIssuerCompanyInformation({
      enterpriesId: v.id
    })
    setInformation(enterprise.data)
    setNumberCooperation(dataNum.data)
    setTopName(arr.data)
  }
  const homePageData = async e => {
    if (state) {
      const data = await issuerHomePageData({ tenantId: state['id'], name: e })
      setProcessingData(data.records) //首页列表数据
    }
  }

  // 处理数据列表数据
  const reconstructData = () => {
    const data = cloneDeep(processingData)
    if (!isEmpty(data)) {
      data.map(item => {
        console.log('测试', item.regionalIdList)
        console.log('测试', newAllArea)

        if (!isEmpty(productCategoryList)) {
          item.categoryCodes = getTrees(
            item.categoryCodes,
            productCategoryList,
            'code',
            'name'
          )
        }
        if (!isEmpty(newAllArea) && !isEmpty(item.regionalIdList)) {
          item.regionalIdList = getTrees(
            item.regionalIdList,
            newAllArea,
            'value',
            'label'
          )
        }
        item.goodsNum = goodsNum.filter(v => v.value === item.goodsNum)[0].label
        item.year = moment(item.releaseTime).format('YYYY')
        item.monthDay = moment(item.releaseTime).format('MM-DD')
        item.surpluss = moment(item.inquiryEffectiveDate).format('YYYY')
        item.surplus = moment(item.inquiryEffectiveDate).format('MM-DD')
        item.key = item.id
      })
      console.log('总数据', data)

      setNewData([...data])
    } else {
      setNewData([])
    }
  }
  // 企业信息数据处理
  const enterpriseDataChange = () => {
    const date = cloneDeep(information)
    const newAllArea = cloneDeep(allArea)
    if (!isEmpty(date)) {
      let arr = [date.provinceId, date.cityId, date.districtId]
      date.establishedTime = moment(date.establishedTime).format('YYYY-MM-DD')
      date.roleCodes = getTrees(date.roleCodes, purchaserRole, 'value', 'label')
      date.provinceId = getTrees(arr, newAllArea, 'value', 'label').join('、')
      date.mainCategoriesList = getTrees(
        date.mainCategoriesList,
        productCategoryList,
        'code',
        'name'
      ).join('、')
      date.longitude = `${date.longitude},${date.latitude}`
      setInformationData(date)
    }
  }

  const onFilterChange = () => {
    // history.push('/order-search')
  }

  function CurrentPage(key) {
    setCurrent(key)
  }
  // 搜索数据
  const searchData = e => {
    homePageData(e)
  }
  return (
    <div className={styles.searchOrderDetail}>
      {/* 搜索栏 */}
      <SimpleSearchTop
        searchData={searchData}
        NumberCooperation={NumberCooperation}
        config={topName}
        onFilterChange={onFilterChange}
        field="order"
      />
      <div className={styles.top}>
        <div className={styles.containerBottom}></div>
        {/* table */}
        <div className={styles.container}>
          <div className={styles.tables}>
            <div
              className={classNames(
                styles.table,
                current === 1 ? styles.tablesColor : null
              )}
              onClick={() => {
                CurrentPage(1)
              }}
            >
              最新动态
            </div>
            <div
              className={classNames(
                styles.table,
                current === 2 ? styles.tablesColor : null
              )}
              onClick={() => {
                CurrentPage(2)
              }}
            >
              企业信息
            </div>
            <div
              className={classNames(
                styles.table,
                current === 3 ? styles.tablesColor : null
              )}
              onClick={() => {
                CurrentPage(3)
              }}
            >
              订单记录
            </div>
          </div>
        </div>
      </div>
      {/* 内容 */}
      {current !== 1 ? (
        <>
          <Advertising />
        </>
      ) : null}
      <div className={styles.container}>
        {/* 首页 */}
        {current === 1 ? (
          <HomePag
            newData={newData}
            topName={topName}
            NumberCooperation={NumberCooperation}
          ></HomePag>
        ) : null}
        {current === 2 ? (
          <EnterpriseInformation
            informationData={informationData}
          ></EnterpriseInformation>
        ) : null}
        {current === 3 ? <OrderRecord></OrderRecord> : null}
      </div>

      {/* 广告位 */}

      <div className={styles.container}></div>
    </div>
  )
}

export default SearchOrderDetail
