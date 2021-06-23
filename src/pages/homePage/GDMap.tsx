import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Scene } from '@antv/l7'
import { CountryLayer, ProvinceLayer } from '@antv/l7-district'
import { GaodeMap } from '@antv/l7-maps'
import styles from './index.module.less'
import * as _ from 'lodash'

const ProvinceData = [
  {
    name: '云南省',
    adcode: 530000,
    value: 12
  },
  {
    name: '黑龙江省',
    code: 230000,
    value: 21
  },
  {
    name: '贵州省',
    code: 520000,
    value: 14806.45
  },
  {
    name: '北京市',
    code: 110000,
    value: 30319.98
  },
  {
    name: '河北省',
    code: 130000,
    value: 0
  },
  {
    name: '山西省',
    code: 140000,
    value: 16818.11
  },
  {
    name: '吉林省',
    code: 220000,
    value: 15074
  },
  {
    name: '宁夏回族自治区',
    code: 640000,
    value: 0
  },
  {
    name: '辽宁省',
    code: 210000,
    value: 25315.35
  },
  {
    name: '海南省',
    code: 460000,
    value: 4832.05
  },
  {
    name: '内蒙古自治区',
    code: 150000,
    value: 17289.22
  },
  {
    name: '天津市',
    code: 120000,
    value: 18809.64
  },
  {
    name: '新疆维吾尔自治区',
    code: 650000,
    value: 12199.08
  },
  {
    name: '上海市',
    code: 310000,
    value: 32679.87
  },
  {
    name: '陕西省',
    code: 610000,
    value: 24438.32
  },
  {
    name: '甘肃省',
    code: 620000,
    value: 8246.07
  },
  {
    name: '安徽省',
    code: 340000,
    value: 30006.82
  },
  {
    name: '香港特别行政区',
    code: 810000,
    value: 0
  },
  {
    name: '广东省',
    code: 440000,
    value: 97277.77
  },
  {
    name: '河南省',
    code: 410000,
    value: 48055.86
  },
  {
    name: '湖南省',
    code: 430000,
    value: 36425.78
  },
  {
    name: '江西省',
    code: 360000,
    value: 21984.78
  },
  {
    name: '四川省',
    code: 510000,
    value: 40678.13
  },
  {
    name: '广西壮族自治区',
    code: 450000,
    value: 20353.51
  },
  {
    name: '江苏省',
    code: 320000,
    value: 92595.4
  },
  {
    name: '澳门特别行政区',
    code: 820000,
    value: null
  },
  {
    name: '浙江省',
    code: 330000,
    value: 56197.15
  },
  {
    name: '山东省',
    code: 370000,
    value: 76469.67
  },
  {
    name: '青海省',
    code: 630000,
    value: 2865.23
  },
  {
    name: '重庆市',
    code: 500000,
    value: 20363.19
  },
  {
    name: '福建省',
    code: 350000,
    value: 35804.04
  },
  {
    name: '湖北省',
    code: 420000,
    value: 39366.55
  },
  {
    name: '西藏自治区',
    code: 540000,
    value: 1477.63
  },
  {
    name: '台湾省',
    code: 710000,
    value: null
  }
]

const colors = [
  '#B8E1FF',
  '#7DAAFF',
  '#3D76DD',
  '#0047A5',
  '#001D70',
  '#0b126d'
]

const GDMap = (props: any) => {
  const { provinceChange } = props

  const mRef: any = useRef()
  const cRef: any = useRef()
  const {} = props
  const [map, setMap] = useState<any>(null)

  const initMap = useCallback(async () => {
    if (map) {
      map.removeAllLayer()
    }
    const startTime = Date.now()
    const mapBox: any = await new GaodeMap({
      center: [116.2825, 39.9],
      pitch: 0,
      style: 'blank',
      zoom: 3,
      minZoom: 3,
      maxZoom: 20,
      zoomEnable: false,
      scrollZoom: false,
      pitchWithRotate: false,
      rotateEnable: false,
      dragEnable: false
    })

    const scene: any = await new Scene({
      id: `homeMap`,
      logoVisible: false,
      map: mapBox
    })

    console.log(scene, 'scene')

    const cLayer = new CountryLayer(scene, {
      data: ProvinceData,
      joinBy: ['NAME_CHN', 'name'],
      label: {
        // enable: false
      },
      popup: {
        enable: false
      },
      autoFit: true,
      provinceStroke: '#aaa',
      depth: 1,
      fill: {
        color: {
          field: 'value',
          values: colors
        }
      }
    })

    mRef.current = scene

    scene.on('loaded', async () => {
      setTimeout(() => {
        scene.setZoomAndCenter(4.2, [116.303904, 36.820534], true)
      }, 1000)

      setMap(scene)
      cRef.current = cLayer
      console.log(Date.now() - startTime, '~~~~~~~~~~')

      // 显示地图右下角的南海诸岛
      const scene2 = new Scene({
        id: 'attach',
        logoVisible: false,
        map: new GaodeMap({
          center: [113.60540108435657, 12.833692637803168],
          pitch: 0,
          style: 'blank',
          zoom: 1.93,
          interactive: false,
          zoomEnable: false,
          scrollZoom: false,
          pitchWithRotate: false,
          rotateEnable: false,
          dragEnable: false
        })
      })

      scene2.on('loaded', () => {
        new CountryLayer(scene2, {
          data: [],
          label: {
            enable: false
          },
          popup: {
            enable: false
          },
          autoFit: false,
          provinceStroke: '#aaa',
          depth: 1,
          fill: {
            color: '#A3d7FF'
          }
        })
        new ProvinceLayer(scene2, {
          data: [],
          autoFit: false,
          adcode: ['460000'],
          depth: 2,
          zIndex: 2,
          stroke: '#aaa',
          strokeWidth: 0.1,
          label: {
            enable: false,
            field: 'NAME_CHN',
            textAllowOverlap: false
          },
          fill: {
            color: '#A3d7ff'
          },
          popup: {
            enable: false,
            Html: props => {
              return `<span>${props.NAME_CHN}:</span><span>${props.pop}</span>`
            }
          }
        })
      })
    })
  }, [])

  useEffect(() => {
    initMap() // 初始化地图
  }, [])

  useEffect(() => {
    if (map && cRef.current) {
      cRef.current.on('click', ev => {
        const { feature } = ev
        const { properties } = feature
        provinceChange(properties.name)
      })

      cRef.current.on('unclick', _ev => {
        provinceChange(null)
      })
    }
  }, [cRef.current, map, provinceChange])

  return (
    <div id={`homeMap`} className={styles.mapTemp}>
      <div id={'attach'} className={styles.attach}></div>
    </div>
  )
}

export default GDMap
