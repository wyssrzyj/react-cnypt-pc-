import React, { useEffect, useState } from 'react'
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

const points = [
  {
    lnglat: ['116.502159141883', '39.857389101662'],
    district: '朝阳区',
    community: '翠成馨园',
    building: '垡头翠成馨园',
    area: '垡头',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.238613', '40.21989'],
    district: '昌平区',
    community: '新新公寓',
    building: '新新公寓',
    area: '鼓楼',
    factoryId: 64
  },
  {
    lnglat: ['116.330629956358', '39.973479606791'],
    district: '海淀区',
    community: '榆苑公寓',
    building: '双榆树榆苑公寓',
    area: '双榆树',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.444000625742', '39.920786491387'],
    district: '朝阳区',
    community: '日坛晶华',
    building: '天福园8号',
    area: '垡头',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.57852365004', '39.86439249713'],
    district: '朝阳区',
    community: '万科青青家园',
    building: '豆各庄5号院',
    area: '豆各庄',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.426215810388', '40.071496041132'],
    district: '昌平区',
    community: '天通苑中苑',
    building: '东小口镇天通中苑',
    area: '天通苑',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.399857958328', '40.048084284384'],
    district: '昌平区',
    community: '清水园二期',
    building: '清水园小区',
    area: '立水桥',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.374435008456', '40.001457278255'],
    district: '朝阳区',
    community: '华源冠军城',
    building: '南沙滩66号院',
    area: '立水桥',
    city: '北京',
    factoryId: 64
  },
  {
    lnglat: ['116.693105656835', '39.897603701752'],
    district: '通州区',
    community: '荞馨园',
    building: '乔庄91号',
    area: '立水桥',
    city: '北京',
    factoryId: 256
  },
  {
    lnglat: ['116.432656458547', '40.076828492168'],
    district: '昌平区',
    community: '天通苑北三区',
    building: '北七家镇天通北苑三区',
    area: '天通苑',
    city: '北京',
    factoryId: 256
  },
  {
    lnglat: ['116.353204539559', '39.931912353603'],
    district: '西城区',
    community: '文华园',
    building: '车公庄大街2号院',
    area: '车公庄',
    city: '北京',
    factoryId: 84
  },
  {
    lnglat: ['116.330629956358', '39.973479606791'],
    district: '海淀区',
    community: '榆苑公寓',
    building: '双榆树榆苑公寓',
    area: '天通苑',
    city: '北京',
    factoryId: 256
  },
  {
    lnglat: ['116.34707022289', '39.904929050852'],
    district: '西城区',
    community: '金融世家',
    building: '西城真武庙6号',
    area: '天通苑',
    city: '北京',
    factoryId: 84
  }
]

const MapSearch = () => {
  const _AMap = window.AMap as any

  const [mapTemp, setMapTemp] = useState(null)
  const [overlayGroups, setOverlayGroups] = useState(null)

  useEffect(() => {
    // 标记点
    const lnglats = [
      {
        lnglat: [116.353204539559, 39.931912353603],
        factoryId: 84,
        factoryName: '家里蹲工厂1'
      },
      {
        lnglat: [116.3534, 39.9379],
        factoryId: 84,
        factoryName: '家里蹲工厂2'
      },
      {
        lnglat: [116.3536, 39.9339],
        factoryId: 84,
        factoryName: '家里蹲工厂3'
      },
      { lnglat: [116.3538, 39.9359], factoryId: 84, factoryName: '家里蹲工厂4' }
    ]
    const markers = []
    for (var i = 0; i < lnglats.length; i++) {
      var { lnglat, factoryName, factoryId } = lnglats[i]
      // 创建点实例
      var labelOffset = new AMap.Pixel(0, -5)

      var marker = new AMap.Marker({
        position: new AMap.LngLat(lnglat[0], lnglat[1]),
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
          content: `<div>${factoryName}</div>`
        }
      })

      marker.on('click', () => {
        window.open(`/factory-detail/${factoryId}`)
      })

      markers.push(marker)
    }
    const groups = new _AMap.OverlayGroup(markers)
    setOverlayGroups(groups)
  }, [])

  const clusterIndexSet = {
    city: {
      minZoom: 2,
      maxZoom: 10
    },
    district: {
      minZoom: 10,
      maxZoom: 12
    },
    area: {
      minZoom: 12,
      maxZoom: 15
    },
    community: {
      minZoom: 15,
      maxZoom: 22
    }
  }

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
    if (i <= 2) {
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
    let styleObj = getStyle(context)

    // 自定义点标记样式
    let div = document.createElement('div')
    div.className = 'amap-cluster'
    div.style.backgroundColor = styleObj.bgColor
    div.style.width = styleObj.size + 'px'
    // 是否显示工厂
    if (context.index.mainKey === 'community') {
      map.add(overlayGroups)
    } else {
      map.remove(overlayGroups)
    }

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

      // 点击跳转到对应详情页面
      context.marker.on('click', function (_event) {
        // const dataItem = context.clusterData && context.clusterData[0]
        // window.open(`/factory-detail/${dataItem.factoryId}`)
      })
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

  useEffect(() => {
    const map = new _AMap.Map('mapSearch', {
      zoom: 9,
      center: [116.105381, 39.937183],
      animateEnable: true,
      mapStyle: 'amap://styles/dcf78c909fec3cc16509c3afe6513956'
    })
    setMapTemp(map)
  }, [])

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
      <div id={`mapSearch`} className={styles.mapTemp}></div>
    </div>
  )
}

export default MapSearch
