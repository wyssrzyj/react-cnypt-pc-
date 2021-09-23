import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.less'
import EZUIKit from 'ezuikit-js'
import { Pagination } from 'antd'
import { useParams } from 'react-router'
import { useStores } from '@/utils/mobx'
import { isEmpty } from 'lodash'

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

const Nine = () => {
  const routerParams: { platformOrderId: string; supplierId: string } =
    useParams()
  const { platformOrderId, supplierId } = routerParams
  const { orderStore } = useStores()
  const { getVideos } = orderStore
  const pageSize = 9

  const videoNineRef = useRef<HTMLDivElement>()
  const successRef = useRef<any[]>([])
  const errorRef = useRef<any[]>([])

  const [pageNum, setPageNum] = useState<number>(1)
  const [dataSource, setDatasource] = useState<any[]>([])
  const [total, setTotal] = useState<number>(0)
  const [videoPlayers, setVideoPlayers] = useState<any[]>([])
  const [errorList, setErrorList] = useState<any[]>([])
  const [successList, setSuccessList] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const data = await getVideos({
        platformOrderId,
        supplierId,
        pageSize,
        pageNum: pageNum
      })
      if (data) {
        const { records, total } = data

        records.forEach((item, idx) => {
          item.key = `nine_${idx + 1}`
        })
        setDatasource(records)
        setTotal(total)
      }
    })()
  }, [])

  useEffect(() => {
    if (isEmpty(dataSource)) return
    if (isEmpty(videoPlayers)) {
      const arr = []
      dataSource.forEach((item, idx) => {
        try {
          const player = new EZUIKit.EZUIKitPlayer({
            id: videoDOMMap.get(item.key), // 视频容器ID
            // accessToken:
            //   'at.20cwgt303mknqhhp209nlx7w46lfzd1s-1sdszo9p8e-1tqxarc-ji9a8joac',
            // url: 'ezopen://NWPREI@open.ys7.com/G41979864/1.hd.live',
            url: item.playAddress ? item.playAddress : '',
            accessToken: item.accessToken ? item.accessToken : '',
            width: 362,
            height: 272 - 48,
            templete: 'voice',
            footer: ['hd', 'fullScreen'],
            handleSuccess: () => {
              !successRef.current.includes(idx) && successRef.current.push(idx)
              setSuccessList(successRef.current)
            },
            handleError: () => {
              !errorRef.current.includes(idx) && errorRef.current.push(idx)
              setErrorList(errorRef.current)
              player.stop()
            }
          })
          if (!item.playAddress || !item.accessToken) {
            player.stop()
          }
          arr.push(player)
        } catch (err) {
          console.log(err)
        }

        setVideoPlayers(arr)
      })
    }

    if (!isEmpty(videoPlayers)) {
      videoPlayers.forEach(async (item, idx) => {
        await item.stop()
        item.play({
          url: dataSource[idx].playAddress,
          accessToken: dataSource[idx].accessToken
        })
      })
    }
  }, [dataSource, videoPlayers])

  const onPaginationChange = (page, pageSize) => {
    console.log(
      '🚀 ~ file: index2.tsx ~ line 225 ~ onPaginationChange ~ page',
      page
    )
    console.log(
      '🚀 ~ file: index2.tsx ~ line 225 ~ onPaginationChange ~ pageSize',
      pageSize
    )
  }

  useEffect(() => {
    // console.log(successList)
  }, [successList])

  useEffect(() => {
    // console.log(errorList)
  }, [errorList])

  return (
    <div className={styles.videoOutBoxNine}>
      <div className={styles.videoBoxNine} ref={videoNineRef}>
        {dataSource.map((_item, idx) => {
          const flag = successRef.current.includes(idx)
          return (
            <div
              id={`video-nine_${idx + 1}`}
              key={idx}
              className={styles.videoNineItem}
            >
              <div className={!flag ? styles.mask9 : ''}></div>
            </div>
          )
        })}
        <Pagination
          current={pageNum}
          pageSize={pageSize}
          total={total}
          showSizeChanger={false}
          hideOnSinglePage
          onChange={onPaginationChange}
        ></Pagination>
      </div>
    </div>
  )
}

export default React.memo(Nine)
