import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './pieChart.module.less'
import { Chart } from '@antv/g2'

const CountInfo = () => {
  return (
    <div className={styles.countInfo}>
      <div>
        <span className={styles.count}>100</span>
        <span>台</span>
      </div>
      <div>物联机器数</div>
    </div>
  )
}

const PieChart = () => {
  const chartRef: RefObject<HTMLDivElement> = useRef()

  const [data, setData] = useState([
    { item: '事例一', percent: 0.7, color: '#6395F9' },
    { item: '事例二', percent: 0.3, color: '#F3F4F8' }
  ])
  console.log(setData)

  const setChart = () => {
    const chart = new Chart({
      container: 'pieChart',
      autoFit: true,
      width: 230,
      height: 220,
      padding: [0, 0, 0, 0]
    })

    console.log(chart)

    chart.data(data)
    chart.scale('percent', {
      formatter: val => {
        val = val * 100 + '%'
        return val
      }
    })
    chart.coordinate('theta', {
      radius: 1,
      innerRadius: 0.6
    })
    chart.tooltip(false)
    // 辅助文本
    chart
      .interval()
      .adjust('stack')
      .size(36)
      .position('percent')
      .color('color', color => color)

    chart.annotation().text({
      position: ['50%', '50%'],
      content: '100%',
      style: {
        fontSize: 28,
        fill: '#333333',
        // fontFamily: 'monospace',
        fontWeight: 500,
        textBaseline: 'bottom',
        textAlign: 'center'
      },
      offsetY: 4
    })

    chart.annotation().text({
      position: ['50%', '50%'],
      content: '开机率',
      style: {
        fontSize: 14,
        fill: '#333333',
        fontWeight: 500,
        textBaseline: 'bottom',
        textAlign: 'center'
      },
      offsetY: 24
    })

    chart.on('interval:click', ev => {
      // 获取当前点击的对象
      const res = ev.data
      if (res) {
        console.log(res.data)
      }
    })

    chart.legend(false)
    chart.interaction('element-active')
    chart.render()
  }

  useEffect(() => {
    setChart()
  }, [])

  return (
    <div className={styles.pieChartBox}>
      <div className={styles.pieChartContainer}>
        <div className={styles.pieChartInfo}>
          <CountInfo></CountInfo>
          <CountInfo></CountInfo>
        </div>
        <div id={'pieChart'} className={styles.pieChart} ref={chartRef}></div>
      </div>
    </div>
  )
}

export default PieChart
