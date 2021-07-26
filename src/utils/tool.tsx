import { useRef, useEffect, useCallback } from 'react'
import { isEmpty, isNil } from 'lodash'

export const getToken = () => {
  return localStorage.getItem('token')
}

export const getRefresh = () => {
  return localStorage.getItem('refresh')
}

export const getLastUrl = () => {
  return localStorage.getItem('lastUrl')
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
  if (isNil(value) || isEmpty(value)) return '--'
  return value
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
