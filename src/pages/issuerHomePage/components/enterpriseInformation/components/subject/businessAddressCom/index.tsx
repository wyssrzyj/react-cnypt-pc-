import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { isFunction } from 'lodash'
import styles from './index.module.less'

const BusinessAddressCom = props => {
  const _AMap = window.AMap as any
  const { onChange, list } = props
  const { address, location } = list
  const [mapLocation, setMapLocation] = useState<any[]>([])
  const [mapScene, setMapScene] = useState<any>()
  // const [locationName, setLocationName] = useState<string>(address)
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
      let marker = new _AMap.Marker({
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
      let marker = new _AMap.Marker({
        position: new _AMap.LngLat(mapLocation[0], mapLocation[1])
      })
      mapScene.add(marker)
      mapScene.panTo([mapLocation[0], mapLocation[1]])
    }
  }, [mapLocation, mapScene])

  useEffect(() => {
    if (address && location) {
      setMapLocation(location.split(','))
    }
  }, [address, location])

  return (
    <div className={styles.businessAddressCom}>
      <div>
        <div id="yjMap" className={styles.mapTemp}></div>
      </div>
    </div>
  )
}
export default BusinessAddressCom
