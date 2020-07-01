import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(5),
    },
  },
}));

const Paginations = (props) => {
  const classes = useStyles();

  const pageCount = Math.ceil(props.totalCount / props.pageSize);
  return (
    <div className={classes.root}>
      <Pagination
        count={pageCount}
        color='primary'
        onChange={(event, pageNum) => props.onPageChange(pageNum)}
      />
    </div>
  );
};

export default Paginations;
