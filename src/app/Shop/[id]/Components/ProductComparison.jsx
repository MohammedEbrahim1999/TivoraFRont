"use client";
import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function ProductComparison({ baseProduct, allProducts }) {
    const [compareProduct, setCompareProduct] = useState(null);

    useEffect(() => {
        if (!allProducts || allProducts.length === 0) return;

        // Filter out the base product
        const filtered = allProducts.filter(
            (product) => product.id !== baseProduct.id
        );

        // Pick a random product
        if (filtered.length > 0) {
            const randomIndex = Math.floor(Math.random() * filtered.length);
            setCompareProduct(filtered[randomIndex]);
        }
    }, [allProducts, baseProduct]);

    if (!baseProduct || !compareProduct) return null;

    const specs = [
        "Brand",
        "Model",
        "Price",
        "Case Material",
        "Glass",
        "Movement",
        "Water Resistance",
        "Warranty",
    ];

    const products = [baseProduct, compareProduct];

    return (
        <Container className="py-1">
            <h3 className="fw-bold mb-4 text-start">Product Comparison</h3>

            <div className="table-responsive custom-table-wrapper">
                <Table bordered hover className="text-center align-middle">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            {products.map((product, index) => (
                                <th key={index}>{product.name.slice(0, 12)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {specs.map((spec, index) => (
                            <tr key={index}>
                                <td className="fw-semibold text-start">{spec}</td>
                                {products.map((product, i) => (
                                    <td key={i}>
                                        {product[spec.toLowerCase().replace(/\s/g, "")] || "-"} {spec === "Price" ? "EGP": null}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <style jsx>{`
        .custom-table-wrapper {
          overflow-x: auto;
        }

        th {
          background-color: #f8f9fa;
          position: sticky;
          top: 0;
          z-index: 2;
        }

        td {
          vertical-align: middle;
          word-wrap: break-word;
        }

        @media (max-width: 992px) {
          th,
          td {
            font-size: 0.9rem;
            padding: 0.5rem;
          }
        }

        @media (max-width: 576px) {
          th,
          td {
            font-size: 0.8rem;
            padding: 0.4rem;
          }
        }
      `}</style>
        </Container>
    );
}
