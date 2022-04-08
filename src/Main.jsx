import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import '../node_modules/react-quill/dist/quill.snow.css';
import ReactMarkdown from 'react-markdown';

/* eslint-disable react/react-in-jsx-scope */
function Main({ activeNote, onUpdateNote }) {
  const [body, setBody] = useState('');
  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No note selected</div>;

  const handleBody = (e) => {
    setBody(e);
    onEditField('title', e.target.value);
  };
  // const handleBody2 = (e) => {
  //   onEditField('title', e.target.value)
  // };

  Main.modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block'],
    ],
  };
  Main.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
  ];
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        {/* <ReactQuill
          placeholder="Write something amazing..."
          modules={Main.modules}
          formats={Main.formats}
          onChange={handleBody}
          value={body}
        /> */}
        <input
          type="text"
          id="title"
          value={activeNote.title}
          onChange={handleBody}
          autoFocus
        />
        <ReactQuill
          id="body"
          placeholder="Write your note here..."
          modules={Main.modules}
          formats={Main.formats}
          // value={activeNote.body}
          value={body}
          onChange={handleBody}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">{activeNote.body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Main;
