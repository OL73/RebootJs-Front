import { Button, Container, TextField } from '@material-ui/core';
import React from 'react';
import CredentialsSection from './credentialsSection';
import IdentitySection from './identitySection';

export interface RegisterState {
  form: {
    email: {
      value: string,
      isValid: boolean
    };
    firstname: {
      value: string,
      isValid: boolean
    };
    lastname: {
      value: string,
      isValid: boolean
    };
    password: {
      value: string,
      isValid: boolean,
      isContainsLowercase: boolean,
      isContainsUppercase: boolean,
      isContainsNumbers: boolean,
      isContainsSymbols: boolean,
      isContainsMinMaxCaracters: boolean
    };
    confirmPassword: {
      value: string,
      isValid: boolean,
      isContainsLowercase: boolean,
      isContainsUppercase: boolean,
      isContainsNumbers: boolean,
      isContainsSymbols: boolean,
      isContainsMinMaxCaracters: boolean
    };
  },
  errors: {

  }
}

class RegisterForm extends React.Component<{}, RegisterState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      form: {
        email: {
          value: "",
          isValid: false
        },
        firstname: {
          value: "",
          isValid: false
        },
        lastname: {
          value: "",
          isValid: false
        },
        password: {
          value: "",
          isValid: false,
          isContainsLowercase: false,
          isContainsUppercase: false,
          isContainsNumbers: false,
          isContainsSymbols: false,
          isContainsMinMaxCaracters: false
        },
        confirmPassword: {
          value: "",
          isValid: false,
          isContainsLowercase: false,
          isContainsUppercase: false,
          isContainsNumbers: false,
          isContainsSymbols: false,
          isContainsMinMaxCaracters: false
        },
      },
      errors: {

      }
    }
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //
    console.log('submitted');

  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const form = { ...this.state.form };

    form[e.currentTarget.name as "email"].value = e.currentTarget.value;

    this.setState({ form });
  }

  handleChangePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const form = { ...this.state.form };

    const containLowercase = new RegExp('(?=.*[a-z])');
    const containUppercase = new RegExp('(?=.*[A-Z])');
    const containNumbers = new RegExp('(?=.*[0-9])');
    const containSymbols = new RegExp('(?=.[!@#$%^&])');
    const containMinMaxCaracters = new RegExp('(?=.{8,})');

    form[e.currentTarget.name as "password"].value = e.currentTarget.value;

    if (containLowercase.test(e.currentTarget.value)) {
      form[e.currentTarget.name as "password"].isContainsLowercase = true;
    }
    if (containUppercase.test(e.currentTarget.value)) {
      form[e.currentTarget.name as "password"].isContainsUppercase = true;
    }
    if (containNumbers.test(e.currentTarget.value)) {
      form[e.currentTarget.name as "password"].isContainsNumbers = true;
    }
    if (containSymbols.test(e.currentTarget.value)) {
      form[e.currentTarget.name as "password"].isContainsSymbols = true;
    }
    if (containMinMaxCaracters.test(e.currentTarget.value)) {
      form[e.currentTarget.name as "password"].isContainsMinMaxCaracters = true;
    }


    this.setState({ form });
  }


  render() {

    const { email, firstname, lastname, password, confirmPassword } = this.state.form;

    return (
      <Container maxWidth="sm">
        <form onSubmit={this.handleSubmit} >
          <IdentitySection
            form={{ email, firstname, lastname }}
            onChange={this.handleChange}
          />
          <CredentialsSection
            form={{ password, confirmPassword }}
            onChangePassword={this.handleChangePassword}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            Submit
        </Button>
        </form>
      </Container>
    )
  }
}

export default RegisterForm;