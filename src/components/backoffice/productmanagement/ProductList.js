import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { Button } from '@material-ui/core';
import SideNav from "../sharedBack/SideNav";
import Header from "../sharedBack/Header";
import Footer from "../sharedBack/Footer";
import requireAuth from '../../frontoffice/authentification/requireAuth';
import Form from 'react-bootstrap/Form';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';



const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    quantity: '',
    promotion: '',
    fillename:''

  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    quantity: '',
    promotion: '',
  });
  

  useEffect(() => {
    getProducts();
    getStats();
  }, []);

  

  const getProducts = async () => {
    try {
      const response = await axios.get('https://fitmind-backend.onrender.com/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const getStats = async () => {
    try {
      const response = await axios.get('https://fitmind-backend.onrender.com/api/products/statsp');
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    const { name, description, price, image, quantity, promotion } = formValues;
    const errors = {};
  
    if (!name) {
      errors.name = 'Name is required';
    }
  
    if (!description) {
      errors.description = 'Description is required';
    }
  
    if (!price) {
      errors.price = 'Price is required';
    } else if (isNaN(price)) {
      errors.price = 'Price must be a number';
    } else if (price < 0) {
      errors.price = 'Price must be a positive number';
    }
  
    if (!quantity) {
      errors.quantity = 'Quantity is required';
    } else if (isNaN(quantity)) {
      errors.quantity = 'Quantity must be a number';
    } else if (quantity < 0) {
      errors.quantity = 'Quantity must be a positive number';
    }
  
    if (!promotion) {
      errors.promotion = 'Promotion is required';
    } else if (isNaN(promotion)) {
      errors.promotion = 'Promotion must be a number';
    } else if (promotion < 0 || promotion > 100) {
      errors.promotion = 'Promotion must be a positive number between 0 and 100';
    }
  
    if (!image) {
      errors.image = 'Image is required';
    }
  
    setFormErrors(errors);
    
    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Arrêtez l'exécution de la fonction si les données ne sont pas valides
    }
  
    try {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('description', formValues.description);
      formData.append('price', formValues.price);
      formData.append('quantity', formValues.quantity);
      formData.append('promotion', formValues.promotion);

      formData.append('image', formValues.image);
      
      if (editing) {
        await axios.patch(`https://fitmind-backend.onrender.com/api/products/${editId}`, formData);
        setEditing(false);
      } else {
        await axios.post('https://fitmind-backend.onrender.com/api/products', formData);
      }
      setFormValues({
        name: '',
        description: '',
        price: '',
        image: '',
        quantity: '',
        promotion: '',

      });
      getProducts();
    } catch (error) {
      console.error(error);
      
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fitmind-backend.onrender.com/api/products/${id}`);
      getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`https://fitmind-backend.onrender.com/api/products/${id}`);
      setFormValues(response.data);
      setEditing(true);
      setEditId(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <Header/>
        <SideNav/>
        <div className='container'>
          
      {stats.length > 0 && (
  <div>
    <h2>Stats of quantity per product</h2>
    <Pie
      data={{
        labels: stats.map((stat) => stat.name),
        datasets: [
          {
            data: stats.map((stat) => stat.count),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#1abc9c',
              '#3498db',
              '#f1c40f',
              '#8e44ad',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#1abc9c',
              '#3498db',
              '#f1c40f',
              '#8e44ad',
            ],
          },
        ],
      }}
      options={{
        aspectRatio: 3.5
      }}
    />
  </div>
)}
  <h1>Product List</h1>
  <div className='container'>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Image</th>
        <th>Quantity</th>
        <th>promotion(en %)</th>

        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <tr key={product._id}>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>
            <img
        src={`https://fitmind-backend.onrender.com/uploads/${product.image}`}
//   alt={`Image of ${product.name}`}
              width="100"
            />
          </td>
          <td>{product.quantity}</td>
          <td>{product.promotion}</td>

          <td>


               <button onClick={() => handleEdit(product._id)} className={styles.update}>
    <FontAwesomeIcon icon={faEdit} />
  </button> 
  <button
    className={styles.delete}
    onClick={() => handleDelete(product._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  <h2>{editing ? 'Edit Product' : 'Add Product'}</h2>
  <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.formcontainer}>
  <div className="form-group">
    <label htmlFor="name">Name:</label>
    <input
      type="text"
      id="name"
      className="form-control"
      value={formValues.name}
      onChange={(e) =>
        setFormValues({ ...formValues, name: e.target.value })
      }
    />
    {formErrors.name && <small className="form-text text-danger">{formErrors.name}</small>}
  </div>

  <div className="form-group">
    <label htmlFor="description">Description:</label>
    <textarea
      id="description"
      className="form-control"
      value={formValues.description}
      onChange={(e) =>
        setFormValues({ ...formValues, description: e.target.value })
      }
    />
    {formErrors.description && <small className="form-text text-danger">{formErrors.description}</small>}
  </div>

  <div className="form-group">
    <label htmlFor="price">Price:</label>
    <input
      type="number"
      id="price"
      className="form-control"
      value={formValues.price}
      onChange={(e) =>
        setFormValues({ ...formValues, price: e.target.value })
      }
    />
    {formErrors.price && <small className="form-text text-danger">{formErrors.price}</small>}
  </div>

  <div className="form-group">
    <label htmlFor="image">Image:</label>
    <div className="custom-file">
      <input
        type="file"
        id="image"
        className="custom-file-input"
        onChange={(e) => {
          setFormValues({ ...formValues, image: e.target.files[0] });
        }}
      />
      <label className="custom-file-label" htmlFor="image">
choose file      </label>
    </div>
    {formErrors.image && <small className="form-text text-danger">{formErrors.image}</small>}
  </div>

  <div className="form-group">
    <label htmlFor="quantity">Quantity:</label>
    <input
      type="number"
      id="quantity"
      className="form-control"
      value={formValues.quantity}
      onChange={(e) =>
        setFormValues({ ...formValues, quantity: e.target.value })
      }
    />
    {formErrors.quantity && <small className="form-text text-danger">{formErrors.quantity}</small>}
  </div>

  <div className="form-group">
    <label htmlFor="promotion">Promotion (for example: 10 = 10%):</label>
    <input
      type="number"
      id="promotion"
      className="form-control"
      value={formValues.promotion}
      onChange={(e) =>
        setFormValues({ ...formValues, promotion: e.target.value })
      }
    />
    {formErrors.promotion && <small className="form-text text-danger">{formErrors.promotion}</small>}
  </div>

  <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add'}</button>
  {editing && (
    <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
      Cancel
    </button>
  )}
</form>

  <Footer/>
  </div>
</div>
);
};

export default requireAuth (ProductList);



