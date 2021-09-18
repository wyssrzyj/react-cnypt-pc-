import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import EZUIKit from 'ezuikit-js'
import { Button } from 'antd'
import { Icon } from '@/components'
import { useHistory } from 'react-router'

const IconMap = new Map()
IconMap.set('one', 'jack-dsp_1')
IconMap.set('oneActive', 'jack-dsp_2')
IconMap.set('four', 'jack-sgg_1')
IconMap.set('fourActive', 'jack-sgg_2')
IconMap.set('nine', 'jack-jgg_11')
IconMap.set('nineActive', 'jack-jgg_2')
IconMap.set('full', 'jack-qp')

const configs = [
  { field: 'one', activeField: 'oneActive', value: 1 },
  { field: 'four', activeField: 'fourActive', value: 4 },
  { field: 'nine', activeField: 'nineActive', value: 9 }
]

const VideoCenter = () => {
  const history = useHistory()

  const [videoType, setVideoType] = useState('single')
  const [pageSize, setPagesize] = useState(1)
  const [videoPlayer, setVideoPlayer] = useState(null)

  useEffect(() => {
    // multiple single
    setVideoType('single')
  }, [])

  useEffect(() => {
    var player = new EZUIKit.EZUIKitPlayer({
      id: 'video-container', // 视频容器ID
      accessToken:
        'at.dcsas5z03aqh25n1ak2h6hd800n3f6xc-2rtw1ujrr7-0x3mf0n-nhd8qkpwo',
      url: 'ezopen://NWPREI@open.ys7.com/G41979864/1.hd.live',
      templete: 'voice',
      header: ['capturePicture', 'save', 'zoom'],
      footer: ['talk', 'broadcast', 'hd', 'fullScreen'],
      plugin: ['talk']
    })
    player.startTalk()
    setVideoPlayer(player)
  }, [])

  const changePageSize = size => {
    setPagesize(size)
  }

  const back = () => {
    history.goBack()
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

          {/* <Icon
            type={IconMap.get('full')}
            onClick={fullScreen}
            className={styles.headerIcon}
          ></Icon> */}
        </div>
      </div>

      <div id="video-container" className={styles.video}></div>
    </div>
  )
}

export default VideoCenter
