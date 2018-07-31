class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :passage, :text, :review_at, :last_viewed_at

  attribute :reviewed_card_path do |card|
    Rails.application.routes.url_helpers.reviewed_card_path(card)
  end
end
