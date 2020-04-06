import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import TablePagination from '@material-ui/core/TablePagination';

const TOTAL_QUERY = gql`
  query Total {
    knownDrugs {
      aggregations {
        total
      }
    }
  }
`;

const KnownDrugsFooter = ({ pageIndex, size, onChangePage }) => {
  const { loading, error, data } = useQuery(TOTAL_QUERY);

  if (loading || error) return null;

  const { aggregations } = data.knownDrugs;

  return (
    <TablePagination
      page={pageIndex}
      count={aggregations.total}
      rowsPerPage={size}
      rowsPerPageOptions={[]}
      onChangePage={(_, page) => onChangePage(page)}
    />
  );
};

export default KnownDrugsFooter;
