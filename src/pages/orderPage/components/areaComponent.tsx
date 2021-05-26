import React, { useEffect, useState } from 'react'
import { Scene } from '@antv/l7'
import { ProvinceLayer } from '@antv/l7-district'
import { Mapbox } from '@antv/l7-maps'
import styles from './areaComponent.module.less'

const MapTemp = () => {
  const [map, setMap] = useState(null)

  const initMap = async () => {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/149b599d-21ef-4c24-812c-20deaee90e20.json'
    )
    const provinceData = await response.json()
    const data = Object.keys(provinceData).map(key => {
      return {
        code: key,
        name: provinceData[key][0],
        pop: provinceData[key][2] * 1,
      }
    })

    console.log(data)
    // {code: "330282", name: "慈溪市", pop: 104}

    const scene = new Scene({
      id: 'mapTemp',
      map: new Mapbox({
        style: 'light',
        pitch: 0,
        center: [107.054293, 35.246265],
      }),
    })

    setMap(scene)

    scene.on('loaded', async () => {
      await new ProvinceLayer(scene, {
        adcode: ['310000'],
      })
      await new ProvinceLayer(scene, {
        adcode: ['320000'],
      })
      await new ProvinceLayer(scene, {
        adcode: ['340000'],
      })
      await new ProvinceLayer(scene, {
        data,
        joinBy: ['adcode', 'code'],
        adcode: ['330000'],
        depth: 3,
        label: {
          field: 'NAME_CHN',
          textAllowOverlap: false,
        },
        bubble: {
          enable: true,
          size: {
            field: 'pop',
            values: [2, 15],
          },
          color: {
            field: 'pop',
            values: [
              '#feedde',
              '#fdd0a2',
              '#fdae6b',
              '#fd8d3c',
              '#e6550d',
              '#a63603',
            ],
          },
        },
        popup: {
          enable: true,
          Html: props => {
            return `<span>${props.NAME_CHN}:</span><span>${props.pop}</span>`
          },
        },
      })
    })
  }

  useEffect(() => {
    ;(async () => {
      await initMap()
    })()
  }, [])

  useEffect(() => {
    if (!map) return

    setTimeout(() => {
      map.setZoomAndCenter(4.930243767520109, {
        lat: 30.70327460663428,
        lng: 118.65658099960251,
      })
    }, 1000)
  }, [map])

  const mapClick = () => {}

  return (
    <div>
      <button onClick={mapClick}>切换</button>
      <div id="mapTemp" className={styles.mapTemp}></div>
    </div>
  )
}

export default MapTemp
