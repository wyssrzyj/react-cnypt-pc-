import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import styles from './equipment.module.less'
import classNames from 'classnames'
import { Icon } from '@/components'
import OIMG from '../img/operateImg.png'

const poster =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210712/a4dce36518bb4cc4bec49ffc0d1d366e.png'

// 最新物联设备
const Equipment = props => {
  const { SwiperCore } = props
  const leftRef = useRef<HTMLDivElement>()
  const rightRef = useRef<HTMLDivElement>()
  const videoRef: any = useRef<HTMLVideoElement>()

  const [curKey, setCurKey] = useState(0)
  const [videoStatus, setVideoStatus] = useState('pause')

  useLayoutEffect(() => {
    new SwiperCore('.equipmentSwiper', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: false,
      effect: 'fade',
      on: {
        slideChange: keyChange
      }
    })
  }, [])

  const keyChange = event => {
    const { activeIndex } = event
    setCurKey(activeIndex)
  }

  const toLeft = () => {
    rightRef.current.click()
  }

  const toRight = () => {
    leftRef.current.click()
  }

  const datas = ['https://www.chinajack.com/DownLoad/202106121120463.mp4']

  useEffect(() => {
    if (videoRef) {
      console.log(videoRef.current.paused, 'videoRef.current.paused')
    }
  }, [videoRef])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('pause', () => {
        setVideoStatus('pause')
      })

      videoRef.current.addEventListener('play', () => {
        setVideoStatus('play')
      })
    }
  }, [])

  const videoClick = () => {
    const { paused } = videoRef.current
    paused ? videoRef.current.play() : videoRef.current.pause()
  }

  return (
    <div className={styles.equipment}>
      <div className={styles.equipmentInner}>
        <div className={styles.header}>
          <div className={styles.oTitle}>最新物联设备</div>
          <div className={styles.oText}>THE LATEST IOT EQUIPMENT</div>
          <img src={OIMG} alt="" className={styles.img} />
        </div>
        <div className={styles.equipmentSwiperOut}>
          <div
            onChange={keyChange}
            className={'swiper-container equipmentSwiper'}
          >
            <div className="swiper-wrapper">
              {datas.map((item, idx) => {
                return (
                  <div
                    className={classNames('swiper-slide', styles.videoBox)}
                    key={idx + '~'}
                  >
                    <video
                      poster={poster}
                      controlsList={'nodownload'}
                      controls
                      disablePictureInPicture
                      autoPlay={curKey === 1}
                      src={item}
                      className={styles.equipmentVideo}
                      ref={videoRef}
                    ></video>
                    {videoStatus === 'pause' ? (
                      <Icon
                        onClick={videoClick}
                        type={'jack-zanting'}
                        className={styles.videoIcon}
                      ></Icon>
                    ) : null}
                  </div>
                )
              })}
            </div>
            <div className="swiper-button-next" ref={leftRef}></div>
            <div className="swiper-button-prev" ref={rightRef}></div>
          </div>
        </div>
        <div className={styles.operateBtns}>
          <Icon
            type={'jack-zuo_3'}
            onClick={toLeft}
            className={classNames(
              styles.operateLeftIcon,
              curKey === 0 && styles.operateDisableIcon
            )}
          />
          <Icon
            type={'jack-you_3'}
            onClick={toRight}
            className={classNames(
              styles.operateRightIcon,
              curKey === datas.length - 1 && styles.operateDisableIcon
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Equipment
