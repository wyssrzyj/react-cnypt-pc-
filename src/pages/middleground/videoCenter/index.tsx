import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { Icon } from '@/components'
import { useHistory } from 'react-router'
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

// 播放失败
export const FAIL_VIDEO =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/bfsb.png'
// 未添加设备
export const UN_ADD =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/wtjsb.png'

const configs = [
  { field: 'one', activeField: 'oneActive', value: 1 },
  { field: 'four', activeField: 'fourActive', value: 4 },
  { field: 'nine', activeField: 'nineActive', value: 9 }
]

const tagNameMap = new Map()
tagNameMap.set(0, '单个视频')
tagNameMap.set(1, '多个视频')
tagNameMap.set(2, '单页视频')
tagNameMap.set(3, '多页视频')

const tagIconMap = new Map()
tagIconMap.set(0, 'jack-dgsp_1')
tagIconMap.set(1, 'jack-dgsp')
tagIconMap.set(2, 'jack-dysp')
tagIconMap.set(3, 'jack-dysp_1')

const VideoCenter = () => {
  const history = useHistory()
  const routerParams: {
    platformOrderId: string
    supplierId: string
    type: string
  } = useParams()
  const { platformOrderId, supplierId, type } = routerParams
  const { orderStore } = useStores()
  const { orderTrackVideos, factoryTrackVideos } = orderStore
  const getVideos = type === 'put' ? orderTrackVideos : factoryTrackVideos

  const [videoType, setVideoType] = useState<'multiple' | 'single' | undefined>(
    undefined
  )
  const [pageSize, setPagesize] = useState<1 | 4 | 9>(1)
  const [tag, setTag] = useState<number>(0)

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
        const { total } = res
        console.log('🚀 ~ file: index.tsx ~ line 75 ~ ; ~ total', total)
        // setVideoType('single')
        setVideoType(total <= 1 ? 'single' : 'multiple')
      }
    })()
  }, [])

  const pageReset = async size => {
    setPagesize(size)
  }
  // 返回上页
  const back = () => {
    history.goBack()
  }

  const changeTag = num => {
    setTag(num)
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
          <div className={styles.tagBox}>
            <Icon type={tagIconMap.get(tag)} className={styles.tagIcon}></Icon>
            {tagNameMap.get(tag)}
          </div>
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
      {videoType === 'single' ? (
        <Single callback={changeTag} getData={getVideos}></Single>
      ) : null}
      {/* 多个视频 单个显示 */}
      {videoType === 'multiple' && pageSize === 1 ? (
        <MultipleSingle
          callback={changeTag}
          getData={getVideos}
        ></MultipleSingle>
      ) : null}
      {videoType === 'multiple' && pageSize === 4 ? (
        <Four callback={changeTag} getData={getVideos}></Four>
      ) : null}
      {videoType === 'multiple' && pageSize === 9 ? (
        <Nine callback={changeTag} getData={getVideos}></Nine>
      ) : null}
    </div>
  )
}

export default VideoCenter
