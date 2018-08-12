class CardsController < ActionController::API
  def index
    cards = current_user.
      cards.
      order(review_at: :desc).
      where('review_at <= ?', Time.current)

    render json: { cards: CardSerializer.new(cards).serializable_hash }, status: :ok
  end

  def create
    Card.create(
      # doing this is bc titleize removes hyphens.
      passage: card_params[:passage].to_s.split('-').map(&:titleize).join('-'),
      text: card_params[:text],
      user: current_user,
    )

    render json: {}, status: :ok
  end

  def update
  end

  def reviewed
    Cards::Service.
      new(current_user.cards.find(params[:id])).
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
