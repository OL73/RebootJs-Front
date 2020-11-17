import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { IUser } from '../../Users/types';

export interface WelcomeUserProps {
    connectedUser?: IUser;
}
 
const WelcomeUser = ({connectedUser}: WelcomeUserProps) => {
    return (  
        <Grid 
            item 
            style={ {display:'flex', justifyContent: 'center', margin: '30px 10px'} }
        >
          <Typography
            style={{ textTransform: 'capitalize' }}
            color='secondary'
          >
            {connectedUser ? `Bienvenue ${connectedUser?.firstname} 😊` : ''}
          </Typography>
        </Grid>
    );
}
 
export default WelcomeUser;