class VersesController < ActionController::API
  def index
    text = Bible::Client.new(verse_params[:passage]).get
    render json: { text: text }
  end

  def show
  end

  private

  def verse_params
    params.permit(:passage)
  end
end
