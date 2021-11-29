import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
//another libraries
import axios from "axios";
//UTILS
import { validEmailRegex } from "../../utils/validators";
import { styles } from "./styles";

class SignUp extends Component {
  state = {
    form: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    loading: false,
    message: "",
  };

  validateFields = (name, value) => {
    let errors = this.state.errors;
    switch (name) {
      case "name":
        errors.name = value === "" ? "Required" : "";
        break;
      case "username":
        errors.username = value === "" ? "Required" : "";
        break;
      case "email":
        errors.email =
          value === ""
            ? "Required"
            : validEmailRegex.test(value)
            ? ""
            : "Email is not valid";
        break;
      case "password":
        errors.password =
          value === ""
            ? "Required"
            : value.length < 4
            ? "Password must be 4 characters long!"
            : "";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          value === this.state.form.password ? "" : "Passwords must match";
        break;
      default:
        break;
    }
    this.setState({ errors });
  };

  validateForm = () => {
    let valid = true;
    Object.entries(this.state.form).forEach(([key, value]) => {
      this.validateFields(key, value);
    });
    //test there no errors -> convert objet to array and evalute
    valid = Object.values(this.state.errors).every((error) => error === "");
    return valid;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.validateFields(name, value);
    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({ loading: true });
      const newUserData = { ...this.state.form };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/users/signup`,
          newUserData
        );
        localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      } catch (error) {
        this.setState({
          general: error.response.data,
          loading: false,
        });
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  helperText={errors.name}
                  error={errors.name ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  helperText={errors.username}
                  error={errors.username ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  helperText={errors.confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
                disabled={loading}
              >
                Sign Up
                {loading && (
                  <CircularProgress size={30} className={classes.progess} />
                )}
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link href="login" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(SignUp);
