import React, { useEffect, useState } from 'react'
import cssModules from '../components/DetailProduct.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import rupiahFormat from 'rupiah-format';

function DetailProductItem() {

    const navigate = useNavigate();
    let { id } = useParams();

    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/product/' + id);
        console.log(response)
        return response.data.data;
    });

    useEffect(() => {
      //change this to the script source you want to load, for example this is snap.js sandbox env
      const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
      //change this according to your client-key
      const myMidtransClientKey = process.env.MIDTRANS_CLIENT_KEY;
  
      let scriptTag = document.createElement('script');
      scriptTag.src = midtransScriptUrl;
      // optional if you want to set script attribute
      // for example snap.js have data-client-key attribute
      scriptTag.setAttribute('data-client-key', myMidtransClientKey);
  
      document.body.appendChild(scriptTag);
      return () => {
        document.body.removeChild(scriptTag);
      };
    }, []);

    const handleBuy = useMutation(async () => {
        try {
          // Get data from product
          const data = {
            idProduct: products.id,
            idSeller: products.user.id,
            price: products.price,
          };
    
          console.log(data);
    
          // Data body
          const body = JSON.stringify(data);
    
          // Configuration
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          // Insert transaction data
          const response = await API.post("/transaction", body, config);

          console.log(response)

          const token = response.data.payment.token;

          window.snap.pay(token, {
            onSuccess: function (result) {
              /* You may add your own implementation here */
              console.log(result);
              navigate('/profile');
            },
            onPending: function (result) {
              /* You may add your own implementation here */
              console.log(result);
              navigate('/profile');
            },
            onError: function (result) {
              /* You may add your own implementation here */
              console.log(result);
            },
            onClose: function () {
              /* You may add your own implementation here */
              alert('you closed the popup without finishing the payment');
            },
          });
    
        } catch (error) {
          console.log(error);
        }
      });


    return (
        <div>
            <div className={cssModules.detailProductItemContainer}>
                <div className={cssModules.detailProductLeft}>
                    <img src={products?.image} alt={products?.name} />
                </div>
                <div className={cssModules.detailProductRight}>
                    <h2>{products?.name}</h2>
                    <p className='one'>Stock : {products?.qty}</p>
                    <p className='two'>{products?.desc}</p>
                    <h6 className={cssModules.h6price}>{rupiahFormat.convert(products?.price)}</h6>
                    <button onClick={() => handleBuy.mutate()}>Buy</button>
                </div>
            </div>
            
        </div>
    )
}

export default DetailProductItem;