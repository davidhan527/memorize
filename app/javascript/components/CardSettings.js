import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import InfoIcon from "@material-ui/icons/InfoOutline";

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class CardSettings extends React.Component {
  state = {
    anchorEl: null
  };

  showCardSettings = event => {
    event.stopPropagation();

    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <InfoIcon onClick={this.showCardSettings} />
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
        >
          <Typography className={classes.typography}>
            The content of the Popover.
          </Typography>
        </Popover>
      </div>
    );
  }
}

CardSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardSettings);
