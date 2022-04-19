import React from 'react'
import cssModules from '../components/Homepage.module.css'
import CardProduct from '../components/CardProduct.jsx'
import Navigation from '../components/Navigation'

function Homepage() {
    return (
        <div>

            <Navigation />

            <div className={cssModules.homepagePageContainer}>
                <h5>Product</h5>
                <div className={cssModules.homepageCardContainer}>
                    <CardProduct />
                </div>
            </div>
        </div>
    )
}

export default Homepage;