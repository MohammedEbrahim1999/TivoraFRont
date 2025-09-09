'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useGetPokemonByNameQuery } from "../Api/pokemon.js";
import { useTheme } from '@mui/material';
import { Container, Row, Col, Card } from "react-bootstrap";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function CountUp({ target, start }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime;
        const duration = 3000; // 2 seconds

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [start, target]);

    return <>{count}</>;
}
const page = () => {
    // Counter Animated
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect(); // run only once
                }
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);


    const theme = useTheme()
    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');
    const headerData = data?.data?.[0];
    if (error) {
        return (
            <h1>Error</h1>
        )
    }







    return (
        <>
            <div className='py-4 px-3 shadow-sm' style={{ backgroundColor: theme.palette.background.breadcumbBG, color: theme.palette.text.primary }}>
                <Container>
                    <h2>{headerData?.aboutUs}</h2>
                    <Breadcrumbs aria-label="breadcrumb" className='ps-2'>
                        <Link underline="hover"  href="/" sx={{color: theme.palette.text.primary}}>
                            {headerData?.homebread}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/About"
                        >
                            {headerData?.aboutUs}
                        </Link>
                    </Breadcrumbs>
                </Container>
            </div>
            <section className="py-5">
                <Container>
                    {/* Image */}
                    <div className="text-center mb-4">
                        <img
                            src="http://localhost:1337/uploads/about_e17295d092.jpg"
                            alt="Clothes on hangers"
                            width={1100}
                            height={600}
                            className="img-fluid rounded"
                        />
                    </div>

                    {/* Text content with Flex */}
                    <div className="d-flex flex-wrap justify-content-center align-items-start gap-4" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        {headerData?.infoItems.map((item, index) => (
                            <div key={index} className="flex-fill" style={{ flex: "1 1 300px", maxWidth: "350px" }}>
                                <h5 className="fw-bold text-center" style={{color:theme.palette.text.primary}}>{item.title}</h5>
                                <p className="text-start" style={{color:theme.palette.text.primary}}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
            <div className="container-fluid" style={{ backgroundColor: "#f3f2ee" }}>
                <div className="row shadow-sm">
                    {/* Left Side */}
                    <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center p-4" style={{ minHeight: "400px" }}>
                        <h1
                            className="Quotes"
                            style={{
                                color: "#e53637",
                                fontSize: "75px",
                                lineHeight: "55px",
                            }}
                        >
                            {headerData?.quotesAbout}
                        </h1>
                        <p className="text-center fw-semibold" style={{ maxWidth: "500px",color: theme.palette.text.modeBG }}> {headerData?.quotesTextAbout} </p>

                        {/* Author */}
                        <div className="mt-3 d-flex gap-3 align-items-center justify-content-center">
                            <img
                                className="rounded-circle"
                                src="http://localhost:1337/uploads/author_b9d2fb5bc5.jpg"
                                alt="author"
                                width="60"
                                height="60"
                            />
                            <div className="d-flex flex-column align-items-start">
                                <p className="mb-0 fw-bold" style={{color: theme.palette.text.modeBG}}> {headerData?.authorName} </p>
                                <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                                    {headerData?.authorSubName}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="col-12 col-lg-6 p-0">
                        <img
                            src="http://localhost:1337/uploads/testimonial_39b361f5aa.jpg"
                            alt="testimonial"
                            className="img-fluid w-100 h-100"
                            style={{ objectFit: "cover", minHeight: "400px" }}
                        />
                    </div>
                </div>
            </div>
            <div className="container" ref={sectionRef}>
                <section className="py-5 bg-transparent text-center">
                    <Row className="gy-4 px-4 ">
                        {headerData?.aboutStates.map((stat, index) => (
                            <Col
                                key={index}
                                xs={6}
                                sm={6}
                                md={3}
                                className="d-flex flex-column align-items-center"
                            >
                                <h2 className="fw-bold mb-2">
                                    <CountUp target={stat.value} start={inView} />
                                </h2>
                                <p className="mb-0" style={{color: theme.palette.text.primary}}>{stat.label}</p>
                            </Col>
                        ))}
                    </Row>
                    <hr className="mt-5 mx-auto" style={{ width: "85%" }} />
                </section>
            </div>
            <section className="py-5 px-4 text-center">
                {/* Section Heading */}
                <p className="text-danger text-uppercase mb-1 fs-5">{headerData?.ourTeam}</p>
                <h2 className="fw-bold mb-5">{headerData?.meetOurTeam}</h2>

                {/* Flex Grid */}
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {headerData?.aboutTeamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="d-flex flex-column align-items-center"
                            style={{ maxWidth: "250px" }}
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                width={250}
                                height={350}
                                className="img-fluid rounded"
                            />
                            <div className="mt-3">
                                <h5 className="fw-bold">{member.name}</h5>
                                <p className="text-muted mb-0 fs-6">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="py-5 text-center">
                <Container>
                    {/* Heading */}
                    <p className="text-danger text-uppercase mb-1">{headerData?.parthner}</p>
                    <h2 className="fw-bold mb-5">{headerData?.happyClients}</h2>

                    {/* Flexbox Layout */}
                    <div className="d-flex flex-wrap justify-content-center">
                        {headerData?.clients.map((logo, index) => (
                            <div
                                key={index}
                                className="d-flex justify-content-center align-items-center p-3"
                                style={{ flex: "0 0 20%" }} // 4 per row (100% / 4 = 25%)
                            >
                                <img
                                    src={logo}
                                    alt={`Client logo ${index + 1}`}
                                    className="img-fluid"
                                    style={{ maxHeight: "80px", objectFit: "contain"}}
                                />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    )
}

export default page
