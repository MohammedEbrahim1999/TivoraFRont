"use client";
import React from "react";
import { useGetPokemonByNameQuery } from "../../Api/pokemon.js";
import { useTheme } from "@mui/material";

const News = () => {
    const theme = useTheme();
    const { data, error, isLoading } = useGetPokemonByNameQuery("tivoras?populate=*");
    const headerData = data?.data?.[0];
    // const newsItems = 
    return (
        <>
            <section style={{ paddingTop: "25px", paddingBottom: "55px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div
                                className="text-center"
                                style={{ marginBottom: "45px" }}
                            >
                                <span
                                    className="text-uppercase d-block mb-3"
                                    style={{
                                        color: "#e53637",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        letterSpacing: "2px",
                                    }}
                                >
                                    {headerData?.latestNews}
                                </span>
                                <h2
                                    style={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 700,
                                        lineHeight: "46px",
                                    }}
                                >
                                    {headerData?.FNT}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {headerData?.newsItem.map((item, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-6">
                                <div className="blogItem" style={{ marginBottom: "45px" }} >
                                    <div className="set-bg"
                                        style={{
                                            backgroundImage: `url(${item.img})`,
                                            height: "270px",
                                        }}
                                    ></div>
                                    <div className="blog__item__text rounded"
                                        style={{
                                            padding: "30px 30px 25px",
                                            margin: "0 30px",
                                            marginTop: "-35px",
                                            background: "#ffffff",
                                            transition: "all 0.3s",
                                        }}
                                    >
                                        <span className="d-block"
                                            style={{
                                                color: "#3d3d3d",
                                                fontSize: "13px",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <img src="/imgs/calendar.png" alt="" style={{ marginRight: "6px" }} />
                                            {item.date}
                                        </span>
                                        <h5
                                            style={{
                                                color: "#0d0d0d",
                                                fontWeight: "700",
                                                lineHeight: "28px",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            {item.title}
                                        </h5>
                                        <a className="blogLink text-decoration-none text-uppercase position-relative d-inline-block"
                                            href={item.link}
                                            style={{
                                                color: "#111111",
                                                fontSize: "13px",
                                                fontWeight: 700,
                                                letterSpacing: "4px",
                                                padding: "3px 0",
                                            }}
                                        >
                                            {item.more}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <style>
                {`
.blogItem:hover a::after {
	width: 40px;
	background: #e53637;
}
.blogItem:hover .blog__item__text {
	box-shadow: 0px 15px 60px rgba(67, 69, 70, 0.05);
}
a.blogLink:after {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 2px;
	background: #111111;
	content: "";
	transition: all 0.3s;
}
                `}
            </style>
        </>
    );
};
export default News;