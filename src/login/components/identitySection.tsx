import { FormControl, FormGroup, FormLabel, TextField } from '@material-ui/core';
import React from 'react';
import { IFormField, RegisterFormKey } from '../types';

interface IdentitySectionProps {
  email: IFormField<string>;
  firstname: IFormField<string>;
  lastname: IFormField<string>;
  handleChange: (field: RegisterFormKey, value: string) => void;
}

class IdentitySection extends React.Component<IdentitySectionProps> {
  render(){
    const { email, firstname, lastname } = this.props;
    return (
      <FormControl component="fieldset" fullWidth={true}>
        <FormLabel component="legend" style={{ margin: '1rem 0' }}>
          Your identity:
        </FormLabel>
        <FormGroup>
          <TextField
            required
            label="Email"
            variant="outlined"
            fullWidth={true}
            value={email.value}
            onChange={(e) => this.props.handleChange("email", e.target.value)}
            {...(!email.isValid ? {error: true, helperText: email.error} : {})}
            />
          <TextField
            required
            label="Firstname"
            variant="outlined"
            fullWidth={true}
            value={firstname.value}
            onChange={(e) => this.props.handleChange("firstname", e.target.value)}
            {...(!firstname.isValid ? {error: true, helperText: firstname.error} : {})}
            />
          <TextField
            required
            label="Lastname"
            variant="outlined"
            fullWidth={true}
            value={lastname.value}
            onChange={(e) => this.props.handleChange("lastname", e.target.value)}
            {...(!lastname.isValid ? {error: true, helperText: lastname.error} : {})}
            />
        </FormGroup>
      </FormControl>
    )
  }
}

export default IdentitySection;