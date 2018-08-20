import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import InfoIcon from "@material-ui/icons/InfoOutline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

export default class CardSettings extends React.Component {
  state = {
    anchorEl: null
  };

  showCardSettings = event => {
    event.stopPropagation();

    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = event => {
    event.stopPropagation();

    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { rankings } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <StyledInfoIcon onClick={this.showCardSettings} />
        <Popover
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
          <PopoverContent>
            <List
              dense={true}
              subheader={
                <Typography variant="body2" gutterBottom>
                  When will I see this verse again:
                </Typography>
              }
            >
              <StyledListedItem>
                <ListItemText primary={`Easy - ${rankings.easy}`} />
              </StyledListedItem>
              <StyledListedItem>
                <ListItemText primary={`Okay - ${rankings.okay}`} />
              </StyledListedItem>
              <StyledListedItem>
                <ListItemText primary={`Hard - ${rankings.hard}`} />
              </StyledListedItem>
            </List>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}

const StyledInfoIcon = styled(InfoIcon)`
  && {
    fill: #1c54b2;
  }
`;

const PopoverContent = styled.div`
  padding: 1em;
`;

const StyledListedItem = styled(ListItem)`
  && {
    padding-left: 0;
  }
`;
