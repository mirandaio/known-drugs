import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const KNOWN_DRUGS_QUERY = gql`
  query KnownDrugs($page: Pagination! $sort: SortInput! $filters: Filters!) {
    knownDrugs(page: $page sort: $sort filters: $filters) {
      rows {
        disease
        phase
        status
        source
        drug
        type
        mechanism
        activity
      }
    }
  }
`;

const KnownDrugsBody = ({ pageIndex, sort, filters, size }) => {
  const { loading, error, data } = useQuery(KNOWN_DRUGS_QUERY, {
    variables: {
      page: { index: pageIndex, size },
      sort,
      filters
    }
  });

  if (loading || error) return null;
  
  const { rows } = data.knownDrugs;

  return rows.map((row, i) => {
    return (
      <TableRow key={i}>
        <TableCell>{row.disease}</TableCell>
        <TableCell>{row.phase}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{row.source}</TableCell>
        <TableCell>{row.drug}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.mechanism}</TableCell>
        <TableCell>{row.activity}</TableCell>
      </TableRow>
    );
  })
};

export default KnownDrugsBody;
