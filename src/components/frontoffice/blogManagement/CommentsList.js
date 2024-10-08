import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import requireAuth from '../authentification/requireAuth';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CommentsList(props) {
  
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [blogpostId, setBlogPostId] = useState(props.blogpostId);
  const userId = localStorage.getItem("userId");
  const [showOptions, setShowOptions] = useState(false);

  const addComment = (comment) => {
    setComments([...comments, comment]);
  }


  useEffect(() => {
    async function fetchComments() {
      try {
        const userId = localStorage.getItem('userId');
        const response2 = await axios.get(`https://fitmind-backend.onrender.com/api/users/${userId}`);
        const user = response2.data;
        setUsername(`${user.firstName} ${user.lastName}`);
  
        const response = await axios.get(`https://fitmind-backend.onrender.com/api/commentaire/${blogpostId}`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchComments();
  }, [blogpostId]);


  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://fitmind-backend.onrender.com/api/commentaire/${commentId}`);
      console.log('Comment deleted:', commentId);
      
      // Update the state by filtering out the deleted comment
      setComments((prevComments) => {
        if (prevComments) {
          return prevComments.filter((comment) => comment._id !== commentId);
        }
        return [];
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  


  return (
    
    <div className="comment-list">
 
        <h4>{comments.length} Comments</h4>

            {comments.map(comment => (
                      <div key={comment.id}>

      <div className="comments-area">
  <div className="comment-list">
    <div className="single-comment justify-content-between d-flex">
      <div className="user justify-content-between d-flex">
        {/* <div className="thumb">
          <img src="assets/img/comment/comment_1.png" alt />
        </div> */}
        <div className="desc">
          <p className="comment">
          {comment.comment}
          </p>
          { userId === comment.user && (

<i variant="danger" onClick={() => handleDeleteComment(comment._id)} class="ml-3" style={{color: 'red'}}><i class="fas fa-trash"></i></i>
                      )}


          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <h5>
                <a href="#">{username}</a>
              </h5>
              {/* <p className="date">{comment.comment} </p> */}
            </div>
            <div className="reply-btn">
              <a href="#" className="btn-reply text-uppercase">reply</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

      ))}


    </div>
  );
}

export default requireAuth (CommentsList);