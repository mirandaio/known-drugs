import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function KnownDrugs() {
  const { loading, error, data } = useQuery(KNOWN_DRUGS_QUERY, {
    variables: {
      page: {index: 0, size: 3 },
      sort: { sortBy: 'disease', direction: 'asc' },
      filters: { disease: 'breast' }
    }
  });

  if (loading || error) return null;

  const { rows } = data.knownDrugs;

  return (
    <TableContainer component={Paper}>
      <Table>
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
      </Table>
    </TableContainer>
  );
}

export default KnownDrugs;
