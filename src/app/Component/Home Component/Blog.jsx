'use client';
import React from 'react';
import { useGetPokemonByNameQuery } from "../../Api/pokemon.js";
import { useTheme } from '@mui/material';



const InstagramSection = () => {
    const theme = useTheme();


    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');

    const headerData = data?.data?.[0];
    const images = [
        'http://localhost:1337/uploads/1_db5e8fbfdc.jpg',
        "http://localhost:1337/uploads/2_d2eafa2a10.jpg",
        "http://localhost:1337/uploads/3_53c3472ce0.jpg",
        "http://localhost:1337/uploads/4_07edeecf58.jpg",
        "http://localhost:1337/uploads/5_5ddcc3f58a.jpg",
        "http://localhost:1337/uploads/6_d71973f661.jpg",
    ];
    return (
        <section className="container my-5 py-5">
            <div className="d-flex flex-column flex-lg-row align-items-start gap-1">
                {/* Left: Images */}
                <div className="flex-grow-1 flex-grow-md-0 ">
                    <div className="d-flex flex-wrap justify-content-center gap-0">
                        {images.map((src, index) => (
                            <div
                                key={index}
                                className="position-relative"
                                style={{
                                    // flex: '1 1 calc(33.333% - 0.5rem)', // 3 images per row on md+
                                    minWidth: '150px', // ensures responsiveness on small screens
                                    height: '260px',
                                }}
                            >
                                <img
                                    src={src}
                                    alt={`Instagram item ${index + 1}`}

                                    className="img-fluid"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Text */}
                <div className="mt-4 mt-lg-0 justify-content-center align-self-center" style={{ maxWidth: 'auto' }}>
                    <h3>{headerData?.insta}</h3>
                    <p>
                        {headerData?.BlogText}
                    </p>
                    <h5 className="text-danger">{headerData?.BLogHash}</h5>
                </div>
            </div>
        </section>
    );
};

export default InstagramSection;
