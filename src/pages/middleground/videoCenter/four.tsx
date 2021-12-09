import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.less'
import EZUIKit from 'ezuikit-js'
import { Pagination } from 'antd'
import { useParams } from 'react-router'
import { isEmpty } from 'lodash'
import { FAIL_VIDEO, UN_ADD } from './index'
import { Icon } from '@/components'

const videoDOMMap = new Map()
videoDOMMap.set('four_1', 'video-four_1')
videoDOMMap.set('four_2', 'video-four_2')
videoDOMMap.set('four_3', 'video-four_3')
videoDOMMap.set('four_4', 'video-four_4')
interface SearchParams {
  platformOrderId: string
  supplierId: string
  pageNum: number
  pageSize: number
}

const Four = props => {
  const { callback, getData } = props
  const routerParams: { platformOrderId: string; supplierId: string } =
    useParams()
  const { platformOrderId, supplierId } = routerParams
  const pageSize = 4

  const videoFourRef = useRef<HTMLDivElement>()
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
        const { records = [], total } = data
        records.forEach((item, idx) => {
          item.key = `four_${idx + 1}`
        })
        callback && callback(total <= 4 ? 2 : 3)
        setDatasource(records)
        setTotal(total)
      }
    })()
  }, [pageNum])

  useEffect(() => {
    const list = Array.from(
      document.getElementsByClassName(styles.videoFourItem)
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
          width: platformOrderId ? 556 : 476,
          height: platformOrderId ? 417 : 357,
          templete: 'simple', // simple：极简版;standard：标准版;security：安防版(预览回放);vioce：语音版
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
      } catch (err) {}
    })
  }, [dataSource])

  const onPaginationChange = page => {
    setPageNum(page)
    errorRef.current = []
    successRef.current = []
    setErrorList([])
    setSuccessList([])
  }

  useEffect(() => {}, [successList])

  useEffect(() => {}, [errorList])

  return (
    <div className={styles.videoOutBoxFour}>
      <div className={styles.videoBoxFour} ref={videoFourRef}>
        {Array.isArray(dataSource) &&
          dataSource.map((item, idx) => {
            const flag = successList.includes(idx)
            return (
              <div className={styles.videoFourItemBox} key={idx}>
                {flag ? (
                  <div className={styles.departmentNames2}>
                    {item.orgNameList?.join('-')}
                  </div>
                ) : null}
                <div
                  id={`video-four_${idx + 1}`}
                  className={styles.videoFourItem}
                ></div>
                <div className={!flag ? styles.mask : ''}>
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
                      <img
                        src={FAIL_VIDEO}
                        alt=""
                        className={styles.emptyImg9}
                      />
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

export default React.memo(Four)
