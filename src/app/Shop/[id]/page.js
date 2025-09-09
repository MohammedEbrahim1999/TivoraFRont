'use client'
import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material';
import { Container } from "react-bootstrap";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useParams } from "next/navigation";
import { useGetPokemonByNameQuery } from "../../Api/pokemon.js";
import dynamic from 'next/dynamic';
import ProductDetails from './Components/ProductDetails.jsx';
import ProductDescription from './Components/ProductDescription.jsx';
import RelatedProducts from './Components/RelatedProducts.jsx';
import ProductComparison from './Components/ProductComparison.jsx';

const VerticalThumbsSwiper = dynamic(
    () => import('./Components/ThumbImages'),
    { ssr: false } // <- This is the critical fix
);

export default function ProductPage() {



    const theme = useTheme();
    const { id } = useParams();
    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');

    const headerData = data?.data?.[0];
    const products = headerData?.products || [];
    const productClicked = products.find((p) => String(p.id) === id);



    return (
        <>

            <div className='py-4 px-3 shadow-sm' style={{ backgroundColor: theme.palette.background.breadcumbBG, color: theme.palette.text.primary }}>
                <Container>
                    <h2> {productClicked?.name} </h2>
                    <Breadcrumbs aria-label="breadcrumb" className='ps-2'>
                        <Link underline="hover" color="inherit" href="/">
                            {headerData?.homebread}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/Shop"
                        >
                            {headerData?.shopbread}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href={productClicked?.link}
                        >
                            {productClicked?.name}
                        </Link>
                    </Breadcrumbs>
                </Container>
            </div>
            <div className='container mt-0 '>
                <div className='row'>
                    <div className=' col-12  col-xl-8'>
                        <VerticalThumbsSwiper thumb={productClicked?.thumb} />
                    </div>
                    <div className=' col-12 col-xl-4'>
                        <ProductDetails
                            name={productClicked?.name}
                            price={productClicked?.price}
                            salesPrice={productClicked?.salePrice}
                            isSale={productClicked?.sale}
                            gender={productClicked?.gender}
                            tag={productClicked?.tag}
                            newArrival={productClicked?.newArrival}
                            sale={productClicked?.sale}
                            bestseller={productClicked?.bestseller}
                            rating={productClicked?.rating}
                            returns={productClicked?.returns}
                            stock={productClicked?.stock}
                            sku={productClicked?.sku}
                            brand={productClicked?.brand}
                            product={productClicked}
                            id={productClicked?.id}
                        />
                    </div>
                </div>
                <div className='col-12'>
                    <ProductDescription name={productClicked?.name} />
                    <ProductComparison
                        allProducts={headerData?.products}
                        baseProduct={productClicked}
                    />
                    <p className='text-center m-auto'><del> Here There Is Comments</del></p>
                    <RelatedProducts />
                </div>
            </div>
        </>
    );
}
