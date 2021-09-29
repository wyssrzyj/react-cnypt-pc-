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
  message,
  Button
} from 'antd'
import FormSwitch from './FormSwitch'
import './index.less'
import InputConcatSelect from './InputConcatSelect'
import { cloneDeep, isEmpty } from 'lodash'
import OSS from '@/utils/oss'
import { Icon } from '../index'
import Viewer from 'react-viewer'

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
    | 'img' // 图片上传
    | 'datePicker'
    | 'rangePicker'
    | 'annex' // 附件上传
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
  accept?: string
  rows?: number
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
    accept,
    rows = 4,
    ...other
  } = props

  const uploadRef = useRef<any>()

  const [nodeValue, setNodeValue] = useState<any>(value)
  const [imgVisible, setImgVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    if (['img', 'annex'].includes(type)) {
      // 头像上传初始化值为数组类型
      !Array.isArray(value) && setNodeValue([])
    }
  }, [type, value])

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
      'img',
      'annex',
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
      // console.log(uploadRef.current.upload.props.onChange)
    }
  }, [uploadRef])

  const beforeUpload: any = file => {
    // 类型由外部传入  待修改
    return new Promise((resolve, reject) => {
      const isJpgOrPng =
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpeg'

      const fileIsLtMaxSize = file.size / 1024 / 1024 < maxSize

      if (type === 'img' && !isJpgOrPng) {
        message.error('只能上传jpg/png格式文件!')
        return reject(file)
      }

      // if (type === 'img' && !imgIsLtMaxSize) {
      //   message.error(`文件不能超过${maxSize}KB!`)
      //   return reject(file)
      // }

      if (!fileIsLtMaxSize) {
        message.error(`文件不能超过${maxSize}MB!`)
        return reject(file)
      }

      return resolve(true)
    })
  }

  const customRequest = async ({ file }) => {
    const imgs = cloneDeep(nodeValue) || []
    // /capacity-platform/platform 目标文件夹路径 __ 分割符号
    const res = await OSS.put(
      `/capacity-platform/platform/${file.uid}__${file.name}`,
      file
    )
    if (res) {
      const { url, name } = res
      imgs.push({ thumbUrl: url, name: name.split('__')[1], url })
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

  const onPreview = file => {
    setImgVisible(true)
    setPreviewImage(file.thumbUrl)
  }

  switch (type) {
    case 'datePicker':
      return (
        <DatePicker
          onChange={valueChange}
          value={nodeValue}
          style={{ width: '100%' }}
          disabled={disabled}
          {...other}
        ></DatePicker>
      )
    case 'rangePicker':
      return (
        <RangePicker
          onChange={valueChange}
          value={nodeValue}
          disabled={disabled}
          {...other}
        ></RangePicker>
      )
    case 'radio':
      return (
        <Group
          onChange={valueChange}
          value={nodeValue}
          disabled={disabled}
          {...other}
        >
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
          style={{ minWidth: 80, width: other.width }}
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
          {...other}
        />
      )
    case 'textarea':
      return (
        <TextArea
          placeholder={placeholder}
          onChange={valueChange}
          value={nodeValue}
          rows={rows}
          disabled={disabled}
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
          disabled={disabled}
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
        <div>
          <Viewer
            visible={imgVisible}
            noFooter={true}
            onMaskClick={() => {
              setImgVisible(false)
            }}
            onClose={() => {
              setImgVisible(false)
            }}
            images={[{ src: previewImage }]}
          />
          <Upload
            ref={uploadRef}
            fileList={nodeValue}
            listType="picture-card"
            accept={accept}
            name="file"
            maxCount={maxImgs}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            onRemove={fileRemove}
            disabled={disabled}
            onPreview={onPreview}
            {...other}
          >
            {!disabled && (isEmpty(nodeValue) || nodeValue.length) < maxImgs
              ? uploadButton
              : null}
          </Upload>
          {tips ? (
            <div className={'uploadTipsBox'}>
              <Icon type={'jack-jingshi1'}></Icon>
              <span>&nbsp;{tips}</span>
            </div>
          ) : null}
        </div>
      )
    case 'annex': // 附件
      return (
        <div>
          <Viewer
            visible={imgVisible}
            noFooter={true}
            onMaskClick={() => {
              setImgVisible(false)
            }}
            onClose={() => {
              setImgVisible(false)
            }}
            images={[{ src: previewImage }]}
          />
          <Upload
            ref={uploadRef}
            fileList={nodeValue}
            accept={accept}
            name="file"
            maxCount={maxImgs}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            onRemove={fileRemove}
            disabled={disabled}
            onPreview={onPreview}
            {...other}
          >
            <Button
              disabled={disabled}
              icon={<Icon type={'jack-upload-2-fill'}></Icon>}
            >
              上传文件
            </Button>
          </Upload>

          {tips ? (
            <div className={'uploadTipsBox'}>
              <Icon type={'jack-jingshi1'}></Icon>
              <span>&nbsp;{tips}</span>
            </div>
          ) : null}
        </div>
      )
  }
}

export default FormNode
