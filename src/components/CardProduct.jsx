import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import rupiahFormat from 'rupiah-format';
import ShowMoreText from 'react-show-more-text';
import imgEmpty from '../components/assets/empty.svg';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import cssModule from '../components/ListProduct.module.css'

const styles = {
    cardContainer: {
        width: '241px',
        height: '410px',
        backgroundColor: '#212121',
        marginRight: '10px',
        marginBottom: '15px',
    },
    img: {
        width: '241px',
        height: '312px',
        objectFit: 'cover',
    },
    title: {
        color: '#F74D4D',
        fontSize: '18px',
        paddingLeft: '15px',
        margin: '7px 0px',
    },
    p: {
        color: 'white',
        fontSize: '14px',
        paddingLeft: '15px',
        marginBottom: '5px',
    }
}

function CardProduct() {

    const title = 'Homepage'
    document.title = 'Dumbmerch | ' + title

    const navigate = useNavigate();
    const [datas, setDatas] = useState([]);
    const [sortType, setSortType] = useState('id');

    useEffect(() => {
        const sortArray = type => {
          const types = {
            price: 'price',
            qty: 'qty'
          };
          const sortProperty = types[type];
          const sorted = [...datas].sort((a, b) => a[sortProperty] - b[sortProperty]);
          setDatas(sorted);
        };
        sortArray(sortType);
      }, [sortType]);

    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        console.log(response)
        return setDatas(response.data.data.products);
    });

    return (
        <div>
            <select onChange={(e) => setSortType(e.target.value)}> 
                    <option value="price">By Price</option>
                    <option value="qty">By Qty</option>
                    </select>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            
            {
                datas.map((item, index) => (
                    <div style={styles.cardContainer} key={index}>
                        <img style={styles.img} src={item.image} alt={item.name} />
                        <Link to={"/detail-product/" + item.id}><h6 style={styles.title}>{item.name}</h6></Link>
                        <p style={styles.p}>{rupiahFormat.convert(item.price)}</p>
                        <p style={styles.p}>Stock : {item.qty}</p>
                    </div>
                ))
           
            }
        </div>
        </div>
    )
}

export default CardProduct;