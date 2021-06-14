import React, { useRef, useEffect } from 'react' // useImperativeHandle // useCallback, // useState, // useRef, // useEffect,
import { Input } from 'antd'
import { Scene, Marker, MarkerLayer, PointLayer } from '@antv/l7'
import { GaodeMap } from '@antv/l7-maps'
import styles from './index.module.less'

const { Search } = Input

const BusinessAddressCom = () => {
  const markerRef = useRef()
  console.log(
    '🚀 ~ file: index.tsx ~ line 11 ~ BusinessAddressCom ~ markerRef',
    markerRef
  )

  useEffect(() => {
    const mapBox: any = new GaodeMap({
      style: 'light',
      center: [105.790327, 36.495636],
      pitch: 0,
      zoom: 4
    })

    const scene: any = new Scene({
      id: `yjMap`,
      logoVisible: false,
      map: mapBox
    })

    console.log(scene, 'scene')

    scene.on('loaded', () => {
      const markerLayer = new MarkerLayer()
      const el = document.createElement('label')
      el.className = 'labelclass'
      el.style.background =
        'url(https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*BJ6cTpDcuLcAAAAAAAAAAABkARQnAQ)'
      const marker = new Marker({
        element: el
      }).setLnglat({ lng: 120.2, lat: 30.3 })
      markerLayer.addMarker(marker)

      scene.addMarkerLayer(markerLayer)
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
