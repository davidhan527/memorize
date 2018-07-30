class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :passage, :text, :review_at, :last_viewed_at
end
