import React, { useRef, useState, useEffect } from 'react'
import styles from './productEffect.module.less'
import { Chart } from '@antv/g2'
import { ChartTitle } from './pieChart'

const ProductEffect = () => {
  const chartRef = useRef()

  const [data, _setData] = useState([
    { date: '周一', num: 8 },
    { date: '周二', num: 10 },
    { date: '周三', num: 12 },
    { date: '周四', num: 34 },
    { date: '周五', num: 28 },
    { date: '周六', num: 16 },
    { date: '周日', num: 42 }
  ])

  const setChart = () => {
    const chart = new Chart({
      container: 'productEffect',
      autoFit: true,
      width: 300,
      height: 270,
      nice: true,
      padding: [24, 24, 32, 24]
    })

    const margin = 1 / 5

    chart.data(data)
    chart.scale('num', {
      min: 0,
      nice: true,
      tickCount: 6,
      range: [0, 1 - margin / 2]
    })

    chart.axis('num', {
      title: {
        text: '件数',
        autoRotate: false,
        position: 'end',
        offset: 10,
        textStyle: {
          textAlign: 'start', // 文本对齐方向，可取值为： start middle end
          fontSize: '12', // 文本大小
          fontWeight: 'bold', // 文本粗细
          textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
        }
      }
    })

    chart.tooltip({
      showMarkers: false
    })
    chart.interaction('active-region')

    chart.interval().size(16).position('date*num')

    chart.render()
  }

  useEffect(() => {
    setChart()
  }, [])

  return (
    <div className={styles.productEffectBox}>
      <ChartTitle title={'生产效率'}></ChartTitle>
      <div ref={chartRef} id={'productEffect'}></div>
    </div>
  )
}

export default ProductEffect
