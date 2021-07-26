import React, { useRef, useState, useEffect } from 'react'
import styles from './passPercent.module.less'
import { ChartTitle } from './pieChart'
import { Bar } from '@antv/g2plot'
import { LegendItem } from './moveChart'

const initData = [
  {
    year: '裤子',
    value: 60,
    type: 'Lon'
  },
  {
    year: '衬衫',
    value: 40,
    type: 'Lon'
  },
  {
    year: '毛衣',
    value: 35,
    type: 'Lon'
  },
  {
    year: '羽绒服',
    value: 5,
    type: 'Lon'
  },
  {
    year: '内衣',
    value: 25,
    type: 'Lon'
  },
  {
    year: '袜子',
    value: 46,
    type: 'Lon'
  },
  {
    year: '裤子',
    value: 20,
    type: 'Bor'
  },
  {
    year: '衬衫',
    value: 34,
    type: 'Bor'
  },
  {
    year: '毛衣',
    value: 33,
    type: 'Bor'
  },
  {
    year: '羽绒服',
    value: 35,
    type: 'Bor'
  },
  {
    year: '内衣',
    value: 38,
    type: 'Bor'
  },
  {
    year: '袜子',
    value: 36,
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
      minBarWidth: 16,
      maxBarWidth: 16,
      padding: [24, 16, 32, 52],
      xAxis: {
        line: null,
        grid: {
          line: null
        },
        label: null
      },
      yAxis: {
        tickLine: null,
        line: null,
        label: {
          style: {
            fontSize: 15
          }
        },
        grid: {
          line: null
        }
      },
      colorField: 'type', // 部分图表使用 seriesField
      seriesField: 'type', // 部分图表使用 seriesField
      color: ['#30C5C5', '#F3F4F8'],
      tooltip: {
        customContent: (title, data) => {
          if (Array.isArray(data) && data.length) {
            return `<div class='tooltipBox'>
            <div class='tooltipTitle'>${title}</div>
            <div class='tooltipText3'>总数: ${data[1].value} 件</div>
            <div class='tooltipText1'>合格数: ${data[0].value} 件</div>
            <div class='tooltipText2'>合格率: ${data[1].value} %</div>
          </div>`
          }
        }
      }
    })

    stackedBarPlot.render()
  }

  useEffect(() => {
    setChart()
  }, [])

  return (
    <div className={styles.passPercentBox}>
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
