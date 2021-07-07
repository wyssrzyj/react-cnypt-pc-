import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { toJS } from 'mobx'
import axios from '@/utils/axios'
import { useStores, observer } from '@/utils/mobx'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs } from 'swiper'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
import styles from './index.module.less'
import './style.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs])

const rowKey = 'id'

const WorkshopEquipment = props => {
  const { factoryId } = props
  const pageSize = 6
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { factoryEquipmentType = [] } = toJS(dictionary)
  const [pageNum, setPageNum] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [dataSource, setDataSource] = useState<any>([])
  const [factoryImg, setFactoryImg] = useState<any>([])

  const columns = [
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
      render: value => {
        return factoryEquipmentType.find(item => item.value === value)
          ? factoryEquipmentType.find(item => item.value === value).label
          : value
      }
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      render: value => {
        return value ? value : '--'
      }
    },
    // {
    //   title: '设备照片',
    //   dataIndex: 'imageUrl',
    //   key: 'imageUrl',
    //   render: value => {
    //     return value ? <Image width={100} src={value} /> : '无'
    //   }
    // },
    {
      title: '数量（台）',
      dataIndex: 'number',
      key: 'number'
    }
  ]

  const onPaginationChange = page => {
    setPageNum(page)
    setTotal(0)
  }

  const getEquipment = () => {
    setLoading(true)
    axios
      .post('/api/factory/equipment/list', {
        pageNum,
        pageSize,
        factoryId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          const { records, total } = data
          setTotal(total)
          setDataSource([...records])
          const newUrl = records.map(item => item.imageUrl)
          setFactoryImg([...newUrl])
        } else {
          setTotal(0)
          setDataSource([])
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getEquipment()
  }, [])

  useEffect(() => {
    if (!factoryImg.length) return
    const galleryThumbs = new Swiper('#equipment-thumbs', {
      direction: 'vertical',
      spaceBetween: 10,
      slidesPerView: 4,
      watchSlidesVisibility: true //防止不可点击
    })
    new Swiper('#equipment-top', {
      direction: 'vertical',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      thumbs: {
        swiper: galleryThumbs
      },
      loop: true
    })
  }, [factoryImg])

  return (
    <div className={styles.workshopEquipment}>
      <div className={styles.left}>
        <div className="swiper-container " id="equipment-top">
          <div className="swiper-wrapper">
            {factoryImg.map((item, index) => (
              <div key={index} className="swiper-slide">
                <img src={item} />
              </div>
            ))}
          </div>
          {/* <div className="swiper-button-next swiper-button-white"></div>
          <div className="swiper-button-prev swiper-button-white"></div> */}
        </div>
        <div className="swiper-container" id="equipment-thumbs">
          <div className="swiper-wrapper">
            {factoryImg.map((item, index) => (
              <div key={index} className="swiper-slide factory-small-img">
                <img src={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <h2 className={styles.nameCn}>车间设备</h2>
        <h4 className={styles.nameEn}>WORKSHOP EQUIPMENT</h4>
        <Table
          rowKey={rowKey}
          loading={loading}
          size="small"
          dataSource={dataSource}
          columns={columns}
          pagination={{
            current: pageNum,
            pageSize,
            total,
            onChange: onPaginationChange
          }}
        />
      </div>
    </div>
  )
}

export default observer(WorkshopEquipment)
