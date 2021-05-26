import React from 'react'
import { ArrowDownOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { isEmpty, isFunction } from 'lodash'
import styles from './index.module.less'

const HeaderFilter = (props) => {
  const { sortList = [], current, handleFilter } = props
  const selfHandleFilter = (value) => {
    isFunction(handleFilter) && handleFilter(value)
  }
  return (
    <div className={styles.contentTitle}>
      {!isEmpty(sortList) &&
        sortList.map((item, index) => (
          <div
            key={index}
            onClick={() => selfHandleFilter(item)}
            className={classNames(
              styles.titleItem,
              item === current ? styles.active : null
            )}
          >
            <span>{item}</span>
            <ArrowDownOutlined />
          </div>
        ))}
    </div>
  )
}

export default HeaderFilter
