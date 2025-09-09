'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../../Context/ColorModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DarkModeIcon from '@mui/icons-material/DarkMode';





const ModeButton = () => {
    const theme = useTheme();
    const { toggleColorMode } = useColorMode();
    const [visible, setVisible] = useState(false);
    const panelRef = useRef(null); // ✅ no types needed

    const panelWidth = 50;
    const arrowButtonWidth = 10;
    const peekOffset = 10;

    // ✅ Detect outside clicks
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                setVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={panelRef}
            style={{
                position: "fixed",
                top: 25,
                left: 0,
                zIndex: 9999,
            }}
        >
            {/* Arrow toggle button */}
            <Button
                onClick={() => setVisible(!visible)}
                style={{
                    position: "absolute",
                    left: visible ? panelWidth : -arrowButtonWidth + peekOffset,
                    top: 0,
                    height: "46px",
                    minWidth: `${arrowButtonWidth}px`,
                    padding: 0,
                    borderRadius: "0 4px 4px 0",
                    backgroundColor: "#ccc",
                    zIndex: 1000,
                    transition: "left 0.3s ease",
                }}
            >
                {visible ? (
                    <ArrowBackIosNewIcon fontSize="small" />
                ) : (
                    <ArrowForwardIosIcon fontSize="small" />
                )}
            </Button>

            {/* Panel with theme toggle */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: visible ? 0 : -panelWidth,
                    backgroundColor: theme.palette.background.modeBG,
                    padding: "5px",
                    width: `${panelWidth}px`,
                    height: "fit-content",
                    transition: "left 0.3s ease",
                    overflow: "hidden",
                    borderRadius: "0 0px 0px 0",
                }}
            >
                <Button
                    onClick={toggleColorMode}
                    style={{
                        minWidth: "0px",
                        height: "fit-content",
                        color: theme.palette.text.modeText,
                    }}
                >
                    {theme.palette.mode === "dark" ? (
                        <Brightness7Icon />
                    ) : (
                        <DarkModeIcon />
                    )}
                </Button>
            </div>
        </div>
    )
}

export default ModeButton;
