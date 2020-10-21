import Grid from '@material-ui/core/Grid';
import React from 'react';
import { PasswordRequirement } from './PasswordRequirement';
import { IPasswordField } from '../types';

export interface IPasswordRequirementsProps {
  password: IPasswordField;
}

export function PasswordRequirements({ password }: IPasswordRequirementsProps) {
  const { hasLower, hasUpper, hasNumber, hasSymbol, hasValidLength } = password;
  return (
    <Grid container direction="column" alignContent="flex-start" style={{ margin: '1rem 0' }}>
      <PasswordRequirement check={hasLower} message="Password contains some lowercase characters..." />
      <PasswordRequirement check={hasUpper} message="Password contains some uppercase characters..." />
      <PasswordRequirement check={hasNumber} message="Password contains some numbers..." />
      <PasswordRequirement check={hasSymbol} message="Password contains some symbols..." />
      <PasswordRequirement check={hasValidLength} message="Password contains 8..30 characters..." />
    </Grid>
  );
}