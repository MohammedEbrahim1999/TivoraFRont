"use client";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useGetPokemonByNameQuery } from "../Api/pokemon.js";

export default function Page() {
    const [search, setSearch] = useState("");

    const { data, error, isLoading } = useGetPokemonByNameQuery(
        "tivoras?populate=*"
    );

    const headerData = data?.data?.[0];

    // Ensure it's always an array
    const filteredFaqs = headerData?.faqsQuestion?.filter((faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-light py-5 mb-5 shadow-sm">
                <div className="container text-center">
                    <h1 className="fw-bold display-5 mb-3">
                        {headerData?.FrequentlyAskedQuestions}
                    </h1>
                    <p className="text-muted lead mb-4">{headerData?.findQuick}</p>

                    {/* Search */}
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control form-control-lg shadow-sm rounded-pill px-4"
                                placeholder={headerData?.faqsSeachPlacwholder}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="container pb-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <Accordion defaultActiveKey="0">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq, index) => (
                                    <Accordion.Item
                                        eventKey={index.toString()}
                                        key={index}
                                        className="mb-3 border-0 shadow-sm rounded"
                                    >
                                        <Accordion.Header>
                                            <span className="fw-semibold">{faq.question}</span>
                                        </Accordion.Header>
                                        <Accordion.Body className="text-muted fs-6">
                                            {faq.answer}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))
                            ) : (
                                <p className="text-center text-muted mt-4">
                                    {headerData?.noResults} “<strong>{search}</strong>”.
                                </p>
                            )}
                        </Accordion>
                    </div>
                </div>
            </section>
        </div>
    );
}
