import { Checkbox, TextField } from '@material-ui/core';
import React, { Component, Fragment } from 'react';

export interface CredentialsSectionProps {
    form: {
        password: {
            value: string,
            isValid: boolean,
            isContainsLowercase: boolean,
            isContainsUppercase: boolean,
            isContainsNumbers: boolean,
            isContainsSymbols: boolean,
            isContainsMinMaxCaracters: boolean
        },
        confirmPassword: {
            value: string,
            isValid: boolean,
            isContainsLowercase: boolean,
            isContainsUppercase: boolean,
            isContainsNumbers: boolean,
            isContainsSymbols: boolean,
            isContainsMinMaxCaracters: boolean
        }
    }
    onChangePassword: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

class CredentialsSection extends Component<CredentialsSectionProps> {
    constructor(props: CredentialsSectionProps) {
        super(props);
    }

    displayCheckPassword(password: any) {

        return (
            <Fragment>
                <div>
                    <Checkbox
                        checked={password.isContainsLowercase}
                        // onChange={handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <span>password contains some lowercase caracters...</span>
                </div>
                <div>
                    <Checkbox
                        checked={password.isContainsUppercase}
                        // onChange={handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <span>password contains some uppercase caracters...</span>
                </div>
                <div>
                    <Checkbox
                        checked={password.isContainsNumbers}
                        // onChange={handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <span>password contains some numbers...</span>
                </div>
                <div>
                    <Checkbox
                        checked={password.isContainsSymbols}
                        // onChange={handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <span>password contains some symboles...</span>
                </div>
                <div>
                    <Checkbox
                        checked={password.isContainsMinMaxCaracters}
                        // onChange={handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <span>password contains 8...30 caracters...</span>
                </div>
            </Fragment>
        );
    }
    render() {

        const { password, confirmPassword } = this.props.form;



        return (
            <Fragment>
                <TextField
                    value={password.value}
                    name="password"
                    onChange={this.props.onChangePassword}
                    type="password"
                    required
                    label="Password"
                    variant="outlined"
                />
                <TextField
                    value={confirmPassword.value}
                    name="confirmPassword"
                    onChange={this.props.onChangePassword}
                    type="password"
                    required
                    label="Password confirmation"
                    variant="outlined"
                />
                { password.value.length > 0 ? this.displayCheckPassword(password) : ""}


            </Fragment>
        );
    }
}

export default CredentialsSection;