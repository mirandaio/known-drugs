import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import TablePagination from '@material-ui/core/TablePagination';

const TOTAL_QUERY = gql`
  query Total($filters: [Filter!]) {
    knownDrugs(filters: $filters) {
      aggregations {
        filteredTotal
      }
    }
  }
`;

const KnownDrugsFooter = ({ pageIndex, size, filters, onChangePage }) => {
  const { loading, error, data } = useQuery(TOTAL_QUERY, {
    variables: {
      filters
    }
  });

  if (loading || error) return null;

  const { aggregations } = data.knownDrugs;

  return (
    <TablePagination
      page={pageIndex}
      count={aggregations.filteredTotal}
      rowsPerPage={size}
      rowsPerPageOptions={[]}
      onChangePage={(_, page) => onChangePage(page)}
    />
  );
};

export default KnownDrugsFooter;
