import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  useCallback
} from 'react'
import { Scene } from '@antv/l7'
import { ProvinceLayer } from '@antv/l7-district'
import { GaodeMap } from '@antv/l7-maps'
import styles from './areaComponent.module.less'
import * as _ from 'lodash'

const MapTemp = forwardRef((props: any, ref) => {
  const _AMap = window.AMap as any

  const mRef: any = useRef()
  const { dataSource = [], center = [], zoom, activityKey = 0 } = props
  const [map, setMap] = useState<null | Scene>(null)

  const initMap = useCallback(async () => {
    if (map) {
      map.removeAllLayer()
    }

    const GDMap = new _AMap.Map(`mapTemp${activityKey}`, {
      viewMode: '3D'
    })

    const scene = new Scene({
      id: `mapTemp${activityKey}`,
      map: new GaodeMap({
        mapInstance: GDMap
      })
    })
    setMap(scene)

    mRef.current = scene

    const colors = [
      '#FEE3C9',
      '#FEE3C9',
      '#E8C3A1',
      '#E2A974',
      '#E49852',
      '#E67E1D'
    ]

    await dataSource.forEach(async item => {
      const source = item.children.map(i => {
        const area: any = {}
        area.name = i.cityName
        area.code = i.cityAdCode
        area.pop = i.statFactory
        return area
      })
      await new ProvinceLayer(scene, {
        data: source,
        adcode: [item.provinceAdCode],
        joinBy: ['adcode', 'code'],
        depth: 2,
        stroke: '#666666',
        label: {
          field: 'NAME_CHN',
          textAllowOverlap: false
        },
        fill: {
          color: {
            field: 'pop',
            values: colors
          }
        },
        popup: {
          enable: true,
          Html: props => {
            return `<span>${props.NAME_CHN}:</span><span>${
              props.pop || 0
            }</span>`
          }
        }
      })
    })

    scene.on('loaded', async () => {
      setTimeout(() => {
        scene.setZoomAndCenter(zoom, center)
      }, 200)
    })
  }, [dataSource])

  useImperativeHandle(ref, () => {
    return {
      map: mRef.current
    }
  })

  useEffect(() => {
    return () => {
      // map && map.destroy()
      // mRef.current = null
      // setMap(null)
    }
  }, [])

  useEffect(() => {
    initMap() // 初始化地图
  }, [dataSource])

  return (
    <div>
      <div id={`mapTemp${activityKey}`} className={styles.mapTemp}></div>
    </div>
  )
})

export default MapTemp
