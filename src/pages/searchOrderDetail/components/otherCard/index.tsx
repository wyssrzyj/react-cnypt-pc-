import React, { useState, useEffect, useRef } from 'react'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { toJS } from 'mobx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { Title } from '@/components'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade
} from 'swiper'
import { useStores, observer } from '@/utils/mobx'
import { matchValue, matchGoodValue, matchArrayValue } from '@/utils/tool'
import { OrderCard } from '../../../searchOrder/components'
import 'swiper/swiper-bundle.min.css'
import styles from './index.module.less'
// import './style.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade])

const OtherCard = props => {
  const { tenantId } = props
  const leftRef = useRef<HTMLDivElement>()
  const rightRef = useRef<HTMLDivElement>()

  const { searchOrderStore, commonStore, factoryStore } = useStores()
  const { dictionary } = commonStore
  const { inquiryList } = searchOrderStore
  const { productCategory } = factoryStore
  const {
    goodsNum = [],
    inquiryProcessType = [],
    factoryEffectiveLocation = []
  } = toJS(dictionary)

  const newAllArea = JSON.parse(localStorage.getItem('allArea'))

  const [curKey, setCurKey] = useState(0)
  const [list, setList] = useState<any>([])
  const [productCategoryList, setProductCategoryList] = useState<any>([])
  const [cardList, setCardList] = useState<any>([])

  const getProductCategory = async () => {
    const data = (await productCategory()) || {}
    setProductCategoryList([...data])
  }

  const transformData = () => {
    const newCardList = list.map(record => {
      return {
        id: record.id,
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
                inquiryProcessType,
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
              value: matchArrayValue(
                newAllArea,
                record.inquiryDistrictIds,
                '不限'
              )
            },
            {
              label: '有效车位',
              value: matchValue(
                factoryEffectiveLocation,
                record.effectiveLocationValue
              )
            }
          ]
        }
      }
    })
    console.log(
      '🚀 ~ file: index.tsx ~ line 112 ~ transformData ~ newCardList',
      newCardList
    )
    setCardList([...newCardList])
  }

  const getDemandList = () => {
    inquiryList({
      pageSize: 100,
      pageNum: 1,
      tenantId
    }).then(response => {
      const { success, data } = response
      if (success) {
        const { records } = data
        // setTotal(total)
        setList([...records])
      }
    })
  }

  useEffect(() => {
    new SwiperCore('.orderSwiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: true,
      centeredSlidesBounds: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: false,
      on: {
        slideChange: keyChange
      }
    })
  }, [])

  const toLeft = () => {
    rightRef.current.click()
  }

  const toRight = () => {
    leftRef.current.click()
  }

  const keyChange = event => {
    const { activeIndex } = event
    setCurKey(activeIndex)
  }

  useEffect(() => {
    ;(async () => {
      await getProductCategory()
    })()
  }, [])

  useEffect(() => {
    if (!isEmpty(list)) {
      transformData()
    }
  }, [list])

  useEffect(() => {
    tenantId && getDemandList()
  }, [tenantId])

  return (
    <div className={styles.otherCard}>
      <Title title={'该商家其它订单'} />
      <div className={styles.swiperContainer}>
        <div
          onChange={keyChange}
          className={classNames(
            'swiper-container orderSwiper',
            styles.orderSwiper
          )}
        >
          {cardList.length > 0 && (
            <div className="swiper-wrapper">
              {cardList.map((item, idx) => {
                if (!item) return null
                return (
                  <div
                    style={{ width: '33%' }}
                    className={'swiper-slide'}
                    key={idx}
                  >
                    <OrderCard {...item} />
                  </div>
                )
              })}
            </div>
          )}
          {cardList.length > 0 ? (
            <>
              <div className="swiper-button-next" ref={leftRef}></div>
              <div className="swiper-button-prev" ref={rightRef}></div>
            </>
          ) : null}
          <div className="swiper-pagination"></div>
        </div>
        <div className={styles.operation}>
          <LeftCircleOutlined
            onClick={toLeft}
            className={classNames(
              styles.operationIcon,
              curKey === 1 && styles.disableIcon
            )}
          />
          <RightCircleOutlined
            onClick={toRight}
            className={classNames(
              styles.operationIcon,
              curKey === list.length - 2 && styles.disableIcon
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default observer(OtherCard)
