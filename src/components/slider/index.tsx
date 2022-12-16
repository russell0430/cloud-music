import React, { useState, useEffect } from "react"
import "swiper/swiper-bundle.css"
import { SliderContainer } from "./style"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper"
type propsType = { bannerList: { imageUrl: string }[] }
const Slider: React.FC<propsType> = ({ bannerList }) => {
  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swipper-wrapper">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
          >
            {bannerList.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    src={item.imageUrl}
                    alt="recommend"
                    width="100%"
                    height="100%"
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

export default Slider
