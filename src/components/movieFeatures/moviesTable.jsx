import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Link,
} from '@material-ui/core';
import Like from './Like';
import { Link as RouterLink } from 'react-router-dom';

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

const MoviesTable = ({
  PaginateMovies,
  handleLike,
  handleDelete,
  emptyRows,
}) => {
  const classes = useStyles();

  return (
    <div>
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
              <TableCell>
                <Link to={`/movies/${item._id}`} component={RouterLink}>
                  {item.title}
                </Link>
              </TableCell>
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
    </div>
  );
};

export default MoviesTable;
