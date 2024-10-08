import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecentItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const response = await axios.get('https://fitmind-backend.onrender.com/api/blog/recent-posts');
      setItems(response.data);
    }
    fetchItems();
  }, []);

  return (
    <aside className="single_sidebar_widget popular_post_widget">
      <h3 className="widget_title" style={{color: '#2d2d2d'}}>Recent Posts</h3>
      {items.map((item) => (
        <div key={item.id} className="media post_item">
          <img
            src={`https://fitmind-backend.onrender.com/uploads/${item.image}`}
            class="img-fluid"
            alt={item.title}
            style={{ width: 'auto', height: '500px' }}
          />
          <div className="media-body">
            <a href={`/blog/${item.id}`}>
              <h3 style={{color: '#2d2d2d'}}>{item.title}</h3>
            </a>
            <p>{item.createdAt}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}

export default RecentItems;
