class CardsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    cards = Card.
      order(review_at: :desc).
      where('review_at <= ?', Time.current).
      all

    render json: { cards: CardSerializer.new(cards).serializable_hash }, status: :ok
  end

  def create
    Card.create(
      # doing this is bc titleize removes hyphens.
      passage: card_params[:passage].to_s.split('-').map(&:titleize).join('-'),
      text: card_params[:text]
    )

    render json: {}, status: :ok
  end

  def update
  end

  def reviewed
    Cards::Service.
      new(Card.find(params[:id])).
      reviewed(params[:difficulty])

    render json: {}, status: :ok
  end

  def destroy
  end

  private

  def card_params
    params.permit(:passage, :text)
  end
end
