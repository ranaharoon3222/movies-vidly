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
import { FavoriteBorder } from '@material-ui/icons';

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

  const handleDelete = (id) => {
    const updatedMovies = movies.getMovie.filter((item) => item._id !== id);
    setMovies({ getMovie: updatedMovies });
  };
  const getLength = movies.getMovie.length;

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
                  <FavoriteBorder />
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
      </TableContainer>
    </div>
  );
};

export default Movies;
