import { Box, Button, Container, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { login } from '../../api/users';
import history from '../../history';

interface LoginFormState {
  email: string;
  password: string;
}
class LoginForm extends React.Component<{}, LoginFormState> {
  constructor(props: {}){
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  handleChange = (field: "email" | "password", newValue: string) => {
    this.setState({
      ...this.state,
      [field]: newValue
    })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login(this.state.email, this.state.password)
      .then(_user => history.push('/profile'));
  }

  render(){
    return (
      <Container maxWidth="xs">
        <form onSubmit={this.handleSubmit} >
          <Box style={{margin: "2rem 0"}}>
            <TextField
              required
              label="Email"
              variant="outlined"
              fullWidth={true}
              style={{paddingBottom: "1rem 0"}}
              value={this.state.email}
              onChange={(e) => this.handleChange("email", e.target.value)}
              />
            <TextField
              required
              type="password"
              label="Password"
              variant="outlined"
              fullWidth={true}
              value={this.state.password}
              onChange={(e) => this.handleChange("password", e.target.value)}
              />
          </Box>
          <Box style={{margin: "2rem 0"}}>
            <Grid container justify="flex-end">
              <Grid item xs={4}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    )
  }
}

export default LoginForm;