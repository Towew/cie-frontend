import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import cssModules from '../components/EditCategory.module.css'
import NavigationAdmin from '../components/NavigationAdmin.jsx';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

function AdminAddCategory() {
    let title = 'List Category' 
    document.title = 'Dumbmerch | ' + title

    const [category, setCategory] = useState("");

    let navigate = useNavigate();

    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
    
          // Data body
          const body = JSON.stringify({ name: category });
    
          // Configuration
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          console.log(config);
    
          // Insert category data
          const response = await API.post("/category", body, config);
    
          console.log(response);
    
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
                    <h1>Add Category</h1>
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Form.Group className={cssModules.mb3} controlId="formBasictext">
                        <Form.Control className={cssModules.category} type="text" onChange={handleChange}
                placeholder="Category Name"
                value={category}
                name="category" />
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

export default AdminAddCategory;