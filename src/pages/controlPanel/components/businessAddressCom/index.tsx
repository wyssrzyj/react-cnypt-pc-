import React, { useEffect, useState } from 'react' // useImperativeHandle // useCallback, // useState, // useRef, // useEffect,
import { Input } from 'antd'
import { Scene, Marker, MarkerLayer } from '@antv/l7'
import { GaodeMap } from '@antv/l7-maps'
import axios from 'axios'
import styles from './index.module.less'

const { Search } = Input

const BusinessAddressCom = props => {
  const { onChange } = props
  const [mapLocation, setMapLocation] = useState<any[]>([])
  const [PMarker, setPMarker] = useState<Marker>()
  const [mapScene, setMapScene] = useState<Scene>()
  const [locationName, setLocationName] = useState<string>('')

  const onSearch = async value => {
    setLocationName(value)
    const url = `https://restapi.amap.com/v3/geocode/geo?key=6d7e0822e5ed232cf706c42ff08cb66f&address=${value}`
    const res = await axios.get(url)
    if (res.status === 200) {
      const location = res.data.geocodes[0].location
      onChange(location)
      setMapLocation(location.split(','))
    }
  }

  useEffect(() => {
    const scene = new Scene({
      id: 'yjMap',
      map: new GaodeMap({
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [120.311123, 30.404645],
        pitch: 0,
        zoom: 13,
        rotation: 0
      })
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
      }).setLnglat({ lng: 120.311123, lat: 30.404645 })
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
        onChange(strArr)
        const url = `https://restapi.amap.com/v3/geocode/regeo?key=6d7e0822e5ed232cf706c42ff08cb66f&location=${strArr}`
        const res = await axios.get(url)
        const { status, data } = res
        if (status === 200) {
          const {
            regeocode: { formatted_address }
          } = data
          setLocationName(formatted_address)
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

  return (
    <div>
      <Search
        placeholder="请输入企业地址，如 浙江省杭州市余杭区新丰路199号"
        enterButton="精确定位"
        onSearch={onSearch}
        value={locationName}
        onChange={e => setLocationName(e.target.value)}
      />
      <div>
        <div id="yjMap" className={styles.mapTemp}></div>
      </div>
    </div>
  )
}

export default BusinessAddressCom
