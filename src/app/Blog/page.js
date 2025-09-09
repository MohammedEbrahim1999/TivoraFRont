'use client'
import React from 'react'
import { useGetPokemonByNameQuery } from "../Api/pokemon.js";
import { useTheme } from '@mui/material';
import { Container, Row, Col, Button } from "react-bootstrap";
const page = () => {
    const theme = useTheme();
    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');
    const headerData = data?.data?.[0];
    return (
        <>
            <div className="container-fluid p-0">
                <div className={`heroSection d-flex justify-content-center align-items-center`} style={{
                    background: "url('http://localhost:1337/uploads/blog_BG_15e861db2b.jpg') center/ cover no-repeat",
                    height: "250px",
                    position: "relative",
                }}>
                    <h1 className="text-white fw-bold position-relative z-1">{headerData?.ourBlog}</h1>
                </div>
            </div >
            <section className="blog spad py-5" style={{ paddingBottom: "55px", }}>
                <div className='container'>
                    <div className='row'>
                        {headerData?.blogs.map((blog) => (
                            <Col key={blog.id} lg={4} md={6} sm={6} className="mb-4">
                                <div className="blog__item shadow-none rounded overflow-hidden" style={{ marginBottom: "45px", }}>
                                    <div className="blog__item__pic"
                                        style={{
                                            backgroundImage: `url(${blog.img})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            height: "270px",
                                        }}
                                    />
                                    <div className="blog__item__text rounded p-3 bg-white" style={{
                                        padding: "30px 30px 25px",
                                        margin: "0 30px",
                                        marginTop: "-35px",
                                        transition: ".9s",
                                    }}>
                                        <span className="d-flex align-items-center mb-2" style={{
                                            color: "#3d3d3d",
                                            fontSize: "13px",
                                            marginBottom: "10px",
                                        }}>
                                            <img src="/imgs/calendar.png" alt="calendar" style={{ width: "16px", marginRight: "8px" }} />
                                            {blog.date}
                                        </span>
                                        <h6 className="fw-bold " style={{
                                            color: "#0d0d0d",
                                            fontWeight: 700,
                                            lineHeight: "28px",
                                            marginBottom: "10px",
                                        }}>{blog.title}</h6>
                                        <a href="/Blogdetail" className="text-danger position-relative text-uppercase d-inline-block text-decoration-none fw-semibold" style={{
                                            color: "#111111",
                                            fontSize: "13px",
                                            fontWeight: 700,
                                            letterSpacing: "4px",
                                            padding: "3px 0",
                                        }}>
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </div>
                </div>
            </section >
            <style>
                {`
.blog__item:hover a::after {
	width: 40px;
	background: #e53637;
}
.blog__item:hover .blog__item__text {
	-webkit-box-shadow: 0px 15px 60px rgba(67, 69, 70, 0.05);
	box-shadow: 0px 15px 60px rgba(67, 69, 70, 0.05);
}
.blog__item__text a:after {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 2px;
	background: #111111;
	content: "";
	-webkit-transition: all, 0.3s;
	-o-transition: all, 0.3s;
	transition: all, 0.3s;
}
    `}
            </style>
        </>
    )
}
export default page