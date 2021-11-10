import React, { useState, useEffect } from 'react'
import { Row, Col, Pagination, Empty } from 'antd'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { toJS } from 'mobx'
import { useStores, observer } from '@/utils/mobx'
import { matchValue, matchGoodValue, matchArrayValue } from '@/utils/tool'
import { SimpleSearch, FilterList } from '@/components'
import { OrderSearchHeader, OrderCard } from './components'
import styles from './index.module.less'

const SearchOrder = () => {
  const { searchOrderStore, commonStore } = useStores()
  const { inquiryList, orderName } = searchOrderStore
  const pageSize = 12
  const { dictionary } = commonStore

  const {
    goodsNum = [],
    processType = [],
    factoryEffectiveLocation = []
  } = toJS(dictionary)
  const newAllArea = JSON.parse(localStorage.getItem('allArea'))
  const productCategoryList = JSON.parse(
    localStorage.getItem('productCategoryList')
  )

  const [factoryParams, setFactoryParams] = useState<any>({})
  const [sortParams, setSortParams] = useState<any>({})
  const [pageNum, setPageNum] = useState<number>(1)
  const [cardList, setCardList] = useState<any>([])
  const [dataList, setDataList] = useState<any>([])
  const [total, setTotal] = useState(0)

  const onFilterChange = params => {
    const newFactoryParams = { ...factoryParams, ...params }
    setFactoryParams({ ...newFactoryParams })
    setPageNum(1)
  }

  const onSortChange = params => {
    setSortParams({ ...params })
    setPageNum(1)
  }

  const getDemandList = () => {
    inquiryList({
      pageSize,
      pageNum,
      name: orderName,
      ...factoryParams,
      ...sortParams
    }).then(response => {
      const { success, data } = response
      if (success) {
        const { total, records } = data
        setTotal(total)
        setDataList([...records])
      }
    })
  }

  const goDetail = id => {
    window.open(`/order-search/${id}`)
  }

  const onPaginationChange = page => {
    setPageNum(page)
  }

  const transformData = () => {
    const newCardList = dataList.map(record => {
      return {
        id: record.id,
        headerConfig: {
          title: record.isEnterpriseInfoPublic
            ? record.enterpriseName
            : '某某有限公司',
          address: record.isEnterpriseInfoPublic
            ? record.enterpriseAreaName
            : ''
        },
        contentConfig: {
          name: record.name,
          imgSrc: record.stylePicture,
          cardList: [
            {
              label: '订单数量',
              value: matchValue(goodsNum, record.goodsNum)
            },
            {
              label: '商品品类',
              value: matchGoodValue(
                productCategoryList,
                record.factoryCategoryIds
              )
            },
            {
              label: '加工类型',
              value: matchArrayValue(
                processType,
                record.processTypeValues,
                '--'
              )
            },
            {
              label: '发布时间',
              value: record.releaseTime
                ? moment(record.releaseTime).format('YYYY-MM-DD')
                : '--'
            }
          ],
          demandList: [
            {
              label: '有效日期',
              value: record.inquiryEffectiveDate
                ? moment(record.inquiryEffectiveDate).format('YYYY-MM-DD')
                : '--'
            },
            {
              label: '地区要求',
              value: matchGoodValue(
                newAllArea,
                record.inquiryDistrictIds,
                'value',
                'label',
                '不限'
              )
            },
            {
              label: '有效车位',
              value: matchValue(
                factoryEffectiveLocation,
                record.effectiveLocation
              )
            }
          ]
        },
        footerConfig: {
          time: `截止日期 ${
            record.inquiryEffectiveDate
              ? moment(record.inquiryEffectiveDate).format('YYYY-MM-DD')
              : '--'
          }`
        }
      }
    })
    setCardList([...newCardList])
  }

  useEffect(() => {
    if (!isEmpty(dataList)) {
      transformData()
    } else {
      setCardList([])
    }
  }, [dataList])

  useEffect(() => {
    getDemandList()
  }, [pageNum, factoryParams, sortParams, orderName])

  return (
    <div className={styles.searchOrder}>
      <SimpleSearch onFilterChange={onFilterChange} field="order" />
      <div className={styles.orderContent}>
        {/* 搜索 */}
        <FilterList onFilterChange={onFilterChange} />
        {/* 列表头 */}
        <OrderSearchHeader onChange={onSortChange} />
        {/* 卡片列表 */}
        <Row gutter={16}>
          {isEmpty(cardList) ? (
            <Empty className={styles.orderEmpty} />
          ) : (
            cardList.map((item, index) => (
              <Col key={index} span={8} onClick={() => goDetail(item.id)}>
                <OrderCard {...item} />
              </Col>
            ))
          )}
        </Row>
        <footer className={styles.orderFooter}>
          <div className={styles.orderTotal}>总共 {total} 条需求单信息</div>
          <Pagination
            size="small"
            total={total}
            pageSize={pageSize}
            current={pageNum}
            onChange={onPaginationChange}
            showSizeChanger
            hideOnSinglePage
          />
        </footer>
      </div>
    </div>
  )
}

export default observer(SearchOrder)
