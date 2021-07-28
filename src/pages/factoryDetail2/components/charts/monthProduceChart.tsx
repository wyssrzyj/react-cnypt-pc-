import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './monthProduceChart.module.less'
import { ChartTitle, CountInfo } from './pieChart'
import { Liquid } from '@antv/g2plot'
import { useStores, observer } from '@/utils/mobx'

const MonthProduceChart = () => {
  const chartRef: RefObject<HTMLDivElement> = useRef()

  const { factoryStore } = useStores()
  const { factoryData } = factoryStore

  const [chart, setChart] = useState(null)

  const chartInit = () => {
    const liquidPlot = new Liquid('monthProduce', {
      percent: 0,
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
      },
      statistic: {
        offsetX: 25,
        style: {
          fill: 'red',
          color: 'blue',
          stroke: 'yellow'
        }
      }
    })
    liquidPlot.render()
    setChart(liquidPlot)
  }

  useEffect(() => {
    chartInit()
  }, [])

  useEffect(() => {
    if (chart) {
      const percent = factoryData.monthProductionNum
        ? factoryData.monthTicketNum / factoryData.monthProductionNum
        : 0
      chart.update({
        percent: +percent.toFixed(2)
      })
    }
  }, [factoryData, chart])

  return (
    <div className={styles.monthProduceChartBox}>
      <ChartTitle title={'本月生产情况'}></ChartTitle>
      <div className={styles.monthProduceChartContainer}>
        <div className={styles.monthProduceChartInfo}>
          <CountInfo
            count={factoryData.monthProductionNum}
            label={'本月计划生产'}
            unit={'件'}
          ></CountInfo>
          <CountInfo
            count={factoryData.monthTicketNum}
            label={'本月生产件数'}
            unit={'件'}
          ></CountInfo>
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

export default observer(MonthProduceChart)
