import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './moveChart.module.less'
import { Chart } from '@antv/g2'
import { ChartTitle } from './pieChart'

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

  const data = [
    { name: '周一', 稼动率: 2, 平均缝纫时长: 5 },
    { name: '周二', 稼动率: 4, 平均缝纫时长: 11 },
    { name: '周三', 稼动率: 8, 平均缝纫时长: 13 },
    { name: '周四', 稼动率: 5, 平均缝纫时长: 9 },
    { name: '周五', 稼动率: 9, 平均缝纫时长: 6 },
    { name: '周六', 稼动率: 3, 平均缝纫时长: 29 },
    { name: '周日', 稼动率: 2, 平均缝纫时长: 19 }
  ]

  const [chart, setChart] = useState(null)

  useEffect(() => {
    if (data && !chart) {
      const c = new Chart({
        container: 'moveChart',
        autoFit: true,
        width: 700,
        height: 300,
        nice: true,
        padding: [24, 24, 32, 24]
      })
      setChart(c)
    }
  }, [data])

  useEffect(() => {
    chart && renderChart()
  }, [chart, data])

  const renderChart = () => {
    const 平均缝纫时长s = data.map(i => i.平均缝纫时长)
    const maxValue = Math.max(...平均缝纫时长s)
    const max = Math.ceil(maxValue / 10) * 10
    const margin = 1 / 5

    chart.legend(false)
    chart.removeInteraction('legend-item:click:')

    chart.clear()
    chart.data(data)

    chart.scale('稼动率', {
      min: 0,
      max: 10,
      tickCount: 6,
      range: [0, 1 - margin / 2]
    })

    const tick = max / 5
    let ticks = new Array(6).fill(null)
    ticks = ticks.map((_i, t) => t * tick)
    chart.scale('平均缝纫时长', {
      min: 0,
      max: max,
      ticks: ticks,
      tickCount: 6,
      range: [0, 1 - margin / 2]
    })

    chart.scale('city', {
      min: 0,
      max: max,
      ticks: ticks,
      tickCount: 6,
      range: [0, 1 - margin / 2]
    })

    chart.scale('name', {
      nice: true
    })

    chart.axis('平均缝纫时长', {
      title: {
        text: '小时',
        autoRotate: false,
        position: 'end',
        offset: 10,
        textStyle: {
          textAlign: 'start', // 文本对齐方向，可取值为： start middle end
          fontSize: '12', // 文本大小
          fontWeight: 'bold', // 文本粗细
          textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
        }
      }
    })

    chart.axis('稼动率', {
      title: {
        text: '百分比',
        autoRotate: false,
        position: 'end',
        offset: 5,
        textStyle: {
          textAlign: 'start', // 文本对齐方向，可取值为： start middle end
          fontSize: '12', // 文本大小
          fontWeight: 'bold', // 文本粗细
          textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
        }
      }
    })

    chart.axis('name', {
      label: {
        autoRotate: true,
        autoHide: false
      }
    })

    chart.interaction('active-region')

    chart
      .interval()
      .size(16)
      .position('name*平均缝纫时长')
      .tooltip('平均缝纫时长*稼动率', (平均缝纫时长, 稼动率) => {
        return {
          平均缝纫时长,
          稼动率
        }
      })

    const itemTpl = `
            <div class='chart7Tpl'>
                <div class='tpl'>
                    <span class="tpl1">·</span>
                    平均缝纫时长:&nbsp;&nbsp;&nbsp;{平均缝纫时长} 小时
                </div>
                <div class='tpl'>
                    <span class="tpl2">·</span>
                    稼动率:&nbsp;&nbsp;&nbsp;{稼动率} %
                </div>
            </div>
        `

    chart.tooltip({
      showTitle: true,
      showMarkers: false,
      itemTpl: itemTpl
    })
    chart
      .line()
      .position('name*稼动率')
      .size(2)
      .color('', () => '#30c5c5')
      .tooltip('平均缝纫时长*稼动率', (平均缝纫时长, 稼动率) => {
        return {
          平均缝纫时长,
          稼动率
        }
      })

    chart.legend(false)
    chart.removeInteraction('legend-filter')
    chart.render()
  }

  return (
    <div className={styles.moveChartBox}>
      <ChartTitle title={'稼动率'}>
        <div className={styles.legendBox}>
          <LegendItem name={'平均缝纫时长'} type={'square'}></LegendItem>
          <LegendItem name={'稼动率'} type={'line'}></LegendItem>
        </div>
      </ChartTitle>
      <div id={'moveChart'} className={styles.moveChart} ref={chartRef}></div>
    </div>
  )
}

export default MoveChart
