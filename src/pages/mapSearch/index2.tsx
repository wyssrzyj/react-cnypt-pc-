import React, { useEffect } from 'react'
import { Scene, PointLayer } from '@antv/l7'
import { GaodeMap } from '@antv/l7-maps'
import styles from './index.module.less'

import axios from 'axios'
import { Input } from 'antd'

const MapSearch = () => {
  useEffect(() => {
    const map = new GaodeMap({
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [120.301402, 30.395863],
      pitch: 0,
      zoom: 11,
      minZoom: 2,
      maxZoom: 19,
      rotation: 0
    })

    const scene = new Scene({
      id: 'searchMap',
      logoVisible: false,
      map: map
    })

    const data = [
      { lng: 120.301402, lat: 30.315863, point_count: 11 },
      { lng: 120.311402, lat: 30.325863, point_count: 22 },
      { lng: 120.321402, lat: 30.335863, point_count: 13 },
      { lng: 120.331402, lat: 30.345863, point_count: 41 },
      { lng: 120.341402, lat: 30.355863, point_count: 35 },
      { lng: 120.351402, lat: 30.365863, point_count: 36 },
      { lng: 120.361402, lat: 30.375863, point_count: 17 },
      { lng: 120.371402, lat: 30.385863, point_count: 28 },
      { lng: 120.381402, lat: 30.395863, point_count: 29 },
      { lng: 120.391402, lat: 30.405863, point_count: 15 },
      { lng: 120.401402, lat: 30.415863, point_count: 19 },
      { lng: 120.411402, lat: 30.425863, point_count: 32 }
    ]

    scene.on('loaded', async () => {
      const pointLayer: any = await new PointLayer({
        zIndex: 2
      })
        .source(data, {
          cluster: true,
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat'
          }
        })
        .shape('circle')
        .active(false)
        .animate(false)
        .size('point_count', [5, 40])
        .color('point_count', [
          '#002466',
          '#105CB3',
          '#2894E0',
          '#CFF6FF',
          '#FFF5B8',
          '#FFAB5C',
          '#F27049',
          '#730D1C'
        ])
        .style({
          stroke: 'rgb(255,255,255)',
          strokeWidth: 2,
          opacity: 1.0
        })

      setTimeout(() => {
        const pointLayer2 = new PointLayer({
          zIndex: 5
        })
          .source(data, {
            parser: {
              type: 'json',
              x: 'lng',
              y: 'lat'
            }
          })
          .shape('point_count', 'text')
          .active(true)
          .size('point_count', [10, 20, 24])
          .color('#fff')
          .style({
            // fontFamily: 'Monaco, monospace', // 字体
            fontSize: 22,
            fontWeight: 200,
            textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
            textOffset: [0, -4], // 文本相对锚点的偏移量 [水平, 垂直]
            spacing: 2, // 字符间距
            padding: [4, 4], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
            strokeColor: 'blue', // 描边颜色
            strokeWidth: 2, // 描边宽度
            opacity: 1.0
          })
        scene.addLayer(pointLayer2)
      })

      scene.addLayer(pointLayer)
    })
  }, [])

  const onSearch = async event => {
    const value = event.target.value

    const url2 = `https://restapi.amap.com/v5/place/text?key=6d7e0822e5ed232cf706c42ff08cb66f&keywords=${value}`
    const res2 = await axios.get(url2)
    console.log(res2)
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <Input onBlur={onSearch}></Input>
      </div>
      <div id="searchMap" className={styles.mapTemp}></div>
    </div>
  )
}

export default MapSearch
