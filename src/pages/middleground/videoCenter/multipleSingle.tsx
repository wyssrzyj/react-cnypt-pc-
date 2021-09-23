import React, { useRef, useState, useEffect } from 'react'
import styles from './index.module.less'
import classNames from 'classnames'
import { Icon } from '@/components'
import { useParams } from 'react-router'
import { useStores } from '@/utils/mobx'
import EZUIKit from 'ezuikit-js'
import { isEmpty } from 'lodash'

const arr1 = [
  { label: '车间组一号', key: 'four_1' },
  { label: '车间组二号', key: 'four_2' },
  { label: '车间组三号', key: 'four_3' },
  { label: '车间组四号', key: 'four_4' }
]

interface RouteParams {
  platformOrderId: string
  supplierId: string
}

const MultipleSingle = () => {
  const videoPlayerRef = useRef<any>(null)

  const routerParams: RouteParams = useParams()
  const { platformOrderId, supplierId } = routerParams
  const { orderStore } = useStores()
  const { getVideos } = orderStore

  const [videoIndex, setVideoIndex] = useState<number>(0)
  const [dataSource, setDatasource] = useState<any[]>([])
  const [player, setPlayer] = useState<any>()

  useEffect(() => {
    ;(async () => {
      const data = await getVideos({
        platformOrderId,
        supplierId,
        pageSize: 9999,
        pageNum: 1
      })
      if (data) {
        const { records } = data
        setDatasource(records)
      }
    })()
  }, [])

  useEffect(() => {
    if (isEmpty(dataSource)) return
    const target = dataSource[0]
    const p = new EZUIKit.EZUIKitPlayer({
      id: 'video-container-multiple', // 视频容器ID
      accessToken: target.accessToken,
      url: target.playAddress,
      width: 860,
      height: 645 - 48,
      templete: 'voice',
      footer: ['hd', 'fullScreen']
    })

    videoPlayerRef.current = p
    setPlayer(videoPlayerRef.current)
  }, [dataSource])

  useEffect(() => {
    return () => {
      videoPlayerRef.current && videoPlayerRef.current.stop()
      videoPlayerRef.current = null
      setPlayer(null)
      setDatasource([])
    }
  }, [])

  // 单个视频列表下的视频序号
  const changeVideoIndex = async (index, data) => {
    setVideoIndex(index)
    if (videoPlayerRef.current) {
      await videoPlayerRef.current.stop()

      if (data.playAddress && data.accessToken) {
        videoPlayerRef.current.play({
          accessToken: data.accessToken,
          url: data.playAddress
        })
      }
    }
  }

  return (
    <div className={styles.videoBoxOne}>
      <div id="video-container-multiple" className={styles.videoSingle}></div>
      <div className={styles.videoList}>
        {dataSource.map((item, idx) => {
          return (
            <div
              key={idx}
              className={classNames(
                styles.videoListItem,
                videoIndex === idx ? styles.activeVideoItem : ''
              )}
              onClick={() => changeVideoIndex(idx, item)}
            >
              <Icon
                type={'jack-video'}
                className={
                  videoIndex === idx ? styles.activeVideoIcon : styles.videoIcon
                }
              ></Icon>
              <span>{item.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(MultipleSingle)
