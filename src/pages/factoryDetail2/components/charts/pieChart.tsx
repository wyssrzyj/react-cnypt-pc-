import React, { RefObject, useEffect, useRef, useState, ReactNode } from 'react'
import styles from './pieChart.module.less'
import { Chart } from '@antv/g2'

interface ChartTitleProps {
  title: string
  children?: ReactNode
}

export const ChartTitle = ({ title, children }: ChartTitleProps) => {
  return (
    <div className={styles.chartHeader}>
      <span className={styles.chartTitle}>{title}</span>
      {children && children}
    </div>
  )
}

export const CountInfo = ({ label, unit, count }) => {
  return (
    <div className={styles.countInfo}>
      <div>
        <span className={styles.count}>{count}</span>
        <span>{unit}</span>
      </div>
      <div>{label}</div>
    </div>
  )
}

const PieChart = () => {
  const chartRef: RefObject<HTMLDivElement> = useRef()

  const [data, _setData] = useState([
    { item: '事例一', percent: 0.7, color: '#6395F9' },
    { item: '事例二', percent: 0.3, color: '#F3F4F8' }
  ])

  const setChart = () => {
    const chart = new Chart({
      container: 'pieChart',
      autoFit: true,
      width: 230,
      height: 220,
      padding: [0, 0, 0, 0]
    })

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
      content: '63%',
      style: {
        fontSize: 32,
        fill: '#333333',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        textBaseline: 'bottom',
        textAlign: 'center'
      },
      offsetY: 4
    })

    chart.annotation().text({
      position: ['50%', '50%'],
      content: '开机率',
      style: {
        fontSize: 16,
        fill: '#333333',
        fontWeight: 500,
        textBaseline: 'bottom',
        textAlign: 'center'
      },
      offsetY: 28
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
      <ChartTitle title={'今日设备开机情况'}></ChartTitle>
      <div className={styles.pieChartContainer}>
        <div className={styles.pieChartInfo}>
          <CountInfo count={100} label={'物联机器数'} unit={'台'}></CountInfo>
          <CountInfo count={63} label={'今日开机'} unit={'台'}></CountInfo>
        </div>
        <div id={'pieChart'} className={styles.pieChart} ref={chartRef}></div>
      </div>
    </div>
  )
}

export default PieChart
