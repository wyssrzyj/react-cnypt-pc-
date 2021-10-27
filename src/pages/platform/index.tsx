import { Search } from '@/components'
import React from 'react'
import styles from './index.module.less'
import Factory from '@/pages/factory'

const Platform = () => {
  return (
    <div className={styles.platformContent}>
      {/* <Search></Search> */}
      <Factory />
    </div>
  )
}

export default Platform
