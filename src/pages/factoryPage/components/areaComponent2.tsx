import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef
} from 'react'
import { Scene } from '@antv/l7'
import { ProvinceLayer } from '@antv/l7-district'
import { GaodeMap } from '@antv/l7-maps'
import styles from './areaComponent.module.less'
import * as _ from 'lodash'

const colors = [
  '#FEE3C9',
  '#FEE3C9',
  '#E8C3A1',
  '#E2A974',
  '#E49852',
  '#E67E1D'
]

const MapTemp = forwardRef((props: any, ref) => {
  const mRef: any = useRef()
  const { dataSource = [], center = [] } = props
  const [map, setMap] = useState(null)

  const initMap = async () => {
    const scene = new Scene({
      id: `mapTemp`,
      map: new GaodeMap({
        style: 'light',
        pitch: 0,
        center: center
      })
    })
    setMap(scene)

    mRef.current = scene

    scene.on('loaded', () => {})
  }

  const updateLayer = () => {
    const adcodes = []
    const data = dataSource.reduce((prev, item) => {
      adcodes.push(item.provinceAdCode)
      if (item.children) {
        const childs = item.children.map(i => {
          const area: any = {}
          area.name = i.cityName
          area.code = i.cityAdCode
          area.pop = i.statFactory ? i.statFactory : 0
          return area
        })
        prev.push(...childs)
        return prev
      }
    }, [])

    new ProvinceLayer(map, {
      data: data,
      joinBy: ['adcode', 'code'],
      adcode: adcodes,
      depth: 2,
      provinceStroke: '#fff',
      cityStroke: '#EBCCB4',
      cityStrokeWidth: 1,
      fill: {
        color: {
          field: 'pop',
          values: colors
        }
      },
      popup: {
        enable: true,
        Html: props => {
          return `<span>${props.NAME_CHN}: ${props.pop ? props.pop : 0}</span>`
        }
      }
    })
  }

  useImperativeHandle(ref, () => {
    return {
      map: mRef.current
    }
  })

  useEffect(() => {
    if (!map) {
      initMap()
    }
  }, [map])

  useEffect(() => {
    ;(async () => {
      map && dataSource.length && (await updateLayer())
    })()
  }, [map, dataSource])

  return <div className={styles.mapTemp} id={'mapTemp'}></div>
})

export default MapTemp
