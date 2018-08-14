import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { injectGlobal } from "styled-components";
import axios from "axios";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slide from "@material-ui/core/Slide";

export default class ReviewVerses extends React.Component {
  state = {
    cards: [],
    currentCard: null,
    audio: null,
    audioTimeoutId: null,
    isCurrentlyPlaying: false,
    showVerse: false
  };

  componentDidMount() {
    document.getElementById("main_content").addEventListener("click", () => {
      this.setState({ showVerse: true });
    });

    axios.get(this.props.paths.cards).then(response => {
      if (response.data.cards.data) {
        const currentCard = response.data.cards.data.pop();

        this.setState(
          {
            cards: response.data.cards.data,
            currentCard: currentCard
          },
          this.registerDifficultyButtonEvents
        );
      }
    });
  }

  registerDifficultyButtonEvents = () => {
    document.getElementById("easy").addEventListener("click", e => {
      e.stopPropagation();
      this.reviewedCard("easy");
    });

    document.getElementById("hard").addEventListener("click", e => {
      e.stopPropagation();
      this.reviewedCard("hard");
    });
  };

  reviewedCard(difficulty) {
    event.stopPropagation();

    axios
      .put(this.state.currentCard.attributes.reviewed_card_path, {
        difficulty: difficulty
      })
      .then(response => {
        let cardsCopy = [...this.state.cards];
        let currentCard = cardsCopy.pop();

        this.setState({
          cards: cardsCopy,
          currentCard: currentCard,
          showVerse: false
        });

        this.stopAudio();
      });
  }

  pauseAudio = () => {
    let { audio } = this.state;

    audio.pause();
    this.setState({ isCurrentlyPlaying: false });
    clearTimeout(this.state.audioTimeoutId);
  };

  stopAudio() {
    const { audio } = this.state;
    if (!audio) return;

    this.pauseAudio();
    this.setState({ audio: null });
  }

  loopAudioWithPauseInterval = () => {
    const { audio_url } = this.state.currentCard.attributes;

    this.setState(
      { audio: new Audio(audio_url), isCurrentlyPlaying: true },
      () => {
        let { audio } = this.state;

        audio.play();

        audio.onended = () => {
          const timeoutId = setTimeout(function() {
            audio.play();
          }, 3000);

          this.setState({ audioTimeoutId: timeoutId });
        };
      }
    );
  };

  renderAudioControls() {
    const { audio_url } = this.state.currentCard.attributes;
    if (!audio_url) return null;

    if (this.state.isCurrentlyPlaying) {
      return <StyledPauseIcon onClick={this.pauseAudio} />;
    } else {
      return <StyledPlayArrowIcon onClick={this.loopAudioWithPauseInterval} />;
    }
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
    const { currentCard, cards, showVerse } = this.state;

    if (currentCard) {
      return (
        <Card>
          <VerseSection>
            <PassageSection>
              <Passage>{currentCard.attributes.passage}</Passage>
              {this.renderAudioControls()}
            </PassageSection>

            <Text className={classNames("fade-in", { show: showVerse })}>
              {currentCard.attributes.text}
            </Text>
          </VerseSection>

          <Actions>
            <Button
              id="easy"
              variant="outlined"
              color="primary"
              component="span"
              onClick={event => this.reviewedCard(event, "easy")}
            >
              Easy
            </Button>

            <Button
              id="hard"
              variant="outlined"
              color="secondary"
              component="span"
              onClick={event => this.reviewedCard(event, "hard")}
            >
              Hard
            </Button>
          </Actions>
        </Card>
      );
    }

    if (currentCard !== null && cards.length === 0) {
      return <div>All verses reviewed!</div>;
    }
  }

  render() {
    return <CompleteText>{this.renderCard()}</CompleteText>;
  }
}

const PassageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
`;

const Passage = styled.h4`
  display: inline-block;
  font-family: "Roboto", sans-serif;
  font-size: 1.3em;
  white-space: nowrap;
  margin-top: 0;
  margin-bottom: 0;
`;

const Text = styled.p`
  font-family: "EB Garamond", serif;
  font-size: 1.3em;
  line-height: 1.4;

  margin-top: 10px;
`;

const CompleteText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.3em;
`;

const Actions = styled.div`
  display: flex;
  margin-top: 1.5em;
  justify-content: center;

  #easy {
    margin-right: 1.2em;
  }
  #hard {
    margin-left: 1.2em;
  }
`;

const Card = styled.div``;

const VerseSection = styled.div`
  margin: 0 auto;

  @media (min-width: 600px) {
    max-width: 90%;
  }

  @media (min-width: 900px) {
    max-width: 60%;
  }
`;

const StyledPlayArrowIcon = styled(PlayArrowIcon)`
  && {
    width: 1.6em;
  }
`;

const StyledPauseIcon = styled(PauseIcon)`
  && {
    width: 1.6em;
  }
`;

injectGlobal`
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .fade-in {
    max-height: 0;
    overflow: hidden;
  }

  .fade-in.show {
    transition: max-height 2.5s ease-in;
    max-height: 1000px;
  }
`;
