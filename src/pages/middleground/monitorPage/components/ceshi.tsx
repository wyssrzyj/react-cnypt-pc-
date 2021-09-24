import React, { memo } from 'react'
import { isEmpty, isArray } from 'lodash'

const Ceshi = memo(() => {
  const treeData = [
    {
      label: '根目录',
      id: 1,
      children: [
        {
          label: '一级目录1',
          id: 11,
          children: [
            {
              label: '二级目录1',
              id: 111,
              children: [
                {
                  label: '三级目录1',
                  id: 1111
                },
                {
                  label: '三级目录2',
                  id: 1112
                }
              ]
            },
            {
              label: '二级目录2',
              id: 112
            }
          ]
        },
        {
          label: '一级目录2',
          id: 12,
          children: [
            {
              label: '二级目录21',
              id: 121
            },
            {
              label: '二级目录22',
              id: 122
            }
          ]
        }
      ]
    }
  ]
  const findTarget = (val, data) => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      if (item.id === val) {
        return item
      }
      if (isArray(item.children) && item.children.length) {
        const res = findTarget(val, item.children)
        if (!isEmpty(res)) {
          return res
        }
      }
    }
  }
  const getValues = data => {
    const target = []
    if (!isEmpty(data)) {
      target.push(data.id)
      if (isArray(data.children)) {
        data.children.forEach(item => {
          target.push(...getValues(item))
        })
      }
    }
    return target
  }

  const a = findTarget(2, treeData)
  const val = getValues(a)
  console.log('🚀 ~ ', val)

  return <div></div>
})

export default Ceshi
