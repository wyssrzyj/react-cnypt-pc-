import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Scene } from '@antv/l7'
import { DrillDownLayer } from '@antv/l7-district'
import { Mapbox } from '@antv/l7-maps'
import styles from './index.module.less'
import * as _ from 'lodash'

const HomePage = (props: any) => {
  const mRef: any = useRef()
  const customRef = useRef<HTMLDivElement>()
  const canvasRef = useRef<any>()
  const ctxRef = useRef<any>()

  const canvasXY = {
    x: 40,
    y: 30
  }

  const {} = props
  const [map, setMap] = useState<null | Scene>(null)
  const [lineShow, setLineShow] = useState<any>(0)
  const [popUpShow, setPopUpShow] = useState<any>(false)

  const initMap = useCallback(async () => {
    const ProvinceData = [
      {
        name: '云南省',
        code: 530000,
        value: 0
      },
      {
        name: '黑龙江省',
        code: 230000,
        value: 0
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

    if (map) {
      map.removeAllLayer()
    }
    const mapBox = new Mapbox({
      center: [116.2825, 39.9],
      pitch: 0,
      style: 'blank',
      zoom: 5,
      minZoom: 0,
      maxZoom: 10
      // boxZoom: false,
      // scrollZoom: false,
      // pitchWithRotate: false,
      // dragPan: false,
      // dragRotate: false
    })

    console.log(mapBox, 'mapBox')

    const scene = new Scene({
      id: `homeMap`,
      logoVisible: false,
      map: mapBox
    })
    setMap(scene)

    mRef.current = scene

    const colors = [
      '#00000000',
      '#5b6de6',
      '#445efe',
      '#434eeb',
      '#4631dc',
      '#4706bf'
    ]

    new DrillDownLayer(scene, {
      data: ProvinceData,
      joinBy: ['NAME_CHN', 'name'],
      depth: 1,
      provinceStroke: '#fff',
      cityStroke: '#EBCCB4',
      cityStrokeWidth: 1,
      viewStart: 'Country',
      viewEnd: 'Province',
      label: {
        enable: true,
        size: 12,
        color: '#fff',
        strokeWidth: 0
      },
      fill: {
        color: {
          field: 'value',
          values: colors
        }
      },
      popup: {
        enable: false,
        option: {},
        Html: props => {
          return `<span>${props.NAME_CHN}</span>`
        }
      }
    })
    scene.on('loaded', async () => {})
    scene.on('click', ev => {
      const cW = customRef.current.clientWidth
      const cH = customRef.current.clientHeight
      customRef.current.style.left = ev.point.x - cW + 'px'
      customRef.current.style.top = ev.point.y - cH + 'px'
      setLineShow(n => n + 1)
      ctxRef.current && ctxRef.current.clearRect(0, 0, 40, 30)

      console.log(ev, 'ev')
    })
  }, [])

  useEffect(() => {
    initMap() // 初始化地图
  }, [])

  useEffect(() => {
    const context = canvasRef.current.getContext('2d')
    ctxRef.current = context

    context.lineWidth = 1
    context.strokeStyle = '#ef7100'
    const quadraticBezier = (p0, p1, p2, t) => {
      var k = 1 - t
      return k * k * p0 + 2 * k * t * p1 + t * t * p2
    }

    const data = {
      start: [canvasXY.x, canvasXY.y],
      point: [canvasXY.x, 0],
      end: [0, 0]
    }

    const drawLine = (startX, startY, percent) => {
      const x = quadraticBezier(
        data.start[0],
        data.point[0],
        data.end[0],
        percent
      )
      const y = quadraticBezier(
        data.start[1],
        data.point[1],
        data.end[1],
        percent
      )
      context.moveTo(startX, startY)
      context.lineTo(x, y)
      percent += 0.02
      context.stroke() // Draw it
      if (percent <= 1) {
        setPopUpShow(false)
        setTimeout(() => drawLine(x, y, percent))
      } else {
        setPopUpShow(true)
      }
    }

    drawLine(data.start[0], data.start[1], 0.02)
  }, [lineShow])

  return (
    <div id={`homeMap`} className={styles.mapTemp}>
      <div ref={customRef} className={styles.customBox}>
        {popUpShow && <div className={styles.custom}>阿斯蒂芬下水电费</div>}
        <canvas
          key={lineShow}
          className={styles.canvas}
          ref={canvasRef}
          width={`${canvasXY.x}px`}
          height={`${canvasXY.y}px`}
        />
      </div>
    </div>
  )
}

export default HomePage
