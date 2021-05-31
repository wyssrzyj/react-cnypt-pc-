import React from 'react'
import { Radio, Dropdown, Space, Checkbox } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const plainOptions = ['清加工单', 'OEM', 'ODM', '经销单', '自营进出口单']

const ProcessingTypeCom = () => {
  const content = (
    <div className={styles.processingContent}>
      <div className={styles.processingContentTop}>
        <span>
          <span className={styles.asterisk}>*</span>主接：
        </span>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={1}>清加工单</Radio>
            <Radio value={2}>OEM</Radio>
            <Radio value={3}>ODM</Radio>
            <Radio value={3}>经销单</Radio>
            <Radio value={3}>自营进出口单</Radio>
          </Space>
        </Radio.Group>
      </div>

      <div>
        <label>可接：</label>
        <Checkbox.Group options={plainOptions} />
      </div>
    </div>
  )

  return (
    <Dropdown overlay={content} trigger={['click']}>
      <div className={styles.processingTypeCom}>
        <div></div>
        <DownOutlined className={styles.arrow} />
      </div>
    </Dropdown>
  )
}

export default ProcessingTypeCom
