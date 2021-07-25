import React, { RefObject, useEffect, useRef } from 'react'
import styles from './monthProduceChart.module.less'
import { ChartTitle, CountInfo } from './pieChart'
import { Liquid } from '@antv/g2plot'

const MonthProduceChart = () => {
  const chartRef: RefObject<HTMLDivElement> = useRef()

  const setChart = () => {
    const liquidPlot = new Liquid('monthProduce', {
      percent: 0.25,
      outline: {
        border: 4,
        distance: 8
      },
      liquidStyle: {
        fill: '#30C5C5',
        stroke: '#30C5C5'
      },
      wave: {
        length: 128
      }
    })
    liquidPlot.render()
  }

  useEffect(() => {
    setChart()
  }, [])

  return (
    <div className={styles.monthProduceChartBox}>
      <ChartTitle title={'本月生产情况'}></ChartTitle>
      <div className={styles.monthProduceChartContainer}>
        <div className={styles.monthProduceChartInfo}>
          <CountInfo label={'本月计划生产'} unit={'件'}></CountInfo>
          <CountInfo label={'本月成衣入库'} unit={'件'}></CountInfo>
        </div>
        <div
          id={'monthProduce'}
          className={styles.monthProduceChart}
          ref={chartRef}
        ></div>
      </div>
    </div>
  )
}

export default MonthProduceChart
