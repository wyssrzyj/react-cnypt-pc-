import React, { useState, useEffect } from 'react'
import styles from './focus.module.less'
import { useHistory } from 'react-router'

const Focus = () => {
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [areas, setAreas] = useState('')
  const [active, setActive] = useState(1)

  const focusImgs = [
    null,
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/cd483ab065ed4dccb55383a18c65adc8.png',
      title: '女装',
      areas: [
        { ids: ['1965', '1989'], name: '深圳市' },
        { ids: ['1965', '1966'], name: '广州市' },
        { ids: ['1965', '2092'], name: '东莞市' },
        { ids: ['934', '935'], name: '杭州市' }
      ]
    },
    null,
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/858140b68f8f4a2d93a5d6357dafbb42.png',
      title: '婚纱',
      areas: [{ ids: ['1965', '2147'], name: '潮州市' }]
    },
    null,
    null,
    null,
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/fea19a2930fc4cb8b5c87e3966c33262.png',
      title: '牛仔',
      areas: [
        { ids: ['1965', '2124'], name: '中山市' },
        { ids: ['1965', '1966'], name: '广州市' },
        { ids: ['1965', '2012'], name: '佛山市' },
        { ids: ['1376', '1400'], name: '淄博市' }
      ]
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/0012d74ce3ce4ebc8c4b6641bf16a729.png',
      title: '内衣',
      areas: [
        { ids: ['1965', '2012'], name: '佛山市' },
        { ids: ['1169', '1210'], name: '泉州市' }
      ]
    },
    null,
    null,
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/052411033eb74770b230dcc945951a72.png',
      title: '休闲装',
      areas: [{ ids: ['1965', '2124'], name: '中山市' }]
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/ff53fadfdaf5460cb1f2245c19d3f82e.png',
      title: '西裤',
      areas: [{ ids: ['1169', '1210'], name: '泉州市' }]
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/7fd0713240b548fdb3785661bfd4d07b.png',
      title: '运动休闲装',
      areas: [{ ids: ['1169', '1210'], name: '泉州市' }]
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/15d1c5915f8844e083db5dc92372a714.png',
      title: '衬衫',
      areas: [
        { ids: ['934', '987'], name: '绍兴市' },
        { ids: ['1965', '2151'], name: '揭阳市' }
      ]
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/55ab8e80474d4687b8d0b23ffd57de3f.png',
      title: '童装',
      areas: [{ ids: ['934', '981'], name: '湖州市' }]
    },
    null,
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/e785fd47f347463da59ba63d68f6b283.png',
      title: '男装',
      areas: [
        { ids: ['934', '961'], name: '温州市' },
        { ids: ['934', '949'], name: '宁波市' },
        { ids: ['38', '125'], name: '保定市' }
      ]
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/92f3b240059045538740c17bd49af13f.png',
      title: '羽绒服',
      areas: [{ ids: ['821', '862'], name: '苏州市' }]
    },
    null
  ]

  const click = (data, idx) => {
    setTitle(data.title)
    const areasText = data.areas.map(item => item.name)
    setAreas(areasText.join(' | '))
    setActive(idx)
  }

  useEffect(() => {
    setTitle(focusImgs[1].title)
    const areasText = focusImgs[1].areas.map(item => item.name)
    setAreas(areasText.join(' | '))
  }, [])

  const toSearch = () => {
    const targetAreas = focusImgs[active].areas.map(item => item.ids)

    history.push({
      pathname: '/factory-search',
      state: {
        cityIds: targetAreas
      }
    })
  }

  return (
    <div className={styles.focusInner}>
      <div className={styles.focusLeft}>
        <div>产业聚集地</div>
        <div>INDUSTRIAL CLUSTER</div>
        <div>{title}</div>
        <div className={styles.areas} onClick={toSearch}>
          {areas}
        </div>
      </div>
      <div className={styles.focusRight}>
        {focusImgs.map((item, idx) => {
          let areasText
          if (item && item.areas) {
            areasText = item.areas.map(item => item.name)
          }
          return item ? (
            <div
              onClick={() => click(item, idx)}
              className={styles.focusImgBox}
              key={idx + 'img'}
            >
              <img src={item.img} alt="" className={styles.focusImg} />
              {active === idx ? <div className={styles.activeFocus} /> : null}

              <div className={styles.focusMask}>
                <div className={styles.maskTitle}>{item.title}</div>
                <div className={styles.maskText}>{areasText.join(' | ')}</div>
              </div>
            </div>
          ) : (
            <div className={styles.focusImgHidden} key={idx + 'img'}></div>
          )
        })}
      </div>
    </div>
  )
}

export default Focus
