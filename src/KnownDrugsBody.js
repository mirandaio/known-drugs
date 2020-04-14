import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cell: {
    padding: 0,
  },
});

const KNOWN_DRUGS_QUERY = gql`
  query KnownDrugs($page: Page!, $sort: SortInput!, $filters: [Filter!]) {
    knownDrugs(page: $page, sort: $sort, filters: $filters) {
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

const KnownDrugsBody = ({ pageIndex, sort, filters, size }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(KNOWN_DRUGS_QUERY, {
    variables: {
      page: { index: pageIndex, size },
      sort,
      filters,
    },
  });

  if (loading || error) return null;

  const { rows } = data.knownDrugs;

  return rows.map((row, i) => {
    return (
      <TableRow key={i}>
        <TableCell className={classes.cell} noWrap>
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
