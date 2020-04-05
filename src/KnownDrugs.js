import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

const KNOWN_DRUGS_QUERY = gql`
  query KnownDrugs($page: Pagination! $sort: SortInput! $filters: Filters!) {
    knownDrugs(page: $page sort: $sort filters: $filters) {
      aggregations {
        total
      }
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

const NUM_ROWS = 10;

function KnownDrugs() {
  const [ pageIndex, setPageIndex ] = useState(0);
  const { loading, error, data } = useQuery(KNOWN_DRUGS_QUERY, {
    variables: {
      page: {index: pageIndex, size: NUM_ROWS },
      sort: { sortBy: 'disease', direction: 'asc' },
      filters: { disease: 'breast' }
    }
  });

  if (loading || error) return null;

  const { rows, aggregations } = data.knownDrugs;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Disease</TableCell>
            <TableCell>Phase</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Drug</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Mechanism of Action</TableCell>
            <TableCell>Activity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          rows.map((row, i) => {
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
        }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              page={pageIndex}
              count={aggregations.total}
              rowsPerPage={NUM_ROWS}
              rowsPerPageOptions={[]}
              onChangePage={(_, page) => setPageIndex(page)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default KnownDrugs;
