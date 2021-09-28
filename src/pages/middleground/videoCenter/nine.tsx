import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.less'
import EZUIKit from 'ezuikit-js'
import { Pagination } from 'antd'
import { useParams } from 'react-router'
import { isEmpty } from 'lodash'
import { FAIL_VIDEO, UN_ADD } from './index'
import { Icon } from '@/components'

const videoDOMMap = new Map()
videoDOMMap.set('nine_1', 'video-nine_1')
videoDOMMap.set('nine_2', 'video-nine_2')
videoDOMMap.set('nine_3', 'video-nine_3')
videoDOMMap.set('nine_4', 'video-nine_4')
videoDOMMap.set('nine_5', 'video-nine_5')
videoDOMMap.set('nine_6', 'video-nine_6')
videoDOMMap.set('nine_7', 'video-nine_7')
videoDOMMap.set('nine_8', 'video-nine_8')
videoDOMMap.set('nine_9', 'video-nine_9')

interface SearchParams {
  platformOrderId: string
  supplierId: string
  pageNum: number
  pageSize: number
}

const Nine = props => {
  const { callback, getData } = props
  const routerParams: { platformOrderId: string; supplierId: string } =
    useParams()
  const { platformOrderId, supplierId } = routerParams
  const pageSize = 9

  const videoNineRef = useRef<HTMLDivElement>()
  const successRef = useRef([])
  const errorRef = useRef([])

  const [pageNum, setPageNum] = useState<number>(1)
  const [dataSource, setDatasource] = useState<any[]>([])
  const [total, setTotal] = useState<number>(0)
  const [errorList, setErrorList] = useState<any[]>([])
  const [successList, setSuccessList] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const params: Partial<SearchParams> = { pageSize, pageNum }
      if (platformOrderId) {
        params.platformOrderId = platformOrderId
      }
      if (supplierId) {
        params.supplierId = supplierId
      }
      const data = await getData(params)
      if (data) {
        const { records, total } = data
        // 处理模3余2情况的列表展示
        records.length % 3 === 2 ? records.push({}) : null
        records.forEach((item, idx) => {
          if (isEmpty(item)) return
          item.key = `nine_${idx + 1}`
        })
        callback && callback(total <= 9 ? 2 : 3)
        setDatasource(records)
        setTotal(total)
      }
    })()
  }, [pageNum])

  useEffect(() => {
    const list = Array.from(
      document.getElementsByClassName(styles.videoNineItem)
    )
    // 清空视频节点
    if (list.length) {
      list.forEach(target => {
        const targetChilds = Array.from(target.childNodes)
        if (targetChilds.length) {
          targetChilds.forEach(item => {
            target.removeChild(item)
          })
        }
      })
    }
  }, [dataSource])

  useEffect(() => {
    if (isEmpty(dataSource)) return
    const arr = []
    dataSource.forEach((item, idx) => {
      try {
        const player = new EZUIKit.EZUIKitPlayer({
          id: videoDOMMap.get(item.key), // 视频容器ID
          url: item.playAddress ? item.playAddress : '',
          accessToken: item.accessToken ? item.accessToken : '',
          width: platformOrderId ? 362 : 256,
          height: platformOrderId ? 272 : 192,
          templete: 'voice',
          footer: ['hd', 'fullScreen'],
          handleSuccess: () => {
            successRef.current.push(idx)
            setTimeout(() => {
              setSuccessList(successRef.current)
            }, 500)
          },
          handleError: () => {
            errorRef.current.push(idx)
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
    })
  }, [dataSource])

  const onPaginationChange = page => {
    setPageNum(page)
    errorRef.current = []
    successRef.current = []
    setErrorList([])
    setSuccessList([])
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
        {dataSource.map((item, idx) => {
          if (isEmpty(item)) {
            return <div className={styles.videoNineItemBox} key={idx}></div>
          }
          const flag = successList.includes(idx)
          return (
            <div className={styles.videoNineItemBox} key={idx}>
              <div
                id={`video-nine_${idx + 1}`}
                key={idx}
                className={styles.videoNineItem}
              ></div>
              <div className={!flag ? styles.mask9 : ''}>
                {item.playAddress && !flag && (
                  <>
                    <Icon
                      type={'jack-LoadingIndicator'}
                      className={styles.loadingIcon}
                    ></Icon>
                    <div>视频加载中，请稍等 ~</div>
                  </>
                )}
                {!item.playAddress && (
                  <>
                    <img src={FAIL_VIDEO} alt="" className={styles.emptyImg9} />
                    <div>视频播放失败，请检测网络或设备 ~</div>
                  </>
                )}
                {!item.id && (
                  <>
                    <img src={UN_ADD} alt="" className={styles.emptyImg9} />
                    <div>还未添加设备~</div>
                  </>
                )}
              </div>
            </div>
          )
        })}
        <div className={styles.paginationBox}>
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
    </div>
  )
}

export default React.memo(Nine)
