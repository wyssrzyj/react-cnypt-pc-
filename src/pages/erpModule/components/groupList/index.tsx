import React, { useState } from 'react'
import { Divider, Radio, Space, Pagination, Empty } from 'antd'
import classNames from 'classnames'
import { isEmpty } from 'lodash'
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

const GroupList = props => {
  const { title = '分组', handleGroup, dataSource, total } = props
  const [pageNum, setPageNum] = useState(1)

  const onPaginationChange = page => {
    setPageNum(page)
  }

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
      {isEmpty(dataSource) ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className={styles.empty} />
      ) : (
        <div>
          <div className={styles.tableTitle}>
            <span className={styles.nameBox}>名称</span>
            <span className={styles.indexBox}>排序</span>
          </div>
          <Radio.Group>
            <Space direction="vertical">
              {dataSource.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className={classNames(
                      styles.item,
                      index % 2 === 0 && styles.bgColor
                    )}
                  >
                    <Radio value={item.id}>
                      <span className={styles.nameBox}>{item.name}</span>
                      <span className={styles.indexBox}>{item.sortNo}</span>
                    </Radio>
                  </div>
                )
              })}
            </Space>
          </Radio.Group>
        </div>
      )}

      <div className={styles.footer}>
        <Pagination
          current={pageNum}
          pageSize={10}
          total={total}
          showSizeChanger={false}
          onChange={onPaginationChange}
          size="small"
        />
      </div>
    </div>
  )
}

export default GroupList
