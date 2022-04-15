import React from 'react';
import { Container, Box } from '@material-ui/core';
import Editor from './Editor';

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
    console.log(activeNote);
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <React.Fragment>
          <Container
            style={{ backgroundColor: '#dfffdf', minHeight: '100vh' }}
            maxWidth="xl"
          >
            <Box p={5}>
              <Box>
                <input
                  type="text"
                  id="title"
                  placeholder="Note Title"
                  value={activeNote.title}
                  onChange={(e) => onEditField('title', e.target.value)}
                  autoFocus
                />
              </Box>
              <Box
                mt={2}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #cccccc',
                }}
              >
                <Editor />
              </Box>
            </Box>
          </Container>
        </React.Fragment>
      </div>
    </div>
  );
};
export default Main;
