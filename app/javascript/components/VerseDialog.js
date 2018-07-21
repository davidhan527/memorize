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
    open: false,
    passage: null,
    text: null
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setVerse = e => {
    this.setState({ passage: e.target.value });
  };

  searchVerse = e => {
    e.preventDefault();

    axios
      .get(this.props.paths.verses, { params: { passage: this.state.passage } })
      .then(response => {
        this.setState({ text: response.data.text });
      });
  };

  addVerse = () => {
    const { passage, text} = this.state
    axios.post(this.props.paths.cards, { passage: passage, text: text} )
  }

  actionButton = () => {
    if (this.state.text) {
      return (
        <Button color="primary" variant="contained" onClick={this.addVerse}>
          Add Verse
        </Button>
      );
    } else {
      return (
        <Button type="submit" color="primary">
          Search Verse
        </Button>
      );
    }
  };

  render() {
    const { text, passage } = this.state;

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
          maxWidth="md"
        >
          <DialogTitle id="form-dialog-title">Add Verse</DialogTitle>
          <form onSubmit={this.searchVerse}>
            <StyledDialogContent>
              <DialogContentText />
              <TextField
                autoFocus
                margin="dense"
                onChange={this.setVerse}
                placeholder="Psalm 119:9-16"
                id="name"
                label="Verse"
                type="text"
                fullWidth
              />
              {text && (
                <Typography variant="body1" gutterBottom>
                  {text}
                </Typography>
              )}
            </StyledDialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>

              {this.actionButton()}
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const StyledTypography = styled(Typography)`
  cursor: pointer;
`;

const StyledDialogContent = styled(DialogContent)`
  width: 500px;
  height: 300px;
`;
