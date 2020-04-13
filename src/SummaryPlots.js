import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PieChart from './PieChart';

const AGGS_QUERY = gql`
  query AGGREGATIONS($filters: [Filter!]) {
    knownDrugs(filters: $filters) {
      aggregations {
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
    }
  }
`;

const SummaryPlots = ({ filters }) => {
  const { loading, error, data } = useQuery(AGGS_QUERY, {
    variables: {
      filters
    }
  });

  if (loading || error) return null;

  const {
    uniqueDrugs,
    uniqueDiseases,
    clinicalTrials,
    uniqueDrugsByType,
    uniqueDrugsByActivity
  } = data.knownDrugs.aggregations;
  return (
    <Grid container>
      <Grid item md={4}>
        <Typography variant="subtitle2">Summary</Typography>
        <div>
          <span>{uniqueDrugs}</span> unique drugs
        </div>
        <div>
          <span>1</span>associated targets
        </div>
        <div>
          <span>{uniqueDiseases}</span> associated diseases
        </div>
        <div>
          <span>{clinicalTrials}</span> clinical trials
        </div>
      </Grid>
      <Grid item md={4}>
        <Typography variant="subtitle2">
          Unique drugs by type
        </Typography>
        <PieChart data={uniqueDrugsByType}/>
      </Grid>
      <Grid item md={4}>
        <Typography variant="subtitle2">
          Unique drugs by activity
        </Typography>
        <PieChart data={uniqueDrugsByActivity}/>
      </Grid>
    </Grid>
  );
};

export default SummaryPlots;
