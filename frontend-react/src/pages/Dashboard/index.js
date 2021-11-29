import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import NotesIcon from "@material-ui/icons/Notes";
import Avatar from "@material-ui/core/avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CircularProgress from "@material-ui/core/CircularProgress";
//utils
import { authMiddleWare } from "../../utils/auth";
//other libraries
import axios from "axios";
import { Switch, Route } from "react-router-dom";

//custom components
import Account from "../../components/Account";
import Todo from "../../components/Todo";

import { styles } from "./styles";

class Dashboard extends Component {
  state = {
    name: "",
    username: "",
    imageURL: "",
    uiLoading: true,
    imageLoading: false,
    render: false,
  };

  loadAccountPage = (event) => {
    //this.setState({ render: true });
    this.props.history.push(this.props.match.url + "account");
  };

  loadTodoPage = (event) => {
    //this.setState({ render: false });
    this.props.history.push(this.props.match.url);
  };

  logoutHandler = (event) => {
    localStorage.removeItem("AuthToken");
    this.props.history.push("/login");
  };

  componentDidMount() {
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/users`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          imageURL: response.data.imageURL,
          name: response.data.name,
          email: response.data.email,
          username: response.data.username,
          uiLoading: false,
        });
      })
      .catch((error) => {
        if (error) {
          this.props.history.push("/login");
        }
      });
  }
  render() {
    const { classes } = this.props;
    if (this.state.uiLoading === true) {
      return (
        <div className={classes.root}>
          {this.state.uiLoading && (
            <CircularProgress size={150} className={classes.uiProgess} />
          )}
        </div>
      );
    }
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              TodoApp
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Divider />
          <center>
            <Avatar src={this.state.imageURL} className={classes.avatar} />
            <p>{this.state.name}</p>
            <p>{this.state.username}</p>
          </center>
          <Divider />
          <List>
            <ListItem button key="Todo" onClick={this.loadTodoPage}>
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText primary="Todo" />
            </ListItem>

            <ListItem button key="Account" onClick={this.loadAccountPage}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>

            <ListItem button key="Logout" onClick={this.logoutHandler}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
        {/*<div>{this.state.render ? <Account /> : <Todo />}</div>*/}
        <div>
          <Switch>
            <Route exact path={`${this.props.match.path}`} component={Todo} />
            <Route
              exact
              path={`${this.props.match.path}account`}
              component={Account}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
