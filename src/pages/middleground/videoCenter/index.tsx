import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styles from './index.module.less'
import EZUIKit from 'ezuikit-js'
import { Button } from 'antd'
import { Icon } from '@/components'
import { useHistory } from 'react-router'
import classNames from 'classnames'

const IconMap = new Map()
IconMap.set('one', 'jack-dsp_1')
IconMap.set('oneActive', 'jack-dsp_2')
IconMap.set('four', 'jack-sgg_1')
IconMap.set('fourActive', 'jack-sgg_2')
IconMap.set('nine', 'jack-jgg_11')
IconMap.set('nineActive', 'jack-jgg_2')
IconMap.set('full', 'jack-qp')

const videoDOMMap = new Map()
videoDOMMap.set('one', 'video-container')
videoDOMMap.set('four_1', 'video-four_1')
videoDOMMap.set('four_2', 'video-four_2')
videoDOMMap.set('four_3', 'video-four_3')
videoDOMMap.set('four_4', 'video-four_4')
videoDOMMap.set('nine_1', 'video-nine_1')
videoDOMMap.set('nine_2', 'video-nine_2')
videoDOMMap.set('nine_3', 'video-nine_3')
videoDOMMap.set('nine_4', 'video-nine_4')
videoDOMMap.set('nine_5', 'video-nine_5')
videoDOMMap.set('nine_6', 'video-nine_6')
videoDOMMap.set('nine_7', 'video-nine_7')
videoDOMMap.set('nine_8', 'video-nine_8')
videoDOMMap.set('nine_9', 'video-nine_9')

const configs = [
  { field: 'one', activeField: 'oneActive', value: 1 },
  { field: 'four', activeField: 'fourActive', value: 4 },
  { field: 'nine', activeField: 'nineActive', value: 9 }
]

const arr1 = [
  { label: '车间组一号', key: 'four_1' },
  { label: '车间组二号', key: 'four_2' },
  { label: '车间组三号', key: 'four_3' },
  { label: '车间组四号', key: 'four_4' }
]

const arr2 = [
  { label: '车间组一号', key: 'nine_1' },
  { label: '车间组二号', key: 'nine_2' },
  { label: '车间组三号', key: 'nine_3' },
  { label: '车间组四号', key: 'nine_4' },
  { label: '车间组五号', key: 'nine_5' },
  { label: '车间组六号', key: 'nine_6' },
  { label: '车间组七号', key: 'nine_7' },
  { label: '车间组八号', key: 'nine_8' },
  { label: '车间组九号', key: 'nine_9' }
]

const VideoCenter = () => {
  const history = useHistory()

  const videoFourRef = useRef<HTMLDivElement>()
  const videoNineRef = useRef<HTMLDivElement>()
  const errorVideoRef = useRef<any>([])
  const videoPlayersRef = useRef<any>([])
  const videoPlayerRef = useRef<any>(null)
  const dataSourceRef = useRef<any>([])

  const [videoType, setVideoType] = useState<'multiple' | 'single'>('multiple')
  const [pageSize, setPagesize] = useState<1 | 4 | 9>(1)
  const [videoPlayer, setVideoPlayer] = useState(null)
  const [videoPlayers, setVideoPlayers] = useState([])
  const [videoIndex, setVideoIndex] = useState<number>(0)
  const [dataSource, setDatasource] = useState<any[]>([])

  const [_errorList, setErrorList] = useState<any[]>([])

  const changePageSize = async size => {
    if (size === pageSize) return
    let res

    if (videoPlayersRef.current && pageSize === 1) {
      res = [await videoPlayer.stop()]
    }
    if (Array.isArray(videoPlayersRef.current) && [4, 9].includes(pageSize)) {
      const arr = []
      videoPlayersRef.current.forEach(async (item, idx) => {
        !errorVideoRef.current.includes(idx) && arr.push(item.stop())
      })

      res = await Promise.all(arr)
    }

    const flag = Array.isArray(res) && res.every(item => item.type === 'stop')
    setTimeout(() => {
      flag && setPagesize(size)

      videoPlayersRef.current = []
      videoPlayerRef.current = null
      setVideoPlayers(videoPlayersRef.current)
      setVideoPlayer(videoPlayerRef.current)
    })
  }

  const back = () => {
    history.goBack()
  }

  const changeVideoIndex = async (index, _data) => {
    setVideoIndex(index)
    await videoPlayer.stop()
    setTimeout(() => {
      videoPlayer.play({
        url: 'ezopen://NWPREI@open.ys7.com/G41979864/1.hd.live'
      })
    }, 1000)
  }

  useEffect(() => {
    // multiple single
    setVideoType('single')
  }, [])

  useLayoutEffect(() => {
    let data
    // TODO 切换4 9 时 target的子节点未变
    if (pageSize === 9) {
      data = arr2
      dataSourceRef.current = data
      setDatasource(data)
    }
    if (pageSize === 4) {
      data = arr1
      dataSourceRef.current = data
      setDatasource(data)
    }
  }, [pageSize])

  useLayoutEffect(() => {
    let data = []
    let childrenLength
    let target
    // TODO 切换4 9 时 target的子节点未变
    // console.log(pageSize, 'pageSizepageSizepageSizepageSizepageSizepageSize')
    if (pageSize === 9) {
      data = arr2
      childrenLength = videoNineRef.current.children.length
      target = videoNineRef.current
      dataSourceRef.current = data
      setDatasource(data)
    }
    if (pageSize === 4) {
      data = arr1
      childrenLength = videoFourRef.current.children.length
      target = videoFourRef.current
      dataSourceRef.current = data
      setDatasource(data)
    }

    if (
      [4, 9].includes(pageSize) &&
      !videoPlayersRef.current.length &&
      target &&
      childrenLength &&
      Array.isArray(data)
    ) {
      const arr = []

      data.forEach((item, idx) => {
        console.log(item.key, 'item.key')

        const player = new EZUIKit.EZUIKitPlayer({
          id: videoDOMMap.get(item.key), // 视频容器ID
          accessToken:
            'at.20cwgt303mknqhhp209nlx7w46lfzd1s-1sdszo9p8e-1tqxarc-ji9a8joac',
          url: 'ezopen://NWPREI@open.ys7.com/G41979864/1.hd.live',
          width: pageSize === 4 ? 556 : 362,
          height: pageSize === 4 ? 417 - 48 : 272 - 48,
          templete: 'voice',
          footer: ['broadcast', 'hd', 'fullScreen'],
          // header: ['capturePicture', 'save', 'zoom'],
          // footer: ['talk', 'broadcast', 'hd', 'fullScreen'],
          // plugin: ['talk'],
          handleError: () => {
            errorVideoRef.current.push({ idx })
            setErrorList(errorVideoRef.current)
            player.stop()
          }
        })
        arr.push(player)
      })
      videoPlayersRef.current = arr
      setVideoPlayers(videoPlayersRef.current)
    }
  }, [pageSize, videoFourRef.current, videoNineRef.current])

  useEffect(() => {
    if (
      !videoPlayerRef.current &&
      (videoType === 'single' || (videoType === 'multiple' && pageSize === 1))
    ) {
      const player = new EZUIKit.EZUIKitPlayer({
        id: 'video-container', // 视频容器ID
        accessToken:
          'at.20cwgt303mknqhhp209nlx7w46lfzd1s-1sdszo9p8e-1tqxarc-ji9a8joac',
        url: 'ezopen://NWPREI@open.ys7.com/G41979864/1.hd.live',
        width: 860,
        height: 645 - 48,
        templete: 'voice',
        footer: ['broadcast', 'hd', 'fullScreen']
        // header: ['capturePicture', 'save', 'zoom'],
        // footer: ['talk', 'broadcast', 'hd', 'fullScreen'],
        // plugin: ['talk']
      })
      videoPlayerRef.current = player
      setVideoPlayer(videoPlayerRef.current)
    }
  }, [videoType, pageSize, videoPlayer])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Icon
            onClick={back}
            type={'jack-left-copy'}
            className={styles.headerLeftIcon}
          ></Icon>
          视频中心
        </div>
        <div className={styles.headerRight}>
          {videoType === 'single' ? (
            <Button>单个视频</Button>
          ) : (
            <Button>多个视频</Button>
          )}
          {/* 单个视频 单个显示 */}
          {videoType === 'single' ? (
            <div className={styles.videoBoxOne}>
              <div id="video-container" className={styles.videoSingle}></div>
            </div>
          ) : null}
          {/* 多个视频 显示模式*/}
          {videoType !== 'single' ? (
            <div className={styles.icons}>
              {configs.map(item => (
                <Icon
                  key={item.field}
                  type={
                    pageSize === item.value
                      ? IconMap.get(item.activeField)
                      : IconMap.get(item.field)
                  }
                  onClick={() => changePageSize(item.value)}
                  className={styles.headerIcon}
                ></Icon>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {/* 多个视频 单个显示 */}
      {videoType === 'multiple' && pageSize === 1 ? (
        <div className={styles.videoBoxOne}>
          <div id="video-container" className={styles.videoSingle}></div>
          <div className={styles.videoList}>
            {arr1.map((item, idx) => {
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
                      videoIndex === idx
                        ? styles.activeVideoIcon
                        : styles.videoIcon
                    }
                  ></Icon>
                  <span>{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
      {/* 多个视频 4个显示 */}
      {videoType === 'multiple' && pageSize === 4 ? (
        <div className={styles.videoBoxFour} ref={videoFourRef}>
          {dataSourceRef.current.map((_item, idx) => {
            return (
              <div
                id={`video-four_${idx + 1}`}
                key={idx}
                className={styles.videoFourItem}
              ></div>
            )
          })}
        </div>
      ) : null}
      {/* 多个视频 9个显示 */}
      {videoType === 'multiple' && pageSize === 9 ? (
        <div className={styles.videoBoxNine} ref={videoNineRef}>
          {dataSourceRef.current.map((_item, idx) => {
            return (
              <div
                id={`video-nine_${idx + 1}`}
                key={idx}
                className={styles.videoNineItem}
              ></div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default VideoCenter
