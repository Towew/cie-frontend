import React from 'react'
import DetailProductItem from '../components/DetailProductItem.jsx'
import Mouse from '../components/assets/Mouse.png'
import Navigation from '../components/Navigation.jsx';
import cssModules from '../components/DetailProduct.module.css'
import { useNavigate } from 'react-router-dom';

function DetailProduct() {
    return (
        <div>
            <Navigation />
            <div className={cssModules.detailProductPageContainer}>
                <DetailProductItem />
            </div>
        </div>
    )
}

export default DetailProduct;