import { isEmpty, isArray } from 'lodash'
/**
 *  把数据一些名重洗复制一个名字
 * @param data
 *
 * @returns
 */
export const dealTypeData = data => {
  data.forEach(item => {
    item.label = item.name
    item.value = item.id
    if (Array.isArray(item.children) && item.children.length) {
      dealTypeData(item.children)
    }
  })
  return data
}
/**
 *  根据传递过来的值获取data的具体数据
 * @param val
 * @param data
 * @returns
 */
export const findTarget = (val, data) => {
  // val//用来作为判断条件
  // data 数据
  for (let i = 0; i < data.length; i++) {
    const item = data[i] //获取循环所有的数据
    if (item.id === val) {
      //当前数据的id===传递来的数据
      return item
      // 用来返回所有等于传递过来的数据
    }
    if (isArray(item.children) && item.children.length) {
      //当子元素不为空
      const res = findTarget(val, item.children) //
      if (!isEmpty(res)) {
        //只有是对象、数组返才会执行
        return res
      }
    }
  }
}
/**
 *  循环获取没有子项的id
 * @param data
 * @returns
 */
export const convenience = data => {
  let sum = []
  if (isArray(data)) {
    data.forEach(item => {
      if (item.children.length > 0) {
        sum.push(convenience(item.children).toString())
      } else {
        sum.push(item.id)
      }
    })
  }
  return sum
}
