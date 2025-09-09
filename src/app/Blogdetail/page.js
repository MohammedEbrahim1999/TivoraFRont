// app/blog/page.js (Next.js 13+ with App Router)
"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaQuoteLeft } from "react-icons/fa";
import { useGetPokemonByNameQuery } from "../Api/pokemon.js";
import { useTheme } from '@mui/material';

export default function Blogdetail() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        img: "", // store image but won't show
    });
    const [comments, setComments] = useState(() => {
        // Get from localStorage
        const storedComments = localStorage.getItem("comments");

        // Parse or return empty array if nothing found
        return storedComments ? JSON.parse(storedComments) : [];
    });

    const theme = useTheme();
    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');
    const headerData = data?.data?.[0];


    // Load comments from localStorage
    useEffect(() => {
        const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
        setComments(savedComments);
    }, []);

    // Save comments to localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("comments", JSON.stringify(comments));
        }
    }, [comments]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, img: reader.result }); // store for backend or localStorage
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.message) {
            return alert("Name and Message are required!");
        }

        const newComment = {
            id: Date.now(),
            ...formData,
        };

        setComments([newComment, ...comments]);
        setFormData({ name: "", email: "", phone: "", message: "", img: "" }); // reset form
    };
    return (
        <>
            <section className="shadow-sm mb-5" style={{
                backgroundColor: "#F3F2EE",
                paddingTop: "100px",
                paddingBottom: "150px",
            }}>
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            {/* Blog Title */}
                            <h2 className="fw-bold mb-3" style={{ color: theme.palette.text.stableText }}>
                                {headerData?.blogDetailTitle}
                            </h2>

                            {/* Meta Info */}
                            <div className="mb-4" style={{ color: theme.palette.text.stableText }}>
                                <span>{headerData?.blogDetaiSub1}</span> | <span>{headerData?.blogDetaiSub2}</span> |
                                <span> {headerData?.blogDetaiSub3} </span>
                            </div>

                            {/* Blog Image */}

                        </Col>
                    </Row>
                </Container>
            </section >
            <div style={{ marginTop: "-175px" }}>
                <Container>
                    <Row className="justify-content-center ">
                        <Col lg={9}>
                            <div className="rounded overflow-hidden">
                                <img
                                    src="http://localhost:1337/uploads/blogdetails_BG_c02c1e5599.jpg"
                                    alt="Blog preview"
                                    width={1200}
                                    height={600}
                                    className="img-fluid w-100 rounded"
                                />
                            </div>
                        </Col>
                        <Col lg={9}>
                            <section className="py-5">
                                <Container>
                                    <Row>
                                        {/* Social Share Column */}
                                        <Col md={1} className="d-flex flex-row flex-md-column align-items-center mt-3 gap-3">
                                            <h6 className="mb-0 mb-md-3 fw-bold">{headerData?.share}</h6>
                                            {headerData?.blogDetailIcons.map((item, idx) => {
                                                const iconsMap = {
                                                    FaFacebookF: FaFacebookF,
                                                    FaTwitter: FaTwitter,
                                                    FaYoutube: FaYoutube,
                                                    FaLinkedinIn: FaLinkedinIn,
                                                };
                                                const Icon = iconsMap[item.icon];
                                                return (
                                                    <a
                                                        key={idx}
                                                        href={item.href}
                                                        className="text-decoration-none text-dark fs-5"
                                                    >
                                                        <Icon
                                                            className={`${item.className} text-white p-2 rounded-circle`}
                                                            size={36}
                                                        />
                                                    </a>
                                                );
                                            })}
                                        </Col>

                                        <Col md={11}>
                                            <p style={{ lineHeight: 3 }}><strong>{headerData?.Tivora}</strong>
                                                {headerData?.firstBlogDetailText}
                                            </p>
                                            <p style={{ lineHeight: 3 }}>{headerData?.secondBlogDetailText}</p>



                                            <div className="p-4 mt-4 rounded shadow-sm position-relative" style={{ backgroundColor: "#f3f2ee" }}>
                                                <span className="position-absolute top-0  translate-middle bg-danger text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", left: "15%" }}>
                                                    <FaQuoteLeft />
                                                </span>
                                                <blockquote className="fst-italic mb-2 mt-3 py-3" style={{ color: theme.palette.text.modeText }}>
                                                    {headerData?.blockquote}
                                                </blockquote>
                                                <p className="text-danger fw-bold mb-0">{headerData?.blockquoteName}</p>
                                            </div>
                                            <p className="mt-3" style={{
                                                lineHeight: 3
                                            }}>
                                                {headerData?.thirdBlogDetailText}
                                            </p>
                                            <p style={{
                                                lineHeight: 3
                                            }}>
                                                {headerData?.fourthBlogDetailText}
                                            </p>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex gap-3 align-items-center">
                                                    <img src={'http://localhost:1337/uploads/blog_author_b7d5577f96.jpg'} className="rounded-circle" />
                                                    <h6 className="mb-0">{headerData?.blockquoteimageName}</h6>
                                                </div>
                                                <div className="d-flex gap-3 align-items-center">
                                                    {headerData?.blockquoteTending.map((item, index) => {
                                                        return (
                                                            <p key={index} style={{ fontSize: "14px" }}>
                                                                {item}
                                                            </p>
                                                        );
                                                    })}

                                                </div>
                                            </div>
                                            <div className="mt-5">
                                                <h4 className="mb-4 text-center">{headerData?.comments}</h4>

                                                {comments.length === 0 ? (
                                                    <p className="fst-italic text-center" >
                                                        {headerData?.noComments}
                                                    </p>
                                                ) : (
                                                    comments.map((c) => (
                                                        <div
                                                            key={c.id}
                                                            className="d-flex flex-column flex-sm-row align-items-start p-3 mb-3 rounded shadow-sm"
                                                            style={{ backgroundColor: "#fff", border: "1px solid #eaeaea" }}
                                                        >
                                                            {/* Avatar */}
                                                            <img
                                                                src={c.img}
                                                                alt={c.name}
                                                                className="rounded-circle mb-2 mb-sm-0 me-sm-3"
                                                                style={{
                                                                    width: "50px",
                                                                    height: "50px",
                                                                    objectFit: "cover",
                                                                    flexShrink: 0,
                                                                }}
                                                            />

                                                            {/* Comment Content */}
                                                            <div className="flex-grow-1 w-100">
                                                                <div className="d-flex flex-column flex-sm-row justify-content-between">
                                                                    <strong className="text-dark">{c.name}</strong>
                                                                    <small className="text-muted">{c.email || "No email"}</small>
                                                                </div>

                                                                <p className="mb-0 mt-2 text-secondary" style={{ lineHeight: "1.5" }}>
                                                                    {c.message}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>

                                            <h4 className="mb-5 mt-5 text-center"> {headerData?.leaveAComment} </h4>
                                            <div>
                                                <form className="row g-3" onSubmit={handleSubmit}>
                                                    <div className="col-12 col-md-6">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            placeholder="Name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            style={{ color: theme.palette.text.primary }}
                                                            className="form-control bg-transparent p-2"
                                                        />
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <input
                                                            name="phone"
                                                            type="number"
                                                            placeholder="Phone"
                                                            pattern="[0-9]*"
                                                            value={formData.phone}
                                                            style={{ color: theme.palette.text.primary }}
                                                            onChange={handleChange}
                                                            className="form-control bg-transparent p-2 "
                                                        />
                                                    </div>

                                                    <div className="col-12 d-flex align-items-center gap-2 flex-wrap">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            style={{ color: theme.palette.text.primary }}
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className="form-control bg-transparent p-2 w-100 w-lg-75"
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="form-control"
                                                            style={{ maxWidth: "200px" }}
                                                        />
                                                    </div>

                                                    <div className="col-12">
                                                        <textarea
                                                            name="message"
                                                            placeholder="Write Your Message"
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                            className="form-control bg-transparent p-4"
                                                            style={{ minHeight: "180px", maxHeight: "180px", color: theme.palette.text.primary }}
                                                        />
                                                    </div>

                                                    <div className="col-12 text-center">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-dark p-2 mt-3"
                                                            style={{ letterSpacing: "6px" }}
                                                        >
                                                            {headerData?.postComment}
                                                        </button>
                                                    </div>
                                                </form>

                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </section>
                        </Col>
                    </Row>
                </Container>
            </div >
        </>
    );
}
