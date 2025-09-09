"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useGetPokemonByNameQuery } from "../../Api/pokemon.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SearchIcon from "@mui/icons-material/Search";
import { Rating, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext.js";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { DoneOutlineOutlined } from "@mui/icons-material";




export default function Products() {
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
    const [hovered, setHovered] = useState(null);
    const [filter, setFilter] = useState("all");
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const theme = useTheme();
    const { addToCart } = useContext(CartContext);

    const { data, error, isLoading } = useGetPokemonByNameQuery(
        "tivoras?populate=*"
    );
    const headerData = data?.data?.[0];
    const products = headerData?.products || [];

    // Load favorites from localStorage on mount
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

    // Apply filter
    const filteredProducts = products.slice(0, 8).filter((product) => {
        if (filter === "bestseller") return product.bestseller;
        if (filter === "newArrival") return product.newArrival;
        if (filter === "sale") return product.sale;
        return true; // show all if no filter
    });

    // Function to add/remove product from favorites
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
    const router = useRouter();


    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Save cart items to localStorage whenever it changes
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


    return (
        <section className="py-5">
            <Container>
                {/* Products Grid */}
                <Row>
                    <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
                        <Button
                            variant={filter === "all" ? "outline-info" : null}
                            className="fs-4"
                            onClick={() => setFilter("all")}
                            style={{ color: filter === "all" ? "#000" : "#777" }}

                        >
                            All
                        </Button>
                        {products.some(p => p.bestseller) && (

                            <Button
                                variant={filter === "bestseller" ? "outline-info" : null}
                                className="fs-4"
                                onClick={() => setFilter("bestseller")}
                                style={{ color: filter === "besrseller" ? "#000" : "#777" }}

                            >
                                Best Sellers
                            </Button>
                        )}
                        {products.some(p => p.newArrival) && (
                            <Button
                                variant={filter === "newArrival" ? "outline-info" : null}
                                className="fs-4"
                                onClick={() => setFilter("newArrival")}
                                style={{ color: filter === "newArrival" ? "#000" : "#777" }}

                            >
                                New Arrivals
                            </Button>
                        )}
                        {products.some(p => p.sale) && (
                            <Button
                                variant={filter === "sale" ? "outline-info" : null}
                                className="fs-4"
                                onClick={() => setFilter("sale")}
                                style={{ color: filter === "sale" ? "#000" : "#777" }}
                            >
                                Hot Sales
                            </Button>
                        )}

                    </div>
                    {filteredProducts.map((product) => (
                        <Col
                            key={product.id}
                            lg={3}
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
                                    <a href={product.link} className="text-decoration-none cursor-pointer">

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
                    ))}
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
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
                </Row>

            </Container>

            <style jsx>{`
        .product-card {
          transition: all 0.3s ease;
        }
        .name-cart-toggle {
          min-height: 38px;
          display: flex;
          align-items: center;
          justify-content: start;
          width: 100%;
        }
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.3s forwards;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
        </section >
    );
}
