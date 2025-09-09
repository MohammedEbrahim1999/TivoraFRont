'use client'
import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material';
import { Container, Row, Col, Button } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext.js";
import { Rating } from "@mui/material";
import Lottie from "lottie-react";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { DoneOutlineOutlined } from "@mui/icons-material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useGetPokemonByNameQuery } from "../Api/pokemon.js";


const Favorite = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                onClick={handleClose}
                sx={{ color: 'black' }}
            >
                <DoneOutlineOutlined fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const { addToCart } = useContext(CartContext);

    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("cartItems");
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    });
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);
    const [hovered, setHovered] = useState(null);
    const favoriteProduct = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    const theme = useTheme();
    // ✅ toggle favorite add/remove

    const [favoriteProducts, setFavoriteProducts] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("favoriteProducts");
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    });
    useEffect(() => {
        localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
    }, [favoriteProducts]);
    const handleToggleFavorite = (product) => {
        if (favoriteProducts.some(p => p.id === product.id)) {
            setFavoriteProducts(prev => prev.filter(p => p.id !== product.id));
        } else {
            setFavoriteProducts(prev => [...prev, product]);
        }
    };
    const handleAddToCart = (product) => {
        setCartItems((prev) => {
            const exists = prev.find((p) => p.id === product.id);

            if (exists) {
                // لو موجود: زود الكمية بمقدار 1
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                // لو مش موجود: ضيفه مع quantity 1
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:1337/uploads/empty_4ced33e095.json")
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Error loading Lottie JSON:", err));
    }, []);
    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');

    const headerData = data?.data?.[0];
    return (
        <>
            <div className='py-4 px-3 shadow-sm' style={{ backgroundColor: theme.palette.background.breadcumbBG, color: theme.palette.text.primary }}>
                <Container>
                    <h2> {headerData?.yourFavProducts} </h2>
                    <Breadcrumbs aria-label="breadcrumb" className='ps-2'>
                        <Link underline="hover" color="inherit" href="/">
                            {headerData?.homebread}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/Shop"
                        >
                            {headerData?.shopbread}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/Favorite"
                        >
                            {headerData?.favBread}
                        </Link>
                    </Breadcrumbs>
                </Container>
            </div>
            <div style={{ padding: '2rem' }}>
                {favoriteProduct.length === 0 ? (
                    <Container>
                        <Lottie
                            animationData={animationData}
                            loop={true}
                            autoplay={true}
                            style={{ width: 400, height: 300, margin: "0 auto", backgroundColor: "transparent" }}
                        />
                        <h3 className='text-center mt-3' style={{ color: theme.palette.text.primary }}>{headerData?.noFavProducts}</h3>
                    </Container>
                ) : (
                    <Container>
                        <Row>
                            {favoriteProduct.map((product) => {
                                const isFavorite = favoriteProducts.some(p => p.id === product.id);
                                return (
                                    <Col key={product.id} lg={3} md={4} sm={6} xs={12} className="mb-4">
                                        <div
                                            className="position-relative p-0 rounded p-2 text-center product-card"
                                            onMouseEnter={() => setHovered(product.id)}
                                            onMouseLeave={() => setHovered(null)}
                                        >

                                            {/* Product Image */}
                                            <div className="position-relative overflow-hidden">
                                                {product.tag === "new" ? (
                                                    <div
                                                        className="position-absolute bg-white d-flex align-items-center justify-content-center"
                                                        style={{
                                                            width: "75px",
                                                            height: "30px",
                                                            zIndex: 500,
                                                            left: "0px",
                                                            top: "25px",
                                                            borderRadius: "0 10px 10px 0",
                                                        }}
                                                    >
                                                        <p className="text-dark mb-0">New</p>
                                                    </div>
                                                ) : product.tag === "sale" ? (
                                                    <div
                                                        className="position-absolute d-flex align-items-center justify-content-center bg-danger"
                                                        style={{
                                                            width: "75px",
                                                            height: "30px",
                                                            zIndex: 500,
                                                            left: "0px",
                                                            top: "25px",
                                                            borderRadius: "0 10px 10px 0",
                                                        }}
                                                    >
                                                        <p className="text-white mb-0">Sale</p>
                                                    </div>
                                                ) : null}
                                                <a href={product.link} className="text-decoration-none">

                                                    <img
                                                        src={product.img}
                                                        alt={product.name}
                                                        width={400}
                                                        height={300}
                                                        className="img-fluid"
                                                    />
                                                </a>
                                                {/* Hover Buttons */}
                                                {hovered === product.id && (
                                                    <div className="d-flex flex-column gap-2 position-absolute top-50 end-0 translate-middle-y me-2">
                                                        <Button
                                                            size="sm"
                                                            variant={isFavorite ? "#0f0" : "light"}
                                                            className="rounded shadow "
                                                            onClick={() => handleToggleFavorite(product)}
                                                            style={{
                                                                backgroundColor: isFavorite ? "red" : 'light',
                                                                color: isFavorite ? "#fff" : '#000'
                                                            }}
                                                        >
                                                            <FavoriteBorderIcon fontSize="small" />
                                                        </Button>
                                                        <Button size="sm" variant="light" className="rounded shadow">
                                                            <CompareArrowsIcon fontSize="small" />
                                                        </Button>
                                                        {/* <Button size="sm" variant="light" className="rounded shadow">
                                                        <SearchIcon fontSize="small" />
                                                    </Button> */}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div
                                                className="d-flex shadow-sm rounded-bottom p-2 flex-column align-items-start gap-1"
                                                style={{
                                                    minHeight: '100px',
                                                    backgroundColor: theme.palette.background.paper,
                                                    color: theme.palette.text.primary,
                                                }}
                                            >
                                                {hovered === product.id ? (
                                                    <Button variant="outlined" size="sm" className="fw-bold"
                                                        onClick={() => {
                                                            handleAddToCart(product);   // pass product here
                                                            addToCart(product.price);   // still update context with price
                                                            handleClick();
                                                        }}
                                                    >
                                                        + Add To Cart
                                                    </Button>
                                                ) : (
                                                    <p className="mb-1">{product.name}</p>
                                                )}
                                                <Rating defaultValue={product.rating} precision={0.5} readOnly />
                                                <p className="fw-bold">${product.price}</p>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                        <Snackbar
                            open={open}
                            autoHideDuration={100000}
                            onClose={handleClose}
                            message="Product added to cart Successfully"
                            action={action}
                            className="p-0 rounded"
                            sx={{
                                backgroundColor: theme.palette.background.snackBG,
                                width: "fit-content",
                                ".css-12nna4x-MuiPaper-root-MuiSnackbarContent-root": {
                                    backgroundColor: theme.palette.background.snackBG,
                                    color: "#000",
                                }
                            }}
                        />
                    </Container>
                )}
                <style jsx>{`
                .product-card {
                  transition: all 0.3s ease;
                }
            `}</style>
            </div>
        </>

    )
}

export default Favorite
