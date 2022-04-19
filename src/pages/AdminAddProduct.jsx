import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import cssModule from '../components/AddProduct.module.css';
import { useNavigate } from 'react-router';
import { useMutation, useQuery } from 'react-query';
import CheckBox from '../components/CheckBox'
import { API } from '../config/api'
import NavigationAdmin from '../components/NavigationAdmin.jsx';
import { UserContext } from '../context/userContext'

function AdminAddProduct() {
    /* console.clear(); */
    const title = 'List Product'
    document.title = "Dumbmerch | " + title

    let navigate = useNavigate();

    //set useState
    const [state] = useContext(UserContext);
    const [categories, setCategories] = useState([]); //Store all category data
    const [idCategory, setCategoryId] = useState([]); //Save the selected category id
    const [preview, setPreview] = useState(null); //For image preview

    const [form, setForm] = useState({
        name: '',
        image: '',
        desc: '',
        price: '',
        qty: ''
    });

    // Fetching category data
    let { data: categoriesData, refetch: refetchCategories } = useQuery(
      'categoriesCache',
      async () => {
        const response = await API.get('/categories');
        return setCategories(response.data.data.categories);
      }
  );

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...idCategory, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = idCategory.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Data body
      const formData = new FormData();
      formData.set('image', form.image[0], form.image[0].name)
      formData.set('name', form.name)
      formData.set('desc', form.desc)
      formData.set('qty', form.qty)
      formData.set('price', form.price)
      formData.set('idCategory', idCategory);
      formData.set('idUser', state.user.id);
  
      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
  
      // Insert data user to database
      const response = await API.post('/product', formData, config);

      console.log(response.data);

      navigate('/list-product');
  
      // Handling response here
    } catch (error) {
      console.log(error);
    }
});

    return (
        <div className={cssModule.ProductC}>
            <NavigationAdmin title={title}/>
            <div>
                <div className={cssModule.containerProduct}>
                    <h1>Add Product</h1>
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div className={cssModule.imgGroup}>
              <label htmlFor="upload">
                Upload file
              </label>
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: '60px',
                      maxHeight: '60px',
                      objectFit: 'cover',
                    }}
                    alt={preview}
                  />
                </div>
              )}
              <input
                type="file"
                id="upload"
                name="image"
                hidden
                onChange={handleChange}
              />
              </div>
                    <Form.Group className={cssModule.fg} controlId="formBasictext">
                        <Form.Control onChange={handleChange} className={cssModule.category} type="text" name='name' placeholder="Product Name" />
                    </Form.Group>
                    <Form.Group className={cssModule.fg} controlId="exampleForm.ControlTextarea1">
                        <Form.Control onChange={handleChange} className={cssModule.textarea} as="textarea" name='desc' rows={3} placeholder="Product Desc" />
                    </Form.Group>
                    <Form.Group className={cssModule.fg} controlId="formBasictext">
                        <Form.Control onChange={handleChange} name='price' className={cssModule.category} type="text"  placeholder="Price in Rp." />
                    </Form.Group>
                    <Form.Group className={cssModule.fg} controlId="formBasictext">
                        <Form.Control onChange={handleChange} name='qty' className={cssModule.category} type="text"  placeholder="Product Quantity" />
                    </Form.Group>
                    <div className={cssModule.cardFormInput}>
                <div
                  className="text-secondary mb-1"
                  style={{ fontSize: '15px' }}
                >
                  Category
                </div>
                <div className={cssModule.checkboxContainer}>
                {categories.map((item) => (
                  <label class="checkbox-inline me-4">
                  <input
                    type="checkbox"
                    value={item.id}
                    onClick={handleChangeCategoryId}
                  />{" "}
                  {item.name}
                </label>
                ))}
                </div>
              </div>
                    <div className={cssModule.button}>
                        <Button className={cssModule.btnSave} variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default AdminAddProduct;