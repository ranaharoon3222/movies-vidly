import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';

const Paginations = (props) => {
  const { totalCount, rowsPerPage, page, onPageChange, changeRow } = props;

  // console.log(typeof props.onPageChange);
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component='div'
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={onPageChange}
      onChangeRowsPerPage={changeRow}
    />
  );
};

Paginations.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  changeRow: PropTypes.func.isRequired,
};

export default Paginations;
