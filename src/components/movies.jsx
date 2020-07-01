import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';
import { getMovies } from '../services/fakeMovieService';
import Alert from '@material-ui/lab/Alert';
import Like from './Like';
import Paginations from './pagination';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
  Bold: {
    fontWeight: '700',
    fontSize: '22px',
  },
});

// console.log(getMovies.map((c) => c.title));

const Movies = () => {
  const [movies, setMovies] = useState({
    getMovie: getMovies(),
  });
  const [page, setPageSize] = useState({
    size: 4,
  });

  const handlePageChange = (page) => {
    console.log('page changed!!', page);
  };

  // for remove
  const handleDelete = (id) => {
    const updatedMovies = movies.getMovie.filter((item) => item._id !== id);
    setMovies({ getMovie: updatedMovies });
  };
  const getLength = movies.getMovie.length;

  const handleLike = (item) => {
    const movieLiked = [...movies.getMovie];
    const index = movieLiked.indexOf(item);
    movieLiked[index] = { ...movieLiked[index] };
    movieLiked[index].liked = !movieLiked[index].liked;
    setMovies({ getMovie: movieLiked });
  };

  const classes = useStyles();

  if (getLength === 0)
    return <Alert severity='error'>There are No Movies in Database</Alert>;

  return (
    <div>
      <Alert severity='info'>There are {getLength} Movies in Database</Alert>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.Bold}>Title</TableCell>
              <TableCell className={classes.Bold}> Genre</TableCell>
              <TableCell className={classes.Bold}>Stock</TableCell>
              <TableCell className={classes.Bold}>Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.getMovie.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.genre.name}</TableCell>
                <TableCell>{item.numberInStock}</TableCell>
                <TableCell>{item.dailyRentalRate}</TableCell>
                <TableCell size='small'>
                  <Like liked={item.liked} onLiked={() => handleLike(item)} />
                </TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Paginations
          totalCount={getLength}
          pageSize={page.size}
          onPageChange={handlePageChange}
        />
      </TableContainer>
    </div>
  );
};

export default Movies;
