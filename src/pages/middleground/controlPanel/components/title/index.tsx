import React from 'react'
import styles from './index.module.less'

const Title = ({ title }) => (
  <div className={styles.title}>
    <div className={styles.titleLine}></div>
    {title}
  </div>
)

export default Title
