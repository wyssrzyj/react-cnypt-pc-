import Loadable from 'react-loadable'
import * as React from 'react'

const asyncLoader = fn => {
  return Loadable({
    loader: fn.loader,
    loading: ToastTrue,
    delay: 0,
    pastDelay: true
  })
}

function ToastTrue(params) {
  const { pastDelay, error } = params
  if (pastDelay) {
    // return <div>Empty</div>
    return null
  } else if (error) {
    return <div>Error!</div> // 加载错误时的提示模块
  } else {
    return null
  }
}

export default asyncLoader
