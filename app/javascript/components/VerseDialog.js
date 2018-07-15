import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

export default class VerseDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  searchVerse = () => {
    axios.get(this.props.paths.verses, { params: { verse: {} } });
  };

  render() {
    return (
      <div>
        <StyledTypography
          variant="display2"
          gutterBottom
          onClick={this.handleClickOpen}
        >
          Add Verse
        </StyledTypography>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Verse</DialogTitle>
          <DialogContent>
            <DialogContentText />
            <TextField
              autoFocus
              margin="dense"
              placeholder="Psalm 119:9-16"
              id="name"
              label="Verse"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.searchVerse} color="primary">
              Search Verse
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const StyledTypography = styled(Typography)`
  cursor: pointer;
`;
