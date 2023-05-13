import React, { useState } from 'react';

function Community() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
      title: title,
      content: content
    };
    const updatedPosts = [...existingPosts, newPost];
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setTitle('');
    setContent('');
  };

  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={handleContentChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <h2>Posts</h2>
      {posts.map((post, index) => (
        <div key={index}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Community;