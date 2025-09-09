import React from 'react';
import '../../styles/collection.css';
import { useTheme } from '@mui/material';
import { useGetPokemonByNameQuery } from "../../Api/pokemon.js";


const Collection = () => {
    const theme = useTheme();


    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');

    const headerData = data?.data?.[0];
    return (
        <section className="banner spad mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 offset-lg-4">
                        <div className="banner__item">
                            <div className="banner__item__pic">
                                <img src="http://localhost:1337/uploads/collection1_baf74782df.jpg" alt="" />
                            </div>
                            <div className="banner__item__text">
                                <h2 style={{ color: theme.palette.text.primary }}>Clothing Collections 2030</h2>
                                <a className='text-decoration-none' target='_blank' href="#" style={{ color: theme.palette.text.primary }}>{headerData?.shopNow}</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="banner__item banner__item--middle">
                            <div className="banner__item__pic">
                                <img src="http://localhost:1337/uploads/collection2_7a0751f2b8.jpg" alt="" />
                            </div>
                            <div className="banner__item__text">
                                <h2 style={{ color: theme.palette.text.primary }}>Accessories</h2>
                                <a className='text-decoration-none' target='_blank' href="#" style={{ color: theme.palette.text.primary }}> {headerData?.shopNow} </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="banner__item banner__item--last">
                            <div className="banner__item__pic">
                                <img src="http://localhost:1337/uploads/collection3_f69f6ed6c7.jpg" alt="" />
                            </div>
                            <div className="banner__item__text">
                                <h2 style={{ color: theme.palette.text.primary }}>Shoes Spring 2030</h2>
                                <a className='text-decoration-none' target='_blank' href="#" style={{ color: theme.palette.text.primary }}> {headerData?.shopNow} </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Collection