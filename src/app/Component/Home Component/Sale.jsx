'use client';
import React, { useEffect, useState,useRef } from "react";
import { useTheme } from "@mui/material";
import { useGetPokemonByNameQuery } from "../../Api/pokemon.js";


const Sale = () => {
    // function to calculate remaining time
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        // Intersection Observer setup
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 } // Play when 50% of video is visible
        );

        if (video) observer.observe(video);

        return () => {
            if (video) observer.unobserve(video);
        };
    }, []);
    const theme = useTheme();
    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');

    const headerData = data?.data?.[0];
    const targetDay = "2025-09-30";

    const calculateTimeLeft = () => {
        const difference = +new Date(targetDay) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <>
            {headerData?.IsSale === true ? (
                <section
                    className="mt-5 overflow-hidden"
                    style={{
                        backgroundColor: theme.palette.background.saleBG,
                        paddingTop: "100px",
                        paddingBottom: "75px",
                    }}
                >
                    <div className="container">
                        <div className="row">
                            {/* Left Section */}
                            <div
                                className="col-12 col-lg-3 sale position-relative z-1"
                                style={{ paddingTop: "40px" }}
                            >
                                <h2
                                    style={{
                                        color: theme.palette.text.saleText,
                                        lineHeight: "72px",
                                        fontSize: "30px",
                                    }}
                                >
                                    {headerData?.saleText1} <br />
                                    <span style={{ color: theme.palette.text.saleText2 }}> {headerData?.saleText2} </span> <br />
                                    {headerData?.saleText3}
                                </h2>
                            </div>

                            {/* Image Section */}
                            <div className="col-12 mt-5 mt-m-0 col-lg-4 ">
                                <div className="position-relative" style={{ zIndex: 5 }}>
                                    <img
                                        src={"http://localhost:1337/uploads/sale_9ae4649ef7.png"}
                                        alt="Sale"
                                        style={{ minWidth: "100%" }}
                                    />
                                    <div
                                        className="rounded-circle position-absolute text-center"
                                        style={{
                                            height: "100px",
                                            width: "100px",
                                            backgroundColor: "#111111",
                                            paddingTop: "13px",
                                            right: "15px",
                                            top: "-15px",
                                        }}
                                    >
                                        <span
                                            className="text-white mb-1"
                                            style={{ fontSize: "15px" }}
                                        >
                                            {headerData?.saleOf}
                                        </span>
                                        <h5 className="text-white fw-bold" style={{ fontSize: "20px" }}>
                                            {headerData?.SaleNumber} <br /> {headerData?.saleCurrency}
                                        </h5>
                                    </div>
                                </div>
                            </div>

                            {/* Countdown Section */}
                            <div className="col-12 col-lg-4 mt-5 mt-md-0 text-center text-md-start offset-md-1">
                                <p className="text-danger fw-bold" style={{ letterSpacing: "4px" }}>{headerData?.dealOfTheWeek}</p>
                                <h2 className="fw-bold mb-4" style={{ letterSpacing: "6px" }}>
                                    {headerData?.dealText1} <br /> {headerData?.dealText2}
                                </h2>

                                {/* Countdown Timer */}
                                <div className="d-flex gap-5 justify-content-center justify-content-md-start mb-4">
                                    <div className="text-center">
                                        <h1 className="fw-bold">{timeLeft.days || "00"}</h1>
                                        <p className="small">{headerData?.days}</p>
                                    </div>
                                    <div className="text-center">
                                        <h1 className="fw-bold">{timeLeft.hours || "00"}</h1>
                                        <p className="small">{headerData?.hours}</p>
                                    </div>
                                    <div className="text-center">
                                        <h1 className="fw-bold">{timeLeft.minutes || "00"}</h1>
                                        <p className="small">{headerData?.minutes}</p>
                                    </div>
                                    <div className="text-center">
                                        <h1 className="fw-bold">{timeLeft.seconds || "00"}</h1>
                                        <p className="small">{headerData?.seconds}</p>
                                    </div>
                                </div>

                                <a type="button" className="btn btn-dark text-decoration-none px-4 py-2">{headerData?.shopNow}</a>
                            </div>
                        </div>
                    </div>
                </section>
            ) :
                (
                    <section
                        className="cust-sec shadow-lg mt-1 mt-lg-5 overflow-hidden d-flex flex-column justify-content-center align-items-center"
                        style={{
                            backgroundColor: theme.palette.background.saleBG,
                            minHeight: "400px",   // ensures section has some height
                            width: "100%",
                        }}
                    >
                        <div className="text-center mw-75 w-100 " style={{ width: "100%" }}>
                            <video
                                ref={videoRef}
                                className="rounded"
                                src="http://localhost:1337/uploads/SSS_01e315a3f0.mp4"
                                loop
                                preload="metadata"
                                playsInline
                                controls
                                controlsList="nodownload noremoteplayback nofullscreen"
                                disablePictureInPicture
                                style={{ maxHeight: '600px', objectFit: 'contain',width:"100%" }}
                                onContextMenu={(e) => e.preventDefault()} // Disable right-click
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </section>



                )
            }

            <style>
                {`
                    .sale::before {
                        content: "";
                        position: absolute;
                        left: -480px;
                        top: 0;
                        height: 300px;
                        width: 600px;
                        background: #ffffff;
                        z-index: -1;
                        border-radius: 0px 15px 15px 0px;
                    }
                `}
            </style>
        </>
    );
};

export default Sale;
