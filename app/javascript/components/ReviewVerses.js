import React from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "@material-ui/core/Button";

export default class ReviewVerses extends React.Component {
  state = { cards: null, currentCard: null };

  componentDidMount() {
    axios.get(this.props.paths.cards).then(response => {
      if (response.data.cards.data) {
        const currentCard = response.data.cards.data.pop();
        this.setState({
          cards: response.data.cards.data,
          currentCard: currentCard
        });
      }
    });
  }

  renderCard() {
    const { currentCard } = this.state;

    if (currentCard) {
      return (
        <div>
          <h4>{currentCard.attributes.passage}</h4>
          <p>{currentCard.attributes.text}</p>

          <Button variant="outlined" component="span">
            Easy
          </Button>
          <Button variant="outlined" component="span">
            Hard
          </Button>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderCard()}</div>;
  }
}
