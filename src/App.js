import React from 'react';
import Movies from './components/movies';
import { Container } from '@material-ui/core';
const App = () => {
  return (
    <div>
      <Container>
        <Movies />
      </Container>
    </div>
  );
};

export default App;
