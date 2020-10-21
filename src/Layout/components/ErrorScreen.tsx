import Grid from '@material-ui/core/Grid';
import errorSvg from '../../error.svg';
import React from 'react';
import Alert from '@material-ui/lab/Alert';

export function ErrorScreen({errorMessage} : {errorMessage?: string}) {
  return (
    <Grid style={{ height: '50vh' }} container direction="column" justify="center" alignItems="center">
      <Grid item>
        <img style={{width: '20vw' }} src={errorSvg} alt='Error' />
      </Grid>
      <Grid item style={{paddingTop: '30px'}}>
        <Alert severity="error">{errorMessage || 'Sorry, a problem occured !'}</Alert>
      </Grid>
    </Grid>
  );
}
