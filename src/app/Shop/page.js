'use client'
import React, { useState, useEffect } from 'react'
import { useTheme, Rating } from '@mui/material';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useGetPokemonByNameQuery } from "../Api/pokemon.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext.js";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { DoneOutlineOutlined } from "@mui/icons-material";



const page = () => {
    // Add TGO Cart
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
    const [open, setOpen] = useState(false);

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
                sx={{ color: '#FFF' }}
            >
                <DoneOutlineOutlined fontSize="small" />
            </IconButton>
        </React.Fragment>
    );





    const theme = useTheme();
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [hovered, setHovered] = useState(null);
    const [gender, setGender] = useState("");
    const [tag, setTag] = useState("");
    const [rate, setRate] = useState(""); // "" means all
    const router = useRouter();
    const { addToCart } = useContext(CartContext);

    const [favoriteProducts, setFavoriteProducts] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("favoriteProducts");
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    });
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favoriteProducts");
        if (storedFavorites) {
            try {
                const parsed = JSON.parse(storedFavorites);
                setFavoriteProducts(Array.isArray(parsed) ? parsed : []);
            } catch {
                setFavoriteProducts([]);
            }
        } else {
            setFavoriteProducts([]);
        }
    }, []);

    // Save favorites to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
    }, [favoriteProducts]);


    const handleToggleFavorite = (product) => {
        if (favoriteProducts.some((p) => p.id === product.id)) {
            // remove
            setFavoriteProducts((prev) =>
                prev.filter((p) => p.id !== product.id)
            );
        } else {
            // add
            setFavoriteProducts((prev) => [...prev, product]);
        }
    };
    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');
    const headerData = data?.data?.[0];
    console.log(headerData)
    const productsData = headerData?.products || [];
    console.log(productsData)
    const filteredProducts = productsData.filter((p) => {
        return (
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            p.price >= priceRange[0] &&
            p.price <= priceRange[1] &&
            (gender ? p.gender === gender : true) &&
            (tag ? p.tag === tag : true) &&
            (
                rate === "" ? true :
                    rate === "more" ? p.rating > 2.5 :
                        rate === "less" ? p.rating <= 2.5 :
                            true
            )
        );
    });
    const menCount = headerData?.products.filter(
        (p) => p.gender.toLowerCase() === "men"
    ).length;
    const womanCount = headerData?.products.filter(
        (p) => p.gender.toLowerCase() === "woman"
    ).length;
    const allCount = headerData?.products.filter(
        (p) => p.gender?.toLowerCase() === "woman" || p.gender?.toLowerCase() === "men"
    ).length;
    const allOffers = headerData?.products.filter(
        (p) => p.tag?.toLowerCase() === "best" || p.tag?.toLowerCase() === "sale" || p.tag?.toLowerCase() === "new"
    ).length;
    const bestOffers = headerData?.products.filter(
        (p) => p.tag?.toLowerCase() === "best"
    ).length;
    const saleOffers = headerData?.products.filter(
        (p) => p.tag?.toLowerCase() === "sale"
    ).length;
    const newOffers = headerData?.products.filter(
        (p) => p.tag?.toLowerCase() === "new"
    ).length;
    
    return (
        <>
            <div className='py-4 px-3 shadow-sm mb-5' style={{ backgroundColor: theme.palette.background.breadcumbBG, color: theme.palette.text.primary }}>
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
                    </Breadcrumbs>
                </Container>
            </div>
            <Container className="my-4 ">
                <Row>
                    {/* Sidebar Filters */}
                    <Col md={3}>
                        <h5 className="fw-bold">Search</h5>
                        <Form.Control
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="mb-3"
                        />

                        <h5 className="fw-bold mt-4">Filter by Price</h5>
                        <Form.Range
                            min={0}
                            max={1000}
                            step={5}
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                        />
                        <p>
                            Price: ${priceRange[0]} - ${priceRange[1]}
                        </p>

                        <h5 className="fw-bold mt-4">Filter by Gender</h5>
                        <Form.Check
                            type="radio"
                            label={`All (${allCount})`}
                            id="all"
                            name="gender"
                            checked={gender === ""}
                            onChange={() => setGender("")}
                        />
                        <Form.Check
                            type="radio"
                            label={`Men (${menCount})`}
                            id="men"
                            name="gender"
                            checked={gender === "men"}
                            onChange={() => setGender("men")}
                        />
                        <Form.Check
                            type="radio"
                            label={`Woman (${womanCount})`}
                            id="woman"
                            name="gender"
                            checked={gender === "woman"}
                            onChange={() => setGender("woman")}
                        />
                        <h5 className='fw-bold mt-4'>Filter By Offers</h5>
                        <Form.Check
                            type="radio"
                            label={`All (${allOffers})`}
                            id="all off"
                            name="tag"
                            checked={tag === ""}
                            onChange={() => setTag("")}
                        />
                        <Form.Check
                            type="radio"
                            label={`Best Seller (${bestOffers})`}
                            id="best"
                            name="tag"
                            checked={tag === "best"}
                            onChange={() => setTag("best")}
                        />
                        <Form.Check
                            type="radio"
                            label={`Sale (${saleOffers})`}
                            id="sale"
                            name="tag"
                            checked={tag === "sale"}
                            onChange={() => setTag("sale")}
                        />
                        <Form.Check
                            type="radio"
                            label={`New Arrival (${newOffers})`}
                            id="new"
                            name="tag"
                            checked={tag === "new"}
                            onChange={() => setTag("new")}
                        />
                        <h5 className='fw-bold mt-4'>Filter By Rating</h5>
                        <Form.Check
                            type="radio"
                            label="All"
                            id="allRate"
                            name="rate"
                            checked={rate === ""}
                            onChange={() => setRate("")}
                        />
                        <Form.Check
                            type="radio"
                            label="More Than 2.5"
                            id="moreRate"
                            name="rate"
                            checked={rate === "more"}
                            onChange={() => setRate("more")}
                        />
                        <Form.Check
                            type="radio"
                            label="Less Than 2.5"
                            id="lessRate"
                            name="rate"
                            checked={rate === "less"}
                            onChange={() => setRate("less")}
                        />

                    </Col>

                    <Col md={9}>
                        <Row>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <Col
                                        key={product.id}
                                        lg={4}
                                        md={4}
                                        sm={6}
                                        xs={12}
                                        className="mb-4"
                                    >
                                        <div
                                            className="position-relative rounded p-0 text-center product-card"
                                            onMouseEnter={() => setHovered(product.id)}
                                            onMouseLeave={() => setHovered(null)}
                                        >
                                            <div className="position-relative overflow-hidden">
                                                {/* Product Tag */}
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
                                                        className="img-fluid rounded-top"
                                                        style={{ height: "250px", objectFit: "cover" }}
                                                    />
                                                </a>
                                                {hovered === product.id && (
                                                    <div className="d-flex flex-column gap-2 position-absolute top-50 end-0 translate-middle-y me-2">
                                                        {/* ❤️ Button */}
                                                        <Button
                                                            size="md"
                                                            variant="light"
                                                            className="rounded shadow"
                                                            onClick={() => handleToggleFavorite(product)}
                                                            style={{
                                                                backgroundColor: favoriteProducts.some(
                                                                    (p) => p.id === product.id
                                                                )
                                                                    ? "red"
                                                                    : "white",
                                                                color: favoriteProducts.some(
                                                                    (p) => p.id === product.id
                                                                )
                                                                    ? "white"
                                                                    : "black",
                                                            }}
                                                        >
                                                            <FavoriteBorderIcon fontSize="small" />
                                                        </Button>

                                                        <Button
                                                            size="md"
                                                            variant="light"
                                                            className="rounded shadow"
                                                        >
                                                            <CompareArrowsIcon fontSize="small" />
                                                        </Button>
                                                        <Button
                                                            size="md"
                                                            variant="light"
                                                            className="rounded shadow"
                                                            onClick={() => {
                                                                router.push(`/Search?q=${encodeURIComponent(product.name)}`);
                                                            }}
                                                        >
                                                            <SearchIcon fontSize="small" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div
                                                className="d-flex shadow-sm rounded-bottom p-2 flex-column align-items-start gap-1"
                                                style={{
                                                    backgroundColor: theme.palette.background.paper,
                                                    color: theme.palette.text.primary,
                                                    minHeight: "135px"
                                                }}
                                            >
                                                <div className="name-cart-toggle">
                                                    {hovered === product.id ? (
                                                        <Button
                                                            variant="outlined"
                                                            size="md"
                                                            className="fw-bold text-start ps-0 fade-in"
                                                            style={{ width: "fit-content", color: theme.palette.text.primary }}
                                                            onClick={() => { addToCart(product.price), handleClick(), handleAddToCart(product) }}  // 👈 add this
                                                        >
                                                            + Add To Cart
                                                        </Button>
                                                    ) : (
                                                        <p className="mb-0 text-start w-100 fade-in">
                                                            {product.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <Rating
                                                    defaultValue={product.rating}
                                                    precision={0.5}
                                                    readOnly
                                                    className="mb-2"
                                                />
                                                <div className="d-flex gap-2">
                                                    {product.sale === true ? (
                                                        <>
                                                            <p className="fw-bold">{product.price} EP</p>
                                                            <del>{product.salePrice} EP</del>
                                                        </>
                                                    ) : (
                                                        <p className="fw-bold">{product.price} EP</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                <p>No products found</p>
                            )}
                        </Row>
                    </Col>
                </Row >
            </Container >
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Product added to cart Successfully"
                action={action}
                className="p-0 rounded"
                sx={{
                    backgroundColor: theme.palette.background.snackBG,
                    width: "fit-content",
                    ".css-12nna4x-MuiPaper-root-MuiSnackbarContent-root": {
                        backgroundColor: theme.palette.background.snackBG,
                        color: "#FFF",
                    }
                }}
            />
        </>
    )
}

export default page
