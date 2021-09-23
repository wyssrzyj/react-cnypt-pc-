import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.less'
import EZUIKit from 'ezuikit-js'
import { Button, Pagination } from 'antd'
import { Icon } from '@/components'
import { useHistory } from 'react-router'
import classNames from 'classnames'
import { useParams } from 'react-router'
import { useStores } from '@/utils/mobx'
import Single from './single'
import MultipleSingle from './multipleSingle'
import Four from './four'
import Nine from './nine'

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

// const res = {
//   records: [
//     {
//       key: 'four_1',
//       id: '1439047972900872193',
//       factoryId: '1424546557034860545',
//       orgIdList: [
//         '1430708474615848961',
//         '1431151894734688258',
//         '1430753899976757249',
//         '385'
//       ],
//       orgNameList: ['开发部', '产品部', '运维部'],
//       name: '测试1号',
//       accessToken:
//         'at.20cwgt303mknqhhp209nlx7w46lfzd1s-1sdszo9p8e-1tqxarc-ji9a8joac',
//       playAddress: 'ezopen://NWPREI@open.ys7.com/G41979864/1.hd.live'
//     },
//     {
//       key: 'four_2',
//       id: '1438756395168141314',
//       factoryId: '1424546557034860545',
//       orgIdList: ['1431151894734688258'],
//       orgNameList: ['运维部'],
//       name: '1122323',
//       accessToken:
//         'at.20cwgt303mknqhhp209nlx7w46lfzd1s-1sdszo9p8e-1tqxarc-ji9a8joac',
//       playAddress: null
//     },
//     {
//       key: 'four_3',
//       id: '1438754916109750274',
//       factoryId: '1424546557034860545',
//       orgIdList: ['1431151894734688258', '1431153304759029761'],
//       orgNameList: ['运维部', '优产'],
//       name: 'test112000',
//       accessToken:
//         'at.20cwgt303mknqhhp209nlx7w46lfzd1s-1sdszo9p8e-1tqxarc-ji9a8joac',
//       playAddress: null
//     },
//     {
//       key: 'four_4',
//       id: '1438444469234012162',
//       factoryId: '1424546557034860545',
//       orgIdList: ['1431151894734688258'],
//       orgNameList: ['运维部'],
//       name: '恩特莱斯肯而',
//       accessToken:
//         'at.20cwgt303mknqhhp209nlx7w46lfzd1s-1sdszo9p8e-1tqxarc-ji9a8joac',
//       playAddress: null
//     }
//   ],
//   total: 4
// }

const VideoCenter = () => {
  const history = useHistory()
  const routerParams: { platformOrderId: string; supplierId: string } =
    useParams()
  const { platformOrderId, supplierId } = routerParams
  const { orderStore } = useStores()
  const { getVideos } = orderStore

  const videoFourRef = useRef<HTMLDivElement>()
  const videoNineRef = useRef<HTMLDivElement>()
  const errorVideoRef = useRef<any>([])
  const videoPlayerRef = useRef<any>(null)
  const playerRef = useRef<any>(null)
  const playersRef = useRef<any[]>([])
  const dataSourceRef = useRef<any[]>([])

  const [videoType, setVideoType] = useState<'multiple' | 'single' | undefined>(
    undefined
  )
  const [pageSize, setPagesize] = useState<1 | 4 | 9>(1)
  const [pageNum, setPageNum] = useState<number>(1)
  const [videoPlayer, setVideoPlayer] = useState(null)
  const [videoPlayers, setVideoPlayers] = useState<any[]>([])
  const [videoIndex, setVideoIndex] = useState<number>(0)
  const [dataSource, setDatasource] = useState<any[]>([])
  const [total, setTotal] = useState<number>(100)
  const [init, setInit] = useState<boolean>(false)

  const [errorList, setErrorList] = useState<any[]>([])

  useEffect(() => {
    // 初始化请求数据 判断数据量显示单个或者多个
    ;(async () => {
      const res = await getVideos({
        supplierId,
        platformOrderId,
        pageNum: 1,
        pageSize: pageSize === 1 ? 99 : pageSize
      })
      if (res) {
        const { records, total } = res
        dataSourceRef.current = records
        setDatasource(dataSourceRef.current)
        setTotal(total)
        if (total <= 1) {
          // 单页单个视频初始化
          setVideoType('single')
        }
        if (total > 1) {
          // 多页单个视频初始化
          setVideoType('multiple')
        }
        setInit(true)
      }
    })()
  }, [])

  // const initVideo = (type, initPlayer, data) => {
  //   if (Array.isArray(data) && data.length > 0) {
  //     const target = data[0]

  //     if (type === 'single' && !initPlayer) {
  //       const player = new EZUIKit.EZUIKitPlayer({
  //         id: 'video-container-single', // 视频容器ID
  //         accessToken: target.accessToken,
  //         url: target.playAddress,
  //         width: 1136,
  //         height: 852 - 48,
  //         templete: 'voice',
  //         footer: ['hd', 'fullScreen']
  //       })
  //       playerRef.current = player
  //       setVideoPlayer(playerRef.current)
  //     }
  //   }
  // }

  // const initVideo2 = (type, initPlayer, data) => {
  //   if (Array.isArray(data) && data.length > 0) {
  //     const target = data[0]
  //     if (type === 'multiple' && pageSize === 1 && !initPlayer) {
  //       const player = new EZUIKit.EZUIKitPlayer({
  //         id: 'video-container-multiple', // 视频容器ID
  //         accessToken: target.accessToken,
  //         url: target.playAddress,
  //         width: 860,
  //         height: 645 - 48,
  //         templete: 'voice',
  //         footer: ['hd', 'fullScreen']
  //       })

  //       playerRef.current = player
  //       setVideoPlayer(player)
  //     }
  //   }
  // }

  // 多页多个视频初始化

  // useEffect(() => {
  //   console.log(errorList, 'errorList')
  // }, [errorList])

  // useEffect(() => {
  //   ;(async () => {
  //     const data = await getVideos({
  //       platformOrderId,
  //       supplierId,
  //       pageSize: pageSize === 1 ? 9999 : pageSize,
  //       pageNum: 1
  //     })
  //     if (data) {
  //       const { records, total } = data
  //       setTotal(total)
  //       if (pageSize === 4) {
  //         records.forEach((item, idx) => {
  //           item.key = `four_${idx + 1}`
  //         })
  //       }
  //       if (pageSize === 9) {
  //         records.forEach((item, idx) => {
  //           item.key = `nine_${idx + 1}`
  //         })
  //       }
  //       setDatasource(records)
  //       setTimeout(async () => {
  //         if (pageSize === 1) {
  //           const target = records[0]
  //           console.log(videoPlayer, 'videoPlayer22222222222222222')
  //           try {
  //             // const res = await videoPlayer.stop()
  //             // console.log(
  //             //   '🚀 ~ file: index2.tsx ~ line 249 ~ setTimeout ~ res',
  //             //   res
  //             // )
  //             videoPlayer.play({
  //               url: target.playAddress,
  //               accessToken: target.accessToken
  //             })
  //           } catch (err) {
  //             console.log(err, '2222222222222222222222222')
  //           }
  //         }

  //         if (pageSize === 4 && videoPlayers.length === 4) {
  //           videoPlayers.forEach(async (item, idx) => {
  //             await item.stop()
  //             item.play({
  //               url: records[idx].playAddress,
  //               accessToken: records[idx].accessToken
  //             })
  //           })
  //         }
  //         if (pageSize === 4 && videoPlayers.length !== 4) {
  //           const arr = []
  //           records.forEach((item, idx) => {
  //             const player = new EZUIKit.EZUIKitPlayer({
  //               id: videoDOMMap.get(item.key), // 视频容器ID
  //               // accessToken:
  //               //   'at.20cwgt303mknqhhp209nlx7w46lfzd1s-1sdszo9p8e-1tqxarc-ji9a8joac',
  //               // url: 'ezopen://NWPREI@open.ys7.com/G41979864/1.hd.live',
  //               url: item.playAddress,
  //               accessToken: item.accessToken,
  //               width: 556,
  //               height: 417 - 48,
  //               templete: 'voice',
  //               footer: ['hd', 'fullScreen'],
  //               handleError: () => {
  //                 errorVideoRef.current.push({ idx })
  //                 setErrorList(errorVideoRef.current)
  //                 player.stop()
  //               }
  //             })
  //             arr.push(player)
  //             setVideoPlayers(arr)
  //           })
  //         }
  //       }, 500)
  //     }
  //   })()
  // }, [pageSize])

  const pageReset = async size => {
    setPagesize(size)
  }
  // 返回上页
  const back = () => {
    history.goBack()
  }
  // 单个视频列表下的视频序号
  // const changeVideoIndex = async (index, _data) => {
  //   setVideoIndex(index)
  //   await videoPlayer.stop()
  //   const target = dataSource[index]
  //   if (target.playAddress && target.accessToken) {
  //     videoPlayer.play({
  //       accessToken: target.accessToken,
  //       url: target.playAddress
  //     })
  //   }
  // }

  // const onPaginationChange = (page, pageSize) => {
  //   console.log(
  //     '🚀 ~ file: index2.tsx ~ line 225 ~ onPaginationChange ~ page',
  //     page
  //   )
  //   console.log(
  //     '🚀 ~ file: index2.tsx ~ line 225 ~ onPaginationChange ~ pageSize',
  //     pageSize
  //   )
  // }

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
                  onClick={() => pageReset(item.value)}
                  className={styles.headerIcon}
                ></Icon>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {/* 单个视频 单个显示 */}
      {videoType === 'single' ? <Single></Single> : null}
      {/* 多个视频 单个显示 */}
      {videoType === 'multiple' && pageSize === 1 ? (
        <MultipleSingle></MultipleSingle>
      ) : null}
      {videoType === 'multiple' && pageSize === 4 ? <Four></Four> : null}
      {videoType === 'multiple' && pageSize === 9 ? <Nine></Nine> : null}
    </div>
  )
}

export default VideoCenter
