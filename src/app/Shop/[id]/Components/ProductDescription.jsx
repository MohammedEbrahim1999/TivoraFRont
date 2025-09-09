"use client";
import { Container, Row, Col, Table } from "react-bootstrap";

export default function ProductDescription({ name }) {
    const product = {
        name: name,
        tagline: "Elegant. Durable. Timeless.",
        highlights: [
            "Water-resistant up to 50 meters",
            "High-quality stainless steel case",
            "Scratch-resistant sapphire glass",
            "Precision quartz movement",
            "Fits both formal and casual outfits",
        ],
        description:
            `This luxury wrist watch is a perfect blend of elegance and functionality. 
      Designed for individuals who value style and precision, it features a sleek, modern design while ensuring maximum durability. 
      Whether attending a formal event or enjoying casual outings, this timepiece complements any outfit.`,
        specifications: {
            "Brand": "LuxTime",
            "Model": "LX-2025",
            "Case Material": "Stainless Steel",
            "Glass": "Sapphire",
            "Movement": "Quartz",
            "Water Resistance": "50m",
            "Warranty": "2 years",
        },
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    {/* Product Title */}
                    <h1 className="fw-bold mb-2">{product.name}</h1>
                    <p className="text-primary fs-5 mb-4 fst-italic">{product.tagline}</p>

                    {/* Highlights */}
                    <h4 className="fw-semibold mb-3">Key Features</h4>
                    <ul className="mb-4">
                        {product.highlights.map((item, index) => (
                            <li key={index} className="fs-6 text-secondary mb-1">
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/* Detailed Description */}
                    <h4 className="fw-semibold mb-3">Product Description</h4>
                    <p className="fs-6 text-secondary" style={{ lineHeight: "1.8", textAlign: "justify" }}>
                        {product.description}
                    </p>

                    {/* Specifications Table */}
                    <h4 className="fw-semibold mb-3 mt-4">Specifications</h4>
                    <Table striped bordered hover responsive>
                        <tbody>
                            {Object.entries(product.specifications).map(([key, value], index) => (
                                <tr key={index}>
                                    <th>{key}</th>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <style jsx>{`
        h1 {
          border-bottom: 2px solid #dee2e6;
          padding-bottom: 0.5rem;
        }
        h4 {
          margin-top: 2rem;
        }
      `}</style>
        </Container>
    );
}
