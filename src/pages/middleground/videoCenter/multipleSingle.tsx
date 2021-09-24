import React, { useRef, useState, useEffect } from 'react'
import styles from './index.module.less'
import classNames from 'classnames'
import { Icon } from '@/components'
import { useParams } from 'react-router'
import EZUIKit from 'ezuikit-js'
import { isEmpty } from 'lodash'
import { FAIL_VIDEO, UN_ADD } from './index'

interface RouteParams {
  platformOrderId: string
  supplierId: string
}

interface SearchParams {
  platformOrderId: string
  supplierId: string
  pageNum: number
  pageSize: number
}

const MultipleSingle = props => {
  const { callback, getData } = props
  const videoBoxRef = useRef<HTMLDivElement>(null)

  const routerParams: RouteParams = useParams()
  const { platformOrderId, supplierId } = routerParams

  const [videoIndex, setVideoIndex] = useState<number>(0)
  const [dataSource, setDatasource] = useState<any[]>([])
  const [error, setError] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const params: Partial<SearchParams> = {
        pageSize: 9999,
        pageNum: 1
      }
      if (platformOrderId) {
        params.platformOrderId = platformOrderId
      }
      if (supplierId) {
        params.supplierId = supplierId
      }
      const data = await getData(params)
      if (data) {
        const { records } = data
        callback && callback(1)
        setDatasource(records)
      }
    })()
  }, [])

  useEffect(() => {
    if (isEmpty(dataSource)) return
    setVideo()
  }, [dataSource, videoIndex])

  const setVideo = () => {
    const target = dataSource[videoIndex]
    const player = new EZUIKit.EZUIKitPlayer({
      id: 'video-container-multiple', // 视频容器ID
      accessToken: target.accessToken,
      url: target.playAddress,
      width: platformOrderId ? 860 : 540,
      height: platformOrderId ? 645 : 405,
      templete: 'voice',
      footer: ['hd', 'fullScreen'],
      handleSuccess: () => {
        setTimeout(() => {
          setSuccess(true)
        }, 500)
      },
      handleError: () => {
        console.log(555555555555555555555)
        setError(true)
        player.stop()
      }
    })
  }

  useEffect(() => {
    return () => {
      setDatasource([])
    }
  }, [])

  useEffect(() => {}, [error])

  // 单个视频列表下的视频序号
  const changeVideoIndex = async index => {
    setVideoIndex(index)
    setSuccess(false)
    setError(false)
    const child = Array.from(videoBoxRef.current.childNodes)
    if (!isEmpty(child) && Array.isArray(child)) {
      child.forEach(item => videoBoxRef.current.removeChild(item))
    }
  }

  return (
    <div className={styles.videoBoxOne}>
      <div className={styles.videoSingleBox}>
        <div
          id="video-container-multiple"
          className={styles.videoSingle}
          ref={videoBoxRef}
        ></div>
        <div className={!success ? styles.maskSingle : ''}>
          {dataSource.length &&
          dataSource[videoIndex].playAddress &&
          !success ? (
            <>
              <Icon
                type={'jack-LoadingIndicator'}
                className={styles.loadingIcon}
              ></Icon>
              <div>视频加载中，请稍等 ~</div>
            </>
          ) : null}
          {dataSource.length && !dataSource[videoIndex].playAddress ? (
            <>
              <img src={FAIL_VIDEO} alt="" className={styles.emptyImg9} />
              <div>视频播放失败，请检测网络或设备 ~</div>
            </>
          ) : null}
          {dataSource.length && !dataSource[videoIndex].id ? (
            <>
              <img src={UN_ADD} alt="" className={styles.emptyImg9} />
              <div>还未添加设备~</div>
            </>
          ) : null}
        </div>
      </div>
      <div className={styles.videoList}>
        {dataSource.map((item, idx) => {
          return (
            <div
              key={idx}
              className={classNames(
                styles.videoListItem,
                videoIndex === idx ? styles.activeVideoItem : ''
              )}
              onClick={() => changeVideoIndex(idx)}
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
