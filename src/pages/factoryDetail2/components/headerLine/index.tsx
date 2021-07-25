import React from 'react'
import styles from './index.module.less'

const HeaderLine = props => {
  const { chinese, english } = props
  return (
    <header className={styles.header}>
      <div>
        <span className={styles.textCn}>{chinese}</span>
        <span className={styles.textEn}>{english}</span>
      </div>
    </header>
  )
}

export default HeaderLine
