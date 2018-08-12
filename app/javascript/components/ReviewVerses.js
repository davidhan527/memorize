import React from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

export default class ReviewVerses extends React.Component {
  state = { cards: [], currentCard: null, audio: null, audioTimeoutId: null };

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

  stopAudio() {
    const { audio } = this.state;
    if (!audio) return;

    this.state.audio.pause();
    this.setState({ audio: null });
    clearTimeout(this.state.audioTimeoutId);
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

        this.stopAudio();
      });
  }

  loopAudioWithPauseInterval = () => {
    const { audio_url } = this.state.currentCard.attributes;

    this.setState({ audio: new Audio(audio_url) }, () => {
      let { audio } = this.state;

      audio.play();

      audio.onended = () => {
        const timeoutId = setTimeout(function() {
          audio.play();
        }, 2000);

        this.setState({ audioTimeoutId: timeoutId });
      };
    });
  };

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
      const { audio_url } = this.state.currentCard.attributes;

      return (
        <Card>
          <VerseSection>
            <PassageSection>
              <Passage>{currentCard.attributes.passage}</Passage>
              {audio_url && (
                <StyledPlayArrowIcon
                  onClick={this.loopAudioWithPauseInterval}
                />
              )}
            </PassageSection>

            <Text>{currentCard.attributes.text}</Text>
          </VerseSection>

          <Actions>
            <Button
              id="easy"
              variant="outlined"
              color="primary"
              component="span"
              onClick={() => this.reviewedCard("easy")}
            >
              Easy
            </Button>

            <Button
              id="hard"
              variant="outlined"
              color="secondary"
              component="span"
              onClick={() => this.reviewedCard("hard")}
            >
              Hard
            </Button>
          </Actions>
        </Card>
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

const Passage = styled.h4`
  display: inline-block;
  font-family: "Roboto", sans-serif;
  font-size: 1.3em;
`;

const Text = styled.p`
  font-family: "EB Garamond", serif;
  font-size: 1.2em;
  line-height: 1.4;
`;

const Actions = styled.div`
  display: flex;
  margin-top: 1.5em;
  justify-content: center;

  #easy {
    margin-right: 1em;
  }
  #hard {
    margin-left: 1em;
  }
`;

const Card = styled.div``;

const VerseSection = styled.div`
  margin: 0 auto;
  max-width: 85%;
`;

const StyledPlayArrowIcon = styled(PlayArrowIcon)`
  && {
    width: 1.6em;
  }
`;

const PassageSection = styled.div`
  display: flex;
  align-items: center;
`;
