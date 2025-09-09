'use client'
import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { DoneOutlineOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { CartContext } from "../../../Context/CartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useTheme, Tooltip, Button } from "@mui/material";
const ProductDetails = ({
    name,
    price,
    salesPrice,
    isSale,
    gender,
    newArrival,
    sale,
    bestseller,
    rating,
    returns,
    stock,
    sku,
    brand,
    id,
    product
}) => {
    const theme = useTheme();
    // Add To Cart
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



    // Add To Favorite
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
    const isFavorite = favoriteProducts.some(p => p.id === id);
    return (
        <>
            <div className="p-3 rounded-4 shadow-sm bg-white border mt-3">
                {/* Product Title & Price */}
                <div className="d-flex justify-content-between align-items-start gap-1 mb-3">
                    <h4 className="fw-bold text-dark mb-0 product-name">{name}</h4>
                    {isSale ? (
                        <div className="text-end">
                            <p className="text-success fw-bold fs-5 mb-0">{price} EP</p>
                            <p className="text-muted mb-0 fw-bold fs-5" style={{ fontSize: "15px" }}>
                                <del>{salesPrice} EP</del>
                            </p>
                        </div>
                    ) : (
                        <p className="text-success fw-bold fs-5 mb-0">{price} Ep</p>
                    )}
                </div>

                {/* Product Tags */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-semibold">
                        {gender}
                    </span>
                    {newArrival && (
                        <span className="badge bg-danger text-white px-3 py-2 rounded-pill fw-semibold">
                            New Arrival
                        </span>
                    )}
                    {sale && (
                        <span className="badge bg-success text-white px-3 py-2 rounded-pill fw-semibold">
                            Sale
                        </span>
                    )}
                    {bestseller && (
                        <span className="badge bg-info text-white px-3 py-2 rounded-pill fw-semibold">
                            Bestseller
                        </span>
                    )}
                </div>

                {/* Product Rating */}
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2">
                        <Stack spacing={1}>
                            <Rating name="read-only" value={String(rating)} readOnly />
                        </Stack>
                        <span className="text-muted fw-medium">({rating})</span>
                    </div>
                    <div className="d-flex align-items-center  gap-2">
                        <Tooltip title="Add To Cart">
                            <IconButton
                                disabled={stock === 0}
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    border: "1px solid #ddd",
                                    color: "#333",
                                    width: "40px",
                                    height: "40px",
                                    transition: "all 0.2s ease-in-out",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e9ecef")}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                                onClick={() => {
                                    addToCart(product.price);
                                    handleClick();
                                    handleAddToCart(product);
                                }}
                            >
                                <AddShoppingCartIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Add To Favorites">
                            <IconButton
                                    size="sm"
                                    className="d-flex align-items-center justify-content-center rounded-circle shadow-sm border-0"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        transition: "all 0.2s ease-in-out",
                                        backgroundColor: isFavorite ? "red" : "white",
                                        color: isFavorite ? "white" : "black",
                                    }}
                                    variant="light"
                                    onClick={() => handleToggleFavorite(product)}
                                ><FavoriteBorderIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div >
            <div
                className={`p-3 mt-2 mb-4 rounded-3 border ${returns ? "bg-light text-success" : "bg-light text-danger"
                    }`}
            >
                {returns
                    ? "✅ This product is eligible for return and refund."
                    : "❌ This product is not acceptable for return."}
            </div>
            <span className={`text-white rounded p-2 ${stock > 0 ? "bg-success" : "bg-danger"}`}>
                {stock > 0 ? "In Stock" : "Out of Stock"}
            </span>

            <div className="p-3 border mt-3 shadow-sm rounded-3 bg-light">
                <h6 className="fw-bold mb-2 text-black">🚚 Delivery Information</h6>
                <ul className="list-unstyled mb-0">
                    <li className="text-black">📦 Estimated delivery: <strong>3–5 business days</strong></li>
                    <li className="">
                        {price > 250 ? (
                            <span className="text-black fw-semibold">✅ Free Shipping Available</span>
                        ) : (
                            <span className="text-muted">🚚 Shipping charges apply</span>
                        )}
                    </li>
                    <li className="text-black">💵 Cash on Delivery: <span className="fw-semibold">Available</span></li>
                </ul>
            </div>

            <div className="p-3 border mt-2 rounded-3 bg-white">
                <h6 className="fw-bold text-black mb-2">ℹ️ Product Information</h6>
                <ul className="list-unstyled mb-0">
                    <li className="text-black"><strong>Product ID:</strong> {sku}</li>
                    <li className="text-black"><strong>Brand :</strong> {brand}</li>
                </ul>
            </div>
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
            <style>
                {`
                    .product-name {
                        display: -webkit-box;
                        -webkit-line-clamp: 2; /* limit to 2 lines */
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                `}
            </style>
        </>
    );
};

export default ProductDetails;
