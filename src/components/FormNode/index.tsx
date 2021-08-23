import React, { useState, useMemo } from 'react'
import {
  Input,
  Select,
  Checkbox,
  TreeSelect,
  Radio,
  InputNumber,
  Space,
  Upload,
  DatePicker
} from 'antd'
import FormSwitch from './FormSwitch'
import './index.less'
import InputConcatSelect from './InputConcatSelect'
import { cloneDeep } from 'lodash'
import OSS from '@/utils/oss'

const CheckboxGroup = Checkbox.Group
const { Option } = Select
const { TextArea } = Input
const { SHOW_PARENT } = TreeSelect
const { Group } = Radio
const { RangePicker } = DatePicker

export type commonObj = { [key: string]: any }
export type FormNodeProps = {
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
    | 'img'
    | 'datePicker'
    | 'rangePicker'
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
  direction?: 'horizontal' | 'vertical'
  maxImgs?: number
  treeCheckable?: boolean
  onChange?: (event: any) => void
}

const FormNode = (props: FormNodeProps) => {
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
    keys,
    direction = 'horizontal',
    treeCheckable = false,
    maxImgs = 10,
    ...other
  } = props

  const [nodeValue, setNodeValue] = useState<any>(value)

  console.log(value, 'value')

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
      'inputAndSelect',
      'img'
    ].includes(type)
    if (flag) {
      val = event
    } else {
      val = event.target.value
    }
    setNodeValue(val)
    onChange && onChange(val)
  }

  // upload 图片处理
  const customRequest = async ({ file }) => {
    const imgs = cloneDeep(value) || []
    // /capacity-platform/platform 目标文件夹路径
    const res = await OSS.put(
      `/capacity-platform/platform/${file.uid}${file.name}`,
      file
    )
    if (res) {
      const { url } = res
      imgs.push({ thumbUrl: url })
      console.log(onChange, 'onChange')
      valueChange && valueChange(imgs)
      // setFileList(list)
    }
  }

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  )

  const fileRemove = file => {
    const arrList = cloneDeep(value) || []
    const target = arrList.filter(item => item.thumbUrl !== file.thumbUrl)
    onChange && onChange(target)
  }

  return useMemo(() => {
    switch (type) {
      case 'datePicker':
        return (
          <DatePicker
            onChange={onChange}
            value={nodeValue}
            {...other}
          ></DatePicker>
        )
      case 'rangePicker':
        return (
          <RangePicker
            onChange={onChange}
            value={nodeValue}
            {...other}
          ></RangePicker>
        )
      case 'radio':
        return (
          <Group onChange={valueChange} value={nodeValue} {...other}>
            <Space direction={direction}>
              {options &&
                options.length > 0 &&
                options.map(item => (
                  <Radio value={item.value} key={item.value}>
                    {item.label}
                  </Radio>
                ))}
            </Space>
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
            {...other}
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
            {...other}
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
            {...other}
          />
        )
      case 'tree':
        return (
          <TreeSelect
            onChange={valueChange}
            value={nodeValue}
            style={{ width: '100%', minWidth: 100 }}
            allowClear
            treeData={treeData}
            treeCheckable={treeCheckable}
            showCheckedStrategy={SHOW_PARENT}
            placeholder={placeholder}
            {...other}
          />
        )
      case 'textarea':
        return <TextArea onChange={valueChange} value={nodeValue} {...other} />
      case 'switch':
        return (
          <FormSwitch onChange={valueChange} value={nodeValue} {...other} />
        )
      case 'number':
        return (
          <InputNumber
            min={+min}
            onChange={valueChange}
            value={nodeValue}
            {...other}
          ></InputNumber>
        )
      case 'inputAndSelect':
        return (
          <InputConcatSelect
            keys={keys}
            onChange={valueChange}
            value={nodeValue}
            options={options}
            {...other}
          />
        )
      case 'img':
        console.log(value, 'imgs')
        return (
          <Upload
            fileList={value}
            listType="picture-card"
            accept={'.jpg,.png,.jpeg'}
            name="file"
            maxCount={maxImgs}
            customRequest={customRequest}
            onRemove={fileRemove}
            {...other}
          >
            {(value && Array.isArray(value) && value.length < maxImgs) || !value
              ? uploadButton
              : null}
          </Upload>
        )
    }
  }, [type])
}

export default FormNode
