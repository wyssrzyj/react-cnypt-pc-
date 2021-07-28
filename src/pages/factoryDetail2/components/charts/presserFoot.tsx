import React, { useRef, useState, useEffect } from 'react'
import styles from './presserFoot.module.less'
import { Chart } from '@antv/g2'
import { ChartTitle } from './pieChart'
import { useStores, observer } from '@/utils/mobx'
import moment from 'moment'

const PresserFoot = () => {
  const chartRef = useRef()

  const { factoryStore } = useStores()
  const { factoryMachineData } = factoryStore

  const [data, setData] = useState([])

  const [chart, setChart] = useState(null)

  useEffect(() => {
    const arr = factoryMachineData.statisticHour
    const target = arr.map(item => {
      return {
        devActioncount: item.devActioncount,
        t: item.t ? moment(item.t).format('HH') : null
      }
    })
    setData(target)
  }, [factoryMachineData])

  const chartInit = () => {
    const c = new Chart({
      container: 'presserFoot',
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
    chart.scale('devActioncount', {
      min: 0,
      nice: true,
      tickCount: 6,
      range: [0, 1 - margin / 2]
    })

    chart.axis('devActioncount', {
      grid: {
        line: {
          style: {
            lineDash: [5]
          }
        }
      },
      label: null
      // label: {
      //   style: {
      //     fontSize: 16
      //   }
      // },
      // title: {
      //   text: '次数',
      //   autoRotate: false,
      //   position: 'end',
      //   offset: 24,
      //   style: {
      //     textAlign: 'start', // 文本对齐方向，可取值为： start middle end
      //     fontSize: '14' // 文本大小
      //   }
      // }
    })

    const itemTpl = `
      <div class='chart7Tpl'>
        <div class='tplTitle'>{t}时</div>
        <div class='tpl'>
          <span class="tpl3">·</span>
          抬压脚次数:&nbsp;&nbsp;&nbsp;{devActioncount} 次
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
      .position('t*devActioncount')
      .color(
        'l(100) 0:#975FE4 0.7: rgba(151, 95, 228,0.5) 1:rgba(151, 95, 228,0.1)'
      )
    chart
      .line()
      .size(3)
      .position('t*devActioncount')
      .color('#975FE4')
      .tooltip('t*devActioncount', (t, devActioncount) => {
        return {
          t,
          devActioncount
        }
      })
    chart
      .point()
      .size(4)
      .position('t*devActioncount')
      .shape('circle')
      .color('#975FE4')
      .tooltip('t*devActioncount', (t, devActioncount) => {
        return {
          t,
          devActioncount
        }
      })

    const total = data.reduce((prev, item) => prev + item.devActioncount, 0)
    const averageNum = (total / data.length).toFixed(2)
    const contentColor = '#3b80ff'
    const content = `平均抬压脚数: ${averageNum}次`

    chart.annotation().line({
      top: true,
      start: [-0.5, averageNum],
      end: [data.length + 0.5, averageNum],
      animate: true,
      style: {
        stroke: contentColor,
        lineWidth: 1
        // lineDash: [3, 3]
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
    !chart && chartInit()
  }, [chart])

  useEffect(() => {
    if (chart && Array.isArray(data) && data.length) {
      chart && chartRender()
    }
  }, [data, factoryMachineData, chart])

  return (
    <div className={styles.presserFootBox}>
      <ChartTitle title={'抬压脚次数'}></ChartTitle>
      <div ref={chartRef} id={'presserFoot'}></div>
    </div>
  )
}

export default observer(PresserFoot)
