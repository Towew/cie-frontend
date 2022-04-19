import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import cssModule from '../components/ListCategory.module.css'
import DeleteButton from '../components/DeleteButton';
import { useNavigate } from 'react-router-dom';
import NavigationAdmin from '../components/NavigationAdmin';
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

function ListCategory() {

    let title = 'List Category'
    document.title = 'Dumbmerch | ' + title

    const navigate = useNavigate();

     // Variabel for delete category data
     const [datas, setDatas] = useState([]);
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetching categories data from database
    let { data: categories, refetch } = useQuery("categoriesCache", async () => {
        const response = await API.get("/categories");
        console.log(response)
        return setDatas(response.data.data.categories);
    });

    const handleEdit = (id) => {
       navigate(`/edit-category/${id}`);
      };
    
      const addCategory = () => {
        navigate("/add-category");
      };
    
      // For get id category & show modal confirm delete data
      const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
      };
      
      // If confirm is true, execute delete data
        const deleteById = useMutation(async (id) => {
            try {
            await API.delete(`/category/${id}`);
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
        <div className={cssModule.CategoryC}>
            <NavigationAdmin title={title} />
            <div className={cssModule.container}>
                <div className={cssModule.mainContainer}>
                    <div className={cssModule.mainHeader}>
                    <h4>List Category</h4>
                    <Button onClick={addCategory}>Add</Button>
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { datas.map((item,index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td className={cssModule.btnGroup}>
                                    <div>
                                        <button onClick={() => {
                            handleEdit(item.id);
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

export default ListCategory;