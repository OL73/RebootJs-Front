import { createStyles, TextField, Theme, withStyles, FormControl, FormLabel, FormGroup } from '@material-ui/core';
import React from 'react';
import { IFormField, IPasswordField, RegisterFormKey } from '../types';
import { PasswordRequirements } from './PasswordRequirements';

interface CredentialSectionProps {
  password: IPasswordField;
  confirmation: IFormField<string>;
  handleChange: (field: RegisterFormKey, value: string) => void;
  classes: any;
}

const style = (theme: Theme) => {
  return createStyles({
    newColor: { color: theme.palette.primary.main }
  });
};

class CredentialSection extends React.Component<CredentialSectionProps> {
  render(){
    const { password, confirmation } = this.props;
    return (
      <FormControl component="fieldset" fullWidth={true}>
        <FormLabel component="legend" style={{ margin: '1rem 0' }}>
          Your credentials:
        </FormLabel>
        <FormGroup>
          <TextField
            required
            label="Password"
            variant="outlined"
            type="password"
            fullWidth={true}
            value={password.value}
            onChange={(e) => this.props.handleChange("password", e.target.value)}
            {...(!password.isValid ? {error: true, helperText: password.error} : {})}
            />
          <TextField
            required
            label="Confirmation"
            variant="outlined"
            type="password"
            fullWidth={true}
            value={confirmation.value}
            onChange={(e) => this.props.handleChange("confirmation", e.target.value)}
            {...(!confirmation.isValid ? {error: true, helperText: confirmation.error} : {})}
            />
          <PasswordRequirements password={password} />
        </FormGroup>
      </FormControl>
    )
  }
}

export default withStyles(style)(CredentialSection);