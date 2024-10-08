import { useState } from 'react';
import axios from 'axios';
import HeaderSignedInClient from '../shared/HeaderSignedInClient';
import requireAuth from '../authentification/requireAuth';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'react-quill';
import badWords from 'bad-words';


function CreateBlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
   const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
const [hasBadWords, setHasBadWords] = useState(false);


  
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

  

  

  // const filterBadWords = (inputValue) => {
  //   const filter = new badWords();
  //   return filter.clean(inputValue);
  // };
  const filterBadWords = (inputValue) => {
    const filter = new badWords();
    const filteredValue = filter.clean(inputValue);
    if (filteredValue !== inputValue) {
      setHasBadWords(true);
    }
    return filteredValue;
  };
  


  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
  
    const formData = new FormData();
    const userId = localStorage.getItem('userId');
    formData.append('user', userId); // Add the user ID to the form data
  
    const response = await axios.get(`https://fitmind-backend.onrender.com/api/users/${userId}`);
    const user = response.data;
    const author = `${user.firstName} ${user.lastName}`;
  
    const filteredTitle = filterBadWords(title);
    const filteredContent = filterBadWords(content);
  
    if (filteredTitle !== title || filteredContent !== content) {
      // Show pop-up if the title or content contains bad words
      setHasBadWords(true);
      setUploading(false);
      return;
    }
  
    formData.append('title', filteredTitle);
    formData.append('content', filteredContent);
    formData.append('author', author);
    formData.append('image', image);
  
    try {
      const res = await axios.post('https://fitmind-backend.onrender.com/api/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
      setTitle('');
      setContent('');
      setAuthor('');
      setImage(null);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };
  

 


  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    
    <div className="">
            <main style={{ background: 'white' }}>

      <HeaderSignedInClient />
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Blog</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
      <h1>Create a New Blog Post</h1>

      {hasBadWords && (
  <div className="popup">
    <p>Warning: The content contains inappropriate language.</p>
  </div>
)}

{hasBadWords && (
  <div className="popup">
    <p>Warning: The content contains inappropriate language.</p>
  </div>
)}

  <form onSubmit={handleSubmit} className="my-4 rounded">
    <div className="form-group mb-3">
      <label htmlFor="title">Title</label>
      <input type="text" className="form-control rounded" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="content">Content</label>
      <ReactQuill value={content} onChange={(e) => setContent(e)} modules={modules} formats={formats} />


      {/* <textarea className="form-control rounded" id="content" rows="5" value={content} onChange={(e) => setContent(e.target.value)} /> */}
    </div>
    {/* <div className="form-group mb-3">
      <label htmlFor="content">Author</label>
      <textarea className="form-control rounded" id="author"  value={author} onChange={(e) => setAuthor(e.target.value)} />
    </div> */}
    <div className="form-group mb-3">
      <label htmlFor="image">Image</label>
      <div className="custom-file">
        <input type="file" className="custom-file-input" id="image" onChange={handleImageUpload} />
        <label className="custom-file-label" htmlFor="image">Choose file</label>
      </div>
    </div>
    
    <button type="submit" className="btn genric-btn danger" disabled={uploading}>
submit    </button>
  </form>
  
  {/* <div className="image-container">
    <img src="assets/img/elements/d.jpg"  alt="Preview" />
  </div> */}

</div>

</main>

    </div>
  );
}

export default requireAuth (CreateBlogPost);