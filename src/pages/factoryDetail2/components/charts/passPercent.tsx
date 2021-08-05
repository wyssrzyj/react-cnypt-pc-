import React, { useRef, useState, useEffect } from 'react'
import styles from './passPercent.module.less'
import { ChartTitle, EmptyChunk } from './pieChart'
import { Bar } from '@antv/g2plot'
import { LegendItem } from './moveChart'
import { useStores, observer } from '@/utils/mobx'

const PassPercent = () => {
  const chartRef = useRef()

  const { factoryStore } = useStores()
  const { factoryData } = factoryStore

  const [data, setData] = useState([])
  const [chart, setChart] = useState(null)

  useEffect(() => {
    const arr = factoryData.order
    const target = []
    arr.forEach(item => {
      target.push({
        styleName: item.styleName,
        num: item.num - item.unqualifiedNum,
        type: 'qualifiedNum',
        qualificationRatio: item.qualificationRatio,
        total: item.num
      })
      target.push({
        styleName: item.styleName,
        num: item.unqualifiedNum,
        type: 'total',
        qualificationRatio: item.qualificationRatio,
        total: item.num
      })
    })
    setData(target)
  }, [factoryData])

  const chartInit = () => {
    const stackedBarPlot = new Bar('passPercent', {
      data: data,
      width: 326,
      height: 270,
      isStack: true,
      xField: 'num',
      yField: 'styleName',
      legend: false,
      minBarWidth: 16,
      maxBarWidth: 16,
      padding: [24, 16, 32, 38],
      label: {
        style: {
          // fill: 'white',
          offsetY: 2
        },
        // 可手动配置 label 数据标签位置
        position: 'right', // 'left', 'middle', 'right'
        // 可配置附加的布局方法
        layout: [
          // 柱形图数据标签位置自动调整
          { type: 'interval-adjust-position' },
          // 数据标签防遮挡
          { type: 'interval-hide-overlap' },
          // 数据标签文颜色自动调整
          { type: 'adjust-color' }
        ]
      },
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
        // label: null,
        label: {
          style: {
            fontSize: 15,
            animate: {
              textMove: {
                animation: 'move'
              }
            }
          },
          formatter: value => {
            return value.slice(0, 3)
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
            const target = data[1]['data']
            const total = target ? target['total'] : 0
            const qualificationRatio = target ? target['qualificationRatio'] : 0
            return `<div class='tooltipBox'>
            <div class='tooltipTitle'>${title}</div>
            <div class='tooltipText3'>总数: ${total} 件</div>
            <div class='tooltipText1'>合格数: ${data[0].value} 件</div>
            <div class='tooltipText2'>合格率: ${
              qualificationRatio * 100
            } %</div>
          </div>`
          }
        }
      }
    })
    stackedBarPlot.render()
    setChart(stackedBarPlot)
  }

  useEffect(() => {
    data.length && chartInit()
  }, [data])

  useEffect(() => {
    if (!chart) return
    if (Array.isArray(data) && data.length) {
      chart.update({
        data: data.reverse()
      })
    }
  }, [data, chart])

  return (
    <div className={styles.passPercentBox}>
      <ChartTitle title={'合格率'} desc={'最近五个生产单'}>
        <LegendItem
          name={'合格数'}
          type={'square'}
          color={'#30C5C5'}
        ></LegendItem>
      </ChartTitle>
      {data.length > 0 ? (
        <div ref={chartRef} id={'passPercent'}></div>
      ) : (
        <EmptyChunk></EmptyChunk>
      )}
    </div>
  )
}

export default observer(PassPercent)
