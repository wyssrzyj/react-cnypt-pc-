import React, { useState } from 'react'
import { Radio, Dropdown, Space, Checkbox, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { find, isFunction } from 'lodash'
import styles from './index.module.less'

const typeOptions = [
  { label: '清加工单', value: 'qing' },
  { label: 'OEM', value: 'OEM' },
  { label: 'ODM', value: 'ODM' },
  { label: '经销单', value: 'distribution' },
  { label: '自营进出口单', value: 'proprietary' }
]

const ProcessingTypeCom = props => {
  const { onChange } = props
  const [mainValue, setMainValue] = useState<string>('')
  const [maybeValues, setMaybeValues] = useState<any>([])
  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  const [checkedTypes, setCheckedTypes] = useState<any>([])

  const mainChange = e => {
    setMainValue(e.target.value)
  }
  const maybeChange = checkedValue => {
    setMaybeValues([...checkedValue])
  }
  const handleConfirm = () => {
    setMenuVisible(false)
    const newValue = [mainValue, ...maybeValues]
    setCheckedTypes(newValue)
    isFunction(onChange) && onChange(newValue)
  }
  const content = (
    <div className={styles.processingContent}>
      <div className={styles.processingContentTop}>
        <span>
          <span className={styles.asterisk}>*</span>主接：
        </span>
        <Radio.Group value={mainValue} onChange={mainChange}>
          <Space direction="vertical">
            {typeOptions.map(option => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>

      <div>
        <span>可接：</span>
        <Checkbox.Group
          options={typeOptions}
          value={maybeValues}
          onChange={maybeChange}
        />
      </div>
      <Button
        onClick={handleConfirm}
        className={styles.typeConfirm}
        type="primary"
      >
        确定
      </Button>
    </div>
  )

  return (
    <Dropdown visible={menuVisible} overlay={content} trigger={['contextMenu']}>
      <div
        onClick={() => setMenuVisible(!menuVisible)}
        className={styles.processingTypeCom}
      >
        <div>
          {checkedTypes.map(type => (
            <span key={type} className={styles.checkedBox}>
              {
                find(typeOptions, function (o) {
                  return o.value === type
                }).label
              }
            </span>
          ))}
        </div>
        <DownOutlined className={styles.arrow} />
      </div>
    </Dropdown>
  )
}

export default ProcessingTypeCom
