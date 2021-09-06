import React, { useState, useRef, useEffect } from 'react'
import {
  Input,
  Select,
  Checkbox,
  TreeSelect,
  Radio,
  InputNumber,
  Space,
  Upload,
  DatePicker,
  message
} from 'antd'
import FormSwitch from './FormSwitch'
import './index.less'
import InputConcatSelect from './InputConcatSelect'
import { cloneDeep, isEmpty } from 'lodash'
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
  tips?: string
  maxSize?: number
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
    maxSize = 500,
    tips,
    ...other
  } = props

  const uploadRef = useRef<any>()

  const [nodeValue, setNodeValue] = useState<any>(value)

  useEffect(() => {
    if (type === 'img') {
      // 头像上传初始化值为数组类型
      !Array.isArray(value) && setNodeValue([])
    }
  }, [type, value])

  const valueChange = (event: any) => {
    console.log('🚀 ~ file: index.tsx ~ line 110 ~ valueChange ~ event', event)
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
      'img',
      'datePicker',
      'rangePicker'
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
  useEffect(() => {
    if (type !== 'img') return
    if (uploadRef.current) {
      console.log(uploadRef.current.upload.props.onChange)
    }
  }, [uploadRef])
  const beforeUpload: any = file => {
    return new Promise((resolve, reject) => {
      const isJpgOrPng =
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpeg'
      const isLtMaxSize = file.size / 1024 < 500

      if (!isJpgOrPng) {
        message.error('只能上传jpg/png格式文件!')
        return reject(file)
      } else if (!isLtMaxSize) {
        message.error(`文件不能超过${maxSize}KB!`)
        return reject(file)
      } else {
        return resolve(true)
      }
    })
  }

  const customRequest = async ({ file }) => {
    const imgs = cloneDeep(nodeValue) || []
    // /capacity-platform/platform 目标文件夹路径
    const res = await OSS.put(
      `/capacity-platform/platform/${file.uid}${file.name}`,
      file
    )
    if (res) {
      const { url } = res
      imgs.push({ thumbUrl: url })
      setNodeValue(imgs)
      valueChange && valueChange(imgs)
    }
  }

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  )

  const fileRemove = file => {
    const arrList = cloneDeep(nodeValue) || []
    const target = arrList.filter(item => item.thumbUrl !== file.thumbUrl)
    setNodeValue(target)
    onChange && onChange(target)
  }

  switch (type) {
    case 'datePicker':
      return (
        <DatePicker
          onChange={valueChange}
          value={nodeValue}
          style={{ width: '100%' }}
          {...other}
        ></DatePicker>
      )
    case 'rangePicker':
      return (
        <RangePicker
          onChange={valueChange}
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
      return (
        <TextArea
          placeholder={placeholder}
          onChange={valueChange}
          value={nodeValue}
          {...other}
        />
      )
    case 'switch':
      return <FormSwitch onChange={valueChange} value={nodeValue} {...other} />
    case 'number':
      return (
        <InputNumber
          min={+min}
          onChange={valueChange}
          value={nodeValue}
          style={{ width: '100%' }}
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
      return (
        <Upload
          ref={uploadRef}
          fileList={nodeValue}
          listType="picture-card"
          accept={'.jpg,.png,.jpeg'}
          name="file"
          maxCount={maxImgs}
          beforeUpload={beforeUpload}
          customRequest={customRequest}
          onRemove={fileRemove}
          {...other}
        >
          {isEmpty(nodeValue) ? uploadButton : null}
        </Upload>
      )
  }
}

export default FormNode
