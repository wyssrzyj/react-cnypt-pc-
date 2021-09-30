import React, { useEffect, useRef, useState, useMemo } from 'react'
import styles from './index.module.less'
import { useParams } from 'react-router'
import EZUIKit from 'ezuikit-js'
import { isEmpty } from 'lodash'
import { Icon } from '@/components'
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

const Single = props => {
  const { callback, getData } = props
  const routerParams: RouteParams = useParams()
  const { platformOrderId, supplierId } = routerParams

  const videoPlayerRef = useRef<any>(null)
  const [targetData, setTargetData] = useState<any>({})
  const [player, setPlayer] = useState<any>()
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
      width: platformOrderId ? 1136 : 834,
      height: platformOrderId ? 852 : 625,
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

  const departmentNames = useMemo(() => {
    return targetData.orgNameList?.join('-')
  }, [targetData])

  return (
    <div className={styles.videoBoxOne}>
      {success ? (
        <div className={styles.departmentNames}>{departmentNames}</div>
      ) : null}
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
