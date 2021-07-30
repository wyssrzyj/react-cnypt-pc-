import React, { useEffect, useState } from 'react' // useImperativeHandle // useCallback, // useState, // useRef, // useEffect,
import { Input } from 'antd'
import { Scene, Marker, MarkerLayer } from '@antv/l7'
import { GaodeMap } from '@antv/l7-maps'
import axios from 'axios'
import { isFunction } from 'lodash'
import styles from './index.module.less'

const { Search } = Input

const BusinessAddressCom = props => {
  const { onChange, value = {} } = props
  const { address, location } = value
  const [mapLocation, setMapLocation] = useState<any[]>([])
  const [PMarker, setPMarker] = useState<Marker>()
  const [mapScene, setMapScene] = useState<Scene>()
  const [locationName, setLocationName] = useState<string>(address)

  const onSearch = async value => {
    setLocationName(value)
    // const url = `https://restapi.amap.com/v3/geocode/geo?key=6d7e0822e5ed232cf706c42ff08cb66f&address=${value}`
    // const res = await axios.get(url)

    const url2 = `https://restapi.amap.com/v5/place/text?key=6d7e0822e5ed232cf706c42ff08cb66f&keywords=${value}`
    const res2 = await axios.get(url2)
    // if (res.status === 200) {
    //   const location = res.data.geocodes[0].location
    //   isFunction(isFunction) && onChange({ location: location, address: value })
    //   setMapLocation(location.split(','))
    // }

    if (res2.status === 200) {
      const location = res2.data.pois[0].location
      isFunction(isFunction) && onChange({ location: location, address: value })
      setMapLocation(location.split(','))
    }
  }

  useEffect(() => {
    const map = new GaodeMap({
      style: 'mapbox://styles/mapbox/streets-v11',
      // center: [120.311123, 30.404645],
      pitch: 0,
      zoom: 13,
      rotation: 0
    })

    const scene = new Scene({
      id: 'yjMap',
      logoVisible: false,
      map: map
    })

    scene.on('loaded', () => {
      setMapScene(scene)
      const markerLayer = new MarkerLayer()
      const el = document.createElement('label')
      el.className = 'labelclass'
      el.style.background =
        'url(https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*BJ6cTpDcuLcAAAAAAAAAAABkARQnAQ)'
      const marker: any = new Marker({
        element: el
      }).setLnglat({ lng: 120.300402, lat: 30.395863 })
      setPMarker(marker)
      markerLayer.addMarker(marker)
      scene.addMarkerLayer(markerLayer)
    })
  }, [])

  useEffect(() => {
    if (mapScene && PMarker) {
      mapScene.on('click', async ev => {
        const { lnglat } = ev
        PMarker.setLnglat({ lng: lnglat.lng, lat: lnglat.lat })
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
      })
    }
  }, [mapScene, PMarker])

  useEffect(() => {
    if (PMarker && mapLocation.length && mapScene) {
      PMarker.setLnglat({ lng: mapLocation[0], lat: mapLocation[1] })
      mapScene.panTo([mapLocation[0], mapLocation[1]])
    }
  }, [mapLocation, PMarker, mapScene])

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
        style={{ width: 574 }}
        onChange={e => setLocationName(e.target.value)}
      />
      <div>
        <div id="yjMap" className={styles.mapTemp}></div>
      </div>
    </div>
  )
}

export default BusinessAddressCom
