// @ts-nocheck
import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderFilm: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const slides = React.Children.toArray(children)
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)

  // Swiper needs the navigation elements to exist before init; useEffect ensures refs are set
  const navigation = {
    prevEl: prevRef.current,
    nextEl: nextRef.current,
  }

  useEffect(() => {
    // no-op just to ensure refs are attached before Swiper init in some render flows
  }, [])

  return (
    <div className="slider-film-wrapper position-relative">
      <button ref={prevRef} className="slick-prev slick-arrow" aria-label="Previous" />
      <button ref={nextRef} className="slick-next slick-arrow" aria-label="Next" />

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
        slidesPerView={6}
        slidesPerGroup={3}
        breakpoints={{
          1400: { slidesPerView: 6, slidesPerGroup: 3 },
          1024: { slidesPerView: 6, slidesPerGroup: 3 },
          900: { slidesPerView: 3, slidesPerGroup: 2 },
          750: { slidesPerView: 3, slidesPerGroup: 2 },
          600: { slidesPerView: 3, slidesPerGroup: 2 },
          480: { slidesPerView: 2, slidesPerGroup: 1 },
        }}
      >
        {slides.map((child, i) => (
          <SwiperSlide key={i}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SliderFilm