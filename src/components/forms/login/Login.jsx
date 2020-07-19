import React, { useState } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Joi from 'joi-browser';
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

  const schema = {
    username: Joi.string().min(3).max(20).required().label('Username'),
    password: Joi.string().min(6).max(20).required().label('Password'),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(account, schema, options);

    if (!result.error) return null;

    const error = {};

    for (let item of result.error.details) error[item.path[0]] = item.message;
    return error;

    // const error = {};
    // if (account.username.trim() === '') error.username = 'Username is Required';
    // if (account.password.trim() === '') error.password = 'Password is Required';
    // return Object.keys(error).length === 0 ? null : error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    setErrors(error || {});
    if (error) return;
    console.log('submitted');
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema_Property = { [name]: schema[name] };
    const result = Joi.validate(obj, schema_Property);
    return result.error ? result.error.details[0].message : null;

    // if (input.name === 'username') {
    //   if (input.value.trim() === '') return 'Username is Required';
    // }
    // if (input.name === 'password') {
    //   if (input.value.trim() === '') return 'Password is Required';
    // }
  };

  const handleInputChange = ({ target: input }) => {
    const error = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    const login = { ...account };
    login[input.name] = input.value;
    setAccount(login);
    setErrors(error);
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

            <Button
              variant='contained'
              color='primary'
              fullWidth
              type='submit'
              disabled={validate() ? true : false}
            >
              Submit Now
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
