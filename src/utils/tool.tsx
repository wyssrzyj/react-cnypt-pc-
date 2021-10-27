import { useRef, useEffect, useCallback, useState } from 'react'
import { isEmpty, isNil, isArray, get } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export const getToken = () => {
  return localStorage.getItem('token')
}

export const getRefresh = () => {
  return localStorage.getItem('refresh')
}

export const getLastUrl = () => {
  return localStorage.getItem('lastUrl')
}

export const setLastUrl = path => {
  return localStorage.setItem('lastUrl', path)
}

export const getCurrentUser = () => {
  const user = JSON.parse(JSON.stringify(localStorage.getItem('currentUser')))
  if (user) {
    return JSON.parse(user)
  }
  return {}
}

export const getUserInfo = () => {
  const user = JSON.parse(JSON.stringify(localStorage.getItem('userInfo')))
  if (user) {
    return JSON.parse(user)
  }
  return {}
}

export const useDebounceValue = (value, interval = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
      clearTimeout(timer)
    }, interval)

    return () => {
      clearTimeout(timer)
    }
  }, [value, interval])

  return debouncedValue
}

export const useThrottleValue = (value, interval = 300) => {
  const [throttleValue, setThrottleValue] = useState(value)
  const startTimeRef = useRef(new Date())

  useEffect(() => {
    let endTime: any = new Date()
    const startTime: any = startTimeRef.current
    let timer
    const diffTime: any = endTime - startTime
    const nextTime = interval - (endTime - startTime)
    if (diffTime >= interval) {
      setThrottleValue(value)
      startTimeRef.current = new Date()
    } else {
      timer = setTimeout(() => {
        setThrottleValue(value)
        startTimeRef.current = new Date()
      }, nextTime)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [value, interval])

  return throttleValue
}

export function useDebounce(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null })
  useEffect(
    function () {
      current.fn = fn
    },
    [fn]
  )

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer)
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args)
    }, delay)
  }, dep)
}

export function useThrottle(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null })
  useEffect(
    function () {
      current.fn = fn
    },
    [fn]
  )

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer
      }, delay)
      current.fn.call(this, ...args)
    }
  }, dep)
}

/**
 * 判断一个数是否为奇数
 * @param num: number
 * @returns boolean
 */
export const isOdd = (num: number) => {
  return (num & 1) === 1
}
/**
 * 判断一个数是否为偶数
 * @param num: number
 * @returns boolean
 */
export const isEven = (num: number) => {
  return (num & 1) === 0
}

/**
 * 判断一个数是否为NaN  原生自带isNaN方法
 * @param num: number
 * @returns boolean
 */
export const isNaN = (num: number) => {
  return !(num > 0) && !(num <= 0)
}

export const transformProduceNumber = (value: string) => {
  if (value) {
    const newValue = value.split(',')
    if (newValue[0] === '0') {
      return '20人以内'
    } else if (newValue[0] === '10000') {
      return '10000以上'
    } else {
      return `${newValue[0]}人~${newValue[1]}人`
    }
  }
}

/**
 * 将数组类型的数据转成 树数据类型
 * @param data 打平的树数据
 * @returns
 */
export const getTreeData = (data: any[]) => {
  const target = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentId === 0) {
      target.push(data[i])
      data.splice(i, 1)
      i--
    }
  }

  const toTree = (list: any[], tree: any[]) => {
    list.forEach(item => {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].parentId === item.menuId) {
          item.children.push(tree[i])
          tree.splice(i, 1)
          i--
        }
      }
      if (item.children && item.children.length) {
        toTree(item.children, tree)
      } else {
        item.children = undefined
      }
    })
  }
  toTree(target, data)
  return target
}

/**
 * 判断是否有值
 */
export const checkValue = value => {
  if (isNil(value)) {
    return '--'
  } else if (isArray(value) && isEmpty(value)) {
    return '--'
  } else {
    return value
  }
}

export const getTypeOptions = () => {
  return [
    { label: '清加工单', value: 'QJG' },
    { label: 'OEM', value: 'OEM' },
    { label: 'ODM', value: 'ODM' },
    { label: '经销单', value: 'JXD' },
    { label: '自营进出口单', value: 'ZCK' }
  ]
}

export const getProductClass = () => {
  return [
    { label: '高', value: '0' },
    { label: '中', value: '1' },
    { label: '低', value: '2' }
  ]
}

export const getProductMode = () => {
  return [
    { label: '流水', value: '0' },
    { label: '整件', value: '1' },
    { label: '流水和整件', value: '2' }
  ]
}

export const setTitle = title => {
  document.title = title
}

export const getProductClassMap = () => {
  return [
    { value: 1, label: '低' },
    { value: 2, label: '中' },
    { value: 3, label: '中低' },
    { value: 4, label: '高' },
    { value: 5, label: '高低' },
    { value: 6, label: '高中' },
    { value: 7, label: '高中低' }
  ]
}

/**
 * 判断from表单是新增还是编辑
 */
export const isAdd = value => {
  return isEmpty(value) || isNil(value) ? true : false
}

/**
 * 获取url携带的参数信息
 * @param {string} url
 * @returns {Object}
 */
export function urlGet(search?) {
  var parts = search ? search : window.location.search.substr(1).split('&')
  var params = {}
  for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split('=')
    params[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1])
  }
  return params
}

export const getUId = () => {
  return uuidv4().split('-')[0]
}
// 获取日期差值
export const dateDiff = (d1, d2?) => {
  var oldDate = new Date(d1)
  //判断有无d2(第二个日期)，如果有就拿来用，没有就按照今天的日期来计算
  if (d2) {
    var newDate = new Date(d2) //如果有就创建一个名为d2的new Date
  } else {
    var newDate = new Date() //如果没有就不传参(当前日期)
  }

  //可以直接让两个日期相减，但是有兼容问题
  // var a = oldDate - newDate;
  // console.log(a)

  //这里我们用很保险的方法，获取两个日期的时间戳，然后相减，再加以换算，就可以得到想要的差值

  //为了避免相减为负数，用Math.abs取绝对值
  var t = oldDate.getTime() - newDate.getTime()
  // 开始换算
  // 用相减所得到的毫秒数除以1000得秒，除以60得分钟，除以60得小时，除以24再用parseInt取整得到具体的天数
  var d = Math.round(t / 1000 / 60 / 60 / 24)
  // 用相减所得到的毫秒数减去天数所用的毫秒数再除以1000得秒，除以60得分钟，除以60得到小时
  var h = (t - d * 24 * 60 * 60 * 1000) / 1000 / 60 / 60
  // 用相减所得到的毫秒数减去天和小时所用的毫秒数再除以1000得秒，除以60得到分钟
  var m = (t - d * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000) / 1000 / 60
  // 用相减所得到的毫秒数减去天和小时以及分钟所用的毫秒数再除以1000得到秒
  var s =
    (t - d * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000
  // console.log(d,h,m,s)//测试一下看有没有得到数据

  return {
    day: d,
    hours: h,
    minutes: m,
    seconds: s
  }
}
// 处理树型结构数据
export const dealTypeData = (
  data: any[],
  fields = ['name', 'id'] as string[],
  target = ['label', 'value']
) => {
  data.forEach(item => {
    item[target[0]] = item[fields[0] ? fields[0] : 'name']
    item[target[1]] = item[fields[1] ? fields[1] : 'id']

    if (Array.isArray(item.children) && item.children.length) {
      dealTypeData(item.children, fields, target)
    }
  })
  return data
}

export const findTreeTarget = (values, data, key = 'id') => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (values.includes(item[key])) {
      return item
    }
    if (isArray(item.children) && item.children.length) {
      const res = findTreeTarget(values, item.children, key) //
      if (!isEmpty(res)) {
        return res
      }
    }
  }
}

export const getTreeValues = (data, key = 'id') => {
  const target = [] //空数组
  if (!isEmpty(data)) {
    target.push(data[key]) //数据的id传递给数组
    if (isArray(data.children)) {
      data.children.forEach(item => {
        target.push(...getTreeValues(item, key))
      })
    }
  }
  return target
}

export const getTreeChildValues = (data, key = 'id') => {
  const target = [] //空数组
  if (!isEmpty(data)) {
    if (isEmpty(data.children)) {
      target.push(data[key])
    } else {
      data.children.forEach(item => {
        const res = getTreeChildValues(item, key)
        target.push(...res)
      })
    }
  }
  return target
}

export const matchValue = (dataSource, target) => {
  const current = dataSource.find(item => item.value === target) || {}
  return current.label || '--'
}

export const matchGoodValue = (dataSource, target) => {
  const current = dataSource
    .filter(item => target.find(o => o === item.id))
    .map(value => value.name)
    .join('、')
  return current || '--'
}

export const matchArrayValue = (dataSource, target, field) => {
  if (isArray(target)) {
    const current = target
      .map(item => {
        const current = dataSource.find(o => o.value === item) || {}
        return current.label
      })
      .join('、')
    return current || field || '--'
  }
  return field || '--'
}

// 翻译省市区
export const getRegion = (allArea, province, city, district, field) => {
  if (province && city && district) {
    const currentProvince = allArea.find(item => item.value == province) || {
      children: [],
      label: ''
    }
    const currentCity = currentProvince.children.find(
      item => item.value == city
    ) || { children: [], label: '' }
    const currentDistrict = currentCity.children.find(
      item => item.value == district
    ) || { children: [], label: '' }
    const newRegion = {
      province: currentProvince.label,
      city: currentCity.label,
      district: currentDistrict.label
    }
    if (field === 'all') {
      return `${currentProvince.label}/${currentCity.label}/${currentDistrict.label}`
    }
    return get(newRegion, field)
  } else {
    return '--'
  }
}
