import React, { useState, useRef, useEffect } from 'react'
import { useThrottleValue } from '@/utils/tool'
import styles from './factorys.module.less'
import { toJS, useStores, observer } from '@/utils/mobx'
import { Icon } from '@/components'
import moment from 'moment'
import classNames from 'classnames'

const EMPTY_IMG =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/factoryEmpty.png'

const Factorys = props => {
  const { last = 3, itemHeight = 82, list = [], map } = props

  const { factoryStore } = useStores()
  const { getFactoryDetail } = factoryStore

  const virtualListRef = useRef<HTMLDivElement>()
  const factorysRef = useRef<HTMLDivElement>()

  const [menuFlag, setMenuFlag] = useState(true) // true 打开 false 收起
  const [totalHeight, setTotalHeight] = useState(0) // 虚拟盒子的总高度
  const [transform, setTransform] = useState('') // 实际盒子需要移动的距离
  const [data, setData] = useState([]) // 实际显示的数据
  const [totalData, setTotalData] = useState([]) // 总数据
  const [scrollTop, setScrollTop] = useState(0) // 滚动高度
  const throttleScrollTop = useThrottleValue(scrollTop, 200)
  const [currentFactory, setCurrentFactory] = useState<any>({}) // 当前需要展示的加工厂
  const [facoryShow, setFacoryShow] = useState(false) // 是否展示加工厂
  const [currentFactoryDetail, setCurrentFactoryDetail] = useState({}) // 当前选择的加工厂详情
  const [currentFactoryImgs, setCurrentFactoryImgs] = useState([]) // 当前选择的加工厂的照片
  const [viewCount, setViewCount] = useState(null) // 当前选择的加工厂的照片
  const [factorysShow, setFactorysShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setFactorysShow(true)
    }, 500)
  }, [])

  useEffect(() => {
    list.forEach((item, idx) => {
      item.idx = idx + 1
    })
    setTotalData(list)
  }, [list])

  /*
   * 获取scrollTop
   * 此属性可以获取或者设置对象的最顶部到对象在当前窗口显示的范围内的顶边的距离
   * 也就是元素滚动条被向下拉动的距离
   * */
  const handleScroll = e => {
    setScrollTop(e.target.scrollTop)
  }

  const getData = () => {}

  const updateViewContent = (scrollTop = 0) => {
    scrollTop = virtualListRef.current.scrollTop || scrollTop
    const totalEnd = totalData.length
    if (virtualListRef.current) {
      // 计算可视区域里能放几个元素
      let viewNum
      if (!viewCount) {
        viewNum = Math.ceil(virtualListRef.current.clientHeight / itemHeight)
        setViewCount(viewNum)
      }

      // 计算可视区域开始的索引
      const start = Math.floor(scrollTop / itemHeight)
      // 计算可视区域结束索引
      const end = start + (viewCount || viewNum)
      if (end >= totalEnd - last) {
        // 根据最后的索引与总的数据长度进行比较 请求下一页数据
        getData()
      }
      // 截取可视区域数据
      const viewData = totalData.slice(start, end)

      setData(viewData)
      setTransform(`translateY(${start * itemHeight}px)`)
    }
  }

  useEffect(() => {
    const totalH = totalData.length * itemHeight
    setTotalHeight(totalH)
  }, [totalData, itemHeight])

  useEffect(() => {
    const len = list.length
    if (len && viewCount && len < viewCount) {
      factorysRef.current.style.height = totalHeight + 80 + 'px'
    }
    if (len && viewCount && len > viewCount) {
      factorysRef.current.style.height = `calc(100% - 60px)`
    }
  }, [viewCount, list, totalHeight])

  useEffect(() => {
    const { factoryId } = currentFactory
    if (factoryId) {
      ;(async () => {
        const factoryDetail = await getFactoryDetail(factoryId)
        //
        let imgs = [].concat(
          factoryDetail.factoryOutsizeImages,
          factoryDetail.factoryWorkshopImages
        )
        imgs = imgs.map(item => {
          item +=
            '?x-oss-process=image/resize,limit_0,m_fill,w70,h_70/quality,q_80'
          return item
        })
        setCurrentFactoryDetail(factoryDetail)
        setCurrentFactoryImgs(imgs)
        setFacoryShow(true)
      })()
    }
  }, [currentFactory])

  useEffect(() => {
    updateViewContent()
  }, [totalData])

  useEffect(() => {
    // 通过加工厂信息卡片返回加工厂列表时  更新列表数据
    !facoryShow && updateViewContent()
  }, [facoryShow])

  useEffect(() => {
    updateViewContent(throttleScrollTop)
  }, [throttleScrollTop])

  const factoryClick = data => {
    const { factoryLnglat } = data
    if (Array.isArray(factoryLnglat) && !factoryLnglat.includes('null')) {
      map && map.panTo(factoryLnglat)
    }
    setCurrentFactory(toJS(data))
  }

  const backToList = () => {
    setFacoryShow(false)
  }

  const toDetail = () => {
    window.open(`/factory-detail/${currentFactory.factoryId}`)
  }

  const factoryDetailConfig = [
    {
      label: '有效车位',
      icon: 'jack-chewei',
      field: 'effectiveLocation',
      unit: '台'
    },
    {
      label: '厂房面积',
      icon: 'jack-cfmj',
      field: 'factoryArea',
      unit: '平米'
    },
    {
      label: '成立时间',
      icon: 'jack-nianfen_bai',
      field: 'factoryCreateTime',
      unit: '年'
    },
    {
      label: '主营类别',
      icon: 'jack-zhuying_bai',
      field: 'factoryCategoryList',
      unit: ''
    },
    {
      label: '起订量',
      icon: 'jack-pinpai_lan',
      field: 'moq',
      unit: '件'
    }
  ]

  const transformMenu = () => {
    setMenuFlag(f => !f)
  }

  return (
    <div
      className={classNames(
        styles.factorys,
        facoryShow || !list.length ? styles.fitHeight : '',
        !menuFlag ? styles.menuRetract : ''
      )}
      ref={factorysRef}
    >
      <div className={classNames(styles.slideChunk)} onClick={transformMenu}>
        {menuFlag ? (
          <Icon type={'jack-left-copy'}></Icon>
        ) : (
          <Icon type={'jack-you_31'}></Icon>
        )}
      </div>
      <div
        className={classNames(
          styles.title,
          facoryShow ? styles.hiddenTitle : styles.showTitle
        )}
      >
        找到{totalData.length}家工厂
      </div>
      <div
        className={styles.virtualList}
        onScroll={handleScroll}
        ref={virtualListRef}
      >
        <div
          className={styles.virtualListHeight}
          style={{ height: `${totalHeight}px` }}
        />

        <div className={styles.viewContent} style={{ transform: transform }}>
          {data.map(item => {
            const imgUrl =
              item.outsizeImageUrl +
              '?x-oss-process=image/resize,limit_0,m_fill,w70,h_70/quality,q_100'
            return (
              <div
                onClick={() => factoryClick(item)}
                className={styles.viewItem}
                key={item.factoryId}
              >
                <div className={styles.viewIdx}>{item.idx}</div>
                <img src={imgUrl} alt={''} className={styles.viewImg}></img>
                <div className={styles.viewInfo}>
                  <div className={styles.viewTitle}>{item.factoryName}</div>
                  <div className={styles.viewAddress}>
                    {item.factoryAddress}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {factorysShow && !list.length ? (
        <div className={styles.emptyBlock}>
          <img src={EMPTY_IMG} alt="" className={styles.emptyImg} />
          <div>抱歉，暂未找到合适的工厂～</div>
        </div>
      ) : null}
      {facoryShow ? (
        <div className={styles.viewFactoryInfo}>
          <div onClick={backToList} className={styles.viewFactoryBack}>
            <Icon
              type={'jack-you_31'}
              className={styles.viewFactoryBackIcon}
            ></Icon>
            返回搜索结果
          </div>
          <div className={styles.viewFactoryContent}>
            <div className={styles.viewFactoryName}>
              {currentFactory.factoryName}
            </div>
            {factoryDetailConfig.map((item, idx) => {
              const target = currentFactoryDetail[item.field]
              let value
              if (!target) {
                value = '--'
              } else {
                value =
                  item.field === 'factoryCreateTime'
                    ? moment(target).format('YYYY')
                    : item.field === 'factoryCategoryList'
                    ? target.join(' ')
                    : target
              }
              return (
                <div className={styles.viewFactoryItem} key={idx}>
                  <div className={styles.viewFactoryItemLeft}>
                    <Icon
                      type={item.icon}
                      className={styles.viewFactoryIcon}
                    ></Icon>
                    <span>{item.label}</span>
                  </div>
                  <div className={styles.viewFactoryItemRight}>
                    <span className={styles.viewFactoryInfoCount}>{value}</span>
                    <span>{item.unit}</span>
                  </div>
                </div>
              )
            })}

            <div className={styles.viewFactoryImgs}>
              {currentFactoryImgs.map((item, idx) => {
                return (
                  <img
                    key={idx}
                    src={item}
                    className={styles.viewFactoryImg}
                    alt=""
                  />
                )
              })}
            </div>

            <div className={styles.toDetail} onClick={toDetail}>
              前往详情
              <Icon type={'jack-you_31'} className={styles.toDetailIcon}></Icon>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default observer(Factorys)
