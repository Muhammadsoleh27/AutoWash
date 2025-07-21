"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ImageSlide from "../../assets/Gemini_Generated_Image_hkg0tehkg0tehkg0.png";
import ImageSlide2 from "../../assets/Gemini_Generated_Image_mw248zmw248zmw24.png";
import ImageSlide3 from "../../assets/Gemini_Generated_Image_pm47v5pm47v5pm47.png";
import ImageSlide4 from "../../assets/Gemini_Generated_Image_wo4z9uwo4z9uwo4z.png";

import "@/app/globals.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function SwiperSlides() {
  return (
    <div className="h-[490px] w-[100%]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={ImageSlide} alt="first image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={ImageSlide2} alt="first image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={ImageSlide3} alt="first image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={ImageSlide4} alt="first image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
