import React, { useState, useEffect } from 'react'
import { Radio, Dropdown, Space, Checkbox, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { find, isFunction, isEmpty } from 'lodash'
import classNames from 'classnames'
import styles from './index.module.less'

const typeOptions = [
  { label: '清加工单', value: 'QJG' },
  { label: 'OEM', value: 'OEM' },
  { label: 'ODM', value: 'ODM' },
  { label: '经销单', value: 'JXD' },
  { label: '自营进出口单', value: 'ZCK' }
]

const ProcessingTypeCom = props => {
  const { onChange, value, state } = props
  const [mainValue, setMainValue] = useState<string>('')
  const [maybeValues, setMaybeValues] = useState<any>([])
  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  const [checkedTypes, setCheckedTypes] = useState<any>([])
  const [tipVisible, setTipVisible] = useState<boolean>(false)

  const mainChange = e => {
    setMainValue(e.target.value)
    if (e.target.value) {
      setTipVisible(false)
    }
  }
  const maybeChange = checkedValue => {
    setMaybeValues([...checkedValue])
  }
  const handleConfirm = () => {
    if (isEmpty(mainValue)) {
      setTipVisible(true)
    } else {
      setMenuVisible(false)
      const newMaybeValues = maybeValues.map(item => ({
        master: 0,
        processType: item
      }))
      const newValue = [
        { master: 1, processType: mainValue },
        ...newMaybeValues
      ]

      setCheckedTypes(newValue)
      isFunction(onChange) && onChange(newValue)
    }
  }
  useEffect(() => {
    if (value) {
      const main = value.find(item => item.master === 1) || {}
      setMainValue(main.processType)
      const maybe = value
        .filter(item => item.master == 0)
        .map(o => o.processType)
      setMaybeValues([...maybe])
      setCheckedTypes([...value])
    }
  }, [value])
  const content = (
    <div className={styles.processingContent}>
      <div className={styles.processingContentTop}>
        <span>
          <span className={styles.asterisk}>*</span>主接：
        </span>
        <Radio.Group value={mainValue} onChange={mainChange}>
          <Space direction="vertical">
            {typeOptions.map((option, idx) => (
              <Radio key={idx} value={option.value}>
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
      <div className={styles.down}>
        <span style={{ opacity: tipVisible ? 1 : 0 }} className={styles.tip}>
          请选择主接类型！
        </span>
        <div>
          <Button onClick={() => setMenuVisible(false)}>取消</Button>

          <Button
            className={styles.typeConfirm}
            onClick={handleConfirm}
            type="primary"
          >
            确定
          </Button>
        </div>
      </div>
    </div>
  )
  const handleDropdown = () => {
    if (state !== 'check') {
      setMenuVisible(!menuVisible)
    }
  }

  return (
    <Dropdown visible={menuVisible} overlay={content} trigger={['contextMenu']}>
      <div
        onClick={handleDropdown}
        className={classNames(
          styles.processingTypeCom,
          state === 'check' ? styles.disable : styles.active
        )}
      >
        <div>
          {checkedTypes.map((type, idx) => (
            <span key={type + idx} className={styles.checkedBox}>
              {find(typeOptions, function (o) {
                return o.value === type.processType
              })
                ? find(typeOptions, function (o) {
                    return o.value === type.processType
                  }).label
                : ''}
            </span>
          ))}
        </div>
        <DownOutlined className={styles.arrow} />
      </div>
    </Dropdown>
  )
}

export default ProcessingTypeCom
