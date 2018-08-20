import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import InfoIcon from "@material-ui/icons/InfoOutline";

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
            <Typography>When will I see this verse again:</Typography>
            <ul>
              <li>Easy - {rankings.easy} </li>
              <li>Okay - {rankings.okay} </li>
              <li>Hard - {rankings.hard} </li>
            </ul>
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
