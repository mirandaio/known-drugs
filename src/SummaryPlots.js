import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import PieChart from './PieChart';

const AGGS_QUERY = gql`
  query AGGREGATIONS($filters: [Filter!]) {
    knownDrugs(filters: $filters) {
      aggregations {
        uniqueDrugs
        uniqueDiseases
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

  // console.log('data', data);
  const {
    uniqueDrugs,
    uniqueDiseases,
    uniqueDrugsByType,
    uniqueDrugsByActivity
  } = data.knownDrugs.aggregations;
  return (
    <Grid container>
      <Grid item md={4}>
        <div>Summary</div>
        <div>
          <span>{uniqueDrugs}</span> unique drugs
        </div>
        <div>
          <span>1</span>associated targets
        </div>
        <div>
          <span>{uniqueDiseases}</span> associated diseases
        </div>
      </Grid>
      <Grid item md={4}>
        <div>Unique drugs by type</div>
        <PieChart data={uniqueDrugsByType}/>
      </Grid>
      <Grid item md={4}>
        <div>Unique drugs by activity</div>
        <PieChart data={uniqueDrugsByActivity}/>
      </Grid>
    </Grid>
  );
};

export default SummaryPlots;
