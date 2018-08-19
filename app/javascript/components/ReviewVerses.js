import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { injectGlobal } from "styled-components";
import axios from "axios";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayCircleOutline";
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import MoreIcon from "@material-ui/icons/MoreVert";
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

  showOrHideVerse = () => {
    this.setState({ showVerse: !this.state.showVerse });
  };

  playAudio = e => {
    e.stopPropagation();
    this.loopAudioWithPauseInterval();
  };

  reviewedCard(event, difficulty) {
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

  pauseAudio = e => {
    if (e) {
      e.stopPropagation();
    }

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
          }, 7000);

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
      return <StyledPlayArrowIcon onClick={this.playAudio} />;
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
        <Card onClick={this.showOrHideVerse}>
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
            <MoreIcon />
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
  align-items: flex-start;
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
  align-items: center;

  #easy {
    margin-right: 1.2em;
  }
  #hard {
    margin-left: 1.2em;
  }
`;

const Card = styled.div`
  min-height: 600px;
`;

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
    width: 1.4em;
    height: 1.4em;
    margin-left: 0.4em;
    fill: #666666;
  }
`;

const StyledPauseIcon = styled(PauseIcon)`
  && {
    width: 1.4em;
    height: 1.4em;
    margin-left: 0.4em;
    fill: #666666;
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
    transition: max-height 2s ease-in;
    max-height: 7000px;
  }
`;
