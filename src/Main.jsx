import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/* eslint-disable react/react-in-jsx-scope */
const Main = ({ activeNote, onUpdateNote }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value) {
      onEditField('body', value);
    }
  }, [value]);

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
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
      </div>
    </div>
  );
};
export default Main;
