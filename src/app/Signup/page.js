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
    IconButton,
    InputAdornment,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function Page() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [agree, setAgree] = useState(false);

    const handleConfirmBlur = () => {
        if (confirmPassword && confirmPassword !== password) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    };

    // Save user data to localStorage
    const handleSignUp = () => {
        // Get existing users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem("user")) || [];

        // Generate a new ID
        const newId = existingUsers.length > 0
            ? existingUsers[existingUsers.length - 1].id + 1
            : 1;

        // Create new user object
        const newUser = {
            id: newId,
            firstName,
            lastName,
            email,
            password,
        };

        // Add new user to existing array
        existingUsers.push(newUser);

        // Save updated array back to localStorage
        localStorage.setItem("user", JSON.stringify(existingUsers));

        alert("Account created successfully! 🎉 Now you can log in.");
        window.location.href = "/Signin"; // redirect to login page
    };



    return (
        <Container fluid className="vh-100 d-flex p-0">
            <Row className="flex-grow-1 w-100 m-0">
                {/* Left Panel */}
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
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(135deg, rgba(20,30,48,0.85), rgba(36,59,85,0.85))",
                        }}
                    ></div>

                    {/* Brand */}
                    <div
                        style={{
                            position: "absolute",
                            top: "30px",
                            left: "40px",
                            zIndex: 2,
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{ cursor: "pointer" }}
                            onClick={() => (window.location.href = "/")}
                        >
                            TIVORA
                        </Typography>
                    </div>

                    {/* Hero */}
                    <div
                        style={{ position: "relative", zIndex: 2 }}
                        className="text-center px-4"
                    >
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            gutterBottom
                            sx={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
                        >
                            Join TIVORA
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ opacity: 0.9, maxWidth: "420px", mx: "auto" }}
                        >
                            Create your account today and unlock our premium
                            collection of Watches & Glasses.
                        </Typography>
                    </div>
                </Col>

                {/* Right Panel */}
                <Col
                    md={6}
                    className="d-flex flex-column py-3 justify-content-center align-items-center"
                    style={{
                        background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
                    }}
                >
                    <Paper
                        elevation={8}
                        className="p-4 w-100"
                        style={{
                            maxWidth: "480px",
                            borderRadius: "24px",
                            backdropFilter: "blur(20px)",
                            background: "rgba(255,255,255,0.95)",
                            animation: "fadeIn 0.6s ease-in-out",
                        }}
                    >
                        {/* Title */}
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            align="center"
                            gutterBottom
                        >
                            Create Account
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                            gutterBottom
                        >
                            Start your journey with TIVORA in just a few steps
                        </Typography>

                        {/* Inputs */}
                        <Row>
                            <Col xs={12} md={6}>
                                <TextField
                                    label="First Name"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <TextField
                                    label="Last Name"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <TextField
                            label="Email Address"
                            type="email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Confirm Password"
                            type={showConfirm ? "text" : "password"}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={handleConfirmBlur}
                            error={!!error}
                            helperText={error}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowConfirm(!showConfirm)
                                            }
                                        >
                                            {showConfirm ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Terms */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                />
                            }
                            label={
                                <Typography variant="body2" color="text.secondary">
                                    I agree to the{" "}
                                    <a
                                        href="/terms"
                                        style={{
                                            color: "#6366f1",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Terms & Conditions
                                    </a>
                                </Typography>
                            }
                            sx={{ mt: 1 }}
                        />

                        {/* Sign Up Button */}
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
                                    background:
                                        "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                                },
                            }}
                            disabled={
                                !!error ||
                                !firstName ||
                                !lastName ||
                                !email ||
                                !password ||
                                !confirmPassword ||
                                !agree
                            }
                            onClick={handleSignUp}
                        >
                            Create Account
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
                                py: 1.3,
                                borderRadius: "12px",
                                fontWeight: 500,
                                bgcolor: "#fff",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    bgcolor: "#f7f7f7",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                },
                            }}
                        >
                            Sign Up with Google
                        </Button>

                        {/* Footer */}
                        <Typography
                            variant="body2"
                            align="center"
                            sx={{ mt: 3, color: "text.secondary" }}
                        >
                            Already have an account?{" "}
                            <a
                                href="/Signin"
                                style={{
                                    color: "#6366f1",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                }}
                            >
                                Sign In
                            </a>
                        </Typography>
                    </Paper>
                </Col>
            </Row>
        </Container>
    );
}
