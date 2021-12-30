export const getChild = (rawData, UnwantedData, InterfaceData) => {
  // 原数据 rawData
  // 不需要的数据 UnwantedData
  // 接口的数据 InterfaceData

  // 获取子项数据----------------------
  const getSubData = (v, data) => {
    // v  原始数据
    // data 字典数据
    let sum = []
    v.forEach(item => {
      sum.push(list(item, data))
    })
    return sum.flat(Infinity) //数组扁平化
  }
  const list = (item, data) => {
    //item 原始数据
    // data 字典数据
    let sum = []
    let res = data.filter(v => v.value === item)[0]
    if (res !== undefined) {
      res.children.forEach(item => {
        sum.push(item.value)
      })
    }
    return sum
  }
  // 获取没有子项的数据----------------------
  const custom = (data, unwanted) => {
    unwanted.forEach(v => {
      // v 判断数据
      // data 原数组
      let susa = data.indexOf(v) //是字符串方法  也可以用 findIndex 是数组的方法
      if (susa !== -1) {
        data.splice(susa, 1) //替换掉
      }
    })
    return data
  }
  let arr = getSubData(rawData, InterfaceData)
  return arr.concat(custom(rawData, UnwantedData)) //合并返回出去
}
