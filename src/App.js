import React, { useEffect, useMemo, useState } from 'react';
import uuid from 'react-uuid';
import Main from './Main';
import Sidebar from './Sidebar';
import './App.css';

function App() {
  // initial notes array
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  // create an activeNote state
  const [activeNoteId, setActiveNoteId] = useState(false);
  // console.log(activeNoteId);
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  // add note function
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: 'Untitled Note',
      body: '',
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };
  // note delete function
  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };
  // called if there is a change in the body field
  const onUpdateNote = (updatedNote) => {
    console.log(updatedNote);
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
    console.log(updatedNote.title);
    console.log(notes[0].title);
  };
  // get an active note
  const getActiveNoteObj = useMemo(() => {
    console.log('getActiveNoteObj');
    return notes.find((note) => note.id === activeNoteId);
  }, [notes, activeNoteId]);
  console.log(getActiveNoteObj);

  // const getActiveNote = () => {
  //   return notes.find((note) => note.id === activeNote);
  // };
  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
      />
      <Main activeNoteObj={getActiveNoteObj} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
