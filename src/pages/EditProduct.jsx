import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import cssModule from '../components/EditProduct.module.css';
import NavigationAdmin from '../components/NavigationAdmin.jsx';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api'
import CheckBox from '../components/CheckBox'

function EditProduct() {

    let navigate = useNavigate();
    const { id } = useParams();

    const title = 'List Product'
    document.title = 'Dumbmerch | ' + title

    const [categories, setCategories] = useState([]); //Store all category data
    const [categoryId, setCategoryId] = useState([]); //Save the selected category id
    const [preview, setPreview] = useState(null); //For image preview
    const [product, setProduct] = useState({}); //Store product data
    const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    qty: '',
    }); //Store product data

    let { productRefetch } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
      setForm({
        name: response.data.data.name,
        desc: response.data.data.desc,
        price: response.data.data.price,
        qty: response.data.data.qty,
        image: response.data.data.image,
      });
      setProduct(response.data.data);
    });

     // Fetching category data
  let { categoriesRefetch } = useQuery("categoriesCache", async () => {
    const response = await API.get("/categories");
    console.log(response)
    setCategories(response.data.data.categories);
  });

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked == true) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
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
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      setPreview(e.target.files);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const formData = new FormData();
      if (preview) {
        formData.set("image", preview[0], preview[0]?.name);
      }
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Insert product data
      const response = await API.patch("/product/" + product.id, formData, config);

      navigate("/list-product");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const newCategoryId = product?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [product]);

    return (
        <div className={cssModule.ProductC}>
            <NavigationAdmin title={title} />
            <div>
                <div className={cssModule.containerProduct}>
                    <h1>Edit Product</h1>
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div className={cssModule.imgGroup}>
                    <label htmlFor="upload">
                Upload file
              </label>
              {!preview ? (
                <div>
                  <img
                    src={form.image}
                    style={{
                      maxWidth: "60px",
                      maxHeight: "60px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={URL.createObjectURL(preview[0])}
                    style={{
                      maxWidth: "60px",
                      maxHeight: "60px",
                      objectFit: "cover",
                    }}
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
                        <Form.Control className={cssModule.category} name="name" onChange={handleChange} value={form?.name} type="text"/>
                    </Form.Group>
                    <Form.Group className={cssModule.fg} controlId="exampleForm.ControlTextarea1">
                        <Form.Control className={cssModule.textarea} as="textarea" rows={3} name="desc" onChange={handleChange} value={form?.desc} />
                    </Form.Group>
                    <Form.Group className={cssModule.fg} controlId="formBasictext">
                        <Form.Control className={cssModule.category} type="text" name="price" onChange={handleChange} value={form?.price} />
                    </Form.Group>
                    <Form.Group className={cssModule.fg} controlId="formBasictext">
                        <Form.Control className={cssModule.category} type="text" name="qty" onChange={handleChange} value={form?.qty} />
                    </Form.Group>
                    <div className={cssModule.cardFormInput}>
                <div
                  className="text-secondary mb-1"
                  style={{ fontSize: '15px' }}
                >
                  Category
                </div>
                {product &&
                  categories?.map((item, index) => (
                    <label key={index} className="checkbox-inline me-4">
                      <CheckBox
                        categoryId={categoryId}
                        value={item?.id}
                        handleChangeCategoryId={handleChangeCategoryId}
                      />
                      <span className="ms-2">{item?.name}</span>
                    </label>
                  ))}
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

export default EditProduct;