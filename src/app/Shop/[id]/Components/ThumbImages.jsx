import React, { useState, useEffect } from 'react';

export default function App({ thumb = [] }) {
    const [images, setImages] = useState([]);
    const [activeImage, setActiveImage] = useState(null);

    // Update images whenever thumb changes
    useEffect(() => {
        if (thumb && thumb.length > 0) {
            setImages(thumb);
            setActiveImage(thumb[0]); // default to first image
        } else {
            setImages(["/imgs/product1.jpg"]); // fallback
            setActiveImage("/imgs/product1.jpg");
        }
    }, [thumb]);
    return (
        <div className="position-relative w-100 mt-3">
            {/* Main Image */}
            <div
                className='shadow-sm'
                style={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                }}
            >
                <img
                    src={activeImage}
                    alt="main product"
                    style={{
                        maxHeight: "550px",
                        width: "100%",
                        objectFit: "cover",
                        transition: "all 0.35s ease-in-out",
                    }}
                />
            </div>

            {/* Thumbnails (floating on the right) */}
            <div
                className="position-absolute end-0 top-50 translate-middle-y d-flex flex-column gap-3 p-3"
                style={{
                    zIndex: 10,
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "18px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                }}
            >
                {images.map((src, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImage(src)}
                        className="p-0 border-0 rounded-circle"
                        style={{
                            width: "70px",
                            height: "70px",
                            cursor: "pointer",
                            overflow: "hidden",
                            border: activeImage === src ? "3px solid #0dcaf0" : "2px solid transparent",
                            opacity: activeImage === src ? "1" : ".7",
                            borderRadius: "50%",
                            transition: "all 0.3s ease",
                            boxShadow:
                                activeImage === src
                                    ? "0 0 15px rgba(13, 202, 240, 0.8)"
                                    : "0 2px 8px rgba(0,0,0,0.2)",
                            background: "#fff",
                        }}
                    >
                        <img
                            src={src}
                            alt={`thumb-${index}`}
                            className="w-100 h-100"
                            style={{
                                objectFit: "cover",
                                transition: "all 0.3s ease",
                                transform: activeImage === src ? "scale(1.1)" : "scale(1)",
                                opacity: activeImage === src ? "1" : "0.75",
                            }}
                        />
                    </button>
                ))}
            </div>
            <style>
                {`
                /* Main image responsiveness */
img[alt="main product"] {
  max-width: 100%;
  height: auto;
}

/* Thumbnails responsiveness */
@media (max-width: 992px) {
  .position-absolute.end-0.top-50.translate-middle-y.d-flex.flex-column {
    position: static !important;
    flex-direction: row !important;
    justify-content: center;
    margin-top: 1rem;
    box-shadow: none;
    background: transparent;
    backdrop-filter: none;
  }

  .position-absolute.end-0.top-50.translate-middle-y.d-flex.flex-column button {
    width: 60px !important;
    height: 60px !important;
  }
}

@media (max-width: 576px) {
  .position-absolute.end-0.top-50.translate-middle-y.d-flex.flex-column button {
    width: 50px !important;
    height: 50px !important;
  }

  img[alt="main product"] {
    max-height: 300px !important;
  }
}

                `}
            </style>
        </div>
    );
}
