"use client";
import { Container, Row, Col } from "react-bootstrap";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Divider,
    Paper,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        // Get stored users array from localStorage
        const storedUsers = JSON.parse(localStorage.getItem("user")) || [];

        if (storedUsers.length === 0) {
            setError("No account found. Please sign up first.");
            localStorage.setItem("isLoggedIn", false);
            return;
        }

        // Find a user that matches the entered email and password
        const matchedUser = storedUsers.find(
            (user) => user.email === email && user.password === password
        );

        if (matchedUser) {
            setError("");
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("currentUser", JSON.stringify(matchedUser)); // optional: store logged-in user
            window.location.href = "/"; // redirect to homepage/dashboard
        } else {
            setError("Invalid email or password. Try again.");
            localStorage.setItem("isLoggedIn", false);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin(); // call your login function
        }
    };
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
        redirect("/"); // يرجع لصفحة الرئيسية مباشرة
    }
    return (
        <Container fluid className="vh-100 d-flex p-0">
            <Row className="flex-grow-1 w-100 m-0">
                {/* Left Panel - Branding */}
                <Col
                    md={6}
                    className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5"
                    style={{
                        backgroundImage: "url(/imgs/illustration.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        color: "#fff",
                    }}
                >
                    {/* Overlay */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(135deg, rgba(20,30,48,0.8), rgba(36,59,85,0.8))",
                        }}
                    ></div>

                    {/* Brand Name */}
                    <div style={{ position: "absolute", top: "30px", left: "40px", zIndex: 2 }}>
                        <Typography
                            component="a"
                            href="/"
                            fontWeight="bold"
                            sx={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            TIVORA
                        </Typography>

                    </div>

                    {/* Hero Message */}
                    <div
                        style={{ position: "relative", zIndex: 2 }}
                        className="text-center px-4"
                    >
                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                            Welcome Back
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: "600px", mx: "auto" }}>
                            Access your TIVORA account and explore premium Watches & Glasses — all in one place.
                        </Typography>
                    </div>
                </Col>

                {/* Right Panel - Sign In Form */}
                <Col
                    md={6}
                    className="d-flex flex-column justify-content-center align-items-center bg-light"
                >
                    <Paper
                        elevation={10}
                        className="p-5 w-100"
                        style={{
                            maxWidth: "420px",
                            borderRadius: "24px",
                            backdropFilter: "blur(20px)",
                            background: "rgba(255,255,255,0.8)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        {/* Title */}
                        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
                            Sign In
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                            gutterBottom
                        >
                            Use your email and password to continue
                        </Typography>

                        {/* Inputs */}
                        <TextField
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />

                        {/* Error Message */}
                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}

                        {/* Options */}
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <FormControlLabel control={<Checkbox />} label="Remember Me" />
                            <Button size="small" sx={{ textTransform: "none", fontWeight: 600 }}>
                                Forgot password?
                            </Button>
                        </div>

                        {/* Sign In */}
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontWeight: "bold",
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                                },
                            }}
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button>

                        {/* Divider */}
                        <Divider sx={{ my: 4 }}>OR</Divider>

                        {/* Google Button */}
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<FcGoogle />}
                            sx={{
                                textTransform: "none",
                                py: 1.2,
                                borderRadius: "12px",
                                fontWeight: 500,
                                bgcolor: "#fff",
                                "&:hover": { bgcolor: "#f7f7f7" },
                            }}
                        >
                            Continue with Google
                        </Button>

                        {/* Footer */}
                        <Typography
                            variant="body2"
                            align="center"
                            sx={{ mt: 4, color: "text.secondary" }}
                        >
                            Don’t have an account?{" "}
                            <a
                                href="/Signup"
                                style={{
                                    color: "#6366f1",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                }}
                            >
                                Sign Up
                            </a>
                        </Typography>
                    </Paper>
                </Col>
            </Row>
        </Container>
    );
}
