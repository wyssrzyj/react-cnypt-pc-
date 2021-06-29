import { useRef, useEffect, useCallback } from 'react'

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
