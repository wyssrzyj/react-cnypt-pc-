import * as OSS from 'ali-oss'

const client = new OSS({
  accessKeyId: process.env.ACCESS_KEY_ID,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  regoin: 'oss-cn-hangzhou',
  endpoint: 'oss-cn-hangzhou.aliyuncs.com',
  bucket: 'capacity-platform',
  timeout: 600000
})

export default client
