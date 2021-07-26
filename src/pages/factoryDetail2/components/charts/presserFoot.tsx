import React, { useRef, useState, useEffect } from 'react'
import styles from './presserFoot.module.less'
import { Chart } from '@antv/g2'
import { ChartTitle } from './pieChart'

const PresserFoot = () => {
  const chartRef = useRef()

  const [data, _setData] = useState([
    { date: '8', num: 8 },
    { date: '10', num: 10 },
    { date: '12', num: 12 },
    { date: '14', num: 34 },
    { date: '16', num: 28 },
    { date: '18', num: 16 },
    { date: '20', num: 10 }
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
      grid: {
        line: {
          style: {
            lineDash: [5]
          }
        }
      },
      label: {
        style: {
          fontSize: 16
        }
      },
      title: {
        text: '次数',
        autoRotate: false,
        position: 'end',
        offset: 24,
        style: {
          textAlign: 'start', // 文本对齐方向，可取值为： start middle end
          fontSize: '14' // 文本大小
        }
      }
    })

    const itemTpl = `
      <div class='chart7Tpl'>
        <div class='tplTitle'>{date}时</div>
        <div class='tpl'>
          <span class="tpl4">·</span>
          剪线次数:&nbsp;&nbsp;&nbsp;{num} 次
        </div>
      </div>
    `

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
      itemTpl: itemTpl
    })

    chart.interaction('active-region')

    chart
      .area()
      .position('date*num')
      .color(
        'l(100) 0:#975FE4 0.7: rgba(151, 95, 228,0.5) 1:rgba(151, 95, 228,0.1)'
      )
    chart
      .line()
      .size(3)
      .position('date*num')
      .color('#975FE4')
      .tooltip('date*num', (date, num) => {
        return {
          date,
          num
        }
      })
    chart
      .point()
      .size(4)
      .position('date*num')
      .shape('circle')
      .color('#975FE4')
      .tooltip('date*num', (date, num) => {
        return {
          date,
          num
        }
      })

    const averageNum = 20
    const contentColor = '#6395F9'
    const content = `平均抬压脚数: ${averageNum}分`

    chart.annotation().line({
      top: true,
      start: [-0.5, averageNum],
      end: [data.length + 0.5, averageNum],
      animate: true,
      style: {
        stroke: contentColor,
        lineWidth: 1
        // lineDash: [3, 3]
      },
      text: {
        position: 'start',
        style: {
          fill: contentColor,
          fontSize: 14,
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
