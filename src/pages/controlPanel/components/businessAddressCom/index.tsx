import React, { useRef, useEffect } from 'react' // useImperativeHandle // useCallback, // useState, // useRef, // useEffect,
import { Input } from 'antd'
import { Scene, Marker } from '@antv/l7'
import { GaodeMap } from '@antv/l7-maps'
import styles from './index.module.less'

const { Search } = Input

const BusinessAddressCom = () => {
  const markerRef = useRef()

  useEffect(() => {
    const scene = new Scene({
      id: 'yjMap',
      map: new GaodeMap({
        style: 'light',
        center: [120.19382669582967, 30.258134],
        pitch: 0,
        zoom: 10,
        rotation: 0,
        viewMode: '2D'
      })
    })

    console.log(scene, 'scene')

    const marker = new Marker({
      element: markerRef.current
    })
    // { lng: 120.2, lat: 30.3 }
    marker.setLnglat({ x: 120.2, y: 30.3 })
    scene.addMarker(marker)

    scene.on('loaded', () => {
      console.log('~~~~~')
    })
  }, [])

  const onSearch = () => {}
  return (
    <div>
      <Search
        placeholder="请输入企业地址"
        enterButton="精确定位"
        onSearch={onSearch}
      />
      <div>
        <div id="yjMap" className={styles.mapTemp}></div>
      </div>
    </div>
  )
}

export default BusinessAddressCom
