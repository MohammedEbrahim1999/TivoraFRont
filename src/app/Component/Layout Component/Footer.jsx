// app/components/Footer.js
"use client";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useGetPokemonByNameQuery } from "../../Api/pokemon.js";
import { useTheme, Skeleton, Input } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import emailjs from "emailjs-com";
import { Snackbar, Alert } from "@mui/material";
import { FacebookOutlined, Instagram, Pinterest, Telegram, Twitter, WhatsApp, YouTube } from '@mui/icons-material';


const Footer = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const showMessage = (msg) => {
        setMessage(msg);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage("❌ Please enter a valid email address.");
            return;
        }

        // 1️⃣ Send confirmation email to the subscriber
        emailjs
            .send(
                "service_p7q3mq32025", // your EmailJS service ID
                "template_7noki4m",  // template for subscriber email
                { user_email: email },  // pass subscriber email
                "b7wUOGvFwtCazJ2l3"    // public key
            )
            .then(
                () => {
                    // 2️⃣ Send notification email to yourself/admin
                    emailjs
                        .send(
                            "service_p7q3mq32025", // same service
                            "template_40mbd7y",       // template for admin notification
                            { user_email: email },  // subscriber email
                            "b7wUOGvFwtCazJ2l3"
                        )
                        .then(() => {
                            showMessage("✅ Thank you for subscribing! A confirmation email has been sent.");
                            setEmail(""); // clear input
                        })
                        .catch((err) => {
                            console.error(err);
                            showMessage("❌ Subscription recorded, but failed to notify admin.");
                        });
                },
                (error) => {
                    console.error(error);
                    showMessage("❌ Failed to send confirmation email. Try again later.");
                }
            );
    };
    const theme = useTheme();
    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');

    const headerData = data?.data?.[0];

    // Colors from theme
    const bgColor = theme.palette.mode === "dark" ? theme.palette.background.paper : theme.palette.background.default;
    const textColor = theme.palette.text.primary;
    const secondaryTextColor = theme.palette.text.secondary;
    const borderColor = theme.palette.border.topHeaderBottomColor;
    const icons = {
        FacebookOutlined: FacebookOutlined,
        Twitter: Twitter,
        Instagram: Instagram,
        Pinterest: Pinterest,
        YouTube: YouTube,
        WhatsApp: WhatsApp,
        Telegram: Telegram,
    };
    return (
        <footer style={{ backgroundColor: bgColor, color: textColor }} className="pt-5 pb-4">
            <Container>
                <Row>
                    {/* Left Section */}
                    <Col md={4} className="mb-4">
                        {isLoading ? (
                            <>
                                <Skeleton variant="rectangular" width={120} height={40} className="mb-3" sx={{ bgcolor: theme.palette.action.hover }} />
                                <Skeleton variant="text" width="80%" height={24} sx={{ bgcolor: theme.palette.action.hover }} />
                                <Skeleton variant="text" width="60%" height={24} sx={{ bgcolor: theme.palette.action.hover }} />
                                <Skeleton variant="rectangular" width={150} height={30} className="mt-3" sx={{ bgcolor: theme.palette.action.hover }} />
                            </>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <img
                                        src="http://localhost:1337/uploads/logo_380891d499.png"
                                        alt="Tivora Logo"
                                        style={{
                                            backgroundColor: theme.palette.background.ImgLogo,
                                            height: '40px'
                                        }}
                                        className='p-2 rounded'
                                    />
                                </div>
                                <p style={{ color: secondaryTextColor }} className="mb-3">
                                    {headerData?.WebsiteDes || "Your go-to destination for the latest fashion trends and styles."}
                                </p>
                                <div className="d-flex flex-column gap-3 mt-3">
                                    <h6 style={{ color: textColor }}>Payment Methods</h6>
                                    <div className="d-flex gap-3">
                                        <img src={"http://localhost:1337/uploads/visapayment_bc57938049.svg"} alt="Visa" style={{ width: '45px' }} />
                                        <img src={"http://localhost:1337/uploads/mastercardpayment_50fb0de875.svg"} alt="MasterCard" style={{ width: '45px' }} />
                                        <img src={"http://localhost:1337/uploads/thumbnail_download_25a147731e.jpg"} alt="MasterCard" style={{ width: '45px' }} />
                                    </div>
                                </div>
                            </>
                        )}
                    </Col>

                    {/* Shopping Links */}
                    <Col md={2} className="mb-4">
                        {isLoading ? (
                            <>
                                <Skeleton variant="text" width={100} height={24} className="mb-3" sx={{ bgcolor: theme.palette.action.hover }} />
                                {Array(4).fill(0).map((_, i) => (
                                    <Skeleton key={i} variant="text" width={80} height={20} className="mb-2" sx={{ bgcolor: theme.palette.action.hover }} />
                                ))}
                            </>
                        ) : (
                            <>
                                <h6 className="fw-bold mb-3" style={{ color: textColor }}>{headerData?.discoverWebsite}</h6>
                                <ul style={{ listStyleType: 'square', paddingLeft: "1.2rem" }}>
                                    {headerData?.discoverLinksFooter.map((link, idx) => (
                                        <li className='mb-3' key={idx}>
                                            <a href={link.link} style={{ color: secondaryTextColor }} className="text-decoration-none">
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Col>

                    {/* Help Links */}
                    <Col md={3} className="mb-4">
                        {isLoading ? (
                            <>
                                <Skeleton variant="text" width={120} height={24} className="mb-3" sx={{ bgcolor: theme.palette.action.hover }} />
                                {Array(4).fill(0).map((_, i) => (
                                    <Skeleton key={i} variant="text" width="70%" height={20} className="mb-2" sx={{ bgcolor: theme.palette.action.hover }} />
                                ))}
                            </>
                        ) : (
                            <>
                                <h6 className="fw-bold mb-3" style={{ color: textColor }}>{headerData?.Benfits}</h6>
                                <ul style={{ listStyleType: 'disc', paddingLeft: "1.2rem" }}>
                                    {headerData?.BenfitsData.map((link, idx) => (
                                        <li className='mb-3' style={{ color: secondaryTextColor }} key={idx}>
                                            {link}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Col>

                    {/* Newsletter */}
                    <Col md={3}>
                        {isLoading ? (
                            <>
                                <Skeleton variant="text" width={120} height={24} className="mb-3" sx={{ bgcolor: theme.palette.action.hover }} />
                                <Skeleton variant="text" width="100%" height={20} sx={{ bgcolor: theme.palette.action.hover }} />
                                <Skeleton variant="rectangular" width="100%" height={40} className="mt-2" sx={{ bgcolor: theme.palette.action.hover }} />
                            </>
                        ) : (
                            <>
                                <h6 className="fw-bold mb-3" style={{ color: textColor }}>{headerData?.news}</h6>
                                <p style={{ color: secondaryTextColor }}>{headerData?.newsData}</p>
                                <form onSubmit={handleSubmit} className="d-flex flex-column">
                                    <div className="d-flex align-items-center position-relative">
                                        <Input
                                            type="email"
                                            placeholder="Your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") {
                                                    handleSubmit(); 
                                                }
                                            }}
                                            sx={{
                                                flex: 1,
                                                color: textColor,
                                                "& .MuiInputBase-input": { color: textColor },
                                                "&::placeholder": { color: secondaryTextColor },
                                            }}
                                        />
                                        <button
                                            type="submit"
                                            className="btn rounded-0"
                                            style={{
                                                backgroundColor: theme.palette.background.paper,
                                                borderBottom: `2px solid ${theme.palette.divider}`,
                                            }}
                                        >
                                            <EmailOutlinedIcon style={{ color: textColor }} />
                                        </button>
                                    </div>

                                    <Snackbar
                                        open={open}
                                        autoHideDuration={3000}
                                        onClose={handleClose}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                    >
                                        <Alert
                                            onClose={handleClose}
                                            severity={message.startsWith("✅") ? "success" : "error"}
                                            sx={{ width: "100%" }}
                                        >
                                            {message}
                                        </Alert>
                                    </Snackbar>
                                </form>

                            </>
                        )}
                        {headerData?.media === true ?
                            <>
                                <h3 className='mt-3'>{headerData?.ourMedia}</h3>
                                <div className="d-flex gap-3">
                                    {isLoading ? (
                                        // Skeletons matching number of social items
                                        Array.from(new Array(7)).map((_, index) => (
                                            <Skeleton variant="circular" width={60} height={60} className="mb-3" sx={{ bgcolor: theme.palette.action.hover }} />
                                        ))
                                    ) : (
                                        headerData?.SocialMedia.map((item, index) => {
                                            const IconComponent = icons[item.name]; // pick the right icon
                                            return (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    key={index}
                                                    style={{ marginRight: "4px", color: theme.palette.text.primary }}

                                                >
                                                    {IconComponent ? <IconComponent /> : null}
                                                </a>
                                            );
                                        })
                                    )}

                                </div>
                            </>
                            : null}
                    </Col>
                </Row>

                {/* Bottom Line */}
                <Row className="pt-4 mt-4" style={{ borderTop: `1px solid ${borderColor}` }}>
                    <Col className="text-center" style={{ color: secondaryTextColor }}>
                        {isLoading ? (
                            <Skeleton variant="text" width="60%" height={20} className="mx-auto" sx={{ bgcolor: theme.palette.action.hover }} />
                        ) : (
                            <>
                                {headerData?.copryight}{" "}
                                <span style={{ color: theme.palette.error.main }}>{headerData?.loveHeart}</span>{" "}
                                {headerData?.by}{" "}
                                <a href={headerData?.TeamLink} target='_blank' style={{ color: theme.palette.error.main }} className="text-decoration-none">
                                    {headerData?.TeamName}
                                </a>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
