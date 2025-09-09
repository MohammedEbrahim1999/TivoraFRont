'use client'
import React, { useState, useEffect, useContext } from 'react'
import { useTheme } from '@mui/material';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { CartContext } from "../Context/CartContext.js";
import Lottie from "lottie-react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Delete } from '@mui/icons-material';
import { useGetPokemonByNameQuery } from "../Api/pokemon.js";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation.js';

const Page = () => {
    const router = useRouter();
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
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const [open1, setOpen1] = React.useState(false);

    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const action1 = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose1}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const [open2, setOpen2] = React.useState(false);

    const handleClick2 = () => {
        setOpen2(true);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
    };

    const action2 = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose1}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    const [couponCode, setCouponCode] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("couponCode") || "";
        }
        return "";
    });

    const [discount, setDiscount] = useState(() => {
        if (typeof window !== "undefined") {
            return parseInt(localStorage.getItem("couponDiscount")) || 0;
        }
        return 0;
    });

    const { addToCart } = useContext(CartContext);
    const { removeFromCart } = useContext(CartContext);

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

    const theme = useTheme();

    // ✅ Add item to cart
    const handleAddToCart = (item) => {
        setCartItems((prev) => {
            const exists = prev.find((p) => p.id === item.id);

            if (exists) {
                return prev.map((p) =>
                    p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:1337/uploads/cart_9c7151d9ef.json")
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Error loading Lottie JSON:", err));
    }, []);
    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');

    const headerData = data?.data?.[0];
    const totalPrice = localStorage.getItem("cartTotalPrice");
    // ✅ Increase / Decrease quantity
    const updateQuantity = (id, type) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity:
                                type === "increase"
                                    ? item.quantity + 1
                                    : item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0) // remove if 0
        );
    };

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // ✅ Subtotal calculation (price * quantity)
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shipping = subtotal === 0
        ? 0
        : subtotal > 0 && subtotal < 500
            ? headerData?.shippingUnder500
            : subtotal > 500 && subtotal < 1500
                ? headerData?.shippingOver500
                : headerData?.FreeShipp;
    const total = subtotal + shipping;




    const applyCoupon = () => {
        const found = headerData?.couponJson.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
        if (found) {
            setDiscount(found.discount);
            localStorage.setItem("couponCode", found.code);
            localStorage.setItem("couponDiscount", found.discount);
            handleClick1();
        } else {
            setDiscount(0);
            localStorage.removeItem("couponCode");
            localStorage.removeItem("couponDiscount");
            // alert("Invalid coupon");
            handleClick();
        }
    };

    const removeCoupon = () => {
        setCouponCode("");
        setDiscount(0);
        localStorage.removeItem("couponCode");
        localStorage.removeItem("couponDiscount");
    };
    const discountedTotal = total - (total * discount / 100);
    const logInStatus = localStorage.getItem("isLoggedIn");
    const handleCheck = () => {
        if (logInStatus === true) {
            router.push("/Payment");
        } else {
            handleClick2(); // optional, if you want to show a message immediately
            setTimeout(() => {
                router.push("/Signin");
            }, 10000); // 30000 ms = 30 seconds
        }
    };

    return (
        <>
            {/* Breadcrumb Section */}
            <div
                className="py-4 px-3 shadow-sm"
                style={{
                    backgroundColor: theme.palette.background.breadcumbBG,
                    color: theme.palette.text.primary,
                }}
            >
                <Container>
                    <h2>{headerData?.shoppingCart}</h2>
                    <Breadcrumbs aria-label="breadcrumb" className="ps-2">
                        <Link underline="hover" color="inherit" href="/">
                            {headerData?.homebread}
                        </Link>
                        <Link underline="hover" color="inherit" href="/Shop">
                            {headerData?.shopbread}
                        </Link>
                        <Link underline="hover" color="inherit" href="/Cart">
                            {headerData?.cartBread}
                        </Link>
                    </Breadcrumbs>
                </Container>
            </div>

            {/* Cart Section */}
            <div className="container" style={{ padding: "2rem" }}>
                <Row>
                    {/* Products Section */}
                    <Col md={8}>
                        <Row className="fw-bold border-bottom pb-2">
                            <Col md={6}>{headerData?.PRODUCT}</Col>
                            <Col md={2}>{headerData?.QUANTITY}</Col>
                            <Col md={2}>{headerData?.TOTAL}</Col>
                            <Col md={2}></Col>
                        </Row>

                        {cartItems.length === 0 ? (
                            <div className="text-center d-flex gap-2 align-items-center justify-content-center flex-column my-1">
                                <Lottie
                                    animationData={animationData}
                                    loop={true}
                                    autoplay={true}
                                    style={{
                                        width: 250,
                                        height: 250,
                                        backgroundColor: "transparent",
                                    }}
                                />
                                <h2>{headerData?.cartEmpty}</h2>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <Row
                                    key={item.id}
                                    className="align-items-center py-3 border-bottom"
                                >
                                    {/* Product Info */}
                                    <Col
                                        md={6}
                                        className="d-flex align-items-center"
                                    >
                                        <a href={item.link} className="text-decoration-none">

                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                                className="me-3"
                                            />
                                        </a>
                                        <div>
                                            <h6 className="mb-1">{item.name}</h6>
                                            <p className="text-muted mb-0">
                                                {item.price} EP
                                            </p>
                                        </div>
                                    </Col>

                                    {/* Quantity */}
                                    <Col md={2}>
                                        <div className="d-flex align-items-center">
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="fs-4"
                                                onClick={() => {
                                                    updateQuantity(
                                                        item.id,
                                                        "decrease"
                                                    );
                                                    removeFromCart(item.price);
                                                }}
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="fs-4"
                                                onClick={() => {
                                                    updateQuantity(
                                                        item.id,
                                                        "increase"
                                                    );
                                                    addToCart(item.price);
                                                }
                                                }
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </Col>

                                    {/* Total Price */}
                                    <Col Col md={2} >
                                        {(item.price * item.quantity).toFixed(2)} EP
                                    </Col>

                                    {/* Remove Button */}
                                    <Col md={2}>
                                        <Button
                                            variant="light"
                                            onClick={() => {
                                                removeItem(item.id); removeFromCart(item.price * item.quantity);
                                            }}
                                        >
                                            <Delete />
                                        </Button>
                                    </Col>
                                </Row>
                            ))
                        )}

                        <div className="d-flex justify-content-end mt-4">
                            <Button href="/" variant="outline-dark">
                                {headerData?.continueShopping}
                            </Button>
                            {/* <Button variant="dark">UPDATE CART</Button> */}
                        </div>
                    </Col>

                    {/* Cart Summary */}
                    <Col md={4}>
                        <div className="p-4 bg-transparent">
                            <h6>{headerData?.DISCOUNTCODES}</h6>
                            <Form className="d-flex mb-3" onSubmit={(e) => { e.preventDefault(); applyCoupon(); }}>
                                <Form.Control
                                    type="text"
                                    placeholder={headerData?.couponCode}
                                    value={couponCode}
                                    disabled={discount > 0}

                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <Button variant="dark" className="ms-2" onClick={applyCoupon}>
                                    {headerData?.ApplyCode}
                                </Button>
                                {discount > 0 && (
                                    <Button variant="outline-danger" className="ms-2" onClick={removeCoupon}>
                                        {headerData?.removeCoupon}
                                    </Button>
                                )}
                            </Form>

                            <h6 className="border-top pt-3">{headerData?.CARTTOTAL}</h6>
                            <div className="d-flex flex-column gap-2">
                                <div className="d-flex justify-content-between">
                                    <span>{headerData?.Subtotal}</span>
                                    <span className="text-danger">{subtotal} EP</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Shipping:</span>
                                    <span className='text-danger'>{shipping} EP</span>
                                </div>
                                {discount > 0 && (
                                    <div className="d-flex justify-content-between">
                                        <span>Discount ({discount}%)</span>
                                        <span className="text-success">- {((total * discount) / 100).toFixed(2)} EP</span>
                                    </div>
                                )}
                                <div className="d-flex justify-content-between">
                                    <span>{headerData?.TotalCart}</span>
                                    <span className="text-danger">
                                        {discountedTotal.toFixed(2)} EP
                                    </span>
                                </div>
                                <Button variant="dark" className="w-100 mt-3" disabled={cartItems.length === 0 || logInStatus === false} onClick={handleCheck}>
                                    {headerData?.goToCheckout}
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row >
            </div >
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={headerData?.invalidCoupon}
                action={action}
                sx={{
                    "& .css-12nna4x-MuiPaper-root-MuiSnackbarContent-root": {
                        backgroundColor: "#dc3545 !important",
                        color: "#FFF",
                        textTransform: "capitalize !important"
                    }
                }}
            />
            <Snackbar
                open={open1}
                autoHideDuration={3000}
                onClose={handleClose1}
                message={headerData?.couponGood}
                action={action1}
                sx={{
                    "& .css-12nna4x-MuiPaper-root-MuiSnackbarContent-root": {
                        backgroundColor: "#198754 !important",
                        color: "#FFF"
                    }
                }}
            />
            <Snackbar
                open={open2}
                autoHideDuration={3000}
                onClose={handleClose2}
                message="Log in to securely complete your checkout. "
                action={action2}

                sx={{
                    "& .css-12nna4x-MuiPaper-root-MuiSnackbarContent-root": {
                        backgroundColor: "#198754 !important",
                        color: "#FFF"
                    }
                }}
            />
        </>
    );
};

export default Page;
