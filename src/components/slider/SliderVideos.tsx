// @ts-nocheck
import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const SliderVideos: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const slides = React.Children.toArray(children)
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)

  const navigation = {
    prevEl: prevRef.current,
    nextEl: nextRef.current,
  }

  useEffect(() => {
    // ensure refs exist
  }, [])

  return (
    <div className="slider-videos-wrapper position-relative">
      <button ref={prevRef} className="slick-prev slick-arrow" aria-label="Previous video" />
      <button ref={nextRef} className="slick-next slick-arrow" aria-label="Next video" />

      <Swiper
        modules={[Navigation]}
        navigation={navigation}
        onBeforeInit={(swiper: any) => {
          // attach custom navigation elements before init
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current
          try {
            swiper.navigation.init()
            swiper.navigation.update()
          } catch (e) {
            /* ignore */
          }
        }}
        spaceBetween={16}
        slidesPerView={2}
        slidesPerGroup={1}
        breakpoints={{
          1400: { slidesPerView: 2, slidesPerGroup: 1 },
          1024: { slidesPerView: 2, slidesPerGroup: 1 },
          900: { slidesPerView: 2, slidesPerGroup: 1 },
          750: { slidesPerView: 1, slidesPerGroup: 1 },
        }}
      >
        {slides.map((child, i) => (
          <SwiperSlide key={i}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SliderVideos