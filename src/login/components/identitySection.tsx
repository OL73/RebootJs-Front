import { TextField } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import React, { Fragment } from 'react';

interface IdentifySection {
    form: { 
        email: {
            value: string,
            isValid: boolean
        }, 
        firstname: {
            value: string,
            isValid: boolean
        }, 
        lastname: {
            value: string,
            isValid: boolean
        }
    }
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

class IdentitySection extends React.Component<IdentifySection> {

    constructor(props: IdentifySection) {
        super(props);
    }

    render() {

        const {email, firstname, lastname } = this.props.form;

        const styles = {
            color: "red"
        }

        return (
            <Fragment>
                <h1>IdentifySection</h1>
                <TextField
                    error
                    value={email.value}
                    name="email"
                    onChange={this.props.onChange}
                    required
                    label="Email"
                    variant="outlined"
                    style={styles}
                />
                <TextField
                    value={firstname.value}
                    name="firstname"
                    onChange={this.props.onChange}
                    required
                    label="Firstname"
                    variant="outlined"
                />
                <TextField
                    value={lastname.value}
                    name="lastname"
                    onChange={this.props.onChange}
                    required
                    label="Lastname"
                    variant="outlined"
                />
            </Fragment>
        )
    }
}

export default IdentitySection;