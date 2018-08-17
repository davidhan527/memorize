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
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import withMobileDialog from "@material-ui/core/withMobileDialog";

class VerseDialog extends React.Component {
  state = {
    open: false,
    passage: "",
    text: "",
    notificationOpen: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleNotificationClose = () => {
    this.setState({ notificationOpen: false });
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
    const { passage, text } = this.state;
    axios
      .post(this.props.paths.cards, { passage: passage, text: text })
      .then(() => {
        this.setState({ notificationOpen: true, passage: "", text: "" });
      });
  };

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
    const { fullScreen } = this.props;

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
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
        >
          <DialogTitle id="form-dialog-title">Add Verse</DialogTitle>
          <form onSubmit={this.searchVerse}>
            <StyledDialogContent>
              <TextField
                autoFocus
                margin="dense"
                onChange={this.setVerse}
                placeholder="Psalm 119:9-16"
                id="name"
                label="Verse"
                type="text"
                value={this.state.passage}
                fullWidth
              />
              {text && (
                <SearchedVerseText variant="body1" gutterBottom>
                  {text}
                </SearchedVerseText>
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.notificationOpen}
          onClose={() => this.setState({ notificationOpen: false })}
          ContentProps={{
            "aria-describedby": "verse_added"
          }}
          message={<span id="verse_added">Verse added</span>}
        />
      </div>
    );
  }
}

const StyledTypography = styled(Typography)`
  cursor: pointer;
`;

const StyledDialogContent = styled(DialogContent)`
  @media (min-width: 600px) {
    max-width: 100%;
  }

  @media (min-width: 900px) {
    min-width: 600px;
  }

  min-height: 400px;
  max-height: 600px;

  &&& {
    padding-top: 0px;
  }
`;

const SearchedVerseText = styled(Typography)`
  && {
    margin-top: 1em;
  }
`;

export default withMobileDialog()(VerseDialog);
