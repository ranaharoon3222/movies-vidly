import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Layout from '../layout/Layout';
import { getMovies } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import Input from '../common/Input';

const schema = yup.object().shape({
  title: yup.string().required(),
  genre: yup.object().shape({
    name: yup.string().required(),
    _id: yup.string().required(),
  }),
  numberInStock: yup.number().positive().required(),
  dailyRentalRate: yup.number().positive().required(),
  editDate: yup.date(),
});

const MovieForm = ({ history }) => {
  const [movies, setMovies] = useState(getMovies());
  const getGenre = getGenres();

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const { id } = useParams();

  const index = movies.findIndex((item) => item._id === id);
  const { dailyRentalRate, numberInStock, title, genre } = movies[index];

  const doSubmit = (data) => {
    const newMovies = movies;
    newMovies[index] = Object.assign(movies[index], data);
    setMovies(newMovies);
    history.push('/movies');
  };
  return (
    <Layout>
      <Grid
        container
        spacing={0}
        alignItems='center'
        // className={classes.gContainer}
      >
        <Grid item xs={6}>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(doSubmit)}>
            <Typography variant='h4'>You are Editing : {title}</Typography>

            <Input
              name='genre._id'
              inputRef={register}
              error={errors._id}
              defaultValue={genre._id}
              type='hidden'
            />
            <Input
              name='editDate'
              inputRef={register}
              error={errors.editDate}
              defaultValue={new Date()}
              type='hidden'
            />
            <Input
              name='title'
              label='Title'
              inputRef={register}
              error={errors.title}
              autoFocus={true}
              defaultValue={title}
            />
            <Input
              name='numberInStock'
              label='Stock'
              inputRef={register}
              error={errors.numberInStock}
              type='number'
              defaultValue={numberInStock}
            />

            <Controller
              name='genre.name'
              as={Select}
              control={control}
              fullWidth
              defaultValue={genre.name}
              variant='outlined'
            >
              {getGenre.map((item) => (
                <MenuItem value={item.name} key={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Controller>
            <Input
              name='dailyRentalRate'
              label='Rate'
              inputRef={register}
              error={errors.dailyRentalRate}
              type='number'
              defaultValue={dailyRentalRate}
            />

            <Button variant='contained' color='primary' fullWidth type='submit'>
              Submit Now
            </Button>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MovieForm;
