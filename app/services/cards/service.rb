module Cards
  class Service
    def initialize(card)
      @card = card
    end

    def reviewed(difficulty)
      @card.last_viewed_at = Time.current

      if difficulty == 'easy'
        @card.ranking += 1
      elsif difficulty == 'hard' && @card.ranking != 0
        @card.ranking -= 1
      end

      @card.review_at = CardRanking::RANKING[@card.ranking][:value]
      @card.save!
      @card
    end

    def refresh_text_and_audio
      client = Bible::Client.new(@card.passage)
      @card.text = client.get
      @card.audio_url = client.get_audio_url
      @card.save!
    end
  end
end
