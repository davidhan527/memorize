class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :passage, :text, :review_at, :last_viewed_at, :audio_url

  attribute :reviewed_card_path do |card|
    Rails.application.routes.url_helpers.reviewed_card_path(card)
  end

  attribute :rankings_in_words do |card|
    CardRanking.new(card).rankings_in_words
  end
end
