import React from 'react'
import { Divider, Radio, Space } from 'antd'
import classNames from 'classnames'
import styles from './index.module.less'

const operations = [
  {
    value: 'add',
    label: '新增'
  },
  {
    value: 'edit',
    label: '编辑'
  },
  {
    value: 'delete',
    label: '删除'
  }
]

const list = [
  { name: '常用', index: 1 },
  { name: '常用', index: 2 },
  { name: '常用', index: 3 }
]

const GroupList = props => {
  const { title = '分组', handleGroup } = props
  return (
    <div className={styles.groupList}>
      <header className={styles.header}>
        <div className={styles.chartTitle}>
          <span>{title}</span>
        </div>
        <div>
          {operations.map((item, index) => {
            return (
              <>
                <a key={item.value} onClick={() => handleGroup(item.value)}>
                  {item.label}
                </a>
                {index !== operations.length - 1 && <Divider type="vertical" />}
              </>
            )
          })}
        </div>
      </header>
      <div>
        <div className={styles.tableTitle}>
          <span className={styles.nameBox}>名称</span>
          <span className={styles.indexBox}>排序</span>
        </div>
        <Radio.Group>
          <Space direction="vertical">
            {list.map((item, index) => {
              return (
                <div
                  className={classNames(
                    styles.item,
                    index % 2 === 0 && styles.bgColor
                  )}
                >
                  <Radio value={item.index}>
                    <span className={styles.nameBox}>{item.name}</span>
                    <span className={styles.indexBox}>{item.index}</span>
                  </Radio>
                </div>
              )
            })}
          </Space>
        </Radio.Group>
      </div>
    </div>
  )
}

export default GroupList
