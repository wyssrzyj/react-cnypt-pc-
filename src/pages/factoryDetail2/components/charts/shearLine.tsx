import React, { useRef, useState, useEffect } from 'react'
import styles from './shearLine.module.less'
import { Chart } from '@antv/g2'
import { ChartTitle, EmptyChunk } from './pieChart'
import { useStores, observer } from '@/utils/mobx'
import moment from 'moment'
const ShearLine = () => {
  const chartRef = useRef()
  const { factoryStore } = useStores()
  const { factoryMachineData, factoryData } = factoryStore
  const [data, setData] = useState([])
  const [chart, setChart] = useState(null)

  useEffect(() => {
    const arr = factoryMachineData.statisticHour || []
    const target = arr.map(item => {
      return {
        devCutcount: item.devCutcount,
        t: item.t ? moment(item.t).format('HH') : null
      }
    })
    setData(target)
  }, [factoryMachineData])

  const chartInit = () => {
    const c = new Chart({
      container: 'shearLine',
      autoFit: true,
      width: 300,
      height: 270,
      nice: true,
      padding: [24, 0, 32, 12]
    })
    setChart(c)
  }
  const chartRender = () => {
    const margin = 1 / 5
    chart.clear()
    chart.data(data)
    chart.scale('devCutcount', {
      min: 0,
      nice: true,
      tickCount: 6,
      range: [0, 1 - margin / 2]
    })

    chart.axis('devCutcount', {
      grid: {
        line: {
          style: {
            lineDash: [5]
          }
        }
      },
      label: null
    })

    const itemTpl = `
      <div class='chart7Tpl'>
        <div class='tplTitle'>{t}时</div>
        <div class='tpl'>
          <span class="tpl3">·</span>
          剪线次数:&nbsp;&nbsp;&nbsp;{devCutcount} 次
        </div>
      </div>
    `
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
      itemTpl: itemTpl
    })

    chart.interaction('active-region')

    chart
      .area()
      .position('t*devCutcount')
      .color(
        'l(100) 0:#30C5C5 0.7: rgba(48, 197, 197,0.5) 1:rgba(48, 197, 197,0.1)'
      )

    chart
      .line()
      .size(3)
      .position('t*devCutcount')
      .color('#30C5C5')
      .tooltip('t*devCutcount', (t, devCutcount) => {
        return {
          t,
          devCutcount
        }
      })

    chart
      .point()
      .size(4)
      .position('t*devCutcount')
      .shape('circle')
      .color('#30C5C5')
      .tooltip('t*devCutcount', (t, devCutcount) => {
        return {
          t,
          devCutcount
        }
      })
      .label('t*devCutcount', () => {
        return {
          content: data => {
            return `${data.devCutcount}`
          },
          style: {
            fill: '#333'
          }
        }
      })

    const total = data.reduce((prev, item) => prev + item.devCutcount, 0)
    const averageNum = (total / data.length).toFixed(2)
    const contentColor = '#3b80ff'
    const content = `平均: ${averageNum}次`
    chart.annotation().line({
      top: true,
      start: [-0.5, averageNum],
      end: [data.length + 0.5, averageNum],
      animate: true,
      style: {
        stroke: contentColor,
        lineWidth: 1
      },
      text: {
        position: 'start',
        style: {
          fill: contentColor,
          fontSize: 14,
          fontWeight: 500
        },
        content: content,
        offsetY: -5
      }
    })
    chart.render()
  }
  useEffect(() => {
    factoryData.onlineNum > 0 && !chart && data.length > 0 && chartInit()
  }, [data, chart, factoryData])
  useEffect(() => {
    if (chart && Array.isArray(data) && data.length) {
      chart && chartRender()
    }
  }, [data, factoryMachineData, chart])
  return (
    <div className={styles.shearLineBox}>
      <ChartTitle title={'剪线次数'}></ChartTitle>

      {data.length > 0 && factoryData.onlineNum > 0 ? (
        <div ref={chartRef} id={'shearLine'}></div>
      ) : (
        <EmptyChunk></EmptyChunk>
      )}
    </div>
  )
}
export default observer(ShearLine)
