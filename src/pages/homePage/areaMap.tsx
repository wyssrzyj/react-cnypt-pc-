import React, { useEffect, useCallback, useRef } from 'react'
import { Scene } from '@antv/l7'
import { ProvinceLayer, CountryLayer } from '@antv/l7-district'
import { GaodeMap } from '@antv/l7-maps'
import styles from './index.module.less'

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
    ;(window as any).requestIdleCallback(() => {
      initMap() // 初始化地图
    })
  }, [])

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.updateDistrict(code, data, ['adcode', 'code'])
    }
  }, [data, code])

  return <div id={`areaMap`} className={styles.areaMap}></div>
}

export default AreaMap
