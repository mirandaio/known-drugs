import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

const KnownDrugsFooter = ({
  total = 0,
  size,
  pageIndex,
  onChangePage,
  loading,
}) => {
  const lastPageIndex = Math.floor(total / size);
  return (
    <TablePagination
      component="div"
      count={total}
      rowsPerPage={size}
      page={pageIndex}
      rowsPerPageOptions={[]}
      onChangePage={(_, page) => onChangePage(page)}
      backIconButtonProps={{ disabled: loading || pageIndex === 0 }}
      nextIconButtonProps={{ disabled: loading || pageIndex === lastPageIndex }}
    />
  );
};

export default KnownDrugsFooter;
