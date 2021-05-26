import React from 'react'
import { isNil, isEmpty } from 'lodash'
import styles from './index.module.less'

const JackCard = (props) => {
  const { header, content = [], footer, children } = props
  return (
    <div className={styles.jackCard}>
      <header className={styles.cardHeader}>{header}</header>
      {isEmpty(content) && children}
      {!isEmpty(content) && (
        <ul className={styles.cardContent}>
          {content.map((item, index) => (
            <li className={styles.contentList} key={index}>
              <span>
                {item.icon} {item.label}：
              </span>
              <span className={styles.listValue}>{item.value}</span>
            </li>
          ))}
        </ul>
      )}
      {!isNil(footer) && (
        <footer className={styles.cardFooter}>{footer}</footer>
      )}
    </div>
  )
}

export default JackCard
