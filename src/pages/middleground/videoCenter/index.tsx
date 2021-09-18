import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import EZUIKit from 'ezuikit-js'
import { Title } from '../controlPanel/accountSafe'
import { Button } from 'antd'
import { Icon } from '@/components'

const VideoCenter = () => {
  const [videoType, setVideoType] = useState('single')
  const [pageSize, setPagesize] = useState(1)

  const IconMap = new Map()
  IconMap.set('one', 'jack-dsp_1')
  IconMap.set('oneActive', 'jack-dsp_2')
  IconMap.set('four', 'jack-sgg_1')
  IconMap.set('fourActive', 'jack-sgg_2')
  IconMap.set('nine', 'jack-jgg_11')
  IconMap.set('nineActive', 'jack-jgg_2')

  const changePageSize = size => {
    setPagesize(size)
  }

  const configs = [
    { field: 'one', activeField: 'oneActive', value: 1 },
    { field: 'four', activeField: 'fourActive', value: 4 },
    { field: 'nine', activeField: 'nineActive', value: 9 }
  ]

  return (
    <div>
      <div className={styles.header}>
        <Title title={'视频中心'}></Title>
        <div>
          {videoType === 'single' ? (
            <Button>单个视频</Button>
          ) : (
            <Button>多个视频</Button>
          )}

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
        </div>
      </div>
    </div>
  )
}

export default VideoCenter
