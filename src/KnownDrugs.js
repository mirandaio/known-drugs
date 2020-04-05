import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


function KnownDrugs() {
  return (
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Disease</TableCell>
          <TableCell>Phase</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Source</TableCell>
          <TableCell>Drug</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      </TableBody>
    </Table>
    </TableContainer>
  );
}

export default KnownDrugs;
