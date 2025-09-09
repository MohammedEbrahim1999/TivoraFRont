// theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    background: {
                        default: '#f5f5f5',
                        modeBG: "#000",
                        topHeaderBG: "#FAFAF5",
                        selectBG: "#222222",
                        ImgLogo: "#FFF",
                        paper: "#ffffff",
                        saleBG: "#F3F2EE",
                        snackBG: "#28a745",
                        breadcumbBG: "#F3F2EE",
                    },
                    text: {
                        primary: '#000',
                        modeText: "#FFF",
                        topHeaderText: "#222222",
                        topHeaderLink: "#000000",
                        topHeaderLinkHover: "#C19A6B",
                        topHeaderTextFree: "#0056A3",
                        selectText: "#F5F5F5",
                        selectArrow: "#C19A6B",
                        selectTextHover: "#E0E0E0",
                        secondary: "#555555",
                        saleText: "#aaaaaa",
                        saleText2: "#000000",
                        stableText: "#000"
                    },
                    border: {
                        topHeaderBottomColor: "#E6E6E6"
                    },
                    divider: "#e0e0e0", // added global divider color
                    action: {
                        hover: "#333333",
                        selected: "#444444",
                        disabled: "#555555",
                        disabledBackground: "#222222"
                    },
                    error: {
                        main: "#d32f2f"
                    },
                    success: {
                        main: "#2e7d32"
                    },
                    warning: {
                        main: "#ed6c02"
                    },
                    info: {
                        main: "#0288d1"
                    }
                }
                : {
                    background: {
                        default: '#000',
                        modeBG: "#FFF",
                        topHeaderBG: "#121212",
                        selectBG: "#222222",
                        ImgLogo: "#FFF",
                        paper: "#1e1e1e",
                        saleBg: "#000",
                        snackBG: "#28a745",
                        breadcumbBG: "#1e1e1e",
                    },
                    text: {
                        primary: '#FFF',
                        modeText: "#000",
                        topHeaderText: "#F5F5F5",
                        topHeaderLink: "#FFD700",
                        topHeaderLinkHover: "#00BFFF",
                        topHeaderTextFree: "#DDDDDD",
                        selectText: "#F5F5F5",
                        selectArrow: "#C19A6B",
                        selectTextHover: "#C19A6B",
                        secondary: "#aaaaaa",
                        saleText: "#FFD700",
                        saleText2: "#00BFFF",
                        stableText: "#000"
                    },
                    border: {
                        topHeaderBottomColor: "#333333"
                    },
                    divider: "#333333", // added global divider color
                    action: {
                        hover: "#f0f0f0",
                        selected: "#e0e0e0",
                        disabled: "#c0c0c0",
                        disabledBackground: "#f5f5f5"
                    },
                    error: {
                        main: "#f44336"
                    },
                    success: {
                        main: "#4caf50"
                    },
                    warning: {
                        main: "#ffa726"
                    },
                    info: {
                        main: "#29b6f6"
                    }
                }),
        },
    });
