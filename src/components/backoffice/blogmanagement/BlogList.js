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



const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    author: '',
    image: '',

  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formErrors, setFormErrors] = useState({
    title: '',
    content: '',
    author: '',
    image: ''
  });
  

  useEffect(() => {
    getBlogs();
  }, []);

  

  const getBlogs = async () => {
    try {
      const response = await axios.get('https://fitmind-backend.onrender.com/api/blog');
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    const { title, content, author, image } = formValues;
    const errors = {};
  
    if (!title) {
      errors.title = 'title is required';
    }
  
    if (!content) {
      errors.content = 'Content is required';
    }
  
    if (!author) {
        errors.author = 'Author is required';
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
      formData.append('title', formValues.title);
      formData.append('content', formValues.content);
      formData.append('author', formValues.author);

      formData.append('image', formValues.image);
      
      if (editing) {
        await axios.put(`https://fitmind-backend.onrender.com/api/blog/${editId}`, formData);
        setEditing(false);
      } else {
        await axios.post('https://fitmind-backend.onrender.com/api/blog', formData);
      }
      setFormValues({
        title: '',
        content: '',
        author: '',
        image: '',

      });
      getBlogs();
    } catch (error) {
      console.error(error);
      
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fitmind-backend.onrender.com/api/blog/${id}`);
      getBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`https://fitmind-backend.onrender.com/api/blog/${id}`);
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
        <div className="container">

  <h1>Blog posts List</h1>
  <table>
    <thead>
      <tr>
        <th>title</th>
        <th>content</th>
        <th>author</th>
        <th>Image</th>

        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {blogs.map((blog) => (
        <tr key={blog._id}>
          <td>{blog.title}</td>
          {/* <div dangerouslySetInnerHTML={{ __html: blog.content }}></div> */}

          <td dangerouslySetInnerHTML={{ __html: blog.content }}></td>

          <td>{blog.author}</td>
          <td>
            <img
        src={`https://fitmind-backend.onrender.com/uploads/${blog.image}`}
//   alt={`Image of ${product.name}`}
              width="100"
            />
          </td>

          <td>


               <button onClick={() => handleEdit(blog._id)} className={styles.update}>
    <FontAwesomeIcon icon={faEdit} />
  </button> 
  <button
    className={styles.delete}
    onClick={() => handleDelete(blog._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <h2>{editing ? 'Edit blog post' : 'Add blog post'}</h2>
  <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.formcontainer}>
  <div className="form-group">
    <label htmlFor="title">Title:</label>
    <input
      type="text"
      id="name"
      className="form-control"
      value={formValues.title}
      onChange={(e) =>
        setFormValues({ ...formValues, title: e.target.value })
      }
    />
    {formErrors.title && <small className="form-text text-danger">{formErrors.title}</small>}
  </div>

  <div className="form-group">
    <label htmlFor="content">Content :</label>
    <textarea
      id="content"
      className="form-control"
      value={formValues.content}
      onChange={(e) =>
        setFormValues({ ...formValues, content: e.target.value })
      }
    />
    {formErrors.content && <small className="form-text text-danger">{formErrors.content}</small>}
  </div>

  <div className="form-group">
    <label htmlFor="content">author :</label>
    <textarea
      id="content"
      className="form-control"
      value={formValues.author}
      onChange={(e) =>
        setFormValues({ ...formValues, author: e.target.value })
      }
    />
    {formErrors.author && <small className="form-text text-danger">{formErrors.author}</small>}
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
        Choose file
      </label>
    </div>
    {formErrors.image && <small className="form-text text-danger">{formErrors.image}</small>}
  </div>



  <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add'}</button>
  {editing && (
    <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
      Cancel
    </button>
  )}
</form>
</div>

  <Footer/>
</div>
);
};

export default requireAuth (BlogList);



