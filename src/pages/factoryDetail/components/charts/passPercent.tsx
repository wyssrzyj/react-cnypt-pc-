import React, { useRef, useState, useEffect } from 'react'
import styles from './productEffect.module.less'
import { ChartTitle } from './pieChart'
import { Bar } from '@antv/g2plot'
import { LegendItem } from './moveChart'

const initData = [
  {
    year: '1991',
    value: 3,
    type: 'Lon'
  },
  {
    year: '1992',
    value: 4,
    type: 'Lon'
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Lon'
  },
  {
    year: '1994',
    value: 5,
    type: 'Lon'
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Lon'
  },
  {
    year: '1996',
    value: 6,
    type: 'Lon'
  },
  {
    year: '1991',
    value: 3,
    type: 'Bor'
  },
  {
    year: '1992',
    value: 4,
    type: 'Bor'
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Bor'
  },
  {
    year: '1994',
    value: 5,
    type: 'Bor'
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Bor'
  },
  {
    year: '1996',
    value: 6,
    type: 'Bor'
  }
]

const PassPercent = () => {
  const chartRef = useRef()

  const [data, _setData] = useState(initData)

  const setChart = () => {
    const stackedBarPlot = new Bar('passPercent', {
      data: data.reverse(),
      width: 326,
      height: 270,
      isStack: true,
      xField: 'value',
      yField: 'year',
      legend: false,
      seriesField: 'type',
      minBarWidth: 16,
      maxBarWidth: 16,
      padding: [24, 16, 32, 32],
      colorField: 'type', // 部分图表使用 seriesField
      color: ['#30C5C5', '#F3F4F8']
    })

    stackedBarPlot.render()
  }

  useEffect(() => {
    setChart()
  }, [])

  return (
    <div className={styles.productEffectBox}>
      <ChartTitle title={'合格率'}>
        <LegendItem
          name={'合格数'}
          type={'square'}
          color={'#30C5C5'}
        ></LegendItem>
      </ChartTitle>
      <div ref={chartRef} id={'passPercent'}></div>
    </div>
  )
}

export default PassPercent
