import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Layout from '../layout/Layout';
import { getMovie, saveMovie } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import Input from '../common/Input';
// import { v4 as uuidv4 } from 'uuid';

const schema = yup.object().shape({
  title: yup.string().required(),
  genreId: yup.string().required(),
  numberInStock: yup.number().positive().required(),
  dailyRentalRate: yup.number().positive().min(0).max(10).required(),
  _id: yup.string(),
});

const MovieForm = ({ history }) => {
  const [data, setData] = useState({
    _id: '',
    title: '',
    genreId: '',
    numberInStock: '',
    dailyRentalRate: '',
  });
  const [Genre, setGenre] = useState([]);

  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur',
    defaultValues: {
      genreId: '',
    },
  });

  const { id } = useParams();

  const handleChange = (e) => {
    const updatedValue = { ...data };
    updatedValue[e.target.name] = e.target.value;
    setData(updatedValue);
  };

  useEffect(() => {
    const genres = getGenres();
    setGenre(genres);

    const movieId = id;
    if (movieId === 'add-movie') return;

    const movie = getMovie(movieId);
    if (!movie) return history.replace('/not-found');

    setData(mapToViewModel(movie));
  }, [history, id]);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      genreId: movie.genre._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const doSubmit = (Formdata) => {
    saveMovie(Formdata);
    history.push('/movies');
  };

  useEffect(() => {
    reset({ genreId: data.genreId });
  }, [data.genreId, reset]);

  return (
    <Layout>
      <Grid container spacing={0} alignItems='center'>
        <Grid item xs={6}>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(doSubmit)}>
            <Typography variant='h4'>You are Editing : {data.title}</Typography>
            <Input
              name='_id'
              inputRef={register}
              error={errors._id}
              value={data._id}
              type='hidden'
            />
            <Input
              name='title'
              label='Title'
              inputRef={register}
              error={errors.title}
              autoFocus={true}
              value={data.title}
              onChange={handleChange}
            />
            <Input
              name='numberInStock'
              label='Stock'
              inputRef={register}
              error={errors.numberInStock}
              type='number'
              value={data.numberInStock}
              onChange={handleChange}
            />

            <Controller
              name='genreId'
              control={control}
              as={
                <Select>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {Genre.map((item) => (
                    <MenuItem value={item._id} key={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              }
              displayEmpty
              defaultValue={data.genreId}
              fullWidth
              variant='outlined'
              error={errors.genreId && true}
            />
            <Input
              name='dailyRentalRate'
              label='Rate'
              inputRef={register}
              error={errors.dailyRentalRate}
              type='number'
              value={data.dailyRentalRate}
              onChange={handleChange}
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
