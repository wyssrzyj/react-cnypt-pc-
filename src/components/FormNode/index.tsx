import React, { useState, useEffect } from 'react'
import { Input, Select, Checkbox, TreeSelect, Radio, InputNumber } from 'antd'
import FormSwitch from './FormSwitch'
import './index.less'
import InputConcatSelect from './InputConcatSelect'

const CheckboxGroup = Checkbox.Group
const { Option } = Select
const { TextArea } = Input
const { SHOW_PARENT } = TreeSelect
const { Group } = Radio

export type commonObj = { [key: string]: any }
export type Props = {
  /**
   * @description 类型
   */
  type:
    | 'select'
    | 'checkbox'
    | 'tree'
    | 'text'
    | 'switch'
    | 'textarea'
    | 'multipleSelect'
    | 'radio'
    | 'number'
    | 'inputAndSelect'
  /**
   * @description 是否禁用
   */
  disabled?: boolean
  /**
   * @description 占位符
   */
  placeholder?: string
  /**
   * @description checkbox select的子选项
   */
  options?: Array<any>
  /**
   * @description TreeSelect的数据
   */
  treeData?: any
  /**
   * @description 输入框后缀
   */
  suffix?: string | undefined
  value?: any
  min?: number
  width?: number | string
  keys?: string[]
  onChange?: (event: any) => void
}

const FormNode = (props: Props) => {
  const {
    type = 'text',
    placeholder,
    disabled,
    options,
    treeData,
    value,
    onChange,
    suffix,
    min,
    keys
  } = props

  const [nodeValue, setNodeValue] = useState<any>(value)

  useEffect(() => {
    setNodeValue(value)
  }, [value])

  const valueChange = (event: any) => {
    let val

    const flag = [
      'multipleSelect',
      'switch',
      'rangeDate',
      'select',
      'checkbox',
      'tree',
      'number',
      'inputAndSelect'
    ].includes(type)
    if (flag) {
      val = event
    } else {
      val = event.target.value
    }
    onChange && onChange(val)
  }

  switch (type) {
    case 'radio':
      return (
        <Group>
          {options &&
            options.length > 0 &&
            options.map(item => (
              <Radio value={item.value} key={item.value}>
                {item.label}
              </Radio>
            ))}
        </Group>
      )
    case 'text':
      return (
        <Input
          className={'customFormNodeInput'}
          onChange={valueChange}
          value={nodeValue}
          disabled={disabled}
          placeholder={placeholder}
          suffix={suffix}
        />
      )
    case 'select':
    case 'multipleSelect':
      const rest: { mode?: 'multiple' | 'tags' | undefined } = {}
      if (type === 'multipleSelect') {
        rest.mode = 'multiple'
      }
      return (
        <Select
          onChange={valueChange}
          value={nodeValue}
          placeholder={placeholder}
          style={{ minWidth: 80 }}
          {...rest}
        >
          {options &&
            options.length &&
            options.map(i => (
              <Option value={i.value} key={i.value}>
                {i.label}
              </Option>
            ))}
        </Select>
      )
    case 'checkbox':
      return (
        <CheckboxGroup
          onChange={valueChange}
          value={nodeValue}
          options={options}
        />
      )
    case 'tree':
      return (
        <TreeSelect
          onChange={valueChange}
          value={nodeValue}
          style={{ width: '100%' }}
          allowClear
          treeData={treeData}
          treeCheckable
          showCheckedStrategy={SHOW_PARENT}
          placeholder={placeholder}
        />
      )
    case 'textarea':
      return <TextArea onChange={valueChange} value={nodeValue} />
    case 'switch':
      return <FormSwitch onChange={valueChange} value={nodeValue} />
    case 'number':
      return (
        <InputNumber
          min={+min}
          onChange={valueChange}
          value={nodeValue}
        ></InputNumber>
      )
    case 'inputAndSelect':
      return (
        <InputConcatSelect
          keys={keys}
          onChange={valueChange}
          value={nodeValue}
          options={options}
        />
      )
  }
}

export default FormNode
