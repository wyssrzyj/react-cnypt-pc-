import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Tag, message } from 'antd'
import { HeartFilled } from '@ant-design/icons'
import { toJS } from 'mobx'
import classNames from 'classnames'
import { isEmpty, isNil, filter, find } from 'lodash'
import { Icon } from '@/components'
import axios from '@/utils/axios'
import { getCurrentUser } from '@/utils/tool'
import { useStores, observer } from '@/utils/mobx'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs } from 'swiper'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
import './factoryDetail.less'
import styles from './index.module.less'
import './style.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs])

const FactoryInfo = props => {
  const { factoryId } = props
  const history = useHistory()
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { factoryTag = [], prodType } = toJS(dictionary)
  const currentUser = getCurrentUser() || {}
  const { userId } = currentUser
  const [factoryInfo, setFactoryInfo] = useState<any>({})
  const [contactInfo, setContactInfo] = useState<any>({})
  const [factoryTagList, setFactoryTagList] = useState<any>([])
  const [orderType, setOrderType] = useState<any>([])
  const [factoryImg, setFactoryImg] = useState<any>([{}, {}])

  const getFactoryDetails = async () => {
    const response = await axios.post('/api/factory/info/details', {
      dictCode: 'factory_tag',
      factoryId,
      userId
    })
    const { success, data = {} } = response
    if (success) {
      const { factoryTagValue, factoryProcessTypeList, pictureUrl = [] } = data
      setFactoryInfo({ ...data })
      setFactoryImg([...pictureUrl])
      const newLabel = filter(factoryTag, function (o) {
        return find(factoryTagValue, function (item) {
          return item === o.value
        })
      }).map(item => item.label)
      setFactoryTagList([...newLabel])

      const newOrder = filter(prodType, function (o) {
        return find(factoryProcessTypeList, function (item) {
          return item.processType === o.value
        })
      }).map(item => item.label)
      setOrderType([...newOrder])
    }
  }

  const getContactInfo = () => {
    axios
      .get('/api/user/get-user-info-factory-id', {
        factoryId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          setContactInfo({ ...data })
        }
      })
  }

  const notLoggedIn = (str, frontLen, endLen) => {
    if (!isNil(str)) {
      if (isEmpty(currentUser)) {
        var len = str.length - frontLen - endLen
        var xing = ''
        for (var i = 0; i < len; i++) {
          xing += '*'
        }
        return str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
      } else {
        return str
      }
    }
  }

  const goLogin = () => {
    history.push('/login')
  }
  const focusOn = () => {
    if (userId) {
      axios
        .post('/api/factory/follow-factory/add-or-cancel', {
          factoryId,
          userId,
          followStatus: factoryInfo.followStatus
        })
        .then(response => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
          success && getFactoryDetails()
        })
    } else {
      message.info('请先登录！')
    }
  }

  useEffect(() => {
    const galleryThumbs = new Swiper('#gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 4,
      watchSlidesVisibility: true //防止不可点击
    })
    new Swiper('#gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      thumbs: {
        swiper: galleryThumbs
      },
      loop: true
    })
  }, [])

  useEffect(() => {
    if (dictionary) {
      getFactoryDetails()
      getContactInfo()
    }
  }, [dictionary])

  return (
    <div className={styles.factoryInfo}>
      <div className={styles.factoryInfoContent}>
        <div className={styles.slideshow}>
          <div className="swiper-container" id="gallery-top">
            <div className="swiper-wrapper">
              {factoryImg.map((item, index) => (
                <div key={index} className="swiper-slide">
                  <img src={item} />
                </div>
              ))}
            </div>
            <div className="swiper-button-next swiper-button-white"></div>
            <div className="swiper-button-prev swiper-button-white"></div>
          </div>
          <div className="swiper-container" id="gallery-thumbs">
            <div className="swiper-wrapper">
              {factoryImg.map((item, index) => (
                <div key={index} className="swiper-slide factory-small-img">
                  <img src={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.infoRight}>
          <div className={styles.infoTitle}>
            <b className={styles.factoryName}>{factoryInfo.factoryName}</b>
            {/* <span className={styles.realName}>
              <Icon className={styles.infoIcon} type="jack-shiming" />
              实名
            </span>
            <span className={styles.inspection}>
              <Icon className={styles.infoIcon} type="jack-shenduyanchan" />
              验厂
            </span>
            <span>
              <b className={styles.score}>4.7</b>分
            </span> */}
          </div>
          <ul className={styles.factoryInfoList}>
            <li>
              <span>工厂地区：</span>
              <span>{factoryInfo.factoryDistrict}</span>
            </li>
            {/* <li>
              <span>加工行业：</span>
              <span>生产企业或加工个体户</span>
            </li> */}
            <li>
              <span>有效车位：</span>
              <span>{factoryInfo.effectiveLocation ? factoryInfo.effectiveLocation : '--'}人</span>
            </li>
            <li>
              <span>加工类型：</span>
              <span>{orderType.join(',')}</span>
            </li>
            <li>
              <span>主营类别：</span>
              <span>
                {factoryInfo.factoryCategoryList &&
                  factoryInfo.factoryCategoryList.map(item => (
                    <Tag key={item.name} className={styles.factoryInfoTag} color="#f2f2f2">
                      {item.name}
                    </Tag>
                  ))}
              </span>
            </li>
            <li>
              <span>企业标签：</span>
              <span>
                {factoryTagList.map((item, index) => (
                  <Tag key={index} className={styles.factoryInfoTag} color="#f2f2f2">
                    {item}
                  </Tag>
                ))}
              </span>
            </li>
            {/* <li>
              <span>空档期：</span>
              <span>
                {factoryInfo.gapStartDate} - {factoryInfo.gapEndDate}
              </span>
            </li> */}
            <li>{factoryInfo.factoryServiceTag}</li>
          </ul>
        </div>
      </div>
      <div className={styles.factoryInfoMan}>
        <div className={styles.firstLine}>
          <div className={styles.firstLineItem}>
            <span>联系人：</span>
            <span>{contactInfo.realName}</span>
          </div>
          <div className={styles.firstLineItem}>
            <span>手机号码：</span>
            <span>{notLoggedIn(contactInfo.mobilePhone, 3, 4)}</span>
          </div>
          <div className={classNames(styles.firstLineItem, styles.firstLineRight)}>
            {isEmpty(currentUser) && (
              <span className={styles.firstLineIcon} onClick={goLogin}>
                <Icon className={styles.icon} type="jack-login-settings" />
                登录查看完整联系方式
              </span>
            )}

            <span className={styles.firstLineIcon} onClick={focusOn}>
              {factoryInfo.followStatus ? (
                <HeartFilled style={{ color: 'gold', marginRight: 12 }} />
              ) : (
                <Icon className={styles.icon} type="jack-guanzhu" />
              )}
              关注
            </span>
            {/* <span className={styles.firstLineIcon}>
              <Icon className={styles.icon} type="jack-liuyan" />
              留言
            </span> */}
          </div>
        </div>
        <div className={styles.secondLine}>
          <div className={styles.secondLineItem}>
            <span>电子邮箱：</span>
            <span>{notLoggedIn(contactInfo.email, 1, 7)}</span>
          </div>
          <div className={styles.secondLineItem}>
            <span>联系电话：</span>
            <span>{notLoggedIn(contactInfo.contactPhone, 5, 1)}</span>
          </div>
        </div>
        <div className={styles.secondLine}>
          <div>
            <span>工厂地址：</span>
            <span>{factoryInfo.address}</span> &nbsp;&nbsp;&nbsp;
            {/* <a>地图查看 {'>'}</a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(FactoryInfo)
