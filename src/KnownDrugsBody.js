import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

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
        <TableCell>
          <Typography variant="caption">{row.disease}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{row.phase}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{row.status}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{row.source}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{row.drug}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{row.type}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{row.mechanism}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{row.activity}</Typography>
        </TableCell>
      </TableRow>
    );
  })
};

export default KnownDrugsBody;
