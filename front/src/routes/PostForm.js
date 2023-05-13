import React, { useState } from 'react';

function PostForm({ handleAddPost }) {
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
    const newPost = {
      title: title,
      content: content
    };
    handleAddPost(newPost);
    setTitle('');
    setContent('');
  };

  return (
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
  );
}

export default PostForm;
