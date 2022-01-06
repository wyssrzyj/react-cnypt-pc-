import React, { useState, useEffect } from 'react'
import { Row, Col, Spin } from 'antd'
import Viewer from 'react-viewer'
import axios from '@/utils/axios'
import { getUserInfo } from '@/utils/tool'
import styles from './index.module.less'

const FactoryPhotograph = () => {
  const currentUser = getUserInfo() || {}
  const { factoryId } = currentUser
  const [visible, setVisible] = useState(false)
  const [nameplateFileList, setNameplateFileList] = useState<any[]>([])
  const [locationFileList, setLocationFileList] = useState<any[]>([])
  const [workshopFileList, setWorkshopFileList] = useState<any[]>([])
  const [allImages, setAllImages] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getFactoryImage = async () => {
    setIsLoading(true)
    axios
      .get(
        '/api/factory/factory-inspection-report/get-inspection-images-by-factory-id',
        {
          factoryId: factoryId
        }
      )
      .then(response => {
        const { success, data } = response
        console.log(data)

        if (success) {
          const {
            factoryAuditorImageList,
            outsizeImageList,
            workshopImageList
          } = data
          setNameplateFileList([...factoryAuditorImageList])
          setLocationFileList([...outsizeImageList])
          setWorkshopFileList([...workshopImageList])
          const newImages = [
            ...factoryAuditorImageList,
            ...outsizeImageList,
            ...workshopImageList
          ].map(item => ({ src: item.thumbUrl }))
          setAllImages([...newImages])
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  //核心
  const checkImage = index => {
    console.log('放大测试', index)
    setCurrentIndex(index)
    setVisible(true)
  }

  useEffect(() => {
    factoryId && getFactoryImage()
  }, [factoryId])

  return (
    <div className={styles.factoryPhotograph}>
      {isLoading && <Spin className={styles.loading} size="large" />}
      {!isLoading && (
        <>
          <Row gutter={16} className={styles.row}>
            <Col className={styles.colLabel} span={5}>
              验厂员与企业铭牌照：
            </Col>
            <Col className="gutter-row" span={18}>
              {nameplateFileList.map((item, index) => (
                <div
                  key={index}
                  className={styles.image}
                  style={{ backgroundImage: `url(${item.thumbUrl})` }}
                  onClick={() => checkImage(index)} //
                ></div>
              ))}
            </Col>
          </Row>

          <Row gutter={16} className={styles.row}>
            <Col className={styles.colLabel} span={5}>
              企业外景照：
            </Col>
            <Col className="gutter-row" span={18}>
              {locationFileList.map((item, index) => (
                <div
                  key={index}
                  className={styles.image}
                  style={{ backgroundImage: `url(${item.thumbUrl})` }}
                  onClick={() => {
                    checkImage(index + 1) //这里因为上一个图片只有一个才+1
                  }}
                ></div>
              ))}
            </Col>
          </Row>

          <Row gutter={16} className={styles.row}>
            <Col className={styles.colLabel} span={5}>
              企业车间照：
            </Col>
            <Col className="gutter-row" span={18}>
              {workshopFileList.map((item, index) => (
                <div
                  key={index}
                  className={styles.image}
                  style={{ backgroundImage: `url(${item.thumbUrl})` }}
                  onClick={
                    () => checkImage(index + locationFileList.length + 1) //自身加上前两个的总和
                  }
                ></div>
              ))}
            </Col>
          </Row>
        </>
      )}
      <Viewer
        visible={visible}
        activeIndex={currentIndex}
        onMaskClick={() => {
          setVisible(false)
        }}
        onClose={() => {
          setVisible(false)
        }}
        images={allImages}
      />
    </div>
  )
}

export default FactoryPhotograph
