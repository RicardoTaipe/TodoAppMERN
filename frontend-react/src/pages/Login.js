// Material UI components
import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
//utils
import { validEmailRegex } from "../utils/validators";

//another libraries
import axios from "axios";
const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
});

class Login extends Component {
  state = {
    form: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
    message: "",
    loading: false,
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

  validateFields = (name, value) => {
    let errors = this.state.errors;
    switch (name) {
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
      default:
        break;
    }
    this.setState({ errors });
  };
  //handle inputs events
  handleChange = (event) => {
    const { name, value } = event.target;
    this.validateFields(name, value);
    //alternative mode
    //const newState = { ...this.state };
    //newState.form[name] = value;
    //newState.errors = errors;
    //this.setState(newState);
    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({ loading: true });
      const userData = {
        email: this.state.form.email,
        password: this.state.form.password,
      };
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, userData)
        .then((response) => {
          localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
          this.setState({
            loading: false,
          });
          this.props.history.push("/");
        })
        .catch((error) => {
          this.setState({
            message: error.response.data.message,
            loading: false,
          });
        });
    }
  };
  render() {
    const { classes } = this.props;
    const { errors, loading, message } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
              disabled={loading}
            >
              Sign In
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </form>
          {message && (
            <Typography variant="body2" className={classes.customError}>
              {message}
            </Typography>
          )}
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
