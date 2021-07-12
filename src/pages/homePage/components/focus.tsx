import React, { useState, useEffect } from 'react'
import styles from './focus.module.less'

const Focus = () => {
  const [title, setTitle] = useState('')
  const [areas, setAreas] = useState('')
  const [active, setActive] = useState(1)

  const focusImgs = [
    null,
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210707/f6f10e0684014837a85478a9507ce042.png',
      title: '女装',
      areas: ['深圳', '广州', '东莞', '杭州']
    },
    null,
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210707/313c83b6feab4518817f2c72e3a84abb.png',
      title: '婚纱',
      areas: ['潮州']
    },
    null,
    null,
    null,
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210707/62fd5ed4d574482794c422c92197d3d4.png',
      title: '牛仔',
      areas: ['中山', '广州', '佛山', '淄博']
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210707/7035231d18bf49fcac554a1dd9b02f41.png',
      title: '内衣',
      areas: ['佛山', '泉州']
    },
    null,
    null,
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210707/8986161ce44c406581591abd326b976e.png',
      title: '休闲装',
      areas: ['中山']
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210707/67fa8b460c134648aeef5915004bb1a8.png',
      title: '西裤',
      areas: ['石狮']
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210707/b7277ab94dd54e3ab6b897c41a67e93a.png',
      title: '运动休闲装',
      areas: ['石狮', '泉州']
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210707/bc84258776a447f4ab6165ccf867e9b1.png',
      title: '衬衫',
      areas: ['绍兴', '揭阳']
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210707/70cc4e233ed945bc9c6e340e8358e540.png',
      title: '童装',
      areas: ['湖州']
    },
    null,
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210707/8f044ce3098245c7b1350325af9d4a4a.png',
      title: '男装',
      areas: ['温州', '宁波', '保定']
    },
    {
      img: 'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210707/828c046893fc4457b49b4a438b6c0cfb.png',
      title: '羽绒服',
      areas: ['苏州']
    },
    null
  ]

  const click = (data, idx) => {
    setTitle(data.title)
    setAreas(data.areas.join(' | '))
    setActive(idx)
  }

  useEffect(() => {
    setTitle(focusImgs[1].title)
    setAreas(focusImgs[1].areas.join(' | '))
  }, [])

  return (
    <div className={styles.focusInner}>
      <div className={styles.focusLeft}>
        <div>产业聚集地</div>
        <div>INDUSTRIAL CLUSTER</div>
        <div>{title}</div>
        <div>{areas}</div>
      </div>
      <div className={styles.focusRight}>
        {focusImgs.map((item, idx) =>
          item ? (
            <div
              onClick={() => click(item, idx)}
              className={styles.focusImgBox}
              key={idx + 'img'}
            >
              <img src={item.img} alt="" className={styles.focusImg} />
              {active === idx ? <div className={styles.activeFocus} /> : null}

              <div className={styles.focusMask}>
                <div className={styles.maskTitle}>{item.title}</div>
                <div className={styles.maskText}>{item.areas.join(' | ')}</div>
              </div>
            </div>
          ) : (
            <div className={styles.focusImgHidden} key={idx + 'img'}></div>
          )
        )}
      </div>
    </div>
  )
}

export default Focus
