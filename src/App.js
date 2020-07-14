import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Navbar from './components/header/Nabar';
import Customer from './components/routes/Customer';
import Error from './components/routes/Error';
import Home from './Home';
import Rental from './components/routes/Rental';
import MovieForm from './components/routes/MovieForm';

const App = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Switch>
          <Route path='/rental' component={Rental} />
          <Route path='/customer' component={Customer} />
          <Route path='/movies/:id' component={MovieForm} />
          <Route path='/movies' component={Home} />
          <Redirect from='/' to='/movies' />
          <Route path='*' component={Error} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
