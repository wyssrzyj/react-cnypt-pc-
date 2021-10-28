// 根据时间戳获取时间
// export const timestampToTime = timestamp => {
//   var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
//   const Y = date.getFullYear() + '-'
//   const M =
//     (date.getMonth() + 1 < 10
//       ? '0' + (date.getMonth() + 1)
//       : date.getMonth() + 1) + '-'
//   const D = date.getDate() + ' '
//   console.log('秒', timestamp % 1000)

//   if (timestamp !== null) {
//     return Y + M + D
//   }
// }

//  获取 距离当前时间的天和小时
export const remainingTime = timestamp => {
  var date = Date.now()
  const timeStamps = timestamp - date
  let t = timeStamps / 1000 / 60 / 60 / 24
  let s = (timeStamps / 1000 / 60 / 60) % 24
  return { day: t.toFixed(0), hour: s.toFixed(0) }
}
export function timestampToTime(v) {
  let dateTime
  let yy = new Date(v).getFullYear()
  let mm = new Date(v).getMonth() + 1
  let dd = new Date(v).getDate()
  let hh = new Date(v).getHours()
  let mf =
    new Date(v).getMinutes() < 10
      ? '0' + new Date(v).getMinutes()
      : new Date(v).getMinutes()
  let ss =
    new Date(v).getSeconds() < 10
      ? '0' + new Date(v).getSeconds()
      : new Date(v).getSeconds()
  dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
  return dateTime
}
