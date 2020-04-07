import React, { useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import KnownDrugsBody from './KnownDrugsBody';
import KnownDrugsFooter from './KnownDrugsFooter';

const NUM_ROWS = 10;

function KnownDrugs() {
  const [ pageIndex, setPageIndex ] = useState(0);
  const [ sort, setSort ] = useState({ sortBy: 'disease', direction: 'asc' });
  const [ filterStrings, setFilterStrings ] = useState({
    disease: '',
    phase: '',
    status: '',
    source: '',
    drug: '',
    type: '',
    mechanism: '',
    activity: ''
  });
  const [ filters, setFilters ] = useState({});

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

  const createFilterHandler = property => e => {
    if (e.key === 'Enter') {
      const newFilters = {
        ...filters,
        [property]: filterStrings[property]
      };

      if (newFilters[property] === '') {
        delete newFilters[property];
      }

      setFilters(newFilters);
    }
  };

  const handlePhaseFilter = e => {
    if (e.key === 'Enter') {
      const newFilters = {
        ...filters,
        phase: Number(filterStrings.phase)
      };

      if (filterStrings.phase === '' || isNaN(newFilters.phase)) {
        delete newFilters.phase
      }

      setFilters(newFilters);
    }
  };

  const createFilterStringHandler = property => e => {
    setFilterStrings({
      ...filterStrings,
      [property]: e.target.value
    });
  };

  const handleChangePage = page => {
    setPageIndex(page);
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
                onKeyDown={handlePhaseFilter}
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
                onChange={createFilterStringHandler('mechanism')}
                onKeyDown={createFilterHandler('mechanism')}
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
          <KnownDrugsBody
            pageIndex={pageIndex}
            sort={sort}
            filters={filters}
            size={NUM_ROWS}
          />
        </TableBody>
        <TableFooter>
          <TableRow>
            <KnownDrugsFooter
              pageIndex={pageIndex}
              size={NUM_ROWS}
              filters={filters}
              onChangePage={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default KnownDrugs;
