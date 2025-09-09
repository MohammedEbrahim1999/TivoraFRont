'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './MainSlider.css';
import { Navigation } from 'swiper/modules';
import { useTheme } from '@mui/material';
import { useGetPokemonByNameQuery } from "../../Api/pokemon.js";
import { ArrowRightAlt } from '@mui/icons-material';




const MainSlider = () => {
    const theme = useTheme();


    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');

    const headerData = data?.data?.[0];
    const content = [
        {
            img: "http://localhost:1337/uploads/large_main_Slider2_91d2179f3c.jpg",
            Summer: headerData?.summerCollection,
            mainTitle: headerData?.mainTitle1,
            subTitle: headerData?.subTitle1,
            buttonName: headerData?.buttonName1,
        },
        {
            img: "http://localhost:1337/uploads/large_main_Slider1_3783242244.jpg",
            Summer: headerData?.watchesCollection,
            mainTitle: headerData?.mainTitle2,
            subTitle: headerData?.subTitle2,
            buttonName: headerData?.buttonName2,
        },
    ]
    return (
        // <div className='container'>
        <Swiper
            navigation={true}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            modules={[Navigation]}
            className="mySwiper"
        >
            {content.map((item, index) => (
                <SwiperSlide key={index} className="position-relative">
                    <img src={item.img} alt={item.mainTitle} />
                    <div className="slider-content">
                        <p className="text-danger fs-5">{item.Summer}</p>
                        <h1 className='text-start text-black'>{item.mainTitle}</h1>
                        <p className="text-secondary text-start">{item.subTitle}</p>
                        <a href="/Shop" className="btn bg-black text-white">
                            {item.buttonName} <ArrowRightAlt />
                        </a>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

        // </div>
    )
}

export default MainSlider
