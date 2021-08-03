import React, { useRef, useState, useEffect } from 'react'
import styles from './productEffect.module.less'
import { Chart } from '@antv/g2'
import { ChartTitle, EmptyChunk } from './pieChart'
import { useStores, observer } from '@/utils/mobx'
import moment from 'moment'

const ProductEffect = () => {
  const chartRef = useRef()

  const { factoryStore } = useStores()
  const { factoryData } = factoryStore

  const [data, setData] = useState([])
  const [chart, setChart] = useState(null)
  const [empty, setEmpty] = useState(true)

  useEffect(() => {
    const target = []
    const arr = factoryData.production
    for (let item in arr) {
      target.push({ date: moment(item).format('MM-DD'), num: arr[item] })
    }
    target.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
    const f = target.every(item => item.num === 0)
    setData(target)
    setEmpty(f)
  }, [factoryData])

  const chartInit = () => {
    const c = new Chart({
      container: 'productEffect',
      autoFit: true,
      width: 300,
      height: 270,
      nice: true,
      padding: [24, 0, 32, 0]
    })

    setChart(c)
  }

  const chartRender = () => {
    const margin = 1 / 5
    chart.clear()
    chart.data(data)
    chart.scale('num', {
      min: 0,
      nice: true,
      tickCount: 6,
      range: [0, 1 - margin / 2]
    })

    chart.axis('num', {
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
        formatter: () => ''
      }
    })

    const itemTpl = `
      <div class='chart7Tpl'>
        <div class='tplTitle'>{date}</div>
        <div class='tpl'>
          <span class="tpl2">·</span>
          生产效率:&nbsp;&nbsp;&nbsp;{num} 件
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
      .position('date*num')
      .tooltip('date*num', (date, num) => {
        return {
          date,
          num
        }
      })
      .label('date*num', () => {
        return {
          content: data => {
            return `${data.num}`
          },
          style: {
            fill: '#333'
          }
        }
      })

    chart.render()
  }

  useEffect(() => {
    if (empty) return
    !chart && chartInit()
  }, [chart, data, empty])

  useEffect(() => {
    chart && chartRender()
  }, [chart, data])

  return (
    <div className={styles.productEffectBox}>
      <ChartTitle title={'生产效率'} desc={'件'}></ChartTitle>
      {empty ? (
        <EmptyChunk></EmptyChunk>
      ) : (
        <div ref={chartRef} id={'productEffect'}></div>
      )}
    </div>
  )
}

export default observer(ProductEffect)
