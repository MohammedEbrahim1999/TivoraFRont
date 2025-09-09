'use client'
import React, { useState, useEffect } from 'react'
import { useGetPokemonByNameQuery } from "../../Api/pokemon.js";
import { useTheme, Skeleton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Form } from "react-bootstrap";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext.js";




const MainHeader = () => {
    const pathname = usePathname();
    const [showCurtain, setShowCurtain] = useState(false);
    const router = useRouter();
    const toggleCurtain = () => setShowCurtain(prev => !prev);
    const [searchText, setSearchText] = useState("");
    const { cartTotalPrice } = useContext(CartContext);
    useEffect(() => {
        const savedText = localStorage.getItem("searchText");
        if (savedText) setSearchText(savedText);
    }, []);

    useEffect(() => {
        localStorage.setItem("searchText", searchText);
    }, [searchText]);
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText.trim() === "") return;
        localStorage.setItem("searchText", searchText);
        router.push(`/Search?q=${encodeURIComponent(searchText)}`);
        setShowCurtain(false);
        setSearchText("");
    };

    const theme = useTheme();
    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');
    const [menuOpen, setMenuOpen] = useState(false);

    const headerData = data?.data?.[0];

    return (
        <>
            <header
                className=' '
                style={{
                    backgroundColor: theme.palette.background.topHeaderBG,
                    position: "sticky",
                    top: 37,
                    zIndex: 1001,
                }}
            >
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center py-2">

                        {/* Logo */}
                        <a href="/" className='text-decoration-none'>
                            {isLoading ? (
                                <Skeleton variant="rectangular" width={120} height={40} />
                            ) : (
                                <img
                                    src="http://localhost:1337/uploads/logo_380891d499.png"
                                    alt="Tivora Logo"
                                    style={{ backgroundColor: "#FFF", height: '40px' }}
                                    className='p-2 rounded'
                                />
                            )}
                        </a>

                        {/* Desktop Nav Links */}
                        <nav className="d-none d-lg-flex gap-4">
                            {isLoading ? (
                                Array(4).fill(0).map((_, i) => (
                                    <Skeleton key={i} variant="text" width={60} height={24} />
                                ))
                            ) : (
                                headerData.mainHeaderLinks.map((item, index) => {
                                    const isActive = pathname === item.link;

                                    return (
                                        <a
                                            href={item.link}
                                            key={index}
                                            className='text-decoration-none pb-1'
                                            style={{
                                                color: theme.palette.text.primary,
                                                borderBottom: isActive ? `2px solid ${theme.palette.primary.main}` : 'none',
                                                transition: 'border-bottom 0.2s ease'
                                            }}
                                        >
                                            {item.name}
                                        </a>
                                    );
                                })
                            )}
                        </nav>

                        {/* Icons */}
                        <div className="d-flex gap-3 align-items-center">
                            {isLoading ? (
                                <>
                                    <Skeleton variant="circular" width={24} height={24} />
                                    <Skeleton variant="circular" width={24} height={24} />
                                    <Skeleton variant="text" width={40} height={20} />
                                    <Skeleton variant="circular" width={32} height={32} />
                                </>
                            ) : (
                                <>
                                    <a
                                        href="#"
                                        type="button"
                                        className="text-decoration-none"
                                        onClick={(e) => { e.preventDefault(); toggleCurtain(); }}
                                        style={{ color: theme.palette.text.primary }}
                                    >
                                        <SearchOutlined />
                                    </a>
                                    <a href="/Favorite" className='d-none d-sm-flex' style={{ color: theme.palette.text.primary }}><FavoriteBorderIcon /></a>
                                    <a href="/Cart" className="d-flex align-items-center gap-2 text-decoration-none" style={{ color: theme.palette.text.primary }}>
                                        <ShoppingBagOutlinedIcon />
                                        <p className="mb-0">{cartTotalPrice} EP</p>
                                    </a>

                                    {/* Mobile Menu Toggle */}
                                    <button
                                        className="btn d-lg-none p-0"
                                        onClick={() => setMenuOpen(!menuOpen)}
                                    >
                                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    {menuOpen && !isLoading && (
                        <div className="d-lg-none pb-3 position-absolute w-100" style={{ left: 0, zIndex: 1000, backgroundColor: theme.palette.background.default }}>
                            {headerData.mainHeaderLinks.map((item, index) => (
                                <div className="container ps-4" key={index}>
                                    <a
                                        href={item.link}
                                        className='d-block py-2 text-decoration-none'
                                        style={{ color: theme.palette.text.primary }}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                </div>
                            ))}
                            <div className="container ps-4 d-flex gap-3 align-items-center">
                                <a href="/Favorite" className='d-flex d-sm-none text-decoration-none' style={{ color: theme.palette.text.primary }}> Favorite Items  </a>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Search Curtain */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: showCurtain ? "100%" : "0%",
                    overflow: "hidden",
                    backgroundColor: "black",
                    zIndex: 9999,
                    transition: "height 0.5s ease",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <div style={{ position: "absolute", top: "20px", right: "50%" }}>
                    <CloseIcon

                        onClick={() => setShowCurtain(false)}
                        sx={{ backgroundColor: "rgba(255,255,255,0.2)", cursor: "pointer", color: "#FFF", borderRadius: "50%", width: "4rem", height: "4rem" }}
                    />
                </div>

                <Container className="text-center">
                    <Form onSubmit={handleSearch}>
                        <Form.Control
                            type="text"
                            placeholder="Search here....."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{
                                background: "transparent",
                                color: "white",
                                border: "none",
                                borderBottom: "1px solid gray",
                                fontSize: "1.5rem",
                                textAlign: "center",
                            }}
                        />
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default MainHeader;
