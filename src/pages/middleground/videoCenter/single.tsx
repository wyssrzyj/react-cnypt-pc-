import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { useParams } from 'react-router'
import { useStores } from '@/utils/mobx'
import EZUIKit from 'ezuikit-js'
import { isEmpty } from 'lodash'
import { Icon } from '@/components'
import { FAIL_VIDEO, UN_ADD } from './index'

interface RouteParams {
  platformOrderId: string
  supplierId: string
}

const Single = props => {
  const { callback } = props
  const routerParams: RouteParams = useParams()
  const { platformOrderId, supplierId } = routerParams
  const { orderStore } = useStores()
  const { getVideos } = orderStore

  const videoPlayerRef = useRef<any>(null)
  const [targetData, setTargetData] = useState<any>({})
  const [player, setPlayer] = useState<any>()
  const [error, setError] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

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
        const target = records[records.length - 1] || {}
        callback && callback(0)
        setTargetData(target)
      }
    })()
  }, [])

  useEffect(() => {
    if (isEmpty(targetData)) return
    const p = new EZUIKit.EZUIKitPlayer({
      id: 'video-container-single', // 视频容器ID
      accessToken: targetData.accessToken,
      url: targetData.playAddress,
      width: 1136,
      height: 852,
      templete: 'voice',
      footer: ['hd', 'fullScreen'],
      handleSuccess: () => {
        setTimeout(() => {
          setSuccess(true)
        }, 500)
      },
      handleError: () => {
        setError(true)
        player.stop()
      }
    })
    setPlayer(p)
  }, [targetData])

  useEffect(() => {
    return () => {
      if (player) {
        player.stop().then(() => {
          setPlayer(null)
        })
      }
    }
  }, [player])

  useEffect(() => {}, [error])

  return (
    <div className={styles.videoBoxOne}>
      {isEmpty(targetData) ? (
        <div className={styles.singleEmpty}></div>
      ) : (
        <div
          id="video-container-single"
          className={styles.videoSingle1}
          ref={videoPlayerRef}
        >
          <div className={!success ? styles.maskSingle2 : ''}>
            {!isEmpty(targetData) && targetData.playAddress && !success && (
              <>
                <Icon
                  type={'jack-LoadingIndicator'}
                  className={styles.loadingIcon}
                ></Icon>
                <div>视频加载中，请稍等 ~</div>
              </>
            )}
            {!isEmpty(targetData) && !targetData.playAddress && (
              <>
                <img src={FAIL_VIDEO} alt="" className={styles.emptyImg9} />
                <div>视频播放失败，请检测网络或设备 ~</div>
              </>
            )}
            {!isEmpty(targetData) && !targetData.id && (
              <>
                <img src={UN_ADD} alt="" className={styles.emptyImg9} />
                <div>还未添加设备~</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(Single)
