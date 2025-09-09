'use client'
import React,{useState,useEffect} from 'react'
import { useGetPokemonByNameQuery } from "../../Api/pokemon.js";
import { useTheme, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
const TopHeader = () => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (storedUser) {
            setUser(storedUser)
            setLoggedIn(isLoggedIn)
        };
    }, []);
    const theme = useTheme();
    const color = theme.palette.text.selectArrow;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16' fill='${color}'><path d='M7 10l5 5 5-5z'/></svg>`;
    const dataUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const headerData = data?.data?.[0];
    const Valid = headerData?.FreeShipping;
    return (
        <>
            {Valid === true ? <div
                className="w-100 shadow-sm text-center text-white p-1"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    backgroundColor: theme.palette.background.topHeaderBG
                }}
            >
                <div className="container">
                    <div className="row align-items-center g-2 flex-nowrap justify-content-between">

                        {/* Title with tooltip */}
                        <div className="col-6 col-md-auto text-center text-md-start">
                            <Tooltip title={headerData?.TopHeaderTitle || ''} arrow>
                                <h6
                                    className="mb-0 fw-semibold truncate-sm"
                                    style={{ color: theme.palette.text.topHeaderTextFree }}
                                >
                                    {headerData?.TopHeaderTitle}
                                </h6>
                            </Tooltip>
                        </div>

                        {/* Links & Select */}
                        <div className="col-6 gap-4 col-md-auto d-flex flex-wrap align-items-center justify-content-center justify-content-md-end gap-2">
                            {loggedIn === true ? (
                                <a href='/Profile' className='text-decoration-none' style={{ fontWeight: 600, cursor: "pointer" }}>
                                    Hello {user.firstName}
                                </a>
                            ) : (
                                <a
                                    href={headerData?.TopHeaderLinkSignIn}
                                    className="text-decoration-none small d-none d-sm-flex"
                                    style={{ color: theme.palette.text.topHeaderLink }}
                                >
                                    {headerData?.signInText}
                                </a>
                            )}
                            <a
                                href={headerData?.TopHeaderLinkSignIn}
                                className="text-decoration-none small d-flex d-sm-none"
                                style={{ color: theme.palette.text.topHeaderLink }}
                            >
                                <PersonIcon />
                            </a>
                            <a
                                href={headerData?.topHeaderLinkFaqs}
                                className="text-decoration-none small"
                                style={{ color: theme.palette.text.topHeaderLink }}
                            >
                                {headerData?.faqs}
                            </a>
                            <select
                                className="form-select form-select-sm rounded border-0 text-white"
                                style={{
                                    width: "auto",
                                    backgroundImage: dataUrl,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 8px center',
                                    appearance: 'none',
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none',
                                    backgroundSize: "20px 20px",
                                    paddingRight: "2rem",
                                    backgroundColor: theme.palette.background.selectBG,
                                }}
                            >
                                {headerData?.Currency?.map((currency, index) => (
                                    <option
                                        key={index}
                                        value={currency.name}
                                        className="bg-dark"
                                        style={{ color: theme.palette.text.selectText }}
                                    >
                                        {currency.code}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
                : null}

            {/* CSS */}
            <style>
                {`
                    a:hover {
                        color: ${theme.palette.text.topHeaderLinkHover} !important;
                    }
                    select:hover {
                        color: ${theme.palette.text.selectTextHover} !important;
                    }
                    option:hover {
                        color: ${theme.palette.text.selectTextHover} !important;
                    }

                    /* قص النص على الشاشات الصغيرة */
                    @media (max-width: 581px) {
                        .truncate-sm {
                            display: inline-block;
                            max-width: 150px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            vertical-align: middle;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default TopHeader;
