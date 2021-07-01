import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Scene, PointLayer } from '@antv/l7'
import { DrillDownLayer, CountryLayer, ProvinceLayer } from '@antv/l7-district'
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
  const customRef = useRef<HTMLDivElement>()
  const canvasRef = useRef<any>()
  const ctxRef = useRef<any>()
  const adcodeRef = useRef<string | number>()

  const canvasXY = {
    x: 40,
    y: 15
  }

  const {} = props
  const [map, setMap] = useState<any>(null)

  const [popUpShow, setPopUpShow] = useState<boolean>(false) // 信息窗主体内容
  const [popShow, setPopShow] = useState<boolean>(false) // 信息窗是否显示
  const [_adcode, setAddCode] = useState<string | number>() // 信息窗是否显示
  const [lineShow, setLineShow] = useState<number>(0) // 线条key
  const [drillLayer, setDrillLayer] = useState<any>(0) // 下钻图层
  const [curTarget, setCurTarget] = useState<any>({}) // 地图对象 省市区

  const CityData = JSON.parse(localStorage.getItem('cityInfo'))
  const CountyData = JSON.parse(localStorage.getItem('countyInfo'))

  // localStorage.setItem('countyInfo', JSON.stringify(CountyData))

  const setPopLocation = (scene: Scene, ev: any) => {
    const { feature } = ev
    const { properties } = feature
    if (adcodeRef.current === properties.adcode) return
    // console.log(properties)
    setAddCode(properties.adcode)
    setPopShow(true)
    setPopUpShow(true)
    setLineShow(n => n + 1)
    setCurTarget(properties)
    adcodeRef.current = properties.adcode
    const pixel = scene.lngLatToContainer([properties.x, properties.y])

    const cW = customRef.current.clientWidth
    const cH = customRef.current.clientHeight

    customRef.current.style.left = pixel.x - cW + 'px'
    customRef.current.style.top = pixel.y - cH + 'px'
    ctxRef.current && ctxRef.current.clearRect(0, 0, canvasXY.x, canvasXY.y)
  }

  const initMap = useCallback(async () => {
    if (map) {
      map.removeAllLayer()
    }
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

    mRef.current = scene

    const pointLayer = await new PointLayer({
      autoFit: true,
      zIndex: 2
    })
      .source(CountyData, {
        parser: {
          type: 'json',
          x: 'x',
          y: 'y'
        }
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(30)
      .color('#ffa842')
      .style({
        opacity: 1
        // offsets: [40, 40]
      })
    scene.addLayer(pointLayer)
    pointLayer.hide()

    scene.on('loaded', async () => {
      // scene.on('zoomchange', () => {
      //   console.log(scene.getZoom(), 'scene.getZoom()')
      //   console.log(scene.getCenter(), 'scene.getCenter()')
      //   initInfo()
      // })

      scene.on('click', _ev => {
        // console.log(ev, 'ev')
      })

      // updateDistrict
      const dLayer: any = new DrillDownLayer(scene, {
        data: [],
        viewStart: 'Country',
        viewEnd: 'County', // `Country' | 'Province' | 'City' | 'County`
        joinBy: ['NAME_CHN', 'name'],
        ProvinceData: ProvinceData,
        CityData: CityData,
        CountyData: CountyData,
        fill: {
          color: {
            field: 'value',
            values: colors
          }
        },
        popup: {
          enable: false
        },
        drillDownEvent: ev => {
          setPopShow(false)
          setPopUpShow(false)

          if (ev.level === 'city') {
            pointLayer.show()
          } else {
            pointLayer.hide()
          }
        },
        drillUpEvent: ev => {
          if (ev.to.toLowerCase() === 'country') {
            scene.setZoomAndCenter(4, [104.307546, 37.766084], true)
          }

          if (ev.level === 'city') {
            pointLayer.show()
          } else {
            pointLayer.hide()
          }
        }
      })

      setTimeout(() => {
        scene.setZoomAndCenter(4.2, [116.303904, 36.820534], true)
      }, 1000)

      setMap(scene)
      setDrillLayer(dLayer)
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

  const initInfo = () => {
    setPopShow(false)
    setCurTarget({})
    adcodeRef.current = 0
  }

  useEffect(() => {
    if (map && drillLayer) {
      drillLayer.provinceLayer.on('mousemove', ev => {
        setPopLocation(map, ev)
      })
      drillLayer.cityLayer.on('mousemove', ev => {
        setPopLocation(map, ev)
      })
      drillLayer.countyLayer.on('mousemove', ev => {
        setPopLocation(map, ev)
      })
      drillLayer.provinceLayer.on('mouseout', () => {
        initInfo()
      })
      drillLayer.cityLayer.on('mouseout', () => {
        initInfo()
      })
      drillLayer.countyLayer.on('mouseout', () => {
        initInfo()
      })
    }
  }, [drillLayer, map])

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

  useEffect(() => {
    console.log(curTarget)
  }, [curTarget])

  useEffect(() => {
    // 信息窗体线条动画
    if (!canvasRef.current) return
    const context = canvasRef.current.getContext('2d')
    ctxRef.current = context

    // context.lineWidth = 0.2
    context.strokeStyle = '#ef7100'

    const data = {
      start: [canvasXY.x, canvasXY.y],
      point: [canvasXY.x, 0],
      end: [0, 0]
    }

    const drawLine = (startX, startY, percent) => {
      context.moveTo(startX, startY)
      const x = startX - percent * (canvasXY.x - 30)
      const y = startY - percent * canvasXY.y
      context.lineTo(x, y)
      percent += 0.01
      context.stroke()

      if (percent <= 1) {
        setPopUpShow(false)
        setTimeout(() => {
          if (y > 0) {
            drawLine(x, y, percent)
          } else {
            drawLine2(x, 0, 0.01)
          }
        })
      }
    }

    const drawLine2 = (startX, startY, percent) => {
      context.moveTo(startX, startY)
      // context.lineWidth = 1
      const x = startX - percent * 30
      const y = startY
      context.lineTo(x, y)
      percent += 0.01
      context.stroke()

      if (percent <= 1) {
        if (x <= 0) {
          setPopUpShow(true)
        } else {
          setPopUpShow(false)
          setTimeout(() => drawLine2(x, y, percent))
        }
      }
    }

    drawLine(data.start[0], data.start[1], 0.01)
  }, [lineShow])

  return (
    <div id={`homeMap`} className={styles.mapTemp}>
      <div id={'attach'} className={styles.attach}></div>
      {popShow && (
        <div ref={customRef} className={styles.customBox}>
          {popUpShow && (
            <div className={styles.custom}>
              {curTarget.NAME_CHN}
              &nbsp;&nbsp;
              {curTarget.value}
            </div>
          )}
          <canvas
            key={lineShow}
            className={styles.canvas}
            ref={canvasRef}
            width={`${canvasXY.x}`}
            height={`${canvasXY.y}`}
          />
        </div>
      )}
    </div>
  )
}

export default GDMap
