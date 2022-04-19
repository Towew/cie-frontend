import React, {useState, useEffect} from 'react';
import { Table, Button } from 'react-bootstrap';
import cssModule from '../components/ListProduct.module.css'
import DeleteButton from '../components/DeleteButton';
import { useNavigate } from 'react-router-dom';
import NavigationAdmin from '../components/NavigationAdmin';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import rupiahFormat from 'rupiah-format';
import ShowMoreText from 'react-show-more-text';

function ListProduct() {

    const title = 'List Product'
    document.title = 'Dumbmerch | ' + title

    const navigate = useNavigate();

    const [datas, setDatas] = useState([]);
    const [sortType, setSortType] = useState('id');
    // Variabel for delete product data
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

     // Modal Confirm delete data
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetching product data from database
    let { data: products, refetch } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        console.log(response)
        let fetchingList = response.data.data.products
        return setDatas(fetchingList);
    });

    useEffect(() => {
        const sortArray = type => {
          const types = {
            price: 'price',
            qty: 'qty',
          };
          const sortProperty = types[type];
          const sorted = [...datas].sort((a, b) => a[sortProperty] - b[sortProperty]);
          setDatas(sorted);
        };
        sortArray(sortType);
      }, [sortType]);

    const addProduct = () => {
        navigate('/add-product');
      };

      const handleUpdate = (id) => {
        navigate('/edit-product/' + id);
      };

      // For get id product & show modal confirm delete data
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

    return (
        <div className={cssModule.ProductC}>
            <NavigationAdmin title={title} />
            <div className={cssModule.container}>
                <div className={cssModule.mainContainer}>
                    <div className={cssModule.mainHeader}>
                    <h4>List Product</h4>
            
                    <select onChange={(e) => setSortType(e.target.value)}> 
                    <option value="price">By Price</option>
                    <option value="qty">By Qty</option>
                    </select>
                    <Button onClick={addProduct}>Add</Button>
                        </div>
                        {/* {products.length !== 0 ? ( */}
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Photo</th>
                                <th>Product Name</th>
                                <th>Product Desc</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {datas.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img 
                                src={item.image} 
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    objectFit: 'cover',
                                }} 
                                alt={item.name} /></td>
                                <td>{item.name}</td>
                                <td>
                                <ShowMoreText
                          /* Default options */
                          lines={1}
                          more="show"
                          less="hide"
                          className="content-css"
                          anchorClass="my-anchor-css-class"
                          expanded={false}
                          width={280}
                        >
                          {item.desc}
                        </ShowMoreText>
                                </td>
                                <td>{rupiahFormat.convert(item.price)}</td>
                                <td>{item.qty}</td>
                                <td className={cssModule.btnGroup}>
                                  <div>
                                        <button onClick={() => {
                            handleUpdate(item.id);
                          }} className={cssModule.btnEdit}>Edit</button>
                                    
                                    <Button onClick={() => {
                            handleDelete(item.id);
                          }} className={cssModule.btnDelete}>
                                        Delete
                                    </Button>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                   {/*  ) : (
                        <div className="text-center pt-5">
                        <img
                          src={imgEmpty}
                          className="img-fluid"
                          style={{ width: '40%' }}
                          alt="empty"
                        />
                        <div className={cssModule.textEmpty}>No data product</div>
                      </div>
                    )} */}
                </div>
            </div>
            <DeleteButton
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
        </div>
    )
}

export default ListProduct;