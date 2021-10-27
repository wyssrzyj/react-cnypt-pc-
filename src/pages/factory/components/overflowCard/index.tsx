import React, { useEffect, useMemo, useState } from 'react'
import { toJS } from 'mobx'
import { Tag, Button, Modal } from 'antd'
import { isArray, findIndex } from 'lodash'
import { useStores, observer } from '@/utils/mobx'
import { Icon, Title } from '@/components'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay
} from 'swiper'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
import styles from './index.module.less'
import './style.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

const RequestCard = observer(props => {
  const { commonStore, searchOrderStore } = useStores()
  const { dictionary } = commonStore
  const { sendToFactory } = searchOrderStore
  const { data, factoryId } = props

  const goods =
    dictionary.goodsNum.find(item => item.value === data.goodsNum) || {}

  const send = () => {
    const params = {
      supplierTenantId: factoryId,
      purchaseInquiryId: data.id,
      status: 1
    }
    sendToFactory(params)
  }

  return (
    <div className={styles.requestCard}>
      <img src={data.stylePicture} alt="" className={styles.modalImg} />
      <div className={styles.modalOrderInfo}>
        <div>
          <div className={styles.modalTitle}>{data.name}</div>
          <div className={styles.modalCount}>{goods.label || '--'}</div>
        </div>
        <Button type={'primary'} className={styles.modalBtn} onClick={send}>
          发送
        </Button>
      </div>
    </div>
  )
})

const OverflowCard = props => {
  const {
    factoryId,
    factoryName,
    factoryDistrict,
    effectiveLocation = '0',
    factoryCategoryList = [],
    prodTypeList = [],
    pictureUrl,
    factoryTagList = []
  } = props

  // const history = useHistory()

  const { commonStore, searchOrderStore } = useStores()
  const { getOrderList } = searchOrderStore
  const { dictionary, updateName } = commonStore
  const allProdTypeList = toJS(dictionary).prodType || []

  const [modalFlag, setModalFlag] = useState(false)
  const [orders, setOrders] = useState([])

  const goToDetail = () => {
    updateName('')
    // history.push(`/factory-detail/${factoryId}`)
    window.open(`/factory-detail/${factoryId}`)
  }

  useEffect(() => {
    new Swiper('.mySwiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: true,
      centeredSlidesBounds: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: true
      // autoplay: {
      //   delay: 2000,
      //   disableOnInteraction: true,
      // },
    })
  }, [])

  const imgUrl = useMemo(() => {
    if (pictureUrl) {
      return (
        pictureUrl +
        '?x-oss-process=image/resize,limit_0,m_fill,w150,h_150/quality,q_100'
      )
    }
    return 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/noData.png'
  }, [pictureUrl])

  const modalShow = async event => {
    event.stopPropagation()
    setModalFlag(f => !f)
    if (!modalFlag) {
      // 需求单
      const res = await getOrderList({})
      setOrders(res.records || [])
    }
  }

  return (
    <div className={styles.overflowCard}>
      <div className={styles.factoryInfo} onClick={goToDetail}>
        <div className={styles.imgBox}>
          <img className={styles.factoryImg} src={imgUrl} />
        </div>
        <div className={styles.detail}>
          <div className={styles.detailTop}>
            <div>
              <a className={styles.factoryName}>{factoryName}</a>
              {isArray(factoryTagList) &&
                factoryTagList.find(item => item === 'verified_tag') && (
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
            <div className={styles.addressBox}>
              <Icon type="jack-dizhi" className={styles.address} />
              <span>{factoryDistrict ? factoryDistrict : '待完善'}</span>
            </div>
          </div>
          <div className={styles.factoryInfoBox}>
            <ul className={styles.factoryInfoList}>
              <li>
                <span className={styles.ulName}>
                  <Icon type="jack-scrs" className={styles.ulIcon} />
                  有效车位：
                </span>
                <span>{effectiveLocation ? effectiveLocation : '0'}台</span>
              </li>
              <li>
                <span className={styles.ulName}>
                  <Icon type="jack-zysc" className={styles.ulIcon} />
                  主要生产：
                </span>
                <span>
                  {isArray(factoryCategoryList)
                    ? factoryCategoryList.join('、')
                    : '待完善'}
                </span>
              </li>
              <li>
                <span className={styles.ulName}>
                  <Icon type="jack-jglx" className={styles.ulIcon} />
                  加工类型：
                </span>
                <span>
                  {isArray(prodTypeList)
                    ? allProdTypeList
                        .filter(function (val) {
                          return (
                            findIndex(prodTypeList, function (o) {
                              return o.processType == val.value
                            }) > -1
                          )
                        })
                        .map(item => item.label)
                        .join('、')
                    : '待完善'}
                </span>
              </li>
            </ul>

            <Button type={'primary'} onClick={modalShow}>
              立即询价
            </Button>
          </div>
        </div>
      </div>

      <Modal
        visible={modalFlag}
        width={740}
        footer={false}
        onCancel={modalShow}
        maskClosable={false}
        centered
      >
        <Title title={'选择需求单'}></Title>
        <div className={styles.totalListBox}>
          <div className={styles.totalList}>
            {orders.map((data: any, idx) => {
              console.log(
                '🚀 ~ file: index.tsx ~ line 201 ~ {orders.map ~ data',
                data
              )
              return (
                <RequestCard
                  factoryId={factoryId}
                  key={idx}
                  data={data}
                ></RequestCard>
              )
            })}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default observer(OverflowCard)
