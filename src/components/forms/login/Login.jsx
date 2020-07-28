import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Input from '../../common/Input';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(4).required(),
});

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

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const doSubmit = (data) => {
    console.log('submitted', data);
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
            onSubmit={handleSubmit(doSubmit)}
          >
            <Typography variant='h4'>Login Home</Typography>
            <Input
              name='username'
              label='Username'
              inputRef={register}
              error={errors.username}
              autoFocus={true}
            />
            <Input
              name='password'
              label='password'
              inputRef={register}
              error={errors.password}
              type='password'
              autoComplete='new-password'
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
