//  获取 距离当前时间的天和小时
export const remainingTime = timestamp => {
  var date = Date.now()
  const timeStamps = timestamp - date
  let t = timeStamps / 1000 / 60 / 60 / 24
  let s = (timeStamps / 1000 / 60 / 60) % 24
  return { day: t.toFixed(0), hour: s.toFixed(0) }
}
// 年月日时分秒
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
// 年月日
export function TpoTime(v) {
  let dateTime
  let yy = new Date(v).getFullYear()
  let mm = new Date(v).getMonth() + 1
  let dd = new Date(v).getDate()

  dateTime = yy + '-' + mm + '-' + dd
  return dateTime
}
