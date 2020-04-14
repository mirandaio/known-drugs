import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PieChart from './PieChart';

const SummaryPlots = ({ aggs }) => {
  const {
    uniqueDrugs = 0,
    uniqueDiseases = 0,
    clinicalTrials = 0,
    uniqueDrugsByType = [],
    uniqueDrugsByActivity = [],
  } = aggs;
  return (
    <Grid container>
      <Grid item md={4} sm={4}>
        <Typography variant="subtitle2">Summary</Typography>
        <div>
          <span>{uniqueDrugs}</span> unique drugs
        </div>
        <div>
          <span>1</span> associated targets
        </div>
        <div>
          <span>{uniqueDiseases}</span> associated diseases
        </div>
        <div>
          <span>{clinicalTrials}</span> clinical trials
        </div>
      </Grid>
      <Grid item md={4} sm={4}>
        <Typography variant="subtitle2">Unique drugs by type</Typography>
        <PieChart data={uniqueDrugsByType} />
      </Grid>
      <Grid item md={4} sm={4}>
        <Typography variant="subtitle2">Unique drugs by activity</Typography>
        <PieChart data={uniqueDrugsByActivity} />
      </Grid>
    </Grid>
  );
};

export default SummaryPlots;
