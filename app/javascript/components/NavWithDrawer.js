import React from "react";
import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { mailFolderListItems, otherMailFolderListItems } from "./tileData";
import VerseDialog from "./VerseDialog";
import ReviewVerses from "./ReviewVerses";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  actions: {
    width: 350,
    height: 200
  },
  actionText: {
    textAlign: "center",
    marginTop: "2em"
  },
  appFrame: {
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "appBarShift-left": {
    marginLeft: drawerWidth
  },
  "appBarShift-right": {
    marginRight: drawerWidth
  },
  addIcon: {
    margin: "0 auto"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  "content-left": {
    marginLeft: -drawerWidth,
    paddingTop: "3em"
  },
  "content-right": {
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "contentShift-left": {
    marginLeft: 0
  },
  "contentShift-right": {
    marginRight: 0
  }
});

class NavWithDrawer extends React.Component {
  state = {
    open: false,
    anchor: "left",
    reviewingVerses: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value
    });
  };

  renderMain() {
    const { classes, theme, paths } = this.props;

    if (!this.props.signed_in) {
      return (
        <StyledTypography variant="display2">
          <a href={paths.sign_in}>Sign In</a>
        </StyledTypography>
      );
    } else if (this.state.reviewingVerses) {
      return <ReviewVerses paths={this.props.paths} />;
    } else {
      return (
        <div className={classes.actions}>
          <div className={classes.actionText}>
            <VerseDialog paths={paths} />
          </div>
          <div className={classes.actionText}>
            <StyledTypography
              variant="display2"
              onClick={() => {
                this.setState({ reviewingVerses: true });
              }}
              gutterBottom
            >
              Review
            </StyledTypography>
          </div>
        </div>
      );
    }
  }

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={"left"}
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        {/* <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List> */}
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-left`]]: open
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Memorize
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          <Main
            id="main_content"
            className={classNames(
              classes.content,
              classes[`content-left`],
              "main-content",
              {
                [classes.contentShift]: open,
                [classes[`contentShift-left`]]: open
              },
              { "verse-review": this.state.reviewingVerses }
            )}
          >
            <div className={classes.drawerHeader} />

            {this.renderMain()}
          </Main>
        </div>
      </div>
    );
  }
}

NavWithDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const Main = styled.main`
  display: flex;
  min-height: calc(100vh - 64px);
  align-items: center;
  justify-content: center;

  &.verse-review {
    align-items: flex-start;
    margin-top: 2.6em;
  }
`;

export default withStyles(styles, { withTheme: true })(NavWithDrawer);

const StyledTypography = styled(Typography)`
  cursor: pointer;
`;
