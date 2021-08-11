import { useDebounceValue } from '@/utils/tool'
import React, { useEffect, useState } from 'react'
import SearchBar from './components/searchBar'
import styles from './index.module.less'

const district = {
  北京: {
    adcode: '110000',
    center: '116.405285,39.904989'
    // "center" : "117.939152,40.976204",
  },
  亦庄开发区: {
    center: '116.506647,39.795337'
  },
  密云区: {
    adcode: '110118',
    center: '116.843352,40.377362'
  },
  怀柔区: {
    adcode: '110116',
    center: '116.637122,40.324272'
  },
  门头沟区: {
    adcode: '110109',
    center: '116.105381,39.937183'
  },
  顺义区: {
    adcode: '110113',
    center: '116.653525,40.128936'
  },
  朝阳区: {
    adcode: '110105',
    center: '116.486409,39.921489'
  },
  通州区: {
    adcode: '110112',
    center: '116.658603,39.902486'
  },
  大兴区: {
    adcode: '110115',
    center: '116.338033,39.728908'
  },
  昌平区: {
    adcode: '110114',
    center: '116.235906,40.218085'
  },
  西城区: {
    adcode: '110102',
    center: '116.366794,39.915309'
  },
  东城区: {
    adcode: '110101',
    center: '116.418757,39.917544'
  },
  房山区: {
    adcode: '110111',
    center: '116.139157,39.735535'
  },
  石景山区: {
    adcode: '110107',
    center: '116.195445,39.914601'
  },
  海淀区: {
    adcode: '110108',
    center: '116.310316,39.956074'
  },
  丰台区: {
    adcode: '110106',
    center: '116.286968,39.863642'
  }
}

const initPoints = [
  {
    lnglat: ['116.502159141883', '39.857389101662'],
    district: '朝阳区',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.238613', '40.21989'],
    district: '昌平区',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.330629956358', '39.973479606791'],
    district: '海淀区',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.444000625742', '39.920786491387'],
    district: '朝阳区',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.57852365004', '39.86439249713'],
    district: '朝阳区',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.426215810388', '40.071496041132'],
    district: '昌平区',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.399857958328', '40.048084284384'],
    district: '昌平区',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.374435008456', '40.001457278255'],
    district: '朝阳区',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.693105656835', '39.897603701752'],
    district: '通州区',
    city: '北京',
    factoryId: 256
  },
  {
    lnglat: ['116.432656458547', '40.076828492168'],
    district: '昌平区',
    city: '北京',
    factoryId: 256
  },
  {
    lnglat: ['116.330629956358', '39.973479606791'],
    district: '海淀区',
    city: '北京',
    factoryLnglat: [116.330629956358, 39.973479606791],
    factoryId: 256,
    factoryName: '家里蹲工厂5'
  },
  {
    lnglat: ['116.353204539559', '39.931912353603'],
    district: '西城区',
    city: '北京',
    factoryLnglat: [116.353204539559, 39.931912353603],
    factoryId: 84,
    factoryName: '家里蹲工厂1'
  },
  {
    lnglat: ['116.353204539559', '39.931912353603'],
    district: '西城区',
    city: '北京',
    factoryLnglat: [116.3534, 39.9379],
    factoryId: 84,
    factoryName: '家里蹲工厂2'
  },
  {
    lnglat: ['116.353204539559', '39.931912353603'],
    district: '西城区',
    city: '北京',
    factoryLnglat: [116.3536, 39.9339],
    factoryId: 84,
    factoryName: '家里蹲工厂3'
  },
  {
    lnglat: ['116.353204539559', '39.931912353603'],
    district: '西城区',
    city: '北京',
    factoryLnglat: [116.3538, 39.9359],
    factoryId: 84,
    factoryName: '家里蹲工厂4'
  }
]
// 关联的聚合层级
const clusterIndexSet = {
  city: {
    minZoom: 2,
    maxZoom: 10
  },
  district: {
    minZoom: 10,
    maxZoom: 12
  }
}

const MapSearch = () => {
  const _AMap = window.AMap as any

  const [mapTemp, setMapTemp] = useState(null)
  const [overlayGroups, setOverlayGroups] = useState(null)
  const [lnglats, _setLnglats] = useState(initPoints)
  const [points, _setPonits] = useState(initPoints)
  const [showMarkers, setShowMarkers] = useState(false)

  const debounceFlag = useDebounceValue(showMarkers, 200)

  // 初始化地图
  useEffect(() => {
    const map = new _AMap.Map('mapSearch', {
      zoom: 9,
      // center: [116.105381, 39.937183],
      animateEnable: true,
      mapStyle: 'amap://styles/dcf78c909fec3cc16509c3afe6513956'
    })

    map.on('zoomchange', () => {
      setShowMarkers(false)
    })

    map.on('zoomend', () => {
      setShowMarkers(true)
    })

    setMapTemp(map)
  }, [])

  useEffect(() => {
    const groups = new _AMap.OverlayGroup()
    setOverlayGroups(groups)
  }, [])

  useEffect(() => {
    // 更新marker 最下层的加工厂显示marker
    const markers = []
    overlayGroups && overlayGroups.clearOverlays(markers)
    const target = lnglats.filter(item => item.factoryLnglat)
    for (var i = 0; i < target.length; i++) {
      var { factoryLnglat, factoryName, factoryId } = target[i]
      // 创建点实例
      var labelOffset = new _AMap.Pixel(0, -5)

      // 处理工厂的marker样式
      var marker = new _AMap.Marker({
        position: new _AMap.LngLat(factoryLnglat[0], factoryLnglat[1]),
        icon:
          'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' +
          (i + 1) +
          '.png',
        extData: {
          id: i + 1
        },
        label: {
          direction: 'top',
          offset: labelOffset,
          content: `<div class='markerLabel'>${factoryName}</div>`
        }
      })

      marker.on('click', () => {
        window.open(`/factory-detail/${factoryId}`)
      })

      markers.push(marker)
    }

    overlayGroups && overlayGroups.addOverlays(markers)
  }, [lnglats, overlayGroups])
  // 获取样式
  const getStyle = context => {
    let clusterData = context.clusterData // 聚合中包含数据
    let index = context.index // 聚合的条件
    let count = context.count // 聚合中点的总数
    let color = ['8,60,156', '66,130,198', '107,174,214', '78,200,211']
    let indexs = ['city', 'district', 'area', 'community']
    let i = indexs.indexOf(index['mainKey'])
    let text = clusterData[0][index['mainKey']]
    let size = Math.round(20 + Math.pow(count / points.length, 1 / 5) * 50)
    // 当前层级的显示内容
    if (i <= 1) {
      // 范围内的加工厂数量
      let extra = '<span class="showCount">' + context.count + '家</span>'
      text = '<span class="showName">' + text + '</span>'
      text += extra
    } else {
      // size = 12 * text.length + 20
      size = 0
      text = ''
    }
    let style = {
      bgColor: 'rgba(' + color[i] + ',.8)',
      borderColor: 'rgba(' + color[i] + ',1)',
      padding: [0, 16],
      text: text,
      size: size,
      index: i,
      color: '#ffffff',
      textAlign: 'center',
      boxShadow: '0px 0px 5px rgba(0,0,0,0.8)'
    }
    return style
  }
  // 获取经纬度位置
  const getPosition = context => {
    let key = context.index.mainKey
    let dataItem = context.clusterData && context.clusterData[0]
    let districtName = dataItem[key]
    if (!district[districtName]) {
      return null
    }
    let center = district[districtName].center.split(',')
    let centerLnglat = new AMap.LngLat(center[0], center[1])
    return centerLnglat
  }
  // 自定义聚合点样式
  const _renderClusterMarker = (context, map) => {
    // 数组内控制显示marker的层级
    // const flag = ['area', 'community'].includes(context.index.mainKey)
    const flag = ['city', 'district'].includes(context.index.mainKey)
    flag && setShowMarkers(false)

    let styleObj = getStyle(context)
    // 自定义点标记样式
    let div = document.createElement('div')
    div.className = 'amap-cluster'
    div.style.backgroundColor = styleObj.bgColor
    div.style.width = styleObj.size + 'px'
    // 是否显示工厂
    if (styleObj.index <= 2) {
      div.style.height = styleObj.size + 'px'
      // 自定义点击事件 点击放大地图
      context.marker.on('click', function (e) {
        let curZoom = map.getZoom()
        if (curZoom < 20) {
          curZoom += 2
          map.setZoomAndCenter(curZoom, e.lnglat)
        }
      })
    }

    if (styleObj.index === 3) {
      div.style.border = 'none'
    }

    div.style.borderRadius = styleObj.size + 'px'
    div.innerHTML = styleObj.text
    div.style.color = styleObj.color
    div.style.textAlign = styleObj.textAlign
    div.style.boxShadow = styleObj.boxShadow
    context.marker.setContent(div)
    // 自定义聚合点标记显示位置
    let position = getPosition(context)
    if (position) {
      context.marker.setPosition(position)
    }
    context.marker.setAnchor('center')
  }
  // 监听地图变化 判断是否显示markers
  useEffect(() => {
    if (!mapTemp) return
    if (debounceFlag && overlayGroups) {
      mapTemp.add(overlayGroups)
    } else {
      mapTemp.remove(overlayGroups)
    }
  }, [mapTemp, overlayGroups, debounceFlag])
  // 处理聚合内容
  useEffect(() => {
    if (Array.isArray(points) && mapTemp) {
      new _AMap.IndexCluster(mapTemp, points, {
        renderClusterMarker: context => _renderClusterMarker(context, mapTemp),
        clusterIndexSet: clusterIndexSet
      })
    }
  }, [mapTemp, points])

  return (
    <div className={styles.searchContainer}>
      <SearchBar></SearchBar>
      <div id={`mapSearch`} className={styles.mapTemp}></div>
    </div>
  )
}

export default MapSearch
