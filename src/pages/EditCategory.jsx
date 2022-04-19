import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import cssModules from '../components/EditCategory.module.css'
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import NavigationAdmin from "../components/NavigationAdmin.jsx";

function EditCategory() {

    let title = 'List Category'
    document.title = 'Dumbmerch | ' + title

    const navigate = useNavigate();
    const { id } = useParams();

    const [category, setCategory] = useState({ name: "" });

    let { refetch } = useQuery("categoryCache", async () => {
        const response = await API.get("/category/" + id);
        console.log(response)
        setCategory({ name: response.data.name });
      });

      const handleChange = (e) => {
        setCategory({
          ...category,
          name: e.target.value,
        });
      };

      const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
    
          // Data body
          const body = JSON.stringify(category);
    
          // Configuration
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          // Insert category data
          const response = await API.patch("/category/" + id, body, config);
    
         navigate("/list-category");
        } catch (error) {
          console.log(error);
        }
      });

    return (
        <div className={cssModules.CategoryC}>
            <NavigationAdmin title={title} />
            <div>
                <div className={cssModules.containerCategory}>
                    <h1>Edit Category</h1>
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Form.Group className={cssModules.mb3} controlId="formBasictext">
                        <Form.Control className={cssModules.category} type="text" placeholder="Category Name" onChange={handleChange}
                value={category.name} />
                    </Form.Group>
                    <div className="button">
                        <Button className={cssModules.btnSave} variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditCategory;