import React, { useRef, useState, useEffect } from 'react'
import styles from './pinNumber.module.less'
import { Chart } from '@antv/g2'
import { ChartTitle } from './pieChart'
import { useStores, observer } from '@/utils/mobx'
import moment from 'moment'

const PinNumber = () => {
  const chartRef = useRef()

  const { factoryStore } = useStores()
  const { factoryMachineData } = factoryStore

  const [data, setData] = useState([
    // { statisticDate: '周一', devPincount: 8 },
    // { statisticDate: '周二', devPincount: 10 },
    // { statisticDate: '周三', devPincount: 12 },
    // { statisticDate: '周四', devPincount: 34 },
    // { statisticDate: '周五', devPincount: 28 },
    // { statisticDate: '周六', devPincount: 16 },
    // { statisticDate: '周日', devPincount: 10 }
  ])
  const [chart, setChart] = useState(null)

  useEffect(() => {
    const target = factoryMachineData.statisticWeek
    target.forEach(item => {
      item.statisticDate = moment(item.statisticDate).format('MM-DD')
    })
    setData(target)
  }, [factoryMachineData])

  const chartInit = () => {
    const c = new Chart({
      container: 'pinNumber',
      autoFit: true,
      width: 300,
      height: 270,
      nice: true,
      padding: [24, 12, 32, 12]
    })

    setChart(c)
  }

  const chartRender = () => {
    chart.clear()
    const margin = 1 / 5

    chart.data(data)
    chart.scale('devPincount', {
      min: 0,
      nice: true,
      tickCount: 6,
      range: [0, 1 - margin / 2]
    })

    chart.axis('devPincount', {
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
      //   text: '针数',
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
        <div class='tplTitle'>{statisticDate}</div>
        <div class='tpl'>
          <span class="tpl2">·</span>
          平均针数:&nbsp;&nbsp;&nbsp;{devPincount} 针
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
      .interval()
      .size(16)
      .position('statisticDate*devPincount')
      .tooltip('statisticDate*devPincount', (statisticDate, devPincount) => {
        return {
          statisticDate,
          devPincount
        }
      })
      .label('statisticDate*devPincount', () => {
        return {
          content: data => {
            return `${data.devPincount}`
          },
          style: {
            fill: '#333'
          }
        }
      })

    chart.render()
  }

  useEffect(() => {
    chartInit()
  }, [])

  useEffect(() => {
    if (chart && Array.isArray(data) && data.length) {
      chartRender()
    }
  }, [data, chart])

  return (
    <div className={styles.pinNumberBox}>
      <ChartTitle title={'平均针数'} desc={'针'}></ChartTitle>
      <div ref={chartRef} id={'pinNumber'}></div>
    </div>
  )
}

export default observer(PinNumber)
