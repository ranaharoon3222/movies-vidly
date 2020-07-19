import React, { useState } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Input from '../../common/Input';

const useStyle = makeStyles({
  image: {
    width: '100%',
    height: '93vh',
    objectFit: 'cover',
  },

  form: {
    padding: '0 40px 0 40px',
    maxWidth: '450px',
    margin: 'auto',
  },
  gContainer: {
    background: ' linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)',
    marginTop: '-30px',
    overflow: 'hidden',
  },
});

const Login = () => {
  const classes = useStyle();
  const [account, setAccount] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const error = {};
    if (account.username.trim() === '') error.username = 'Username is Required';
    if (account.password.trim() === '') error.password = 'Password is Required';
    return Object.keys(error).length === 0 ? null : error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    setErrors(error || {});
    if (error) return;
    console.log('submitted');
  };
  const handleInputChange = (e) => {
    const login = { ...account };
    login[e.target.name] = e.target.value;
    setAccount(login);
  };
  return (
    <div>
      <Grid
        container
        spacing={0}
        alignItems='center'
        className={classes.gContainer}
      >
        <Grid item xs={6}>
          <img
            src='https://i.kym-cdn.com/entries/icons/facebook/000/022/040/Madagascar-3-Wallpaper.jpg'
            className={classes.image}
            alt=''
          />
        </Grid>
        <Grid item xs={6}>
          <form
            noValidate
            autoComplete='off'
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <Typography variant='h4'>Login Home</Typography>

            <Input
              name='username'
              label='Username'
              onChange={handleInputChange}
              value={account.username}
              error={errors.username}
            />

            <Input
              name='password'
              label='Password'
              onChange={handleInputChange}
              value={account.password}
              error={errors.password}
            />

            <Button variant='contained' color='primary' fullWidth type='submit'>
              Submit Now
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
