// 根据时间戳获取时间
export const timestampToTime = timestamp => {
  var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  const D = date.getDate() + ' '
  if (timestamp !== null) {
    return Y + M + D
  }
}
//  获取 距离当前时间的天和小时
export const remainingTime = timestamp => {
  var date = Date.now()
  const timeStamps = timestamp - date
  let t = timeStamps / 1000 / 60 / 60 / 24
  let s = (timeStamps / 1000 / 60 / 60) % 24
  return { day: t.toFixed(0), hour: s.toFixed(0) }
}
