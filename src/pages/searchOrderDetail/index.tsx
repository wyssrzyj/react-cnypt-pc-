import React from 'react'
import { SimpleSearch } from '@/components'
import { Advertising, OverviewCard, InfoCard, OtherCard } from './components'
import styles from './index.module.less'

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade
} from 'swiper'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade])

const SearchOrderDetail = () => {
  return (
    <div className={styles.searchOrderDetail}>
      {/* 搜索栏 */}
      <SimpleSearch
        config={{
          title: '鸿星尔克实业有限公司',
          imgSrc:
            'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/rc-upload-1632899522906-3__png.png'
        }}
      />
      {/* 广告位 */}
      <Advertising />
      <div className={styles.container}>
        {/* 商品概览 */}
        <OverviewCard />
        {/* 商品信息 */}
        <InfoCard />
        {/* 该商家其它订单 */}
        <OtherCard SwiperCore={SwiperCore} />
      </div>
    </div>
  )
}

export default SearchOrderDetail
