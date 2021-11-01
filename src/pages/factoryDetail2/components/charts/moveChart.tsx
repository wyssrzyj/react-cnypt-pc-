import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './moveChart.module.less'
import { Chart } from '@antv/g2'
import { ChartTitle, EmptyChunk } from './pieChart'
import { useStores, observer } from '@/utils/mobx'

interface LegendItem {
  name: string
  type: string
  color?: string
}

const legendMap = new Map()
legendMap.set('square', styles.squareLegend)
legendMap.set('line', styles.lineLegend)

export const LegendItem = ({ name, type, color }: LegendItem) => {
  const legendRef: RefObject<HTMLDivElement> = useRef()

  return (
    <div ref={legendRef} className={styles[`${type}LegendBox`]}>
      <div className={legendMap.get(type)} style={{ background: color }}></div>
      {name}
    </div>
  )
}
const MoveChart = () => {
  const chartRef: RefObject<HTMLDivElement> = useRef()

  const { factoryStore } = useStores()
  const { factoryMachineData } = factoryStore

  const initData = []

  const [data, setData] = useState(initData)

  useEffect(() => {
    const arr = factoryMachineData.statisticWeek || []
    const target = arr.map(item => {
      const runtime = item.devEletime
        ? ((item.devRunningtime / item.devEletime) * 100).toFixed(2)
        : 0
      return {
        statisticDate: item.statisticDate,
        devRunningtime: +runtime,
        devEletime: +(item.devRunningtime / 60 / 60).toFixed(2)
      }
    })
    setData(target)
  }, [factoryMachineData])

  const [chart, setChart] = useState(null)

  useEffect(() => {
    if (data && data.length > 0 && !chart) {
      const c = new Chart({
        container: 'moveChart',
        autoFit: true,
        width: 700,
        height: 300,
        nice: true,
        padding: [24, 36, 32, 24]
      })
      setChart(c)
    }
  }, [data, chart])

  useEffect(() => {
    chart && renderChart()
  }, [chart, data])

  const renderChart = () => {
    const devEletimes = data.map(i => i.devEletime)
    const maxValue = Math.max(...devEletimes)
    const max = Math.ceil(maxValue / 10) * 10
    const margin = 1 / 5

    chart.legend(false)
    chart.removeInteraction('legend-item:click:')

    chart.clear()
    chart.data(data)

    chart.scale('devRunningtime', {
      min: 0,
      max: 100,
      tickCount: 6,
      range: [0, 1 - margin / 2]
    })

    const tick = max / 5
    let ticks = new Array(6).fill(null)
    ticks = ticks.map((_i, t) => t * tick)
    chart.scale('devEletime', {
      min: 0,
      max: max,
      ticks: ticks,
      tickCount: 6,
      range: [0, 1 - margin / 2]
    })

    chart.scale('statisticDate', {
      nice: true
    })

    chart.axis('devEletime', {
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
        },
        formatter: val => {
          return isNaN(val) ? '' : val
        }
      },
      title: {
        text: '小时',
        autoRotate: false,
        position: 'end',
        offset: 24,
        style: {
          textAlign: 'start', // 文本对齐方向，可取值为： start middle end
          fontSize: '14' // 文本大小
        }
      }
    })

    chart.axis('devRunningtime', {
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
        text: '百分比',
        autoRotate: false,
        position: 'end',
        offset: -16,
        style: {
          textAlign: 'start', // 文本对齐方向，可取值为： start middle end
          fontSize: '14' // 文本大小
        }
      }
    })

    chart.axis('statisticDate', {
      label: {
        autoRotate: true,
        autoHide: false
      }
    })

    chart.interaction('active-region')

    chart
      .interval()
      .size(16)
      .position('statisticDate*devEletime')
      .tooltip(
        'statisticDate*devEletime*devRunningtime',
        (name, devEletime, devRunningtime) => {
          return {
            name,
            devEletime,
            devRunningtime
          }
        }
      )
      .label('statisticDate*valdevEletimeue', () => {
        return {
          content: data => {
            return `${data.devEletime}`
          }
        }
      })

    const itemTpl = `
      <div class='chart7Tpl'>
        <div class='tplTitle'>{statisticDate}</div>
        <div class='tpl'>
          <span class="tpl3">·</span>
          稼动率:&nbsp;&nbsp;&nbsp;{devRunningtime} %
        </div>
        <div class='tpl'>
          <span class="tpl2">·</span>
          平均开机时长:&nbsp;&nbsp;&nbsp;{devEletime} 小时
        </div>
      </div>
  `

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
      itemTpl: itemTpl
    })
    chart
      .line()
      .position('statisticDate*devRunningtime')
      .size(2)
      .color('', () => '#30c5c5')
      .tooltip(
        'statisticDate*devEletime*devRunningtime',
        (statisticDate, devEletime, devRunningtime) => {
          return {
            statisticDate,
            devEletime,
            devRunningtime
          }
        }
      )

    chart.legend(false)
    chart.removeInteraction('legend-filter')
    chart.render()
  }

  return (
    <div className={styles.moveChartBox}>
      <ChartTitle title={'稼动率'}>
        <div className={styles.legendBox}>
          <LegendItem name={'平均开机时长'} type={'square'}></LegendItem>
          <LegendItem name={'稼动率'} type={'line'}></LegendItem>
        </div>
      </ChartTitle>
      {data.length > 0 ? (
        <div id={'moveChart'} className={styles.moveChart} ref={chartRef}></div>
      ) : (
        <EmptyChunk></EmptyChunk>
      )}
    </div>
  )
}

export default observer(MoveChart)
