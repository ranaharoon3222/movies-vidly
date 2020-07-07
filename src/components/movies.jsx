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
  Grid,
} from '@material-ui/core';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Alert from '@material-ui/lab/Alert';
import Like from './Like';
import Paginations from './pagination';
import { Paginate } from '../utils/Paginate';
import TableSearch from './tableSearch';
import TableFilter from './tableFilter';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
  Bold: {
    fontWeight: '700',
    fontSize: '22px',
  },
  margin: {
    marginTop: '20px !important',
  },
});

const Movies = () => {
  const [movies, setMovies] = useState({
    getMovie: [],
  });

  const [search, setSearch] = useState('');
  const [filterMovie, setFilterMovie] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectGenre, setselectGenre] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ===== get active movies length =====//
  const getLength = filterMovie.length;
  // ===== get active movies length =====//

  // ===== Like Button =====//
  const handleLike = (item) => {
    const movieLiked = [...movies.getMovie];
    const index = movieLiked.indexOf(item);
    movieLiked[index] = { ...movieLiked[index] };
    movieLiked[index].liked = !movieLiked[index].liked;
    setMovies({ getMovie: movieLiked });
  };
  // ===== Like Button =====//

  // ===== Delete Movie Row =====//
  const handleDelete = (id) => {
    const updatedMovies = movies.getMovie.filter((item) => item._id !== id);
    setMovies({ getMovie: updatedMovies });
  };
  // ===== Delete Movie Row =====//

  // ===== get input Value =====//
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  // ===== get input Value =====//

  // ===== Handle Table page change =====//
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // ===== Handle Table page change =====//

  // ===== Handle Table Rows per page  =====//
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // ===== Handle Table Rows per page  =====//

  // ===== Genere Filter  =====//
  const handlegenreSelect = (genre) => {
    setselectGenre(genre);
    const checkAllgenre = genre.name === 'All Generes' ? '' : genre.name;
    setSearch(checkAllgenre);
    setPage(0);
  };
  // ===== Genere Filter  =====//

  // ===== Empty Rows for table  =====//
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, getLength - page * rowsPerPage); //  5, 28 - 5 * 5 = 4
  // ===== Empty Rows for table  =====//

  // ===== Pagination Login  =====//
  const PaginateMovies = Paginate(filterMovie, page, rowsPerPage);
  // ===== Pagination Login  =====//

  useEffect(() => {
    console.log('genere useeffect render');
    setSearch('');
    const generes = [
      { name: 'All Generes', _id: 'All_Generes' },
      ...getGenres(),
    ];
    setGenre(generes);
    setMovies({ getMovie: getMovies() });
  }, []);

  useEffect(() => {
    console.log('movie useeffect render');
    setFilterMovie(
      movies.getMovie.filter(
        (movie) =>
          movie.genre.name.toLowerCase().includes(search.toLowerCase()) ||
          movie.title.toLowerCase().includes(search.toLowerCase()) ||
          movie.numberInStock.toString().includes(search.toLowerCase())
      )
    );
    setPage(0);
  }, [search, movies.getMovie]);

  // table pagination

  const classes = useStyles();

  return (
    <div>
      <Alert severity='info'>There are {getLength} Movies in Database</Alert>
      <Grid container={true} spacing={5} className={classes.margin}>
        <Grid item xs={12} md={4}>
          <Paper>
            <TableFilter
              genre={genre}
              selectedGenre={selectGenre}
              onSelected={handlegenreSelect}
              textProperty='name'
              valueProperty='_id'
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <TableSearch
              onInputChange={handleInputChange}
              searchValue={search}
            />
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
                      <Like
                        liked={item.liked}
                        onLiked={() => handleLike(item)}
                      />
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Movies;
