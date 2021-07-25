import React, { useRef, useState, useEffect } from 'react'
import styles from './presserFoot.module.less'
import { Chart } from '@antv/g2'
import { ChartTitle } from './pieChart'

const PresserFoot = () => {
  const chartRef = useRef()

  const [data, _setData] = useState([
    { date: '周一', num: 8 },
    { date: '周二', num: 10 },
    { date: '周三', num: 12 },
    { date: '周四', num: 34 },
    { date: '周五', num: 28 },
    { date: '周六', num: 16 },
    { date: '周日', num: 10 }
  ])

  const setChart = () => {
    const chart = new Chart({
      container: 'presserFoot',
      autoFit: true,
      width: 300,
      height: 270,
      nice: true,
      padding: [24, 0, 32, 24]
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
        text: '次数',
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

    chart
      .area()
      .position('date*num')
      .color(
        'l(100) 0:#975FE4 0.7: rgba(151, 95, 228,0.5) 1:rgba(151, 95, 228,0.1)'
      )
    chart.line().size(3).position('date*num').color('#975FE4')
    chart.point().size(4).position('date*num').shape('circle').color('#975FE4')

    const averageNum = 20
    const contentColor = '#6395F9'
    const content = `周平均针数: ${averageNum}分`

    chart.annotation().line({
      top: true,
      start: [-0.5, averageNum],
      end: [data.length + 0.5, averageNum],
      style: {
        stroke: contentColor,
        lineWidth: 1
        // lineDash: [3, 3]
      },
      text: {
        position: 'start',
        style: {
          fill: contentColor,
          fontSize: 12,
          fontWeight: 500
        },
        content: content,
        offsetY: -5
      }
    })

    chart.render()
  }

  useEffect(() => {
    setChart()
  }, [])

  return (
    <div className={styles.presserFootBox}>
      <ChartTitle title={'抬压脚次数'}></ChartTitle>
      <div ref={chartRef} id={'presserFoot'}></div>
    </div>
  )
}

export default PresserFoot
