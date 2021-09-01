import React, { useEffect, useState } from 'react'
import { useStores, observer, toJS } from '@/utils/mobx'
import SearchBar from './components/searchBar'
import styles from './index.module.less'

const MapSearch = () => {
  const _AMap = window.AMap as any

  const { factoryStore, commonStore } = useStores()
  const {
    mapSearchCityLntlats,
    setMoveCityValue,
    setMapMove,
    mapMove,
    mapSearchFactorys,
    setMapSearchCityLntlats
  } = factoryStore
  const { allArea } = commonStore

  const [mapTemp, setMapTemp] = useState(null)
  const [overlayGroups, setOverlayGroups] = useState(null)
  const [lnglats, setLnglats] = useState(mapSearchFactorys)
  const [moveCity, setMoveCity] = useState('')

  useEffect(() => {
    setLnglats(mapSearchFactorys)
  }, [mapSearchFactorys])

  // 初始化地图
  useEffect(() => {
    // 地图默认杭州
    const map = new _AMap.Map('mapSearch', {
      zoom: 11,
      center: [120.153576, 30.287459],
      animateEnable: true,
      mapStyle: 'amap://styles/dcf78c909fec3cc16509c3afe6513956'
    })

    var geocoder = new _AMap.Geocoder()

    map.on('zoomchange', () => {
      const zoom = map.getZoom()
      if (zoom < 11) {
        map.setZoom(11.2)
      }
    })

    map.on('complete', () => {
      // console.log('complete')
    })

    map.on('moveend', () => {
      const center = map.getCenter()
      const lnglat = [center.lng, center.lat]
      setMapSearchCityLntlats(lnglat)

      geocoder.getAddress(lnglat, function (status, result) {
        if (status === 'complete' && result.regeocode) {
          const { addressComponent } = result.regeocode
          const { province, city } = addressComponent

          if (['重庆市', '上海市', '北京市', '天津市'].includes(province)) {
            setMoveCity(province)
          } else {
            setMoveCity(city)
          }
        } else {
          console.error('根据经纬度查询地址失败')
        }
      })
    })

    setMapTemp(map)
  }, [])

  useEffect(() => {
    const groups = new _AMap.OverlayGroup()
    setOverlayGroups(groups)
  }, [])

  useEffect(() => {
    if (!moveCity) return
    const areas = toJS(allArea)
    const res = findCityValue(areas, moveCity)
    res && setMoveCityValue(res.value)
    res && setMapMove(false)
  }, [moveCity, allArea])

  const findCityValue = (data, targetCity) => {
    let target
    if (Array.isArray(data) && data.length) {
      data.find(item => {
        if (Array.isArray(item.children) && item.children.length) {
          const res = item.children.find(i => i.label === targetCity)
          if (res) {
            target = res
          }
        }
      })
    }
    return target
  }

  useEffect(() => {
    // 更新marker 最下层的加工厂显示marker
    const markers = []
    overlayGroups && overlayGroups.clearOverlays(markers)
    const target = lnglats.filter(item => item.factoryLnglat)
    for (var i = 0; i < target.length; i++) {
      var { factoryLnglat, factoryName, factoryId, idx } = target[i]
      // 创建点实例
      var labelOffset = new _AMap.Pixel(0, -5)

      if (factoryLnglat.includes('null')) {
        // 返回的工厂经纬度包含null字符串时
        continue
      }
      // 处理工厂的marker样式
      var marker = new _AMap.Marker({
        position: new _AMap.LngLat(factoryLnglat[0], factoryLnglat[1]),
        extData: {
          id: i + 1
        },
        icon: null,
        label: {
          direction: 'top',
          offset: labelOffset,
          content: `<div class='markerLabel'>
          <span>${idx}</span>
          <span class='markerLabelFactory'>${factoryName}</span>
        </div>`
        }
      })

      marker.on('click', () => {
        window.open(`/factory-detail/${factoryId}`)
      })

      markers.push(marker)
    }

    overlayGroups && overlayGroups.addOverlays(markers)
  }, [lnglats, overlayGroups])

  // 监听地图变化 判断是否显示markers
  useEffect(() => {
    if (!mapTemp) return
    if (overlayGroups) {
      mapTemp.add(overlayGroups)
    } else {
      mapTemp.remove(overlayGroups)
    }
  }, [mapTemp, overlayGroups])

  useEffect(() => {
    mapMove && mapTemp && mapTemp.panTo(mapSearchCityLntlats, false)
  }, [mapTemp, mapSearchCityLntlats, mapMove])

  return (
    <div className={styles.searchContainer}>
      <SearchBar map={mapTemp}></SearchBar>
      <div id={`mapSearch`} className={styles.mapTemp}></div>
    </div>
  )
}

export default observer(MapSearch)
