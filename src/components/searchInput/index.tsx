import React, { useState } from 'react'
import { Input } from 'antd'
import { isFunction, debounce } from 'lodash'

const debounceFunc = debounce(func => {
  isFunction(func) && func()
}, 1000)

const SearchInput = props => {
  const {
    className,
    placeholder,
    onChange,
    onPressEnter,
    ...otherProps
  } = props
  const [selfValue, setSelfValue] = useState<string>(undefined)
  const onChangeSearch = e => {
    e.persist()
    setSelfValue(e.target.value)
    debounceFunc(() => {
      isFunction(onChange) && onChange(e.target.value)
      // isFunction(onPressEnter) && onPressEnter(e.target.value)
    })
  }
  return (
    <Input
      placeholder={placeholder || '请输入搜索关键字'}
      value={selfValue}
      onChange={onChangeSearch}
      onPressEnter={onPressEnter}
      {...otherProps}
    />
  )
}

export default SearchInput
