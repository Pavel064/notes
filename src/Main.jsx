import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/* eslint-disable react/react-in-jsx-scope */
function Main({ activeNote, onUpdateNote }) {
  const [value, setValue] = useState('');
  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No note selected</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          value={activeNote.title}
          onChange={(e) => onEditField('title', e.target.value)}
          autoFocus
        />
        <ReactQuill
          className="quill"
          placeholder="Write your note here..."
          theme="snow"
          value={value}
          onChange={setValue}
        />
        {/* <ReactQuill
          theme="snow"
          value={activeNote.body}
          onChange={(e) => onEditField('body', e.target.value)}
        /> */}
        {/* <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField('body', e.target.value)}
        /> */}
      </div>
      {/* <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">{activeNote.body}</ReactMarkdown>
      </div> */}
    </div>
  );
}

export default Main;
