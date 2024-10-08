import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderSignedInClient from '../shared/HeaderSignedInClient';
import requireAuth from '../authentification/requireAuth';
import CommentForm from './commentForm';
import CommentsList from './CommentsList';

function BlogPost(props) {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [comments, setComments] = useState([]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };


  


  useEffect(() => {
    async function fetchBlogPost() {
      const response = await fetch(`https://fitmind-backend.onrender.com/api/blog/${id}`);
      const data = await response.json();
      setBlogPost(data);
    }
    fetchBlogPost();
  }, [id]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }



  

  return (
    <div >
       {/* <HeaderSignedInClient />  */}
       
      <div class="slider-area2" >
        <div class="slider-height2 d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="hero-cap hero-cap2 pt-70">
                  <h2>Blog Details</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="section-top-border">
          <h3 class="mb-30">{blogPost.title}</h3>
          <div class="row">
            <div class="col-md-3">
              <img
                src={`https://fitmind-backend.onrender.com/uploads/${blogPost.image}`}
                class="img-fluid"
                alt={blogPost.title}
                style={{ width: 'auto', height: '500px' }}
              />
            </div>
            <div class="col-md-9 mt-sm-20">
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }}></div>
              <ul class="list-unstyled d-flex mb-0">
                <li class="mr-3">
                  <i class="fa fa-user"></i> {blogPost.author}
                </li>
              </ul>
            </div>
            <CommentForm userId={localStorage.getItem('userId')} blogpostId={id} onAddComment={handleAddComment}  />
            <CommentsList blogpostId={id} />

            {/* <CommentForm userId={localStorage.getItem('userId')} blogpostId={props.blogpost} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default requireAuth(BlogPost);