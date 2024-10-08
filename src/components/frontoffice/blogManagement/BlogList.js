import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import HeaderSignedInClient from "../shared/HeaderSignedInClient";
import { Link } from "react-router-dom";
import UpdateBlogPost from "./BlogUpdate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comment from "./comment"
import BlogRightBar from "./blogRightBar";
import requireAuth from "../authentification/requireAuth";
import RecentBlogItems from "../blogManagement/recentBlogItems"
import CommentForm from "./commentForm"
function BlogList() {
  const [blogPosts, setBlogPosts] = useState([]);
  const userId = localStorage.getItem("userId");
  const [showOptions, setShowOptions] = useState(false);
  const [truncated, setTruncated] = useState(true);
  const toggleOptions = () => setShowOptions(!showOptions);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://fitmind-backend.onrender.com/api/blog");
      setBlogPosts(response.data);
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`https://fitmind-backend.onrender.com/api/blog/${id}`);
      setBlogPosts(blogPosts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  }
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  const filteredBlogPosts = blogPosts.filter((post) =>
  post.title.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (

    <div >
      
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
      <main style={{ background: 'black' }}>

      <div className="container" >

 


      <div class="row">

      <div class="col-lg-8 mb-5 mb-lg-0">
      <div class="blog_left_sidebar">
        {/* <CommentForm/> */}
      {/* <RecentBlogItems/> */}
      </div>
    </div>





      <section class="blog_area section-padding">
      <FontAwesomeIcon icon="fa-solid fa-blog" />      
      <div class="row justify-content-center">
                <div class="col-lg-7 col-md-9 col-sm-10">
                    <div class="section-tittle text-center mb-100 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".2s">
                        <h2>blog posts </h2>
                    </div>
                </div>
            </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mb-5 mb-lg-0">
              <div class="blog_left_sidebar">

              <div class="col-lg-12">
                    <div class="blog_right_sidebar">

<aside className="single_sidebar_widget search_widget">
  <form action="#">
    <div className="form-group">
      <div className="input-group mb-3">
        <input type="text" className="form-control" value={searchTerm}   onChange={handleSearchChange}
 placeholder="Search ..." onfocus="this.placeholder = ''" onblur="this.placeholder = 'Search Keyword'" />
        <div className="input-group-append">
          <button className="btns" type="button"><i className="ti-search" /></button>
        </div>
      </div>
    </div>
    {/* <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" type="">Search</button> */}
  </form>
</aside>
</div>
</div>
     

                {filteredBlogPosts.map((post) => (
                  <div key={post._id} class="card mb-3">
                                                              <Link to={`/blogpost/${post._id}`}>

                    <img

                      src={`https://fitmind-backend.onrender.com/uploads/${post.image}`}
                      class="card-img-top"
                      alt={post.title}
                      style={{ width: "100%", height: "auto" }}/>
                      </Link>

                      <div class="card-body">
                      <Link to={`/blogpost/${post._id}`}>

                      <h1 class="card-title">{post.title}</h1>
                      <br/>
                          </Link>

                 
                      <ul class="list-unstyled d-flex mb-0">
                      <li class="mr-3"><i class="fa fa-user"></i> {post.author}</li>
                      <br/>
                      <li><i class="fa fa-calendar"></i> {new Date(post.createdAt).toLocaleDateString()}</li>
                      </ul>
                      {userId === post.user && (
                        <button className="btn btn-secondary float-left" onClick={toggleOptions}>
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      
                      // <button className="btn btn-secondary" onClick={toggleOptions}>Options</button>
                      
                      )}
                      {showOptions && userId === post.user && (
                      <div class="btn-group mt-3">
                        <i className="fas fa-cog" onClick={toggleOptions}></i>

                      <h1 class="mr-3">Edit post </h1>
                      <UpdateBlogPost blogPost={post} />
                      <i variant="danger" onClick={() => handleDelete(post._id)} class="ml-3" style={{color: 'red'}}><i class="fas fa-trash"></i></i>
                      </div>
                      )}
                      </div>
                      </div>
                      ))}
                      </div>
                      </div>
                      </div>
                      
                        </div>
                      </section>
                      {/* <Comment/>
                      <BlogRightBar/> */}
                          </div>
                          </div>
                          </main>


                          </div>
                        );
                      }
                      export default requireAuth (BlogList);