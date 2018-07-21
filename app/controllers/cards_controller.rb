class CardsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
  end

  def create
    Card.create(card_params)

    render json: {}, status: :ok
  end

  def update
  end

  def destroy
  end

  private

  def card_params
    params.permit(:passage, :text)
  end
end
