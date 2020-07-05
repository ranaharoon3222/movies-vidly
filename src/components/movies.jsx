import React, { useState, useEffect } from 'react';
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
import { Paginate } from '../utils/Paginate';
import TableSearch from './tableSearch';

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

  const [search, setSearch] = useState('');

  const [filterMovie, setFilterMovie] = useState([]);
  // for remove
  const handleDelete = (id) => {
    const updatedMovies = movies.getMovie.filter((item) => item._id !== id);
    setMovies({ getMovie: updatedMovies });
  };

  const handleLike = (item) => {
    const movieLiked = [...movies.getMovie];
    const index = movieLiked.indexOf(item);
    movieLiked[index] = { ...movieLiked[index] };
    movieLiked[index].liked = !movieLiked[index].liked;
    setMovies({ getMovie: movieLiked });
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    setFilterMovie(
      movies.getMovie.filter(
        (movie) =>
          movie.genre.name.toLowerCase().includes(search.toLowerCase()) ||
          movie.title.toLowerCase().includes(search.toLowerCase()) ||
          movie.numberInStock
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    );
  }, [search, movies.getMovie]);

  const getLength = filterMovie.length;

  // table pagination

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, getLength - page * rowsPerPage); //  5, 28 - 5 * 5 = 4

  // table pagination

  const PaginateMovies = Paginate(filterMovie, page, rowsPerPage);

  const classes = useStyles();

  return (
    <div>
      <Alert severity='info'>There are {getLength} Movies in Database</Alert>
      <TableContainer component={Paper}>
        <TableSearch onInputChange={handleInputChange} />

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
            {PaginateMovies.map((item) => (
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

            {emptyRows > 0 && (
              <TableRow style={{ height: 68 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Paginations
          totalCount={getLength}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          changeRow={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default Movies;
