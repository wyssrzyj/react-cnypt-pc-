import React, { useEffect } from 'react'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay
} from 'swiper'

import Swiper from 'swiper'
// Import Swiper styles
import './banners.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

const Banners = () => {
  useEffect(() => {
    new Swiper('.mySwiper', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
  }, [])
  return (
    <div className="swiper-container mySwiper">
      <div className="swiper-wrapper">
        <div className={'swiper-slide'}>Slide 1</div>
        <div className={'swiper-slide'}>Slide 2</div>
        <div className={'swiper-slide'}>Slide 3</div>
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-pagination"></div>
    </div>
  )
}

export default Banners
