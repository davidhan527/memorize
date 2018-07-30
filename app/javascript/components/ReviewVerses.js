import React from "react";
import styled from "styled-components";
import axios from "axios";

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
    return <div>{this.state.currentCard && this.state.currentCard.attributes.text}</div>;
  }

  render() {
    return <div>{this.renderCard()}</div>;
  }
}
