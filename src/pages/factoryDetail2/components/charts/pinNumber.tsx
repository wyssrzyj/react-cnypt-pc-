import React, { useRef, useState, useEffect } from 'react'
import styles from './pinNumber.module.less'
import { Chart } from '@antv/g2'
import { ChartTitle } from './pieChart'

const PinNumber = () => {
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
      container: 'pinNumber',
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
        text: '针数',
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
        <div class='tplTitle'>{date}</div>
        <div class='tpl'>
          <span class="tpl2">·</span>
          平均针数:&nbsp;&nbsp;&nbsp;{num} 针
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
      .interval()
      .size(16)
      .position('date*num')
      .tooltip('date*num', (date, num) => {
        return {
          date,
          num
        }
      })

    chart.render()
  }

  useEffect(() => {
    setChart()
  }, [])

  return (
    <div className={styles.pinNumberBox}>
      <ChartTitle title={'平均针数'}></ChartTitle>
      <div ref={chartRef} id={'pinNumber'}></div>
    </div>
  )
}

export default PinNumber
