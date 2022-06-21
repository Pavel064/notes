import React from 'react';

const Sidebar = ({ notes, onAddNote, onDeleteNote, activeNoteId, setActiveNoteId }) => {
  // const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  wwwwww;
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {/* lastModified is always first
        {sortedNotes.map(({ id, title, body, lastModified }, i) => ( */}
        {notes.map(({ id, title, body, lastModified }, i) => (
          // create a dynamic className
          <div
            className={`app-sidebar-note ${id === activeNoteId && 'active'}`}
            key={i}
            onClick={() => setActiveNoteId(id)}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={() => onDeleteNote(id)}>Delete</button>
            </div>
            {/* <p>{body[0] && body[0].substr(0, 15) + '...'}</p> */}
            <small className="note-meta">
              Last modified{' '}
              {new Date(lastModified).toLocaleDateString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
