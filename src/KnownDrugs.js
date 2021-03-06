import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import KnownDrugsBody from './KnownDrugsBody';
import KnownDrugsFooter from './KnownDrugsFooter';
import SummaryPlots from './SummaryPlots';
import client from './client';

const NUM_ROWS = 10;

const KNOWN_DRUGS_QUERY = gql`
  query KnownDrugs($page: Page!, $sort: SortInput!, $filters: [Filter!]) {
    knownDrugs(page: $page, sort: $sort, filters: $filters) {
      aggregations {
        total
        uniqueDrugs
        uniqueDiseases
        clinicalTrials
        uniqueDrugsByType {
          category
          count
        }
        uniqueDrugsByActivity {
          category
          count
        }
      }
      rows {
        disease {
          id
          name
        }
        target {
          id
          symbol
        }
        drug {
          id
          name
          type
          activity
        }
        clinicalTrial {
          phase
          status
          sourceUrl
          sourceName
        }
        mechanismOfAction {
          name
          sourceName
          sourceUrl
        }
      }
    }
  }
`;

function KnownDrugs() {
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [rows, setRows] = useState([]);
  const [aggs, setAggs] = useState({});
  const [sort, setSort] = useState({ sortBy: 'disease', direction: 'asc' });
  const [filterStrings, setFilterStrings] = useState({
    disease: '',
    phase: '',
    status: '',
    source: '',
    drug: '',
    type: '',
    mechanismOfAction: '',
    activity: '',
  });
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setLoading(true);
    client
      .query({
        query: KNOWN_DRUGS_QUERY,
        variables: {
          page: { index: pageIndex, size: NUM_ROWS },
          sort,
          filters,
        },
      })
      .then((res) => {
        setRows(res.data.knownDrugs.rows);
        setAggs(res.data.knownDrugs.aggregations);
        setLoading(false);
      });
  }, [pageIndex, sort, filters]);

  const createSortHandler = (property) => () => {
    setSort({
      sortBy: property,
      direction:
        property !== sort.sortBy
          ? 'asc'
          : sort.direction === 'asc'
          ? 'desc'
          : 'asc',
    });

    if (property !== sort.sortBy) {
      setPageIndex(0);
    }
  };

  const createFilterHandler = (property) => (e) => {
    if (e.key === 'Enter') {
      const newFilters = [];

      for (let i = 0; i < filters.length; i++) {
        if (filters[i].filterBy !== property) {
          newFilters.push(filters[i]);
        }
      }

      if (filterStrings[property] !== '') {
        newFilters.push({
          filterBy: property,
          value: filterStrings[property],
        });
      }

      setFilters(newFilters);
      setPageIndex(0);
    }
  };

  const createFilterStringHandler = (property) => (e) => {
    setFilterStrings({
      ...filterStrings,
      [property]: e.target.value,
    });
  };

  const handleChangePage = (page) => {
    setPageIndex(page);
  };

  return (
    <Grid container justify="space-around">
      <Typography variant="h5" gutterBottom>
        Known drugs for ESR1
      </Typography>
      <Typography>
        Back end schema:{' '}
        <a href="https://known-drugs.herokuapp.com/graphql">
          https://known-drugs.herokuapp.com/graphql
        </a>
      </Typography>
      <Grid item md={11} sm={12} xs={12}>
        <SummaryPlots aggs={aggs} />
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
                    active={sort.sortBy === 'mechanismOfAction'}
                    direction={sort.direction}
                    onClick={createSortHandler('mechanismOfAction')}
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
              <TableRow>
                <TableCell>
                  <input
                    type="text"
                    value={filterStrings.disease}
                    onChange={createFilterStringHandler('disease')}
                    onKeyDown={createFilterHandler('disease')}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={filterStrings.phase}
                    onChange={createFilterStringHandler('phase')}
                    onKeyDown={createFilterHandler('phase')}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={filterStrings.status}
                    onChange={createFilterStringHandler('status')}
                    onKeyDown={createFilterHandler('status')}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={filterStrings.source}
                    onChange={createFilterStringHandler('source')}
                    onKeyDown={createFilterHandler('source')}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={filterStrings.drug}
                    onChange={createFilterStringHandler('drug')}
                    onKeyDown={createFilterHandler('drug')}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={filterStrings.type}
                    onChange={createFilterStringHandler('type')}
                    onKeyDown={createFilterHandler('type')}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={filterStrings.mechanism}
                    onChange={createFilterStringHandler('mechanismOfAction')}
                    onKeyDown={createFilterHandler('mechanismOfAction')}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={filterStrings.activity}
                    onChange={createFilterStringHandler('activity')}
                    onKeyDown={createFilterHandler('activity')}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <KnownDrugsBody rows={rows} />
            </TableBody>
          </Table>
        </TableContainer>
        <KnownDrugsFooter
          total={aggs.total}
          size={NUM_ROWS}
          pageIndex={pageIndex}
          onChangePage={handleChangePage}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
}

export default KnownDrugs;
