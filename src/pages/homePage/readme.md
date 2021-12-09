#### 下钻地图 图层 DrillDownLayer

```typescript
// 下钻地图盒子
const mapBox: any = new GaodeMap({
  center: [116.2825, 39.9],
  pitch: 0,
  style: 'blank',
  zoom: 3,
  minZoom: 3,
  maxZoom: 20,
  zoomEnable: true,
  scrollZoom: false,
  pitchWithRotate: false,
  rotateEnable: false,
  dragEnable: true
})

// 下钻图层
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
```

```typescript
// 地图散点图层 闪烁
const pointLayer = new PointLayer({
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
```

```typescript
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
```

#### 初始化地图之后的操作

```typescript
// 地图初始化之后 设置地图中心和缩放等级
setTimeout(() => {
  scene.setZoomAndCenter(4, [104.307546, 37.766084], true)
}, 1000)
```

#### 下钻图层的鼠标事件

```typescript
// 鼠标移动之后设置信息框
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
```

```typescript
// 信息框位置处理
const setPopLocation = (scene: Scene, ev: any) => {
  const { feature } = ev
  const { properties } = feature
  if (adcodeRef.current === properties.adcode) return
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
```

```typescript
useEffect(() => {
  // 信息窗体线条处理 动画
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
```
