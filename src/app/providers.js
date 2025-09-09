'use client';
import { Provider } from 'react-redux';
import { store } from './Api/store.js';
import { ColorModeProvider } from './Context/ColorModeContext.js';
import dynamic from 'next/dynamic';
import MainHeader from './Component/Layout Component/MainHeader.jsx';
import Footer from './Component/Layout Component/Footer.jsx';
import { CartProvider } from "./Context/CartContext.js";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";


const TopHeader = dynamic(
    () => import("./Component/Layout Component/TopHeader.jsx"),
    { ssr: false }
);
const ModeButton = dynamic(
    () => import("./Component/RandomComponent/ModeButton"),
    { ssr: false }
);

export default function Providers({ children }) {
    const pathname = usePathname();

    // Pages where headers/footers should be hidden
    const hideLayout = pathname === "/Signin" || pathname === "/Signup";
    const router = useRouter();

    useEffect(() => {
        const logInStatus = localStorage.getItem("isLoggedIn");

        // If logged in and trying to access /Signin, redirect immediately
        if (logInStatus === "true" && pathname === "/Signin") {
            router.replace("/"); // Redirect to homepage
        }
    }, [pathname, router]);
    return (
        <Provider store={store}>
            <CartProvider>
                <ColorModeProvider>
                    <div style={{ position: "relative" }}>
                        {/* <ModeButton /> */}
                    </div>

                    {!hideLayout && <TopHeader />}
                    {!hideLayout && <MainHeader />}

                    {children}

                    {!hideLayout && <Footer />}
                </ColorModeProvider>
            </CartProvider>
        </Provider>
    );
}
