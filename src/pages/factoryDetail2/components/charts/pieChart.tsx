import React, { RefObject, useEffect, useRef, useState, ReactNode } from 'react'
import styles from './pieChart.module.less'
import { Chart } from '@antv/g2'
import { useStores, observer } from '@/utils/mobx'

interface ChartTitleProps {
  title: string
  desc?: string
  children?: ReactNode
}

export const ChartTitle = ({ title, desc, children }: ChartTitleProps) => {
  return (
    <div className={styles.chartHeader}>
      <div className={styles.chartTitle}>
        <span>{title}</span>
        {desc ? <span className={styles.chartDesc}>({desc})</span> : null}
      </div>
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
  const { factoryStore } = useStores()
  const { factoryData } = factoryStore

  const [data, setData] = useState([
    { item: '事例一', percent: 0.7, color: '#6395F9' },
    { item: '事例二', percent: 0.3, color: '#F3F4F8' }
  ])
  const [chart, setChart] = useState(null)

  useEffect(() => {
    setData([
      { item: '事例一', percent: factoryData.onlineNum, color: '#6395F9' },
      { item: '事例二', percent: factoryData.offlineNum, color: '#F3F4F8' }
    ])
  }, [factoryData])

  const chartInit = () => {
    const c = new Chart({
      container: 'pieChart',
      autoFit: true,
      width: 230,
      height: 220,
      padding: [0, 0, 0, 0]
    })
    setChart(c)
  }

  const chartRender = () => {
    chart.clear()
    chart.data(data)
    const total = factoryData.onlineNum + factoryData.offlineNum
    const percent = total
      ? ((+factoryData.onlineNum / total) * 100).toFixed(2)
      : 0

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
      content: `${isNaN(+percent) ? 0 : percent}%`,
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

    chart.legend(false)
    chart.animate(true)
    chart.interaction('element-active')
    chart.render()
  }

  useEffect(() => {
    !chart && chartInit()
  }, [chart])

  useEffect(() => {
    chart && chartRender()
  }, [data, factoryData, chart])

  return (
    <div className={styles.pieChartBox}>
      <ChartTitle title={'今日设备开机情况'}></ChartTitle>
      <div className={styles.pieChartContainer}>
        <div className={styles.pieChartInfo}>
          <CountInfo
            count={factoryData.onlineNum + factoryData.offlineNum}
            label={'物联机器数'}
            unit={'台'}
          ></CountInfo>
          <CountInfo
            count={factoryData.onlineNum}
            label={'今日开机'}
            unit={'台'}
          ></CountInfo>
        </div>
        <div id={'pieChart'} className={styles.pieChart} ref={chartRef}></div>
      </div>
    </div>
  )
}

export default observer(PieChart)
