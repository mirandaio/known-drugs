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
import TableSortLabel from '@material-ui/core/TableSortLabel';
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
  const [ sort, setSort ] = useState({ sortBy: 'disease', direction: 'asc' });
  const { loading, error, data } = useQuery(KNOWN_DRUGS_QUERY, {
    variables: {
      page: {index: pageIndex, size: NUM_ROWS },
      sort,
      filters: { disease: 'breast' }
    }
  });

  if (loading || error) return null;

  const { rows, aggregations } = data.knownDrugs;

  const createSortHandler = property => () => {
    setSort({
      sortBy: property,
      direction:
        property !== sort.sortBy ? 'asc' :
          sort.direction === 'asc' ? 'desc' : 'asc'
    });

    if (property !== sort.sortBy) {
      setPageIndex(0);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sort.sortBy === 'disease'}
                direction={sort.direction}
                onClick={createSortHandler('disease')}
              >
                Disease
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.sortBy === 'phase'}
                direction={sort.direction}
                onClick={createSortHandler('phase')}
              >
                Phase
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.sortBy === 'status'}
                direction={sort.direction}
                onClick={createSortHandler('status')}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.sortBy === 'source'}
                direction={sort.direction}
                onClick={createSortHandler('source')}
              >
                Source
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.sortBy === 'drug'}
                direction={sort.direction}
                onClick={createSortHandler('drug')}
              >
                Drug
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.sortBy === 'type'}
                direction={sort.direction}
                onClick={createSortHandler('type')}
              >
                Type
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.sortBy === 'mechanism'}
                direction={sort.direction}
                onClick={createSortHandler('mechanism')}
              >
                Mechanism of Action
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.sortBy === 'activity'}
                direction={sort.direction}
                onClick={createSortHandler('activity')}
              >
                Activity
              </TableSortLabel>
            </TableCell>
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
