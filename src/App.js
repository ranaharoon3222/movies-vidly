import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Navbar from './components/header/Nabar';
import Customer from './components/routes/Customer';
import Error from './components/routes/Error';
import Rental from './components/routes/Rental';
import MovieForm from './components/routes/MovieForm';
import Login from './components/forms/login/Login';
import Register from './components/forms/register/Register';
import Home from './Home';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/rental' component={Rental} />
        <Route path='/customer' component={Customer} />
        <Route path='/movies/:id' component={MovieForm} />
        <Route path='/movies' component={Home} />
        <Redirect exact from='/' to='/movies' />
        <Route path='*' component={Error} />
      </Switch>
    </div>
  );
};

export default App;
