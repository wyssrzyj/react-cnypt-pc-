import React, { useEffect, useState } from 'react'
import { Input } from 'antd'
import axios from 'axios'
import { isFunction } from 'lodash'
import styles from './index.module.less'
import { useStores } from '@/utils/mobx'

const { Search } = Input

const BusinessAddressCom = props => {
  const _AMap = window.AMap as any
  const { commonStore } = useStores()
  const { getAreaName } = commonStore
  const { onChange, value = {}, getFieldValue, field } = props
  const { address, location } = value
  const [mapLocation, setMapLocation] = useState<any[]>([])
  const [mapScene, setMapScene] = useState<any>()
  const [locationName, setLocationName] = useState<string>(address)

  const onSearch = async value => {
    setLocationName(value)
    const areaInfo = getFieldValue(field)
    let cityName, provinceName, districtName
    if (Array.isArray(areaInfo) && areaInfo.length) {
      const province = await getAreaName(areaInfo[0])
      const city = await getAreaName(areaInfo[1])
      const district = await getAreaName(areaInfo[2])
      if (province) {
        provinceName = province.name
      }
      if (city) {
        cityName = city.name
      }
      if (district) {
        districtName = district.name
      }
    }
    let url = `https://restapi.amap.com/v5/place/text?key=6d7e0822e5ed232cf706c42ff08cb66f&keywords=${value}`
    url = provinceName ? url + `&province=${provinceName}` : url
    url = cityName ? url + `&city=${cityName}` : url
    url = districtName ? url + `&district=${districtName}` : url
    const res = await axios.get(url)
    if (res.status === 200) {
      const location = res.data.pois[0].location
      isFunction(onChange) && onChange({ location: location, address: value })
      setMapLocation(location.split(','))
    }
  }

  useEffect(() => {
    const map = new _AMap.Map('yjMap', {
      zoom: 15,
      animateEnable: true,
      mapStyle: 'amap://styles/dcf78c909fec3cc16509c3afe6513956'
    })
    map.on('click', async ev => {
      map.clearMap()
      const { lnglat } = ev
      const { lng, lat } = lnglat
      var marker = new _AMap.Marker({
        position: new _AMap.LngLat(lng, lat)
      })
      const strArr = `${lnglat.lng},${lnglat.lat}`
      const url = `https://restapi.amap.com/v3/geocode/regeo?key=6d7e0822e5ed232cf706c42ff08cb66f&location=${strArr}`
      const res = await axios.get(url)
      const { status, data } = res
      if (status === 200) {
        const {
          regeocode: { formatted_address }
        } = data
        setLocationName(formatted_address)
        isFunction(onChange) &&
          onChange({ location: strArr, address: formatted_address })
      }
      map.add(marker)
    })
    setMapScene(map)
  }, [])

  useEffect(() => {
    if (mapLocation.length && mapScene) {
      mapScene.clearMap()
      var marker = new _AMap.Marker({
        position: new _AMap.LngLat(mapLocation[0], mapLocation[1])
      })
      mapScene.add(marker)
      mapScene.panTo([mapLocation[0], mapLocation[1]])
    }
  }, [mapLocation, mapScene])

  useEffect(() => {
    if (address && location) {
      setLocationName(address)
      setMapLocation(location.split(','))
    }
  }, [address, location])

  return (
    <div className={styles.businessAddressCom}>
      <Search
        placeholder="请输入企业地址，如 浙江省杭州市余杭区新丰路199号"
        enterButton="精确定位"
        onSearch={onSearch}
        value={locationName}
        style={{ width: 567 }}
        onChange={e => setLocationName(e.target.value)}
      />
      <div>
        <div id="yjMap" className={styles.mapTemp}></div>
      </div>
    </div>
  )
}
export default BusinessAddressCom
