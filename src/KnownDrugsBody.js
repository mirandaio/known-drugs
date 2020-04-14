import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cell: {
    padding: 0,
  },
});

const KnownDrugsBody = ({ rows }) => {
  const classes = useStyles();

  return rows.map((row, i) => {
    return (
      <TableRow key={i}>
        <TableCell className={classes.cell}>
          <Typography variant="caption" noWrap>
            {row.disease.name}
          </Typography>
        </TableCell>
        <TableCell className={classes.cell}>
          <Typography variant="caption">{row.clinicalTrial.phase}</Typography>
        </TableCell>
        <TableCell className={classes.cell}>
          <Typography variant="caption">{row.clinicalTrial.status}</Typography>
        </TableCell>
        <TableCell className={classes.cell}>
          <Typography variant="caption">
            {row.clinicalTrial.sourceName}
          </Typography>
        </TableCell>
        <TableCell className={classes.cell}>
          <Typography variant="caption" noWrap>
            {row.drug.name}
          </Typography>
        </TableCell>
        <TableCell className={classes.cell}>
          <Typography variant="caption">{row.drug.type}</Typography>
        </TableCell>
        <TableCell className={classes.cell}>
          <Typography variant="caption" noWrap>
            {row.mechanismOfAction.name}
          </Typography>
        </TableCell>
        <TableCell className={classes.cell}>
          <Typography variant="caption">{row.drug.activity}</Typography>
        </TableCell>
      </TableRow>
    );
  });
};

export default KnownDrugsBody;
