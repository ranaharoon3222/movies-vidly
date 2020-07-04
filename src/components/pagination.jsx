import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

const Paginations = (props) => {
  // const pageCount = Math.ceil(props.totalCount / props.pageSize);

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component='div'
      count={props.totalCount}
      rowsPerPage={props.rowsPerPage}
      page={props.page}
      onChangePage={props.onPageChange}
      onChangeRowsPerPage={props.changeRow}
    />
  );
};

export default Paginations;
