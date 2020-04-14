import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

const KnownDrugsFooter = ({
  total = 0,
  size,
  pageIndex,
  onChangePage,
  loading,
}) => {
  return (
    <TablePagination
      component="div"
      count={total}
      rowsPerPage={size}
      page={pageIndex}
      rowsPerPageOptions={[]}
      onChangePage={(_, page) => onChangePage(page)}
    />
  );
};

export default KnownDrugsFooter;
