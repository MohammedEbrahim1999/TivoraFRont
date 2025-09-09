"use client";
import { Container, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";
import { useGetPokemonByNameQuery } from "../../../Api/pokemon.js";

export default function RelatedProducts() {
    const { data, error, isLoading } = useGetPokemonByNameQuery(
        "tivoras?populate=*"
    );

    if (isLoading) return <p>Loading related products...</p>;
    if (error) return <p>Failed to load products</p>;

    // safely access products array
    const products = data?.data?.[0]?.products;
    if (!Array.isArray(products) || products.length === 0)
        return <p>No related products available.</p>;

    // Pick 5 random products
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const related = shuffled.slice(0, 6);

    return (
        <Container className="py-4">
            <h3 className="fw-bold mb-4 text-start">Related Products</h3>
            <Row className="g-4">
                {related.map((product, index) => (
                    <Col key={index} xs={6} sm={4} md={3} lg={2}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body className="text-center">
                                <div className="overflow-hidden rounded-3 mb-2">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="img-fluid related-img"
                                    />
                                </div>
                                <Card.Title className="fs-6 mb-1">{product.name.slice(0,15)}</Card.Title>
                                {product.price && (
                                    <Card.Text className="fw-bold text-danger mb-2">
                                        ${product.price}
                                    </Card.Text>
                                )}
                                <Link
                                    href={`/Shop/${product.id}`}
                                    className="btn btn-outline-dark btn-sm"
                                >
                                    View
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <style jsx>{`
        .related-img {
          transition: transform 0.3s ease;
        }
        .related-img:hover {
          transform: scale(1.1);
        }
      `}</style>
        </Container>
    );
}
