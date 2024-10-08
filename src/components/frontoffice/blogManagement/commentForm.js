import React, { useState } from 'react';
import axios from 'axios';
import requireAuth from '../authentification/requireAuth';

function CommentForm(props) {
  const [commentData, setCommentData] = useState({
    comment: '',
    user: props.userId,
    blogpost: props.blogpostId
  });

  const handleChange = (event) => {
    setCommentData({
      ...commentData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://fitmind-backend.onrender.com/api/commentaire', commentData);
      const savedComment = response.data;
      console.log('Comment saved:', savedComment);
          // Update the state with the new comment
    setCommentData({
      comment: '',
      user: props.userId,
      blogpost: props.blogpostId
    });
    props.onAddComment(savedComment); // pass the new comment to the parent component to update its state

      // Do something with the saved comment, e.g. update the UI
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };



  return (
    <div className="comment-form">
      <h4>Leave a Reply</h4>
      <form className="form-contact comment_form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <textarea
                className="form-control w-100"
                name="comment"
                id="comment"
                cols={30}
                rows={9}
                placeholder="Write Comment"
                value={commentData.comment}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="button button-contactForm btn_1 boxed-btn"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default requireAuth (CommentForm);