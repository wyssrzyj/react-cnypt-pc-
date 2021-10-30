import React, { useState, useEffect } from 'react'
import { toJS } from 'mobx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useHistory } from 'react-router'
import { useStores } from '@/utils/mobx'
import {
  matchValue,
  matchGoodValue,
  matchArrayValue,
  checkValue,
  getRegion
} from '@/utils/tool'
import { SimpleSearch } from '@/components'
import { Advertising, OverviewCard, InfoCard, OtherCard } from './components'
import styles from './index.module.less'

const SearchOrderDetail = props => {
  const {
    match: { params = {} }
  } = props
  const { id } = params

  const history = useHistory()
  const { searchOrderStore, commonStore, factoryStore } = useStores()
  const { inquiryPurchase } = searchOrderStore
  const { dictionary } = commonStore
  const { productCategory } = factoryStore
  const {
    goodsNum = [],
    inquiryProcessType = [],
    factoryEffectiveLocation = [],
    productType = []
  } = toJS(dictionary)

  const [dataSource, setDataSource] = useState<any>({})
  const [overviewData, setOverviewData] = useState<any>({})
  const [infoData, setInfoData] = useState<any>({})
  const [productCategoryList, setProductCategoryList] = useState<any>([])
  const [tenantId, setTenantId] = useState<string>(undefined)

  const newAllArea = JSON.parse(localStorage.getItem('allArea'))

  const getProductCategory = async () => {
    const data = (await productCategory()) || {}
    setProductCategoryList([...data])
  }

  const getOrderDetails = () => {
    inquiryPurchase(id).then(response => {
      const { success, data } = response
      if (success) {
        setDataSource({ ...data })
      }
    })
  }
  const transformData = data => {
    const { location } = data
    let newLocation
    if (location.length === 3) {
      newLocation = getRegion(
        newAllArea,
        location[0],
        location[1],
        location[2],
        'all'
      )
    }
    setTenantId(data.tenantId)
    setOverviewData({
      id: data.id,
      name: data.name,
      deliveryDate: data.deliveryDate,
      releaseTime: data.releaseTime,
      details: [
        { label: '需求单编号', value: data.code, span: 24 },
        {
          label: '加工类型',
          value: matchArrayValue(
            inquiryProcessType,
            data.processTypeList,
            '--'
          ),
          span: 12
        },
        {
          label: '生产方式',
          value: matchArrayValue(productType, data.productTypeList, '--'),
          span: 12
        },
        {
          label: '发布时间',
          value: data.releaseTime
            ? moment(data.releaseTime).format('YYYY-MM-DD')
            : '--',
          span: 12
        },
        {
          label: '截止时间',
          value: data.releaseTime
            ? moment(data.releaseTime).format('YYYY-MM-DD')
            : '--',
          span: 12
        },
        {
          label: '联系人',
          value:
            +data.isContactPublic === 1 ? data.contactPerson : '***' || '--',
          span: 12
        },
        {
          label: '联系人手机号',
          value:
            +data.isContactPublic === 1
              ? data.contactPersonMobile
              : '*******' || '--',
          span: 12
        }
      ]
    })
    setInfoData({
      infoList: [
        {
          label: '商品品类',
          value: matchGoodValue(productCategoryList, data.categoryId),
          span: 12
        },
        {
          label: '订单数量',
          value: matchValue(goodsNum, data.goodsNum),
          span: 12
        },
        {
          label: '目标单价',
          value: `${checkValue(data.goodsPrice)}元`,
          span: 12
        },
        {
          label: '备注说明',
          value: checkValue(data.goodsRemark),
          span: 12
        }
      ],
      orderList: [
        {
          label: '地区要求',
          value: matchGoodValue(
            newAllArea,
            data.regionalIdList,
            'value',
            'label',
            '不限'
          ),
          span: 12
        },
        {
          label: '有效车位',
          value: matchValue(factoryEffectiveLocation, data.effectiveLocation),
          span: 12
        },
        {
          label: '收货地址',
          value: `${newLocation} ${data.address || ''}`,
          span: 12
        },
        {
          label: '其它要求',
          value: checkValue(data.otherRequirement),
          span: 12
        }
      ],
      imgList: data.stylePicture
    })
  }
  const onFilterChange = () => {
    history.push('/order-search')
  }

  useEffect(() => {
    ;(async () => {
      await getProductCategory()
    })()
  }, [])

  useEffect(() => {
    if (!isEmpty(dataSource)) {
      transformData(dataSource)
    }
  }, [dataSource])

  useEffect(() => {
    id && getOrderDetails()
  }, [id])

  return (
    <div className={styles.searchOrderDetail}>
      {/* 搜索栏 */}
      <SimpleSearch
        config={{
          title: dataSource.isEnterpriseInfoPublic
            ? dataSource.enterpriseName
            : '某某有限公司',
          imgSrc: dataSource.enterpriseUrl
        }}
        onFilterChange={onFilterChange}
        field="order"
      />
      {/* 广告位 */}
      <Advertising />
      <div className={styles.container}>
        {/* 商品概览 */}
        <OverviewCard {...overviewData} />
        {/* 商品信息 */}
        <InfoCard {...infoData} />
        {/* 该商家其它订单 */}
        <OtherCard tenantId={tenantId} />
      </div>
    </div>
  )
}

export default SearchOrderDetail
