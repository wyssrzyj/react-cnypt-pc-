import React, { useEffect, useCallback, useRef } from 'react'
import { Scene } from '@antv/l7'
import { ProvinceLayer, CountryLayer } from '@antv/l7-district'
import { GaodeMap } from '@antv/l7-maps'
import styles from './index.module.less'
import * as _ from 'lodash'

// const ProvinceData = [
//   {
//     name: '湖州市',
//     code: 330500,
//     value: 21
//   },
//   {
//     name: '杭州市',
//     code: 330100,
//     value: 55
//   },
//   {
//     name: '嘉兴市',
//     code: 330400,
//     value: 55
//   },
//   {
//     name: '绍兴市',
//     code: 330600,
//     value: 67
//   },
//   {
//     name: '宁波市',
//     code: 330200,
//     value: 72
//   },
//   {
//     name: '舟山市',
//     code: 330900,
//     value: 8
//   },
//   {
//     name: '衢州市',
//     code: 330800,
//     value: 11
//   },
//   {
//     name: '金华市',
//     code: 330700,
//     value: 32
//   },
//   {
//     name: '台州市',
//     code: 331000,
//     value: 55
//   },
//   {
//     name: '丽水市',
//     code: 331100,
//     value: 17
//   },
//   {
//     name: '温州市',
//     code: 330300,
//     value: 33
//   }
// ]

const AreaMap = props => {
  const { data = [], code } = props

  const layerRef = useRef<any>()

  const colors = [
    '#B8E1FF',
    '#7DAAFF',
    '#3D76DD',
    '#0047A5',
    '#001D70',
    '#0b126d'
  ]

  const initMap = useCallback(async () => {
    const mapBox: any = new GaodeMap({
      pitch: 0,
      style: 'blank',
      zoom: 3,
      minZoom: 3,
      maxZoom: 20,
      logoVisible: false,
      zoomEnable: false,
      scrollZoom: false,
      pitchWithRotate: false,
      rotateEnable: false,
      dragEnable: false
    })

    const sceneTarget: any = await new Scene({
      id: `areaMap`,
      logoVisible: false,
      map: mapBox
    })

    sceneTarget.on('loaded', async () => {
      new CountryLayer(sceneTarget, {
        autoFit: true,
        label: {
          field: 'NAME_CHN',
          textAllowOverlap: true,
          stroke: 'transparent',
          strokeWidth: 0,
          size: 12,
          color: 'transparent'
        },
        fill: {
          color: {
            field: 'value',
            values: colors
          }
        }
      })

      const layer = new ProvinceLayer(sceneTarget, {
        data: data,
        autoFit: true,
        joinBy: ['adcode', 'code'],
        adcode: [`${code}`],
        depth: 2,
        label: {
          field: 'NAME_CHN',
          textAllowOverlap: true,
          stroke: '#6F6C6C',
          strokeWidth: 0,
          size: 12,
          color: '#ffffff'
        },
        fill: {
          color: {
            field: 'value',
            values: colors
          }
        }
      })

      layerRef.current = layer
    })
  }, [])

  useEffect(() => {
    initMap() // 初始化地图
  }, [])

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.updateDistrict(code, data, ['adcode', 'code'])
    }
  }, [data, code])

  return <div id={`areaMap`} className={styles.areaMap}></div>
}

export default AreaMap
