import axios from 'axios'
import md5Hex from 'md5-hex'
import qs from 'qs'
import { Buffer } from 'buffer/'

//请求url --正式地址
const Url = 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx'
//用户ID，快递鸟提供，注意保管，不要泄漏
const EBusinessID = '1730011' //即用户ID，登录快递鸟官网会员中心获取 https://www.kdniao.com/UserCenter/v4/UserHome.aspx
//API key，快递鸟提供，注意保管，不要泄漏
const ApiKey = '47a8372a-bd5a-4552-b1a5-c799d3a07062' //即API key，登录快递鸟官网会员中心获取 https://www.kdniao.com/UserCenter/v4/UserHome.aspx

const getParams = postid => {
  //请求接口指令
  const RequestType = '8001' //在途监控即时查询接口指令8001/地图版即时查询接口指令8003
  // 组装应用级参数
  const RequestData = {
    OrderCode: '',
    CustomerName: '',
    ShipperCode: 'HTKY',
    LogisticCode: postid // 'SF00003618100'
  }

  const DataSign = Buffer.from(
    md5Hex(qs.stringify(RequestData) + ApiKey)
  ).toString('base64')

  const reqParams = {
    RequestType,
    EBusinessID,
    DataSign,
    RequestData: qs.stringify(RequestData),
    DataType: 2
  }
  return reqParams
} // 组装系统级参数

const post = async (url, data) => {
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded'
  const res = await axios.post(url, qs.stringify(data))
  return res
}

const KDNPost = async params => {
  const res = await post(Url, params)
  return res
}
// getParams('SF00003618100')
export { KDNPost, getParams }
