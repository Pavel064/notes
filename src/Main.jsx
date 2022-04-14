import React, { useEffect, useCallback, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './tools';

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

  const ReactEditorJS = createReactEditorJS();
  const editorCore = useRef(null);

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  useEffect(() => {
    if (editorCore.current) {
      editorCore.current.render(activeNote.body);
    }
  }, [activeNote]);

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.save();
    setValue(savedData);
  }, []);
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
        <ReactEditorJS
          onInitialize={handleInitialize}
          defaultValue={activeNote.body.blocks}
          tools={EDITOR_JS_TOOLS}
        />
        <button onClick={handleSave}>Save</button>
        {/* <ReactQuill
          className="quill"
          placeholder="Write your note here..."
          theme="snow"
          value={value}
          onChange={setValue}
        /> */}
      </div>
    </div>
  );
};
export default Main;
