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

  const getFactoryImage = () => {
    setIsLoading(true)

    axios
      .get('/api/factory/info/get-factory-images', {
        factoryId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          const { factoryAuditorImages, outsizeImages, workshopImages } = data
          setNameplateFileList([...factoryAuditorImages])
          setLocationFileList([...outsizeImages])
          setWorkshopFileList([...workshopImages])
          const newImages = [
            ...factoryAuditorImages,
            ...outsizeImages,
            ...workshopImages
          ].map(item => ({ src: item }))
          setAllImages([...newImages])
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const checkImage = index => {
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
                  style={{ backgroundImage: `url(${item})` }}
                  onClick={() => checkImage(index)}
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
                  style={{ backgroundImage: `url(${item})` }}
                  onClick={() => checkImage(nameplateFileList.length + index)}
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
                  style={{ backgroundImage: `url(${item})` }}
                  onClick={() =>
                    checkImage(
                      nameplateFileList.length + locationFileList.length + index
                    )
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
