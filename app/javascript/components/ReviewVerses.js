import React from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "@material-ui/core/Button";

export default class ReviewVerses extends React.Component {
  state = { cards: [], currentCard: null };

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

  reviewedCard(difficulty) {
    axios
      .put(this.state.currentCard.attributes.reviewed_card_path, {
        difficulty: difficulty
      })
      .then(response => {
        let cardsCopy = [...this.state.cards];
        let currentCard = cardsCopy.pop();

        this.setState({
          cards: cardsCopy,
          currentCard: currentCard
        });
      });
  }

  loopAudioWithPauseInterval() {
    let verseAudio = new Audio(
      "https://audio.esv.org/hw/43003016-43003018.mp3"
    );
    verseAudio.play();
    verseAudio.onended = function() {
      setTimeout(function() {
        verseAudio.play();
      }, 3000);
    };
  }

  renderAudioWithControls() {
    return (
      <audio
        src="https://audio.esv.org/hw/43003016-43003018.mp3"
        controls
        id="verse_audio"
      />
    );
  }

  renderCard() {
    const { currentCard, cards } = this.state;

    if (currentCard) {
      return (
        <div>
          <h4>{currentCard.attributes.passage}</h4>
          <p>{currentCard.attributes.text}</p>
          <Button
            variant="outlined"
            component="span"
            onClick={() => this.reviewedCard("easy")}
          >
            Easy
          </Button>

          <Button
            variant="outlined"
            component="span"
            onClick={() => this.reviewedCard("hard")}
          >
            Hard
          </Button>
        </div>
      );
    }

    if (currentCard !== null && cards.length === 0) {
      return <div>You have no more verses to review.</div>;
    }
  }

  render() {
    return <div>{this.renderCard()}</div>;
  }
}
