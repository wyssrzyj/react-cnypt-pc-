import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef
} from 'react'
import { Scene } from '@antv/l7'
import { ProvinceLayer } from '@antv/l7-district'
import { Mapbox } from '@antv/l7-maps'
import { AMapScene, PointLayer } from '@antv/l7-react'
import styles from './areaComponent.module.less'
import * as _ from 'lodash'

const MapTemp = forwardRef((props: any, ref) => {
  const mRef: any = useRef()
  const { dataSource = [], center = [], zoom, activityKey } = props
  const [map, setMap] = useState(null)

  const initMap = async () => {
    const scene = new Scene({
      id: `mapTemp${activityKey}`,
      map: new Mapbox({
        style: 'light',
        pitch: 0,
        center: center
      })
    })
    setMap(scene)

    mRef.current = scene

    // scene.on('loaded', async () => {
    //   const arrs = dataSource.reduce((prev, item) => {
    //     const source = item.children.map(i => {
    //       const area: any = {}
    //       area.name = i.cityName
    //       area.code = i.cityAdCode
    //       area.pop = i.statFactory
    //       return area
    //     })
    //     prev.push(...source)
    //     return prev
    //   }, [])
    //   await new CountryLayer(scene, {
    //     data: arrs,
    //     joinBy: ['adcode', 'code'],
    //     depth: 2,
    //     label: {
    //       field: 'NAME_CHN',
    //       textAllowOverlap: false
    //     },
    //     bubble: {
    //       enable: true,
    //       size: {
    //         field: 'name',
    //         values: [3, 20]
    //       },
    //       color: {
    //         field: 'pop',
    //         values: [
    //           '#FEE3C9',
    //           '#FEE3C9',
    //           '#E8C3A1',
    //           '#E2A974',
    //           '#E49852',
    //           '#E67E1D'
    //         ]
    //       }
    //     },
    //     popup: {
    //       enable: true,
    //       Html: props => {
    //         return `<span>${props.NAME_CHN}:</span><span>${
    //           props.pop || 0
    //         }</span>`
    //       }
    //     }
    //   })
    // })

    const colors = [
      '#FEE3C9',
      '#FEE3C9',
      '#E8C3A1',
      '#E2A974',
      '#E49852',
      '#E67E1D'
    ]

    scene.on('loaded', () => {
      dataSource.forEach(item => {
        const source = item.children.map(i => {
          const area: any = {}
          area.name = i.cityName
          area.code = i.cityAdCode
          area.pop = i.statFactory
          return area
        })
        new ProvinceLayer(scene, {
          data: source,
          adcode: [item.provinceAdCode],
          joinBy: ['adcode', 'code'],
          // stroke: 'red',
          depth: 2,
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
          bubble: {
            // enable: true,
            // size: {
            //   field: 'pop',
            //   values: [2, 20]
            // },
            // color: {
            //   field: 'pop',
            //   values: [
            //     '#FEE3C9',
            //     '#FEE3C9',
            //     '#E8C3A1',
            //     '#E2A974',
            //     '#E49852',
            //     '#E67E1D'
            //   ]
            // }
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
    })
  }

  useImperativeHandle(ref, () => {
    return {
      map: mRef.current
    }
  })

  useEffect(() => {
    ;(async () => {
      dataSource.length && (await initMap())
    })()
  }, [dataSource])

  useEffect(() => {
    if (!map) return

    setTimeout(() => {
      map.setZoomAndCenter(zoom, center)
    }, 1500)
  }, [map])

  return (
    <div className={styles.mapTemp}>
      <AMapScene
        className={styles.mapTemp}
        map={{
          center: [0.19382669582967, 50.258134],
          pitch: 0,
          style: 'light',
          zoom: 6
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        {dataSource &&
          dataSource.map(item => {
            const source = item.children.map(i => {
              const area: any = {}
              area.name = i.cityName
              area.code = i.cityAdCode
              area.pop = i.statFactory
              return area
            })
            return (
              <PointLayer
                key={'2'}
                options={{
                  autoFit: true
                }}
                source={{
                  data: source,
                  parser: {
                    type: 'json',
                    x: 'longitude',
                    y: 'latitude'
                  }
                }}
                shape={{
                  field: 'name',
                  values: ['00', '01', '02']
                }}
                size={{
                  values: 10
                }}
                style={{
                  opacity: 1
                }}
              />
            )
          })}
      </AMapScene>
    </div>
  )
})

export default MapTemp
