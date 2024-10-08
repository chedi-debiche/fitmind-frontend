import React, { useState } from 'react';
import axios from 'axios';
import requireAuth from '../authentification/requireAuth';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'react-quill';

const UpdateBlogPost = ({ blogPost }) => {
    
  const [title, setTitle] = useState(blogPost.title);
  const [content, setContent] = useState(blogPost.content);
  const [author, setAuthor] = useState(blogPost.author);
  const [image, setImage] = useState(null);

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, {'font': []}],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

//   const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('image', image);

    try {
      const res = await axios.put(`https://fitmind-backend.onrender.com/api/blog/${blogPost._id}`, formData);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input type="text" className="form-control form-control-lg" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
  </div>

  <div className="form-group">
    <label htmlFor="content">Content</label>
    <ReactQuill value={content} onChange={(e) => setContent(e)} modules={modules} formats={formats} />

    {/* <textarea className="form-control form-control-lg" id="content" value={content} onChange={(e) => setContent(e.target.value)} style={{height: "300px", weight:"500px"}}></textarea> */}
  </div>

  <div className="form-group">
    <label htmlFor="author">Author</label>
    <input type="text" className="form-control form-control-lg" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
  </div>

  <div className="form-group">
    <div className="custom-file">
      <input type="file" className="custom-file-input" id="image" onChange={(e) => setImage(e.target.files[0])} />
      <label className="custom-file-label" htmlFor="image">Choose image</label>
    </div>
  </div>

  <button type="submit" className="btn btn-primary btn-lg">Update Blog Post</button>
</form>


  );
};

export default requireAuth (UpdateBlogPost);