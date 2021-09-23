import React, { useState, useEffect, useRef } from 'react'
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

const arr = [
  { label: '车间组一号', key: 'four_1' },
  { label: '车间组二号', key: 'four_2' },
  { label: '车间组三号', key: 'four_3' },
  { label: '车间组四号', key: 'four_4' },
  { label: '车间组一号' },
  { label: '车间组二号' },
  { label: '车间组三号' },
  { label: '车间组一号' }
]

const VideoCenter = () => {
  const history = useHistory()

  const videoFourRef = useRef<HTMLDivElement>()
  const errorVideoRef = useRef<any>([])
  const videoPlayersRef = useRef<any>([])

  const [videoType, setVideoType] = useState<'multiple' | 'single'>('multiple')
  const [pageSize, setPagesize] = useState<1 | 4 | 9>(1)
  const [videoPlayer, setVideoPlayer] = useState(null)
  const [videoPlayers, setVideoPlayers] = useState([])
  const [videoIndex, setVideoIndex] = useState<number>(0)
  const [dataSource, setDatasource] = useState<any[]>([])

  const [_errorList, setErrorList] = useState<any[]>([])

  useEffect(() => {
    // multiple single
    setVideoType('multiple')
    setDatasource(arr.slice(0, 4))
  }, [])

  useEffect(() => {
    console.log(videoType, 'videoType')
    if (
      !videoPlayer &&
      (videoType === 'single' || (videoType === 'multiple' && pageSize === 1))
    ) {
      console.log(999999999999999)
      const player = new EZUIKit.EZUIKitPlayer({
        id: 'video-container', // 视频容器ID
        accessToken:
          'at.dcsas5z03aqh25n1ak2h6hd800n3f6xc-2rtw1ujrr7-0x3mf0n-nhd8qkpwo',
        url: 'ezopen://NWPREI@open.ys7.com/G41979864/1.hd.live',
        width: 860,
        height: 645 - 96,
        templete: 'voice',
        header: ['capturePicture', 'save', 'zoom'],
        footer: ['talk', 'broadcast', 'hd', 'fullScreen'],
        plugin: ['talk']
      })
      setVideoPlayer(player ? player : null)
    }
  }, [videoType, pageSize, videoPlayer])

  useEffect(() => {
    if (pageSize === 4 && !videoPlayers.length) {
      const arr = []
      dataSource.forEach((item, idx) => {
        const player = new EZUIKit.EZUIKitPlayer({
          id: videoDOMMap.get(item.key), // 视频容器ID
          accessToken:
            'at.dcsas5z03aqh25n1ak2h6hd800n3f6xc-2rtw1ujrr7-0x3mf0n-nhd8qkpwo',
          url: 'ezopen://NWPREI@open.ys7.com/G41979864/1.hd.live',
          width: 556,
          height: 417 - 96,
          templete: 'voice',
          header: ['capturePicture', 'save', 'zoom'],
          footer: ['talk', 'broadcast', 'hd', 'fullScreen'],
          plugin: ['talk'],
          handleError: () => {
            errorVideoRef.current.push({ idx })
            setErrorList(errorVideoRef.current)
          }
        })
        arr.push(player)
      })
      videoPlayersRef.current = arr
      setVideoPlayers(videoPlayersRef.current)
    }
  }, [dataSource, pageSize, videoPlayers])

  const changePageSize = async size => {
    if (size === pageSize) return
    let res
    if (videoPlayersRef.current && pageSize === 1) {
      res = [await videoPlayer.stop()]
      setVideoPlayer(null)
    }
    if (Array.isArray(videoPlayersRef.current) && pageSize === 4) {
      const arr = []
      videoPlayersRef.current.forEach(async (item, idx) => {
        !errorVideoRef.current.includes(idx) && arr.push(item.stop())
      })
      setVideoPlayers([])
      res = await Promise.all(arr)
    }
    console.log(res, '~~~~~~~~~~~~~~~~~~~~~`')
    const flag = Array.isArray(res) && res.every(item => item.type === 'stop')
    flag && setPagesize(size)
  }

  const back = () => {
    history.goBack()
  }

  const changeVideoIndex = async (index, _data) => {
    await videoPlayer.stop()
    setVideoIndex(index)
    setTimeout(() => {
      videoPlayer.play({
        url: 'ezopen://NWPREI@open.ys7.com/G41979864/1.hd.live'
      })
    }, 1000)
  }

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
            {arr.map((item, idx) => {
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
          {dataSource.slice(0, 4).map((_item, idx) => {
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
    </div>
  )
}

export default VideoCenter
