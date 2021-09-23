import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { useParams } from 'react-router'
import { useStores } from '@/utils/mobx'
import EZUIKit from 'ezuikit-js'
import { isEmpty } from 'lodash'

interface RouteParams {
  platformOrderId: string
  supplierId: string
}

const Single = () => {
  const routerParams: RouteParams = useParams()
  const { platformOrderId, supplierId } = routerParams
  const { orderStore } = useStores()
  const { getVideos } = orderStore

  const videoPlayerRef = useRef<any>(null)
  const [targetData, setTargetData] = useState<any>({})
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
        const target = records[0] || {}
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
      height: 852 - 48,
      templete: 'voice',
      footer: ['hd', 'fullScreen']
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

  return (
    <div className={styles.videoBoxOne}>
      <div
        id="video-container-single"
        className={styles.videoSingle1}
        ref={videoPlayerRef}
      ></div>
    </div>
  )
}

export default React.memo(Single)
